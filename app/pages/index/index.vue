<script setup lang="ts">
import { useMeetingState } from '~/composables/useMeetingState';

const { metrics, insights, displayName } = useMeetingState();
</script>

<template>
  <div class="OverviewPage">
    <MeetingSummary v-if="metrics" :metrics="metrics" />

    <section class="OverviewSection">
      <h2 class="OverviewSectionTitle">Power dynamics</h2>
      <InsightCards :insights="insights" :display-name="displayName" />
    </section>
  </div>
</template>

<style scoped>
.OverviewPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.OverviewSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.OverviewSectionTitle {
  font-size: 1rem;
  font-weight: 700;
  color: var(--base-90);
  letter-spacing: -0.01em;
}
</style>
