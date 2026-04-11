<script setup lang="ts">
import type {
  TranscriptSegment,
  Interruption,
  BehaviorLabel,
  EmotionLabel
} from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';
import { useSpeakerColors } from '~/composables/useSpeakerColors';

interface Props {
  segment: TranscriptSegment;
  interruption?: Interruption;
  label?: BehaviorLabel;
  emotion?: EmotionLabel;
  active?: boolean;
  displayName?: (raw: string) => string;
}

const {
  segment,
  interruption,
  label,
  emotion,
  active = false,
  displayName = (raw: string) => raw
} = defineProps<Props>();

const { getSpeakerColor } = useSpeakerColors();

/** Map speaker to stable index for color assignment */
const speakerIndexMap: Record<string, number> = {};
let nextIndex = 0;

const colorFor = (speaker: string): string => {
  if (!(speaker in speakerIndexMap)) {
    speakerIndexMap[speaker] = nextIndex++;
  }
  return getSpeakerColor(speakerIndexMap[speaker]!);
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
  <div
    class="TranscriptCard"
    :class="{
      cardActive: active,
      cardHardInterruption: interruption?.severity === 'hard',
      cardSoftInterruption: interruption?.severity === 'soft'
    }"
  >
    <div class="CardMeta">
      <span class="CardSpeaker" :class="colorFor(segment.speaker)">
        {{ displayName(segment.speaker) }}
      </span>
      <span v-if="interruption" class="CardCutOff">
        {{ interruption.severity === 'hard' ? 'cut off' : 'talked over' }}
        <span :class="colorFor(interruption.interrupted)">
          {{ displayName(interruption.interrupted) }}
        </span>
      </span>
      <span class="CardTime mono">{{ formatSeconds(segment.start) }}</span>
    </div>
    <p class="CardText">{{ segment.text }}</p>
    <div v-if="label || emotion" class="CardChips">
      <span
        v-if="label"
        class="CardLabel"
        :class="[
          categoryColorClass[label.category],
          { labelDeceptive: label.deception }
        ]"
        :title="
          label.deception
            ? `${label.detail} ⚠ ${label.deception}`
            : label.detail
        "
      >
        <span class="Subtle">action: </span>
        {{ label.label }}
        <span v-if="label.deception" class="LabelDeception">deceptive</span>
      </span>
      <span
        v-if="emotion"
        class="CardEmotion"
        :class="{ emotionMasked: emotion.surface }"
        :title="
          emotion.surface
            ? `Appears ${emotion.surface} but actually ${emotion.emotion} — ${emotion.trigger}`
            : emotion.trigger
        "
      >
        <span class="Subtle">emotion: </span>
        {{ emotion.emotion }}
        <span v-if="emotion.surface" class="EmotionSurface">
          looks {{ emotion.surface }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.Subtle {
  opacity: 0.5;
}

.TranscriptCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
  padding: var(--space-bit-2) var(--space-bit-3);
}

.TranscriptCard.cardActive {
  background: var(--base-20);
  border-left: 3px solid var(--accent-70);
  padding-left: calc(var(--space-bit-3) - 3px);
}

.TranscriptCard.cardHardInterruption {
  border-left: 3px solid var(--accent-30);
  padding-left: calc(var(--space-bit-3) - 3px);
  background: var(--base);
}

.TranscriptCard.cardActive.cardHardInterruption {
  border-left-color: var(--accent-80);
}

.TranscriptCard.cardSoftInterruption {
  border-left: 3px dashed var(--base-50);
  padding-left: calc(var(--space-bit-3) - 3px);
}

.TranscriptCard.cardActive.cardSoftInterruption {
  border-left-color: var(--base-70);
}

.CardMeta {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
}

.CardSpeaker {
  font-size: var(--caption-text-height);
  font-weight: 700;
}

.CardCutOff {
  color: var(--accent-70);
  font-size: var(--caption-text-height);
  font-style: italic;
  font-weight: 400;
}

.CardTime {
  font-size: var(--caption-text-height);
  color: var(--base-50);
  margin-left: auto;
}

.CardText {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--base-100);
}

.CardChips {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  flex-wrap: wrap;
  padding-top: var(--space-bit-2);
}

.CardLabel {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-1);
  padding: 2px var(--space-bit-2);
  border-radius: var(--radius-inner);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: help;
}

.CardLabel.labelDeceptive {
  border: 1px solid var(--accent-30);
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
  font-size: 1rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.02em;
  cursor: help;
  background: var(--base-20);
  color: var(--base-80);
  border: 1px solid var(--base-30);
}

.CardEmotion.emotionMasked {
  background: var(--warning-10);
  border-color: var(--warning-30);
  color: var(--warning-80);
}

.EmotionSurface {
  font-weight: 400;
  font-style: normal;
  opacity: 0.65;
  font-size: 0.625rem;
  text-decoration: line-through;
}

.labelConstructive {
  background: var(--success-10);
  color: var(--success-80);
}

.labelDestructive {
  background: var(--base);
  color: var(--accent-80);
}

.labelNeutral {
  background: var(--base-20);
  color: var(--base-80);
}

.labelAssertive {
  background: var(--info-10);
  color: var(--info-80);
}

.labelEvasive {
  background: var(--warning-10);
  color: var(--warning-80);
}
</style>
