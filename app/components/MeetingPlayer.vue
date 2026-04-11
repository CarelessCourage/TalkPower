<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMagicPlayer } from '@maas/vue-equipment/plugins/MagicPlayer';
import type {
  TranscriptSegment,
  Interruption,
  BehaviorLabel,
  EmotionLabel,
  CoachingCard
} from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';

interface Props {
  src: string;
  segments?: TranscriptSegment[];
  duration?: number;
  interruptions?: Interruption[];
  labels?: BehaviorLabel[];
  emotions?: EmotionLabel[];
  coaching?: CoachingCard[];
  displayName?: (raw: string) => string;
}

const {
  src,
  segments = [],
  duration = 0,
  interruptions = [],
  labels = [],
  emotions = [],
  coaching = [],
  displayName = (raw: string) => raw
} = defineProps<Props>();

const emit = defineEmits<{
  seek: [time: number];
}>();

const playerId = ref('meeting-player');

const playerOptions = computed(() => ({
  src,
  mode: 'video' as const,
  srcType: 'native' as const,
  preload: 'metadata' as const,
  autoplay: false
}));

const {
  currentTime,
  duration: playerDuration,
  playing,
  audioApi
} = useMagicPlayer(playerId);

const effectiveDuration = computed(() => duration || playerDuration.value || 0);

const progress = computed(() => {
  if (!effectiveDuration.value || effectiveDuration.value === 0) return '0%';
  return `${((currentTime.value ?? 0) / effectiveDuration.value) * 100}%`;
});

const seek = (time: number) => {
  audioApi.seek(time);
  emit('seek', time);
};

/* ── Scrub track ── */
const trackEl = ref<HTMLElement | null>(null);
const isDragging = ref(false);

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
  const d = effectiveDuration.value;
  if (d <= 0) return { left: '0%', width: '0%' };
  const left = (segment.start / d) * 100;
  const width = ((segment.end - segment.start) / d) * 100;
  return {
    left: `${left}%`,
    width: `${Math.max(width, 0.3)}%`
  };
};

const getTimeFromEvent = (e: MouseEvent | PointerEvent): number => {
  if (!trackEl.value) return 0;
  const rect = trackEl.value.getBoundingClientRect();
  const ratio = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
  return ratio * effectiveDuration.value;
};

const onPointerDown = (e: PointerEvent) => {
  isDragging.value = true;
  seek(getTimeFromEvent(e));
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return;
  seek(getTimeFromEvent(e));
};

const onPointerUp = () => {
  isDragging.value = false;
};

const togglePlay = () => audioApi.togglePlay();

const onKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Space' && !isInputFocused()) {
    e.preventDefault();
    togglePlay();
  }
};

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));

defineExpose({ currentTime, duration: playerDuration, seek });
</script>

<template>
  <div class="MeetingPlayer surface">
    <!-- Video + subtitle overlay -->
    <div class="PlayerViewport" @click="togglePlay">
      <MagicPlayerProvider :key="src" :id="playerId" :options="playerOptions">
        <MagicPlayerVideo />
      </MagicPlayerProvider>

      <div class="PlayerSubtitles">
        <TranscriptCards
          :segments="segments"
          :current-time="currentTime ?? 0"
          :interruptions="interruptions"
          :labels="labels"
          :emotions="emotions"
          :display-name="displayName"
        />
      </div>

      <div class="PlayerCoaching">
        <CoachingCards
          :cards="coaching"
          :current-time="currentTime ?? 0"
          :display-name="displayName"
        />
      </div>
    </div>

    <!-- Controls + scrubber -->
    <div class="PlayerControls">
      <button class="PlayerPlayBtn" @click="audioApi.togglePlay()">
        <Icon v-if="playing" name="lucide:pause" size="18" />
        <Icon v-else name="lucide:play" size="18" />
      </button>

      <span class="PlayerTimestamp mono">
        {{ formatSeconds(currentTime ?? 0) }}
      </span>

      <div
        ref="trackEl"
        class="PlayerTrack"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      >
        <div
          v-for="(segment, i) in segments"
          :key="i"
          class="TrackSegment"
          :class="getSpeakerColor(segment.speaker)"
          :style="getSegmentStyle(segment)"
        />
        <div class="TrackProgress" :style="{ width: progress }" />
        <div class="TrackPlayhead" :style="{ left: progress }" />
      </div>

      <span class="PlayerTimestamp mono">
        {{ formatSeconds(effectiveDuration) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.MeetingPlayer {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-2);
  border-radius: 0px;
  overflow: hidden;
}

/* ── Viewport: video + subtitle overlay ── */
.PlayerViewport {
  position: relative;
  cursor: pointer;
}

.MeetingPlayer :deep(video) {
  width: 100%;
  display: block;
  object-fit: contain;
  background: var(--base);
}

.PlayerSubtitles {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-1);
  max-height: 50%;
  overflow-y: auto;
  scrollbar-width: none;
}

.PlayerSubtitles::-webkit-scrollbar {
  display: none;
}

.PlayerCoaching {
  position: absolute;
  top: 0;
  right: 0;
  padding: var(--space-1);
  max-height: 60%;
  overflow-y: auto;
  scrollbar-width: none;
}

.PlayerCoaching::-webkit-scrollbar {
  display: none;
}

/* ── Controls row ── */
.PlayerControls {
  display: flex;
  align-items: center;
  gap: var(--space-bit-3);
  padding: var(--space-bit-2) var(--space-bit-3);
}

.PlayerPlayBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--block-1);
  height: var(--block-1);
  border-radius: 50%;
  background: var(--base-20);
  color: var(--base-100);
  flex-shrink: 0;
  transition:
    background var(--time-2) var(--timing),
    color var(--time-2) var(--timing);
}

.PlayerPlayBtn:hover {
  background: var(--base-30);
  color: var(--base-120);
}

.PlayerTimestamp {
  font-size: var(--caption-text-height);
  color: var(--base-50);
  flex-shrink: 0;
  min-width: 3ch;
  text-align: center;
}

/* ── Combined scrubber track ── */
.PlayerTrack {
  position: relative;
  flex: 1;
  height: var(--space-3);
  background: var(--base-20);
  cursor: pointer;
  touch-action: none;
  overflow: hidden;
}

.TrackSegment {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--base-60);
  /* opacity: 0.5; */
  pointer-events: none;
}

.TrackProgress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--base-40);
  opacity: 0.25;
  pointer-events: none;
}

.TrackPlayhead {
  position: absolute;
  top: -3px;
  bottom: -3px;
  width: 3px;
  background: var(--base-text);
  border-radius: 2px;
  pointer-events: none;
  z-index: 1;
}
</style>
