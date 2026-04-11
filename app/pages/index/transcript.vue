<script setup lang="ts">
import { useMeetingState } from '~/composables/useMeetingState';

const {
  segments,
  activeIndex,
  interruptions,
  onSeek,
  displayName,
  behaviorLabels,
  emotionLabels
} = useMeetingState();
</script>

<template>
  <div class="TranscriptPage">
    <TranscriptView
      :segments="segments"
      :active-index="activeIndex"
      :interruptions="interruptions"
      :labels="behaviorLabels"
      :emotions="emotionLabels"
      :display-name="displayName"
      @seek="onSeek"
    />
  </div>
</template>

<style scoped>
.TranscriptPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
