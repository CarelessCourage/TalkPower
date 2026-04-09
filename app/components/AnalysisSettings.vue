<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  threshold: number;
  interruptionCount: number;
  hardCount: number;
  softCount: number;
}

const { threshold, interruptionCount, hardCount, softCount } =
  defineProps<Props>();

const emit = defineEmits<{
  'update:threshold': [value: number];
}>();

const displayValue = computed(() => {
  const ms = Math.round(threshold * 1000);
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
});

const onInput = (e: Event) => {
  const val = parseFloat((e.target as HTMLInputElement).value);
  emit('update:threshold', val);
};
</script>

<template>
  <div class="AnalysisSettings">
    <div class="SettingsRow">
      <div class="SettingsLabel">
        <span class="SettingsLabelText">Hard interruption threshold</span>
        <span class="SettingsValue mono">{{ displayValue }}</span>
      </div>
      <input
        type="range"
        class="SettingsSlider"
        :value="threshold"
        :min="0.1"
        :max="2.0"
        :step="0.05"
        @input="onInput"
      />
      <div class="SettingsHints">
        <span class="SettingsHint">0.1s</span>
        <span class="SettingsHint">2.0s</span>
      </div>
    </div>

    <div class="SettingsCounts">
      <span class="SettingsCount">
        <span class="CountDot countHard" />
        <span class="CountLabel">{{ hardCount }} hard</span>
      </span>
      <span class="SettingsCount">
        <span class="CountDot countSoft" />
        <span class="CountLabel">{{ softCount }} soft</span>
      </span>
      <span class="SettingsCount countTotal">
        {{ interruptionCount }} total overlaps
      </span>
    </div>
  </div>
</template>

<style scoped>
.AnalysisSettings {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-bit-3) var(--space-bit-4);
  background: var(--base-10);
  border-radius: var(--radius);
  border: 1px solid var(--base-20);
}

.SettingsRow {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
}

.SettingsLabel {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.SettingsLabelText {
  font-size: var(--caption-text-height);
  font-weight: 600;
  color: var(--base-90);
}

.SettingsValue {
  font-size: var(--caption-text-height);
  color: var(--accent-70);
  font-weight: 700;
}

.SettingsSlider {
  width: 100%;
  height: var(--space-bit-2);
  appearance: none;
  background: var(--base-30);
  border-radius: var(--radius-inner);
  outline: none;
  cursor: pointer;
}

.SettingsSlider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-70);
  border: 2px solid var(--base);
  cursor: grab;
  transition: transform var(--time-2) var(--timing);
}

.SettingsSlider::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.2);
}

.SettingsSlider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-70);
  border: 2px solid var(--base);
  cursor: grab;
}

.SettingsHints {
  display: flex;
  justify-content: space-between;
}

.SettingsHint {
  font-size: 0.65rem;
  color: var(--base-40);
}

.SettingsCounts {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.SettingsCount {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-0);
  font-size: var(--caption-text-height);
  color: var(--base-70);
}

.SettingsCount.countTotal {
  margin-left: auto;
  color: var(--base-50);
}

.CountDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.CountDot.countHard {
  background: var(--accent-70);
}

.CountDot.countSoft {
  background: var(--base-50);
}

.CountLabel {
  font-weight: 600;
}
</style>
