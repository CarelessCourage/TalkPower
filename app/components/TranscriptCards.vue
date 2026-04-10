<script setup lang="ts">
import type {
  TranscriptSegment,
  Interruption,
  BehaviorLabel,
  EmotionLabel
} from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';

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

/** Look up behavioral label for a segment */
const getLabel = (index: number): BehaviorLabel | undefined => {
  return labels.find((l) => l.segmentIndex === index);
};

/** Look up emotional state for a segment */
const getEmotion = (index: number): EmotionLabel | undefined => {
  return emotions.find((e) => e.segmentIndex === index);
};

const categoryColorClass: Record<string, string> = {
  constructive: 'labelConstructive',
  destructive: 'labelDestructive',
  neutral: 'labelNeutral',
  assertive: 'labelAssertive',
  evasive: 'labelEvasive'
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
              {{ displayName(getInterruption(index)!.interrupter) }}
            </span>
            <span class="CardCutOff">
              {{
                getInterruption(index)!.severity === 'hard' ? 'cut off' : 'soft'
              }}
            </span>
            <span :class="getSpeakerColor(getInterruption(index)!.interrupted)">
              {{ displayName(getInterruption(index)!.interrupted) }}
            </span>
          </span>
        </div>
        <div class="CardMeta">
          <span class="CardSpeaker" :class="getSpeakerColor(seg.speaker)">
            {{ displayName(seg.speaker) }}
          </span>
          <span class="CardTime mono">{{ formatSeconds(seg.start) }}</span>
        </div>
        <p class="CardText">{{ seg.text }}</p>
        <div class="CardChips">
          <span
            v-if="getLabel(index)"
            class="CardLabel"
            :class="[
              categoryColorClass[getLabel(index)!.category],
              { labelDeceptive: getLabel(index)!.deception }
            ]"
            :title="
              getLabel(index)!.deception
                ? `${getLabel(index)!.detail} ⚠ ${getLabel(index)!.deception}`
                : getLabel(index)!.detail
            "
          >
            {{ getLabel(index)!.label }}
            <span v-if="getLabel(index)!.deception" class="LabelDeception">
              deceptive
            </span>
          </span>
          <span
            v-if="getEmotion(index)"
            class="CardEmotion"
            :class="{ emotionMasked: getEmotion(index)!.surface }"
            :title="
              getEmotion(index)!.surface
                ? `Appears ${getEmotion(index)!.surface} but actually ${getEmotion(index)!.emotion} — ${getEmotion(index)!.trigger}`
                : getEmotion(index)!.trigger
            "
          >
            {{ getEmotion(index)!.emotion }}
            <span v-if="getEmotion(index)!.surface" class="EmotionSurface">
              looks {{ getEmotion(index)!.surface }}
            </span>
          </span>
        </div>
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

.CardLabel {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-1);
  padding: 2px var(--space-bit-2);
  border-radius: var(--radius-inner);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: help;
}

.CardLabel.labelDeceptive {
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}

.LabelDeception {
  font-weight: 500;
  font-style: italic;
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.75;
  font-size: 0.625rem;
  color: var(--accent-80);
}

.CardEmotion {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-1);
  padding: 2px var(--space-bit-2);
  border-radius: var(--radius-inner);
  font-size: 0.6875rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.02em;
  cursor: help;
  background: color-mix(in srgb, var(--base-50) 15%, transparent);
  color: var(--base-80);
  border: 1px solid color-mix(in srgb, var(--base-50) 25%, transparent);
}

.CardEmotion.emotionMasked {
  background: color-mix(in srgb, var(--warning) 12%, transparent);
  border-color: color-mix(in srgb, var(--warning) 30%, transparent);
  color: var(--warning-80);
}

.EmotionSurface {
  font-weight: 400;
  font-style: normal;
  opacity: 0.65;
  font-size: 0.625rem;
  text-decoration: line-through;
}

.CardChips {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  flex-wrap: wrap;
}

.labelConstructive {
  background: color-mix(in srgb, var(--success) 25%, transparent);
  color: var(--success-80);
}

.labelDestructive {
  background: color-mix(in srgb, var(--accent) 25%, transparent);
  color: var(--accent-80);
}

.labelNeutral {
  background: color-mix(in srgb, var(--base-50) 25%, transparent);
  color: var(--base-80);
}

.labelAssertive {
  background: color-mix(in srgb, var(--info) 25%, transparent);
  color: var(--info-80);
}

.labelEvasive {
  background: color-mix(in srgb, var(--warning) 25%, transparent);
  color: var(--warning-80);
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
  width: 100%;
}

.card-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
