<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMeetingState } from '~/composables/useMeetingState';

const {
  metrics,
  volumeAnalysis,
  interruptions,
  interruptionThreshold,
  hardInterruptions,
  softInterruptions,
  segments,
  behaviorLabels,
  emotionLabels,
  speakerNames,
  displayName
} = useMeetingState();

const speakerTab = ref<'airtime' | 'volume' | 'labels'>('airtime');

/** Unique raw speaker labels from transcript */
const rawSpeakers = computed(() => {
  const seen = new Set<string>();
  for (const seg of segments.value) {
    seen.add(seg.speaker);
  }
  return [...seen];
});

const updateName = (raw: string, name: string) => {
  const trimmed = name.trim();
  if (trimmed && trimmed !== raw) {
    speakerNames.value = { ...speakerNames.value, [raw]: trimmed };
  } else {
    const { [raw]: _, ...rest } = speakerNames.value;
    speakerNames.value = rest;
  }
};
</script>

<template>
  <div class="SpeakersPage">
    <div class="SpeakerViews">
      <div class="SpeakersTabs">
        <button
          class="SpeakersTab"
          :class="{ tabActive: speakerTab === 'airtime' }"
          @click="speakerTab = 'airtime'"
        >
          Airtime breakdown
        </button>
        <button
          v-if="volumeAnalysis"
          class="SpeakersTab"
          :class="{ tabActive: speakerTab === 'volume' }"
          @click="speakerTab = 'volume'"
        >
          Volume profile
        </button>
        <button
          v-if="behaviorLabels.length || emotionLabels.length"
          class="SpeakersTab"
          :class="{ tabActive: speakerTab === 'labels' }"
          @click="speakerTab = 'labels'"
        >
          Label breakdown
        </button>
      </div>

      <div class="SpeakerView">
        <SpeakingTimeBars
          v-if="speakerTab === 'airtime' && metrics"
          :speakers="metrics.speakers"
          :display-name="displayName"
        />
        <VolumeProfile
          v-if="speakerTab === 'volume' && volumeAnalysis"
          :speakers="volumeAnalysis.speakers"
          :display-name="displayName"
        />
        <SpeakerBreakdown
          v-if="speakerTab === 'labels'"
          :segments="segments"
          :labels="behaviorLabels"
          :emotions="emotionLabels"
          :display-name="displayName"
        />
      </div>
    </div>

    <!-- Editable speaker names -->
    <div class="SpeakerNames">
      <div v-for="raw in rawSpeakers" :key="raw" class="SpeakerNameRow">
        <span class="SpeakerRawLabel mono">{{ raw }}</span>
        <input
          class="SpeakerNameInput"
          type="text"
          :value="speakerNames[raw] ?? ''"
          :placeholder="raw"
          @change="updateName(raw, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <AnalysisSettings
      :threshold="interruptionThreshold"
      :interruption-count="interruptions.length"
      :hard-count="hardInterruptions"
      :soft-count="softInterruptions"
      @update:threshold="interruptionThreshold = $event"
    />
  </div>
</template>

<style scoped>
.SpeakerView {
  background-color: var(--base-20);
  padding: var(--space-1);
  border-radius: var(--radius);
}

.SpeakersPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: var(--panel-1);
}

.SpeakerNames {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-bit-3);
}

.SpeakerNameRow {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
}

.SpeakerRawLabel {
  font-size: 0.6875rem;
  color: var(--base-40);
  min-width: 5.5em;
}

.SpeakerNameInput {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--base-text);
  background: var(--base-10);
  border: 1px solid var(--base-20);
  border-radius: var(--radius-inner);
  padding: var(--space-bit-0) var(--space-bit-2);
  width: 10em;
  transition:
    border-color var(--time-2) var(--timing),
    background var(--time-2) var(--timing);
}

.SpeakerNameInput:focus {
  outline: none;
  border-color: var(--accent);
  background: var(--base-20);
}

.SpeakerNameInput::placeholder {
  color: var(--base-30);
  font-weight: 400;
}

.SpeakersTabs {
  display: flex;
  gap: var(--space-bit-1);
}

.SpeakersTab {
  font-size: var(--caption-text-height);
  font-weight: 600;
  color: var(--base-50);
  padding: var(--space-bit-1) var(--space-bit-3);
  border-radius: var(--radius) var(--radius) 0 0;
  transition:
    color var(--time-2) var(--timing),
    background var(--time-2) var(--timing);
}

.SpeakersTab:hover {
  color: var(--base-80);
}

.SpeakersTab.tabActive {
  color: var(--base-110);
  background: var(--base-20);
}
</style>
