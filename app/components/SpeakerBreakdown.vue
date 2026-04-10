<script setup lang="ts">
import type {
  TranscriptSegment,
  BehaviorLabel,
  EmotionLabel
} from '~/types/meeting';

interface Props {
  segments: TranscriptSegment[];
  labels: BehaviorLabel[];
  emotions: EmotionLabel[];
}

const { segments, labels, emotions } = defineProps<Props>();

const speakers = computed(() => {
  const map = new Map<
    string,
    { labels: BehaviorLabel[]; emotions: EmotionLabel[] }
  >();

  for (const label of labels) {
    const seg = segments[label.segmentIndex];
    if (!seg) continue;
    if (!map.has(seg.speaker))
      map.set(seg.speaker, { labels: [], emotions: [] });
    map.get(seg.speaker)!.labels.push(label);
  }

  for (const emotion of emotions) {
    const seg = segments[emotion.segmentIndex];
    if (!seg) continue;
    if (!map.has(seg.speaker))
      map.set(seg.speaker, { labels: [], emotions: [] });
    map.get(seg.speaker)!.emotions.push(emotion);
  }

  return [...map.entries()].map(([speaker, data]) => ({
    speaker,
    labels: data.labels,
    emotions: data.emotions
  }));
});

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

const categoryColorClass: Record<string, string> = {
  constructive: 'labelConstructive',
  destructive: 'labelDestructive',
  neutral: 'labelNeutral',
  assertive: 'labelAssertive',
  evasive: 'labelEvasive'
};
</script>

<template>
  <div class="SpeakerBreakdown">
    <div v-for="entry in speakers" :key="entry.speaker" class="SpeakerSection">
      <h3 class="SpeakerName" :class="getSpeakerColor(entry.speaker)">
        {{ entry.speaker }}
      </h3>

      <div v-if="entry.labels.length" class="LabelGroup">
        <p class="GroupHeading">Behaviors</p>
        <div class="ChipList">
          <span
            v-for="label in entry.labels"
            :key="label.segmentIndex"
            class="Chip ChipBehavior"
            :class="[
              categoryColorClass[label.category],
              { chipDeceptive: label.deception }
            ]"
            :title="
              label.deception
                ? `${label.detail} ⚠ ${label.deception}`
                : label.detail
            "
          >
            {{ label.label }}
            <span v-if="label.deception" class="DeceptionFlag">⚠</span>
          </span>
        </div>
      </div>

      <div v-if="entry.emotions.length" class="LabelGroup">
        <p class="GroupHeading">Emotions</p>
        <div class="ChipList">
          <span
            v-for="emotion in entry.emotions"
            :key="emotion.segmentIndex"
            class="Chip ChipEmotion"
            :class="{ chipMasked: emotion.surface }"
            :title="
              emotion.surface
                ? `Appears ${emotion.surface} but actually ${emotion.emotion} — ${emotion.trigger}`
                : emotion.trigger
            "
          >
            {{ emotion.emotion }}
            <span v-if="emotion.surface" class="SurfaceFlag">
              looks {{ emotion.surface }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <p v-if="!speakers.length" class="EmptyState">
      No labels yet — run the behavior analysis first.
    </p>
  </div>
</template>

<style scoped>
.SpeakerBreakdown {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.SpeakerSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.SpeakerName {
  font-size: 1rem;
  font-weight: 700;
}

.LabelGroup {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-3);
}

.GroupHeading {
  font-size: var(--caption-text-height);
  font-weight: 600;
  color: var(--base-50);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.ChipList {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-bit-2);
}

.Chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-1);
  padding: var(--space-bit-0) var(--space-bit-2);
  border-radius: var(--radius-inner);
  font-size: 0.75rem;
  cursor: help;
}

.ChipBehavior {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ChipBehavior.chipDeceptive {
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}

.DeceptionFlag {
  font-size: 0.625rem;
}

.ChipEmotion {
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.02em;
  background: color-mix(in srgb, var(--base-50) 15%, transparent);
  color: var(--base-80);
  border: 1px solid color-mix(in srgb, var(--base-50) 25%, transparent);
}

.ChipEmotion.chipMasked {
  background: color-mix(in srgb, var(--warning) 12%, transparent);
  border-color: color-mix(in srgb, var(--warning) 30%, transparent);
  color: var(--warning-80);
}

.SurfaceFlag {
  font-weight: 400;
  font-style: normal;
  opacity: 0.65;
  font-size: 0.625rem;
  text-decoration: line-through;
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

.EmptyState {
  color: var(--base-50);
  font-style: italic;
}
</style>
