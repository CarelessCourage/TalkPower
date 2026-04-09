import OpenAI from 'openai';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/** Hash filename + size to create a stable cache key */
const getCacheKey = (name: string, size: number): string => {
  return createHash('sha256')
    .update(`${name}:${size}`)
    .digest('hex')
    .slice(0, 16);
};

const CACHE_DIR = join(process.cwd(), '.cache', 'transcriptions');

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No form data received'
    });
  }

  const fileField = formData.find((field) => field.name === 'audio');
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, statusMessage: 'Missing audio file' });
  }

  const apiKey = useRuntimeConfig().openaiApiKey;

  const fileName = fileField.filename ?? 'audio.mp3';
  const cacheKey = getCacheKey(fileName, fileField.data.length);
  const cachePath = join(CACHE_DIR, `${cacheKey}.json`);

  /** Return cached transcription if it exists */
  try {
    const cached = await readFile(cachePath, 'utf-8');
    console.log(`[transcribe] Cache hit for "${fileName}" → ${cachePath}`);
    return JSON.parse(cached);
  } catch {
    /** No cache — proceed to API */
  }

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OPENAI_API_KEY not configured'
    });
  }

  const client = new OpenAI({ apiKey });

  const file = new File([fileField.data], fileField.filename ?? 'audio.mp3', {
    type: fileField.type ?? 'audio/mpeg'
  });

  let transcription;
  try {
    transcription = await client.audio.transcriptions.create({
      model: 'gpt-4o-transcribe-diarize',
      file,
      response_format: 'diarized_json',
      chunking_strategy: 'auto'
    });
  } catch (err: unknown) {
    if (err instanceof OpenAI.APIError) {
      throw createError({
        statusCode: err.status ?? 500,
        statusMessage:
          err.status === 429
            ? 'OpenAI rate limit reached — check your plan and billing at platform.openai.com'
            : `OpenAI error: ${err.message}`
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Transcription request failed'
    });
  }

  const response = transcription as unknown as {
    text: string;
    segments: Array<{
      speaker: string;
      text: string;
      start: number;
      end: number;
    }>;
  };

  const segments = response.segments ?? [];
  const lastSegment = segments.at(-1);
  const lastEnd = lastSegment ? lastSegment.end : 0;

  const result = {
    segments,
    duration: lastEnd,
    text: response.text ?? ''
  };

  /** Write to cache so we never re-transcribe the same file */
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cachePath, JSON.stringify(result, null, 2));
    console.log(`[transcribe] Cached "${fileName}" → ${cachePath}`);
  } catch {
    /** Cache write is best-effort */
  }

  return result;
});
