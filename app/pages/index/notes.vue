<script setup lang="ts">
import { useMeetingState } from '~/composables/useMeetingState';

const { behaviorAnalysis, displayName } = useMeetingState();
</script>

<template>
  <div class="NotesPage">
    <TherapistNotes
      v-if="behaviorAnalysis?.notes?.length || behaviorAnalysis?.summary"
      :notes="behaviorAnalysis?.notes ?? []"
      :summary="behaviorAnalysis?.summary"
      :display-name="displayName"
    />
    <p v-else class="NotesEmpty">No notes yet — run an analysis first.</p>
  </div>
</template>

<style scoped>
.NotesPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: var(--panel-1);
}

.NotesEmpty {
  font-size: var(--caption-text-height);
  color: var(--base-50);
  font-style: italic;
}
</style>
