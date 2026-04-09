<script setup lang="ts">
import type { MeetingMetrics } from '~/types/meeting';
import { formatDuration, formatSeconds } from '~/utils/metrics';

interface Props {
  metrics: MeetingMetrics;
}

const { metrics } = defineProps<Props>();
</script>

<template>
  <div class="MeetingSummary">
    <div class="SummaryItem surface">
      <span class="label">Duration</span>
      <span class="SummaryValue mono">{{
        formatDuration(metrics.totalDuration)
      }}</span>
    </div>
    <div class="SummaryItem surface">
      <span class="label">Speaking time</span>
      <span class="SummaryValue mono">{{
        formatDuration(metrics.totalSpeakingTime)
      }}</span>
    </div>
    <div class="SummaryItem surface">
      <span class="label">Silence</span>
      <span class="SummaryValue mono">{{
        formatDuration(metrics.totalSilence)
      }}</span>
    </div>
    <div class="SummaryItem surface">
      <span class="label">Speaker changes</span>
      <span class="SummaryValue mono">{{ metrics.speakerChanges }}</span>
    </div>
    <div class="SummaryItem surface">
      <span class="label">Speakers</span>
      <span class="SummaryValue mono">{{ metrics.speakers.length }}</span>
    </div>
  </div>
</template>

<style scoped>
.MeetingSummary {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.SummaryItem {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-0);
  padding: var(--space-bit-2) var(--space-bit-3);
  min-width: 100px;
}

.SummaryValue {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--base-110);
}
</style>
