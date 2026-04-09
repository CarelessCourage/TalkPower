<script setup lang="ts">
import type { TranscriptSegment } from '~/types/meeting';

interface Props {
  segments: TranscriptSegment[];
  duration: number;
  currentTime: number;
}

const { segments, duration, currentTime = 0 } = defineProps<Props>();

const emit = defineEmits<{
  seek: [time: number];
}>();

/** Speaker color mapping */
const colorClasses = [
  'base-accent',
  'base-info',
  'base-warning',
  'base-success',
  'base-yellow'
];
const speakerColorMap: Record<string, string> = {};

const getSpeakerColor = (speaker: string): string => {
  if (!(speaker in speakerColorMap)) {
    const idx = Object.keys(speakerColorMap).length % colorClasses.length;
    speakerColorMap[speaker] = colorClasses[idx]!;
  }
  return speakerColorMap[speaker]!;
};

const getSegmentStyle = (segment: TranscriptSegment) => {
  if (duration <= 0) return { left: '0%', width: '0%' };
  const left = (segment.start / duration) * 100;
  const width = ((segment.end - segment.start) / duration) * 100;
  return {
    left: `${left}%`,
    width: `${Math.max(width, 0.3)}%`
  };
};

const playheadPosition = computed(() => {
  if (duration <= 0) return '0%';
  return `${(currentTime / duration) * 100}%`;
});

const onTrackClick = (event: MouseEvent) => {
  const track = event.currentTarget as HTMLElement;
  const rect = track.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  const time = Math.max(0, Math.min(ratio * duration, duration));
  emit('seek', time);
};
</script>

<template>
  <div class="ConversationTimeline" @click="onTrackClick">
    <div class="TimelineTrack">
      <div
        v-for="(segment, i) in segments"
        :key="i"
        class="TimelineSegment"
        :class="getSpeakerColor(segment.speaker)"
        :style="getSegmentStyle(segment)"
        :title="`${segment.speaker}: ${segment.text.slice(0, 60)}…`"
      />
      <div class="TimelinePlayhead" :style="{ left: playheadPosition }" />
    </div>
  </div>
</template>

<style scoped>
.ConversationTimeline {
  cursor: pointer;
  padding: var(--space-bit-2) 0;
}

.TimelineTrack {
  position: relative;
  height: var(--space-3);
  background: var(--base-20);
  border-radius: var(--radius-inner);
  overflow: hidden;
}

.TimelineSegment {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--base-60);
  border-radius: var(--radius-inner);
  transition: opacity var(--time-1) var(--timing);
}

.TimelineSegment:hover {
  opacity: 0.8;
}

.TimelinePlayhead {
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 2px;
  background: var(--base-text);
  border-radius: 1px;
  pointer-events: none;
  transition: left 0.1s linear;
  z-index: 1;
}
</style>
