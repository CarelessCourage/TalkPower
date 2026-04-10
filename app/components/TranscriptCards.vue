<script setup lang="ts">
import type { TranscriptSegment, Interruption } from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';

interface Props {
  segments: TranscriptSegment[];
  currentTime: number;
  interruptions?: Interruption[];
}

const { segments, currentTime = 0, interruptions = [] } = defineProps<Props>();

/* ── Speaker colors ── */
const colorClasses = [
  'base-accent',
  'base-info',
  'base-warning',
  'base-success',
  'base-yellow'
];
const speakerColorMap: Record<string, string> = {};

const getSpeakerColor = (speaker: string): string => {
  if (!(speaker in speakerColorMap)) {
    const idx = Object.keys(speakerColorMap).length % colorClasses.length;
    speakerColorMap[speaker] = colorClasses[idx]!;
  }
  return speakerColorMap[speaker]!;
};

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
</script>

<template>
  <div class="TranscriptCards">
    <TransitionGroup name="card">
      <div
        v-for="{ seg, index } in activeSegments"
        :key="index"
        class="TranscriptCard"
        :class="{
          cardHardInterruption: getInterruption(index)?.severity === 'hard',
          cardSoftInterruption: getInterruption(index)?.severity === 'soft'
        }"
      >
        <div v-if="getInterruption(index)" class="CardInterruptionBanner">
          <span class="CardInterruptionLabel">
            <span :class="getSpeakerColor(getInterruption(index)!.interrupter)">
              {{ getInterruption(index)!.interrupter }}
            </span>
            <span class="CardCutOff">
              {{
                getInterruption(index)!.severity === 'hard' ? 'cut off' : 'soft'
              }}
            </span>
            <span :class="getSpeakerColor(getInterruption(index)!.interrupted)">
              {{ getInterruption(index)!.interrupted }}
            </span>
          </span>
        </div>
        <div class="CardMeta">
          <span class="CardSpeaker" :class="getSpeakerColor(seg.speaker)">
            {{ seg.speaker }}
          </span>
          <span class="CardTime mono">{{ formatSeconds(seg.start) }}</span>
        </div>
        <p class="CardText">{{ seg.text }}</p>
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
}

.TranscriptCard {
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-0);
  padding: var(--space-bit-2) var(--space-bit-3);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--base) 85%, transparent);
  backdrop-filter: blur(8px);
}

.TranscriptCard.cardHardInterruption {
  border-left: 3px solid var(--accent-60);
  padding-left: calc(var(--space-bit-3) - 3px);
  background: color-mix(
    in srgb,
    var(--accent) 12%,
    color-mix(in srgb, var(--base) 80%, transparent)
  );
}

.TranscriptCard.cardSoftInterruption {
  border-left: 3px solid var(--base-50);
  padding-left: calc(var(--space-bit-3) - 3px);
}

.CardInterruptionBanner {
  padding-bottom: var(--space-bit-0);
}

.CardInterruptionLabel {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  font-size: var(--caption-text-height);
  font-weight: 700;
}

.CardCutOff {
  color: var(--accent-70);
  font-style: italic;
  font-weight: 400;
}

.CardMeta {
  display: flex;
  align-items: center;
  gap: var(--space-bit-3);
}

.CardSpeaker {
  font-size: var(--caption-text-height);
  font-weight: 700;
  color: var(--base-80);
}

.CardTime {
  font-size: var(--caption-text-height);
  color: var(--base-50);
}

.CardText {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--base-100);
}

/* ── Transition ── */
.card-enter-active,
.card-leave-active {
  transition: opacity 0.12s var(--timing);
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
}
</style>
