<script setup lang="ts">
import { ref } from 'vue';
import type { DominanceInsight } from '~/types/meeting';
import { useGsapReveal } from '~/composables/useGsapReveal';

interface Props {
  insights: DominanceInsight[];
  displayName?: (raw: string) => string;
}

const { insights, displayName = (raw: string) => raw } = defineProps<Props>();

const cardsRef = ref<HTMLElement | null>(null);
useGsapReveal(cardsRef, { stagger: 0.12, duration: 0.5 });

const toneClass = (tone: DominanceInsight['tone']) => {
  const map: Record<string, string> = {
    warning: 'base-warning',
    accent: 'base-accent',
    neutral: ''
  };
  return map[tone] ?? '';
};
</script>

<template>
  <div class="InsightCards" ref="cardsRef">
    <div
      v-for="(insight, i) in insights"
      :key="i"
      class="InsightCard surface"
      :class="toneClass(insight.tone)"
    >
      <span class="InsightLabel label">{{ insight.label }}</span>
      <span class="InsightValue">{{ displayName(insight.value) }}</span>
      <span class="InsightDetail">{{ insight.detail }}</span>
    </div>
  </div>
</template>

<style scoped>
.InsightCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-2);
}

.InsightCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
  padding: var(--space-bit-3) var(--space-bit-4);
}

.InsightLabel {
  font-size: 0.6875rem;
}

.InsightValue {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--base-110);
}

.InsightDetail {
  font-size: var(--caption-text-height);
  color: var(--base-70);
  line-height: 1.4;
}
</style>
