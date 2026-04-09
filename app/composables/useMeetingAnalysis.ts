import { ref, computed } from 'vue';
import { useObjectUrl } from '@vueuse/core';
import type {
  TranscriptResponse,
  MeetingMetrics,
  DominanceInsight,
  UploadStatus
} from '~/types/meeting';
import { computeMeetingMetrics, generateInsights } from '~/utils/metrics';
import { mockTranscript } from '~/data/mock-transcript';

/**
 * Core composable for the meeting analysis workflow.
 * Manages upload, transcript data, computed metrics, and mock fallback.
 */
export const useMeetingAnalysis = () => {
  const transcript = ref<TranscriptResponse | null>(null);
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

  const insights = computed<DominanceInsight[]>(() => {
    if (!metrics.value) return [];
    return generateInsights(metrics.value);
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
      uploadStatus.value = 'done';
    } catch (err) {
      uploadStatus.value = 'error';
      errorMessage.value =
        err instanceof Error ? err.message : 'Transcription failed';
    }
  };

  const loadMockData = () => {
    transcript.value = mockTranscript;
    uploadStatus.value = 'done';
    audioFile.value = null;
  };

  const reset = () => {
    transcript.value = null;
    uploadStatus.value = 'idle';
    errorMessage.value = '';
    audioFile.value = null;
  };

  return {
    transcript,
    uploadStatus,
    errorMessage,
    audioFile,
    audioUrl,
    metrics,
    insights,
    hasData,
    uploadAudio,
    loadMockData,
    reset
  };
};
