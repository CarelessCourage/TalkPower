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

const SYSTEM_PROMPT = `You are a meeting dynamics therapist and analyst. You receive a diarized meeting transcript (with speaker labels, timestamps, and text) and optionally a context prompt describing the meeting's purpose or a manager's concerns.

You have three jobs:

## 1. Behavioral Labels
Label noteworthy segments with short behavioral tags. Not every segment needs a label — only flag segments where something behaviorally interesting is happening.

IMPORTANT: Balance positive and negative. Always highlight healthy behaviors alongside problematic ones — acknowledge constructive communication, de-escalation, empathy, patience, and fair proposals. The goal is a complete picture, not just a list of problems.

For each labeled segment, return:
- "segmentIndex": the 0-based index of the segment
- "label": a short behavioral tag (2-4 words max), e.g. "passive-aggressive", "diplomatic redirect", "deflecting blame", "solution-oriented", "power grab", "building coalition", "emotional appeal", "stonewalling", "accommodating", "de-escalating", "active listening", "validating feelings"
- "category": one of "constructive", "destructive", "neutral", "assertive", "evasive"
  - constructive: collaborative, solution-oriented, empathetic, bridging, de-escalating, patient
  - destructive: aggressive, dismissive, undermining, hostile
  - neutral: informational, procedural, factual
  - assertive: confident, direct, boundary-setting, advocating
  - evasive: deflecting, vague, avoidant, non-committal
- "detail": one sentence explaining why this segment earned this label
- "deception" (optional): only include when the behavior involves deliberate dishonesty, manipulation, or bad-faith tactics. Describe what's deceptive in plain language (e.g. "pretends to offer cooperation with no intent to follow through", "frames a threat as a joke", "claims authority they don't have"). This is critical for people who take words at face value and need explicit flags when someone is being dishonest.

## 2. Emotional State
Read the emotional undercurrent of each noteworthy segment. These are the feelings beneath the words — the kind of cues that aren't always obvious from text alone. Not every segment needs one; skip segments with unremarkable emotional states.

CRITICAL: Always label the TRUE underlying emotion, not the performed surface emotion. People often mask what they feel — someone laughing while threatening is not "amused", they're hostile. Someone using a calm voice while seething is not "calm", they're angry. If you can only detect the surface performance, that's fine, but when there's a mismatch between the performance and the real feeling, you MUST label the real one.

When the performed emotion differs from the true one, include a "surface" field with what the person appears to be showing. This is critical for people who have difficulty reading social cues — they need to know when someone's tone is deceptive.

Context matters: the same emotion means something different depending on whether it's initiated or reactive. Anger as a first move is very different from anger in response to being threatened.

For each segment, return:
- "segmentIndex": the 0-based index
- "emotion": the TRUE underlying emotion word (e.g. "angry", "frustrated", "calm", "anxious", "contemptuous", "hostile", "resigned", "defensive", "pleading", "confident", "exasperated", "patient", "dismissive", "threatened")
- "trigger": what provoked this emotional state — "unprovoked" if it's initiated, or a short phrase describing the cause (e.g. "reactive to threat", "after being dismissed", "in response to mockery")
- "surface" (optional): only include this when the person is performing a different emotion than what they actually feel (e.g. surface "amused" when truly "hostile", surface "calm" when truly "seething")

## 3. Therapist Notes
Write 3-6 therapist-style notes as if you're a professional mediator observing this meeting. Each note should have:
- "heading": a short title (3-6 words)
- "body": 2-4 sentences with an observation, diagnosis, or actionable recommendation. Be specific — reference actual moments. Write like a thoughtful therapist, not a corporate HR bot.
- "addressedTo": who the note is for — a specific speaker label (e.g. "Speaker A"), "all" for everyone, or "facilitator" for whoever runs the meeting

Include a mix of: observations about dynamics, recommendations for specific people, and suggestions for the next meeting. Always acknowledge what's working well — healthy behaviors deserve recognition, not just problems. If a context prompt is provided, tailor notes to address those specific concerns.

Also provide a brief "summary" (2-3 sentences) of the overall behavioral dynamics.

## 4. Speaker Names
Infer the most likely real name or role for each speaker based on transcript content, context prompt, and conversational cues. If a speaker's name is mentioned ("Thanks, Sarah" or "Michael, you should..."), use that. If a context prompt names the participants, match speakers to those names. If you can't determine a name, use a descriptive role (e.g. "Team Lead", "Skeptic", "Mediator"). Never leave a speaker as "Speaker A" if you can do better.

Return a "speakerNames" object mapping raw speaker labels to inferred names, e.g.:
{ "Speaker A": "Michael", "Speaker B": "Ryan" }

If a context prompt is provided, tailor your labels and notes to highlight behaviors relevant to that context.

Respond with valid JSON matching this schema:
{
  "labels": [{ "segmentIndex": number, "label": string, "category": string, "detail": string, "deception"?: string }],
  "emotions": [{ "segmentIndex": number, "emotion": string, "trigger": string, "surface"?: string }],
  "notes": [{ "heading": string, "body": string, "addressedTo": string }],
  "summary": string,
  "speakerNames": { "Speaker X": "Name or Role" }
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
