<script setup lang="ts">
import { ref } from 'vue';
import { useMeetingState } from '~/composables/useMeetingState';

const {
  metrics,
  volumeAnalysis,
  interruptions,
  interruptionThreshold,
  hardInterruptions,
  softInterruptions
} = useMeetingState();

const speakerTab = ref<'airtime' | 'volume'>('airtime');
</script>

<template>
  <div class="SpeakersPage">
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
    </div>

    <SpeakingTimeBars
      v-if="speakerTab === 'airtime' && metrics"
      :speakers="metrics.speakers"
    />
    <VolumeProfile
      v-if="speakerTab === 'volume' && volumeAnalysis"
      :speakers="volumeAnalysis.speakers"
    />

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
.SpeakersPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
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
