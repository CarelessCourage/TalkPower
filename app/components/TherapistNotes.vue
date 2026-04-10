<script setup lang="ts">
import type { TherapistNote } from '~/types/meeting';

interface Props {
  notes: TherapistNote[];
  summary?: string;
}

const { notes, summary } = defineProps<Props>();

const addresseeIcon = (to: string): string => {
  if (to === 'all') return 'lucide:users';
  if (to === 'facilitator') return 'lucide:shield';
  return 'lucide:user';
};
</script>

<template>
  <div class="TherapistNotes">
    <p v-if="summary" class="NotesSummary">{{ summary }}</p>

    <div class="NotesList">
      <article v-for="(note, i) in notes" :key="i" class="NoteCard surface">
        <div class="NoteHeader">
          <h4 class="NoteHeading">{{ note.heading }}</h4>
          <span class="NoteAddressee">
            <Icon :name="addresseeIcon(note.addressedTo)" size="13" />
            {{ note.addressedTo }}
          </span>
        </div>
        <p class="NoteBody">{{ note.body }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.TherapistNotes {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.NotesSummary {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--base-80);
}

.NotesList {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.NoteCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius);
  background: var(--base-10);
  border-left: 3px solid var(--base-30);
}

.NoteHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.NoteHeading {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--base-text);
  margin: 0;
}

.NoteAddressee {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-1);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--base-50);
  white-space: nowrap;
}

.NoteBody {
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--base-80);
  margin: 0;
}
</style>
