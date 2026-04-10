<script setup lang="ts">
import type { TranscriptSegment, Interruption } from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';

interface Props {
  segments: TranscriptSegment[];
  activeIndex: number;
  interruptions?: Interruption[];
  displayName?: (raw: string) => string;
}

const {
  segments,
  activeIndex = -1,
  interruptions = [],
  displayName = (raw: string) => raw
} = defineProps<Props>();

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

/** Look up if this segment is an interruption (it's the interrupter) */
const getInterruption = (index: number): Interruption | undefined => {
  const seg = segments[index];
  if (!seg) return undefined;
  return interruptions.find(
    (int) =>
      int.interrupter === seg.speaker && Math.abs(int.time - seg.start) < 0.01
  );
};
</script>

<template>
  <div class="TranscriptView">
    <div
      v-for="(segment, i) in segments"
      :key="i"
      class="TranscriptSegment"
      :class="{
        segmentActive: i === activeIndex,
        segmentHardInterruption: getInterruption(i)?.severity === 'hard',
        segmentSoftInterruption: getInterruption(i)?.severity === 'soft'
      }"
      @click="emit('seek', segment.start)"
    >
      <!-- Interruption badge -->
      <div v-if="getInterruption(i)" class="InterruptionBanner">
        <span class="InterruptionLabel">
          <span :class="getSpeakerColor(getInterruption(i)!.interrupter)">
            {{ displayName(getInterruption(i)!.interrupter) }}
          </span>
          <span class="InterruptionCutOff">
            {{ getInterruption(i)!.severity === 'hard' ? 'cut off' : 'soft' }}
          </span>
          <span :class="getSpeakerColor(getInterruption(i)!.interrupted)">
            {{ displayName(getInterruption(i)!.interrupted) }}
          </span>
        </span>
        <span class="InterruptionOverlap mono">
          {{
            getInterruption(i)!.gap <= 0
              ? `${Math.abs(getInterruption(i)!.gap).toFixed(1)}s overlap`
              : `${getInterruption(i)!.gap.toFixed(1)}s gap`
          }}
        </span>
      </div>

      <div class="TranscriptMeta">
        <span
          class="TranscriptSpeaker"
          :class="getSpeakerColor(segment.speaker)"
        >
          {{ displayName(segment.speaker) }}
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

.TranscriptSegment.segmentHardInterruption {
  border-left: 3px solid var(--accent-60);
  padding-left: calc(var(--space-bit-3) - 3px);
  background: color-mix(in srgb, var(--accent) 4%, transparent);
}

.TranscriptSegment.segmentHardInterruption:hover {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

.TranscriptSegment.segmentActive.segmentHardInterruption {
  border-left-color: var(--accent-80);
}

.TranscriptSegment.segmentSoftInterruption {
  border-left: 3px dashed var(--base-50);
  padding-left: calc(var(--space-bit-3) - 3px);
}

.TranscriptSegment.segmentActive.segmentSoftInterruption {
  border-left-color: var(--base-70);
}

.InterruptionBanner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-bit-2);
  padding-bottom: var(--space-bit-1);
}

.InterruptionLabel {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  font-size: var(--caption-text-height);
  font-weight: 700;
}

.InterruptionCutOff {
  color: var(--accent-70);
  font-style: italic;
  font-weight: 400;
}

.InterruptionOverlap {
  font-size: var(--caption-text-height);
  color: var(--accent-60);
  white-space: nowrap;
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
