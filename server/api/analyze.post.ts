import OpenAI from 'openai';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const CACHE_DIR = join(process.cwd(), '.cache', 'analyses');

const getCacheKey = (transcript: string, context: string): string => {
  return createHash('sha256')
    .update(`${transcript}:${context}`)
    .digest('hex')
    .slice(0, 16);
};

const SYSTEM_PROMPT = `You are a meeting dynamics analyst. You receive a diarized meeting transcript (with speaker labels, timestamps, and text) and optionally a context prompt describing the meeting's purpose or a manager's concerns.

Your job is to label noteworthy segments with short behavioral tags. Not every segment needs a label — only flag segments where something behaviorally interesting is happening.

For each labeled segment, return:
- "segmentIndex": the 0-based index of the segment
- "label": a short behavioral tag (2-4 words max), e.g. "passive-aggressive", "diplomatic redirect", "deflecting blame", "solution-oriented", "power grab", "building coalition", "emotional appeal", "stonewalling", "accommodating", "undermining"
- "category": one of "constructive", "destructive", "neutral", "assertive", "evasive"
  - constructive: collaborative, solution-oriented, empathetic, bridging
  - destructive: aggressive, dismissive, undermining, hostile
  - neutral: informational, procedural, factual
  - assertive: confident, direct, boundary-setting, advocating
  - evasive: deflecting, vague, avoidant, non-committal
- "detail": one sentence explaining why this segment earned this label

Also provide a brief "summary" (2-3 sentences) of the overall behavioral dynamics.

If a context prompt is provided, tailor your labels to highlight behaviors relevant to that context. For example, if the manager says "I'm concerned about Sarah dominating discussions", pay extra attention to dominance and silencing patterns.

Respond with valid JSON matching this schema:
{
  "labels": [{ "segmentIndex": number, "label": string, "category": string, "detail": string }],
  "summary": string
}`;

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    segments: Array<{
      speaker: string;
      text: string;
      start: number;
      end: number;
    }>;
    context?: string;
  }>(event);

  if (!body?.segments?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing transcript segments'
    });
  }

  const transcriptText = body.segments
    .map(
      (seg, i) =>
        `[${i}] ${seg.speaker} (${seg.start.toFixed(1)}s): ${seg.text}`
    )
    .join('\n');

  const contextPrompt = body.context?.trim() ?? '';
  const cacheKey = getCacheKey(transcriptText, contextPrompt);
  const cachePath = join(CACHE_DIR, `${cacheKey}.json`);

  try {
    const cached = await readFile(cachePath, 'utf-8');
    console.log(`[analyze] Cache hit → ${cachePath}`);
    return JSON.parse(cached);
  } catch {
    /** No cache — proceed to API */
  }

  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OPENAI_API_KEY not configured'
    });
  }

  const client = new OpenAI({ apiKey });

  const userMessage = contextPrompt
    ? `Meeting context from manager:\n"${contextPrompt}"\n\nTranscript:\n${transcriptText}`
    : `Transcript:\n${transcriptText}`;

  let completion;
  try {
    completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.4
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
      statusMessage: 'Behavior analysis request failed'
    });
  }

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Empty response from behavior analysis'
    });
  }

  const result = JSON.parse(raw);

  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cachePath, JSON.stringify(result, null, 2));
  } catch {
    /** Cache write is best-effort */
  }

  return result;
});
