import { computed, type Ref } from 'vue';
import type { TranscriptSegment } from '~/types/meeting';

/**
 * Syncs a playback currentTime with transcript segments.
 * Returns the active segment index and a seek helper.
 */
export const useTranscriptSync = (
  segments: Ref<TranscriptSegment[]>,
  currentTime: Ref<number>
) => {
  const activeIndex = computed(() => {
    const time = currentTime.value;
    return segments.value.findIndex(
      (seg) => time >= seg.start && time < seg.end
    );
  });

  const activeSegment = computed(() => {
    const idx = activeIndex.value;
    return idx >= 0 ? segments.value[idx] : null;
  });

  /** Get the segment index at a given time */
  const segmentIndexAtTime = (time: number): number => {
    return segments.value.findIndex(
      (seg) => time >= seg.start && time < seg.end
    );
  };

  return {
    activeIndex,
    activeSegment,
    segmentIndexAtTime
  };
};
