<script setup lang="ts">
interface Props {
  name: string;
  value?: string;
  colorClass?: string;
}

const { name, value, colorClass } = defineProps<Props>();
</script>

<template>
  <div class="SpeakerRow">
    <div class="SpeakerRowHeader">
      <span class="SpeakerRowName" :class="colorClass">{{ name }}</span>
      <span v-if="value" class="SpeakerRowValue mono">{{ value }}</span>
    </div>
    <slot />
    <div v-if="$slots.stats" class="SpeakerRowStats">
      <slot name="stats" />
    </div>
  </div>
</template>

<style scoped>
.SpeakerRow {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
  padding-bottom: var(--space-bit-3);
  border-bottom: var(--border);
}

.SpeakerRowHeader {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.SpeakerRowName {
  font-weight: 700;
  font-size: var(--caption-text-height);
}

.SpeakerRowValue {
  font-size: var(--caption-text-height);
  color: var(--base-60);
}

.SpeakerRowStats {
  display: flex;
  gap: var(--space-2);
}

.SpeakerRowStats :deep(span) {
  font-size: var(--caption-text-height);
  color: var(--base-50);
}
</style>
