<script setup lang="ts">
import { computed } from 'vue';
import type { TherapistNote } from '~/types/meeting';

interface Props {
  notes: TherapistNote[];
  summary?: string;
  displayName?: (raw: string) => string;
}

const {
  notes,
  summary,
  displayName = (raw: string) => raw
} = defineProps<Props>();

const addresseeIcon = (to: string): string => {
  if (to === 'all') return 'lucide:users';
  if (to === 'facilitator') return 'lucide:shield';
  return 'lucide:user';
};

const addresseeLabel = (to: string): string => {
  if (to === 'all') return 'Everyone';
  if (to === 'facilitator') return 'Facilitator';
  return displayName(to);
};

/** Group notes: individual speakers first, then "all", then "facilitator" */
const grouped = computed(() => {
  const map = new Map<string, TherapistNote[]>();
  for (const note of notes) {
    const key = note.addressedTo;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(note);
  }
  const order = (key: string) => {
    if (key === 'facilitator') return 2;
    if (key === 'all') return 1;
    return 0;
  };
  return [...map.entries()].sort((a, b) => order(a[0]) - order(b[0]));
});
</script>

<template>
  <div class="TherapistNotes">
    <p v-if="summary" class="NotesSummary">{{ summary }}</p>

    <div class="NotesGroups">
      <div
        v-for="[addressee, groupNotes] in grouped"
        :key="addressee"
        class="NotesGroup"
      >
        <div class="GroupHeader">
          <Icon :name="addresseeIcon(addressee)" size="14" class="GroupIcon" />
          <span class="GroupLabel">{{ addresseeLabel(addressee) }}</span>
        </div>

        <div class="GroupCards">
          <details
            v-for="(note, i) in groupNotes"
            :key="i"
            class="NoteCard"
            open
          >
            <summary class="NoteHeading">{{ note.heading }}</summary>
            <p class="NoteBody">{{ note.body }}</p>
          </details>
        </div>
      </div>
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
  font-style: italic;
}

.NotesGroups {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.NotesGroup {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-3);
}

.GroupHeader {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  padding-bottom: var(--space-bit-1);
  border-bottom: 1px solid var(--base-20);
}

.GroupIcon {
  color: var(--base-50);
}

.GroupLabel {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--base-60);
}

.GroupCards {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-2);
}

.NoteCard {
  border-radius: var(--radius-inner);
  background: var(--base-10);
  overflow: hidden;
}

.NoteHeading {
  padding: var(--space-bit-2) var(--space-bit-3);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--base-text);
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
}

.NoteHeading::before {
  content: '▸';
  font-size: 0.625rem;
  color: var(--base-40);
  transition: transform var(--time-2) var(--timing);
}

.NoteCard[open] > .NoteHeading::before {
  transform: rotate(90deg);
}

.NoteHeading::-webkit-details-marker {
  display: none;
}

.NoteBody {
  padding: 0 var(--space-bit-3) var(--space-bit-3);
  font-size: 0.78125rem;
  line-height: 1.65;
  color: var(--base-70);
  margin: 0;
}
</style>
