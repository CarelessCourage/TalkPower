<script setup lang="ts">
interface Props {
  analyzing?: boolean;
  hasLabels?: boolean;
  modelValue?: string;
}

const {
  analyzing = false,
  hasLabels = false,
  modelValue = ''
} = defineProps<Props>();

const emit = defineEmits<{
  analyze: [context: string];
  'update:modelValue': [value: string];
}>();

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
};
</script>

<template>
  <div class="BehaviorPrompt">
    <div class="PromptHeaderWrapper">
      <div class="PromptHeader">
        <h3 class="PromptTitle">AI Behavior Analysis</h3>
        <span v-if="hasLabels" class="PromptBadge">Labels active</span>
      </div>
      <p class="PromptDesc">
        Optionally describe the meeting's purpose or your concerns — the AI will
        tailor behavioral labels to what matters to you.
      </p>
    </div>
    <textarea
      :value="modelValue"
      class="PromptTextarea"
      placeholder="e.g. &quot;This is a budget review. I'm concerned about one team lead dismissing others' proposals without real consideration.&quot;"
      @input="onInput"
    />
    <button
      class="PromptBtn"
      :disabled="analyzing"
      @click="emit('analyze', modelValue)"
    >
      <Icon
        v-if="analyzing"
        name="lucide:loader-2"
        size="16"
        class="PromptSpinner"
      />
      <Icon v-else name="lucide:sparkles" size="16" />
      {{
        analyzing ? 'Analyzing…' : hasLabels ? 'Re-analyze' : 'Analyze behavior'
      }}
    </button>
  </div>
</template>

<style scoped>
.PromptHeaderWrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-2);
}

.BehaviorPrompt {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-3);
  padding: var(--space-bit-3);
  border-radius: var(--radius);
  background: var(--base-10);
}

.PromptHeader {
  display: flex;
  align-items: center;
  gap: var(--space-bit-3);
}

.PromptTitle {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--base-text);
  margin: 0;
}

.PromptBadge {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 1px var(--space-bit-2);
  border-radius: var(--radius-inner);
  background: color-mix(in srgb, var(--success) 25%, transparent);
  color: var(--success-80);
}

.PromptDesc {
  font-size: var(--caption-text-height);
  color: var(--base-60);
  line-height: 1.5;
  margin: 0;
  max-width: 480px;
}

.PromptTextarea {
  field-sizing: content;
  min-height: calc(1.5em * 3 + var(--space-bit-2) * 2);
  width: 100%;
  padding: var(--space-bit-3);
  border-radius: var(--radius-inner);
  border: var(--border);
  background: var(--base);
  color: var(--base-text);
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
}

.PromptTextarea::placeholder {
  color: var(--base-40);
}

.PromptTextarea:focus {
  outline: none;
  border-color: var(--accent-60);
}

.PromptBtn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-2);
  padding: var(--space-bit-1) var(--space-bit-4);
  height: var(--block-1);
  border-radius: var(--radius-inner);
  border: none;
  background: var(--accent);
  color: var(--accent-text);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity var(--time-2) var(--timing);
}

.PromptBtn:hover:not(:disabled) {
  opacity: 0.85;
}

.PromptBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.PromptSpinner {
  animation: spin 1s linear infinite;
}
</style>
