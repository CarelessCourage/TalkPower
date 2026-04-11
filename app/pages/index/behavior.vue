<script setup lang="ts">
import { useMeetingState } from '~/composables/useMeetingState';

const { behaviorContext, analyzingBehavior, behaviorLabels, analyzeBehavior } =
  useMeetingState();
</script>

<template>
  <div class="BehaviorPage">
    <BehaviorPrompt
      v-model="behaviorContext"
      :analyzing="analyzingBehavior"
      :has-labels="behaviorLabels.length > 0"
      @analyze="analyzeBehavior"
    />
  </div>
</template>

<style scoped>
.BehaviorPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  width: var(--panel-1);
}
</style>
