import { ref, computed } from 'vue';
import { useObjectUrl } from '@vueuse/core';
import type {
  TranscriptResponse,
  MeetingMetrics,
  DominanceInsight,
  Interruption,
  VolumeAnalysis,
  BehaviorAnalysis,
  UploadStatus
} from '~/types/meeting';
import {
  computeMeetingMetrics,
  generateInsights,
  generateVolumeInsights,
  detectInterruptions,
  DEFAULT_INTERRUPTION_THRESHOLD
} from '~/utils/metrics';
import {
  analyzeAudioVolume,
  analyzeAudioVolumeFromBuffer
} from '~/utils/volume';
import { mockTranscript } from '~/data/mock-transcript';
import { mockVolumeAnalysis } from '~/data/mock-volume';
import { demoTranscript } from '~/data/demo-transcript';
import { demoLabels, demoContext } from '~/data/demo-labels';

/**
 * Simple cache key from segment count + context string.
 * Good enough for client-side dedup without pulling in a hash lib.
 */
const behaviorCacheKey = (segmentCount: number, context: string): string =>
  `${segmentCount}:${context.trim()}`;

/**
 * Core composable for the meeting analysis workflow.
 * Manages upload, transcript data, computed metrics, and mock fallback.
 */
export const useMeetingAnalysis = () => {
  const transcript = ref<TranscriptResponse | null>(null);
  const volumeAnalysis = ref<VolumeAnalysis | null>(null);
  const behaviorAnalysis = ref<BehaviorAnalysis | null>(null);
  const behaviorContext = ref('');
  const analyzingBehavior = ref(false);
  const behaviorCache = new Map<string, BehaviorAnalysis>();
  const uploadStatus = ref<UploadStatus>('idle');
  const errorMessage = ref('');
  const audioFile = ref<File | null>(null);

  const audioUrl = useObjectUrl(audioFile);

  const interruptionThreshold = ref(DEFAULT_INTERRUPTION_THRESHOLD);

  const metrics = computed<MeetingMetrics | null>(() => {
    if (!transcript.value) return null;
    return computeMeetingMetrics(
      transcript.value.segments,
      transcript.value.duration
    );
  });

  const interruptions = computed<Interruption[]>(() => {
    if (!transcript.value) return [];
    return detectInterruptions(
      transcript.value.segments,
      interruptionThreshold.value
    );
  });

  const insights = computed<DominanceInsight[]>(() => {
    const base = metrics.value ? generateInsights(metrics.value) : [];
    const vol = volumeAnalysis.value
      ? generateVolumeInsights(volumeAnalysis.value)
      : [];
    return [...base, ...vol];
  });

  const hasData = computed(() => transcript.value !== null);

  const uploadAudio = async (file: File) => {
    audioFile.value = file;
    uploadStatus.value = 'uploading';
    errorMessage.value = '';

    const formData = new FormData();
    formData.append('audio', file);

    try {
      uploadStatus.value = 'processing';
      const response = await $fetch<TranscriptResponse>('/api/transcribe', {
        method: 'POST',
        body: formData
      });
      transcript.value = response;

      try {
        volumeAnalysis.value = await analyzeAudioVolume(
          file,
          response.segments
        );
      } catch {
        /** Volume analysis is best-effort — don't block on failure */
      }

      uploadStatus.value = 'done';
    } catch (err) {
      uploadStatus.value = 'error';
      errorMessage.value =
        err instanceof Error ? err.message : 'Transcription failed';
    }
  };

  const loadMockData = () => {
    transcript.value = mockTranscript;
    volumeAnalysis.value = mockVolumeAnalysis;
    uploadStatus.value = 'done';
    audioFile.value = null;
  };

  /** Load the bundled demo video + its pre-transcribed data */
  const demoVideoUrl = ref<string | null>(null);

  const loadDemo = async (videoUrl: string) => {
    transcript.value = demoTranscript;
    volumeAnalysis.value = null;
    behaviorAnalysis.value = demoLabels;
    behaviorContext.value = demoContext;
    uploadStatus.value = 'done';
    audioFile.value = null;

    // Seed the behavior cache so re-analyze with same prompt is instant
    const key = behaviorCacheKey(demoTranscript.segments.length, demoContext);
    behaviorCache.set(key, demoLabels);

    try {
      const response = await fetch(videoUrl);
      const buffer = await response.arrayBuffer();
      volumeAnalysis.value = await analyzeAudioVolumeFromBuffer(
        buffer,
        demoTranscript.segments
      );
    } catch {
      /** Volume analysis is best-effort */
    }
  };

  const analyzeBehavior = async (context?: string) => {
    if (!transcript.value) return;
    const prompt = context ?? '';
    const key = behaviorCacheKey(transcript.value.segments.length, prompt);

    // Return cached result if same transcript + prompt
    const cached = behaviorCache.get(key);
    if (cached) {
      behaviorAnalysis.value = cached;
      behaviorContext.value = prompt;
      return;
    }

    analyzingBehavior.value = true;
    try {
      const result = await $fetch<BehaviorAnalysis>('/api/analyze', {
        method: 'POST',
        body: {
          segments: transcript.value.segments,
          context: prompt || undefined
        }
      });
      result.context = prompt;
      behaviorAnalysis.value = result;
      behaviorContext.value = prompt;
      behaviorCache.set(key, result);
    } catch (err) {
      console.error('Behavior analysis failed:', err);
    } finally {
      analyzingBehavior.value = false;
    }
  };

  const reset = () => {
    transcript.value = null;
    volumeAnalysis.value = null;
    behaviorAnalysis.value = null;
    behaviorContext.value = '';
    analyzingBehavior.value = false;
    uploadStatus.value = 'idle';
    errorMessage.value = '';
    audioFile.value = null;
    demoVideoUrl.value = null;
  };

  return {
    transcript,
    volumeAnalysis,
    behaviorAnalysis,
    behaviorContext,
    analyzingBehavior,
    interruptions,
    interruptionThreshold,
    uploadStatus,
    errorMessage,
    audioFile,
    audioUrl,
    demoVideoUrl,
    metrics,
    insights,
    hasData,
    uploadAudio,
    analyzeBehavior,
    loadMockData,
    loadDemo,
    reset
  };
};
