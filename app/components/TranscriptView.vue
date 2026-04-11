<script setup lang="ts">
import { ref, computed } from 'vue';
import type {
  TranscriptSegment,
  Interruption,
  BehaviorLabel,
  EmotionLabel
} from '~/types/meeting';

interface Props {
  segments: TranscriptSegment[];
  activeIndex: number;
  interruptions?: Interruption[];
  labels?: BehaviorLabel[];
  emotions?: EmotionLabel[];
  displayName?: (raw: string) => string;
}

const {
  segments,
  activeIndex = -1,
  interruptions = [],
  labels = [],
  emotions = [],
  displayName = (raw: string) => raw
} = defineProps<Props>();

const emit = defineEmits<{
  seek: [time: number];
}>();

/** Look up if this segment is an interruption (it's the interrupter) */
const getInterruption = (index: number): Interruption | undefined => {
  const seg = segments[index];
  if (!seg) return undefined;
  return interruptions.find(
    (int) =>
      int.interrupter === seg.speaker && Math.abs(int.time - seg.start) < 0.01
  );
};

const getLabel = (index: number): BehaviorLabel | undefined =>
  labels.find((l) => l.segmentIndex === index);

const getEmotion = (index: number): EmotionLabel | undefined =>
  emotions.find((e) => e.segmentIndex === index);

const search = ref('');

const filteredSegments = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return segments.map((seg, i) => ({ seg, i }));
  return segments
    .map((seg, i) => ({ seg, i }))
    .filter(
      ({ seg }) =>
        seg.text.toLowerCase().includes(q) ||
        displayName(seg.speaker).toLowerCase().includes(q)
    );
});
</script>

<template>
  <div class="TranscriptView">
    <div class="TranscriptSearch">
      <Icon name="lucide:search" size="14" class="SearchIcon" />
      <input
        v-model="search"
        class="SearchInput"
        type="text"
        placeholder="Search transcript…"
      />
    </div>
    <div
      v-for="{ seg: segment, i } in filteredSegments"
      :key="i"
      class="TranscriptSegment"
      @click="emit('seek', segment.start)"
    >
      <TranscriptCard
        :segment="segment"
        :interruption="getInterruption(i)"
        :label="getLabel(i)"
        :emotion="getEmotion(i)"
        :active="i === activeIndex"
        :display-name="displayName"
      />
    </div>
  </div>
</template>

<style scoped>
.TranscriptView {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
  width: var(--panel-1);
}

.TranscriptSearch {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  padding: var(--space-bit-2) var(--space-bit-3);
  border-radius: var(--radius);
  border: var(--border);
  background: var(--base);
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: var(--space-2);
}

.SearchIcon {
  color: var(--base-40);
  flex-shrink: 0;
}

.SearchInput {
  width: 100%;
  border: none;
  background: none;
  font-size: 0.875rem;
  color: var(--base-text);
  outline: none;
}

.SearchInput::placeholder {
  color: var(--base-40);
}

.TranscriptSegment {
  border-radius: var(--radius);
  cursor: pointer;
  transition: background var(--time-2) var(--timing);
}

.TranscriptSegment:hover {
  background: var(--base-20);
}
</style>
