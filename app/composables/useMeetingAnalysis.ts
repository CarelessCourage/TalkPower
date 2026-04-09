import { ref, computed } from 'vue';
import { useObjectUrl } from '@vueuse/core';
import type {
  TranscriptResponse,
  MeetingMetrics,
  DominanceInsight,
  Interruption,
  VolumeAnalysis,
  UploadStatus
} from '~/types/meeting';
import {
  computeMeetingMetrics,
  generateInsights,
  generateVolumeInsights,
  detectInterruptions
} from '~/utils/metrics';
import {
  analyzeAudioVolume,
  analyzeAudioVolumeFromBuffer
} from '~/utils/volume';
import { mockTranscript } from '~/data/mock-transcript';
import { mockVolumeAnalysis } from '~/data/mock-volume';
import { demoTranscript } from '~/data/demo-transcript';

/**
 * Core composable for the meeting analysis workflow.
 * Manages upload, transcript data, computed metrics, and mock fallback.
 */
export const useMeetingAnalysis = () => {
  const transcript = ref<TranscriptResponse | null>(null);
  const volumeAnalysis = ref<VolumeAnalysis | null>(null);
  const uploadStatus = ref<UploadStatus>('idle');
  const errorMessage = ref('');
  const audioFile = ref<File | null>(null);

  const audioUrl = useObjectUrl(audioFile);

  const metrics = computed<MeetingMetrics | null>(() => {
    if (!transcript.value) return null;
    return computeMeetingMetrics(
      transcript.value.segments,
      transcript.value.duration
    );
  });

  const interruptions = computed<Interruption[]>(() => {
    if (!transcript.value) return [];
    return detectInterruptions(transcript.value.segments);
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
    uploadStatus.value = 'done';
    audioFile.value = null;

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

  const reset = () => {
    transcript.value = null;
    volumeAnalysis.value = null;
    uploadStatus.value = 'idle';
    errorMessage.value = '';
    audioFile.value = null;
    demoVideoUrl.value = null;
  };

  return {
    transcript,
    volumeAnalysis,
    interruptions,
    uploadStatus,
    errorMessage,
    audioFile,
    audioUrl,
    demoVideoUrl,
    metrics,
    insights,
    hasData,
    uploadAudio,
    loadMockData,
    loadDemo,
    reset
  };
};
