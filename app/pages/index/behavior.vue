<script setup lang="ts">
import { useMeetingState } from '~/composables/useMeetingState';

const {
  behaviorAnalysis,
  behaviorContext,
  analyzingBehavior,
  behaviorLabels,
  analyzeBehavior,
  displayName
} = useMeetingState();
</script>

<template>
  <div class="BehaviorPage">
    <BehaviorPrompt
      v-model="behaviorContext"
      :analyzing="analyzingBehavior"
      :has-labels="behaviorLabels.length > 0"
      @analyze="analyzeBehavior"
    />
    <TherapistNotes
      v-if="behaviorAnalysis?.notes?.length || behaviorAnalysis?.summary"
      :notes="behaviorAnalysis?.notes ?? []"
      :summary="behaviorAnalysis?.summary"
      :display-name="displayName"
    />
  </div>
</template>

<style scoped>
.BehaviorPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
