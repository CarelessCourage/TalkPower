<script setup lang="ts">
import type {
  TranscriptSegment,
  Interruption,
  BehaviorLabel,
  EmotionLabel
} from '~/types/meeting';

interface Props {
  segments: TranscriptSegment[];
  currentTime: number;
  interruptions?: Interruption[];
  labels?: BehaviorLabel[];
  emotions?: EmotionLabel[];
  displayName?: (raw: string) => string;
}

const {
  segments,
  currentTime = 0,
  interruptions = [],
  labels = [],
  emotions = [],
  displayName = (raw: string) => raw
} = defineProps<Props>();

/* ── Active segments at current time ── */
const activeSegments = computed(() => {
  return segments
    .map((seg, i) => ({ seg, index: i }))
    .filter(({ seg }) => currentTime >= seg.start && currentTime < seg.end);
});

/** Look up if a segment index is an interruption */
const getInterruption = (index: number): Interruption | undefined => {
  const seg = segments[index];
  if (!seg) return undefined;
  return interruptions.find(
    (int) =>
      int.interrupter === seg.speaker && Math.abs(int.time - seg.start) < 0.01
  );
};

/** Look up behavioral label for a segment */
const getLabel = (index: number): BehaviorLabel | undefined => {
  return labels.find((l) => l.segmentIndex === index);
};

/** Look up emotional state for a segment */
const getEmotion = (index: number): EmotionLabel | undefined => {
  return emotions.find((e) => e.segmentIndex === index);
};
</script>

<template>
  <div class="TranscriptCards">
    <TransitionGroup name="card">
      <div
        v-for="{ seg, index } in activeSegments"
        :key="index"
        class="TranscriptCardWrapper"
      >
        <TranscriptCard
          :segment="seg"
          :interruption="getInterruption(index)"
          :label="getLabel(index)"
          :emotion="getEmotion(index)"
          :display-name="displayName"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.TranscriptCards {
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
  justify-content: flex-end;
  min-height: 0;
  position: relative;
}

.TranscriptCardWrapper {
  pointer-events: auto;
  background: color-mix(in srgb, var(--base) 85%, transparent);
  backdrop-filter: blur(8px);
  width: max-content;
  max-width: 100%;
}

/* ── Transition ── */
.card-move,
.card-enter-active,
.card-leave-active {
  transition: all var(--time-3) var(--timing);
}

.card-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.card-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}

.card-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
