<script setup lang="ts">
import type { CoachingCard } from '~/types/meeting';

interface Props {
  cards: CoachingCard[];
  currentTime: number;
  displayName?: (raw: string) => string;
}

const {
  cards,
  currentTime = 0,
  displayName = (raw: string) => raw
} = defineProps<Props>();

/** Sort cards by start time so we can extend each card until the next one begins */
const sorted = computed(() => [...cards].sort((a, b) => a.start - b.start));

const activeCards = computed(() =>
  sorted.value.filter((card, i) => {
    if (currentTime < card.start) return false;
    // Card stays visible until the next card starts (or its own end if it's the last)
    const next = sorted.value[i + 1];
    const hideAt = next ? next.start : card.end;
    return currentTime < hideAt;
  })
);

const toneIcon = (tone: CoachingCard['tone']): string => {
  switch (tone) {
    case 'praise':
      return 'lucide:thumbs-up';
    case 'warning':
      return 'lucide:alert-triangle';
    case 'tip':
      return 'lucide:lightbulb';
    case 'insight':
      return 'lucide:eye';
  }
};
</script>

<template>
  <TransitionGroup name="coach" tag="div" class="CoachingCards">
    <div
      v-for="(card, i) in activeCards"
      :key="card.start"
      class="CoachCard"
      :class="`coachTone-${card.tone}`"
    >
      <div class="CoachHeader">
        <Icon :name="toneIcon(card.tone)" size="14" />
        <span v-if="card.speaker" class="CoachSpeaker">
          {{ displayName(card.speaker) }}
        </span>
        <!-- <span class="CoachToneLabel">{{ card.tone }}</span> -->
      </div>
      <p class="CoachText">{{ card.text }}</p>
    </div>
  </TransitionGroup>
</template>

<style scoped>
.CoachingCards {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: var(--space-bit-2);
  pointer-events: none;
}

.CoachCard {
  background: var(--base-20);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: var(--space-bit-2) var(--space-bit-3);
  max-width: 350px;
  border-left: 3px solid var(--accent);
  pointer-events: auto;
}

.CoachHeader {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: var(--space-bit-0);
  padding-bottom: var(--space-bit-2);
  border-bottom: 1px solid var(--base-80);
}

.CoachSpeaker {
  color: var(--accent-text, var(--accent));
}

.CoachToneLabel {
  font-size: 1.2rem;
  margin-left: auto;
  opacity: 0.6;
}

.CoachText {
  font-size: 1.2rem;
  line-height: 1.4;
  margin: 0;
  color: var(--base-text);
}

/* ── Tone variations ── */
.coachTone-praise {
  border-left-color: var(--success, #4ade80);
}
.coachTone-praise .CoachHeader {
  color: var(--success, #4ade80);
}

.coachTone-warning {
  border-left-color: var(--warning, #f97316);
}
.coachTone-warning .CoachHeader {
  color: var(--warning, #f97316);
}

.coachTone-tip {
  border-left-color: var(--info, #60a5fa);
}
.coachTone-tip .CoachHeader {
  color: var(--info, #60a5fa);
}

.coachTone-insight {
  border-left-color: var(--accent);
}
.coachTone-insight .CoachHeader {
  color: var(--accent);
}

/* ── Transitions ── */
.coach-enter-active,
.coach-leave-active {
  transition:
    opacity var(--time-3, 0.25s) var(--timing, ease-in-out),
    transform var(--time-3, 0.25s) var(--timing, ease-in-out);
}

.coach-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.coach-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.coach-move {
  transition: transform var(--time-3, 0.25s) var(--timing, ease-in-out);
}
</style>
