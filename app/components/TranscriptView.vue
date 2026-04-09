<script setup lang="ts">
import type { TranscriptSegment } from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';

interface Props {
  segments: TranscriptSegment[];
  activeIndex: number;
}

const { segments, activeIndex = -1 } = defineProps<Props>();

const emit = defineEmits<{
  seek: [time: number];
}>();

/** Assign a stable color class per speaker */
const speakerColors: Record<string, string> = {};
const colorClasses = [
  'base-accent',
  'base-info',
  'base-warning',
  'base-success',
  'base-yellow'
];

const getSpeakerColor = (speaker: string): string => {
  if (!(speaker in speakerColors)) {
    const idx = Object.keys(speakerColors).length % colorClasses.length;
    speakerColors[speaker] = colorClasses[idx]!;
  }
  return speakerColors[speaker]!;
};
</script>

<template>
  <div class="TranscriptView">
    <div
      v-for="(segment, i) in segments"
      :key="i"
      class="TranscriptSegment"
      :class="{ segmentActive: i === activeIndex }"
      @click="emit('seek', segment.start)"
    >
      <div class="TranscriptMeta">
        <span
          class="TranscriptSpeaker"
          :class="getSpeakerColor(segment.speaker)"
        >
          {{ segment.speaker }}
        </span>
        <span class="TranscriptTime mono">{{
          formatSeconds(segment.start)
        }}</span>
      </div>
      <p class="TranscriptText">{{ segment.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.TranscriptView {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
}

.TranscriptSegment {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-0);
  padding: var(--space-bit-2) var(--space-bit-3);
  border-radius: var(--radius);
  cursor: pointer;
  transition: background var(--time-2) var(--timing);
}

.TranscriptSegment:hover {
  background: var(--base-20);
}

.TranscriptSegment.segmentActive {
  background: var(--base-20);
  border-left: 3px solid var(--accent-70);
  padding-left: calc(var(--space-bit-3) - 3px);
}

.TranscriptMeta {
  display: flex;
  align-items: center;
  gap: var(--space-bit-3);
}

.TranscriptSpeaker {
  font-size: var(--caption-text-height);
  font-weight: 700;
  color: var(--base-80);
}

.TranscriptTime {
  font-size: var(--caption-text-height);
  color: var(--base-50);
}

.TranscriptText {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--base-100);
}
</style>
