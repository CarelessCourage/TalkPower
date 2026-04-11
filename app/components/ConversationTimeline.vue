<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import type { TranscriptSegment, Interruption } from '~/types/meeting';
import { formatSeconds } from '~/utils/metrics';

interface Props {
  segments: TranscriptSegment[];
  duration: number;
  currentTime: number;
  interruptions?: Interruption[];
  displayName?: (raw: string) => string;
}

const {
  segments,
  duration,
  currentTime = 0,
  interruptions = [],
  displayName = (raw: string) => raw
} = defineProps<Props>();

const emit = defineEmits<{
  seek: [time: number];
}>();

/* ── State ── */
const scrubTime = ref(0);
const isPlaying = ref(false);
const isDragging = ref(false);
const trackEl = ref<HTMLElement | null>(null);

/** While scrubbing locally we use scrubTime, otherwise follow external currentTime */
const displayTime = computed(() =>
  isDragging.value
    ? scrubTime.value
    : isPlaying.value
      ? scrubTime.value
      : currentTime
);

/* ── Speaker colors ── */
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

/* ── Active segments at current scrub position ── */
const activeSegments = computed(() => {
  const t = displayTime.value;
  return segments
    .map((seg, i) => ({ seg, index: i }))
    .filter(({ seg }) => t >= seg.start && t < seg.end);
});

/** Look up if a segment index is an interruption */
const getInterruption = (index: number): Interruption | undefined => {
  const seg = segments[index];
  if (!seg) return undefined;
  return interruptions.find(
    (int) =>
      int.interrupter === seg.speaker && Math.abs(int.time - seg.start) < 0.01
  );
};

/* ── Track segment rendering ── */
const getSegmentStyle = (segment: TranscriptSegment) => {
  if (duration <= 0) return { left: '0%', width: '0%' };
  const left = (segment.start / duration) * 100;
  const width = ((segment.end - segment.start) / duration) * 100;
  return {
    left: `${left}%`,
    width: `${Math.max(width, 0.3)}%`
  };
};

const playheadPercent = computed(() => {
  if (duration <= 0) return '0%';
  return `${(displayTime.value / duration) * 100}%`;
});

/* ── Scrub / drag ── */
const getTimeFromEvent = (e: MouseEvent | PointerEvent): number => {
  if (!trackEl.value) return 0;
  const rect = trackEl.value.getBoundingClientRect();
  const ratio = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
  return ratio * duration;
};

const onPointerDown = (e: PointerEvent) => {
  isDragging.value = true;
  pausePlayback();
  scrubTime.value = getTimeFromEvent(e);
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return;
  scrubTime.value = getTimeFromEvent(e);
};

const onPointerUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  emit('seek', scrubTime.value);
};

/* ── GSAP playback ── */
const tweenObj = { time: 0 };
let playTween: gsap.core.Tween | null = null;

const startPlayback = () => {
  const startFrom = scrubTime.value || currentTime || 0;
  tweenObj.time = startFrom;
  scrubTime.value = startFrom;
  isPlaying.value = true;

  playTween = gsap.to(tweenObj, {
    time: duration,
    duration: duration - startFrom,
    ease: 'none',
    onUpdate: () => {
      scrubTime.value = tweenObj.time;
    },
    onComplete: () => {
      isPlaying.value = false;
    }
  });
};

const pausePlayback = () => {
  if (playTween) {
    playTween.kill();
    playTween = null;
  }
  isPlaying.value = false;
};

const togglePlayback = () => {
  if (isPlaying.value) {
    pausePlayback();
  } else {
    startPlayback();
  }
};

onBeforeUnmount(() => {
  pausePlayback();
});

/* Sync scrubTime when external currentTime changes (e.g. real audio playing) */
watch(
  () => currentTime,
  (t) => {
    if (!isDragging.value && !isPlaying.value) {
      scrubTime.value = t;
    }
  }
);
</script>

<template>
  <div class="TimelinePlayer">
    <!-- Active transcript cards -->
    <div class="TimelineCards">
      <div class="TimelineCardsInner">
        <TransitionGroup name="card">
          <div
            v-for="{ seg, index } in activeSegments"
            :key="index"
            class="TimelineCard"
            :class="{
              cardHardInterruption: getInterruption(index)?.severity === 'hard',
              cardSoftInterruption: getInterruption(index)?.severity === 'soft'
            }"
          >
            <div v-if="getInterruption(index)" class="CardInterruptionBanner">
              <span class="CardInterruptionLabel">
                <span
                  :class="getSpeakerColor(getInterruption(index)!.interrupter)"
                >
                  {{ displayName(getInterruption(index)!.interrupter) }}
                </span>
                <span class="CardCutOff">
                  {{
                    getInterruption(index)!.severity === 'hard'
                      ? 'cut off'
                      : 'soft'
                  }}
                </span>
                <span
                  :class="getSpeakerColor(getInterruption(index)!.interrupted)"
                >
                  {{ displayName(getInterruption(index)!.interrupted) }}
                </span>
              </span>
            </div>
            <div class="CardMeta">
              <span class="CardSpeaker" :class="getSpeakerColor(seg.speaker)">
                {{ displayName(seg.speaker) }}
              </span>
              <span class="CardTime mono">{{ formatSeconds(seg.start) }}</span>
            </div>
            <p class="CardText">{{ seg.text }}</p>
          </div>
        </TransitionGroup>
      </div>
      <div v-if="activeSegments.length === 0" class="TimelineEmpty">
        <span class="TimelineEmptyHint">Scrub the timeline to explore</span>
      </div>
    </div>

    <!-- Controls + scrubber -->
    <div class="TimelineControls">
      <button class="TimelinePlayBtn" @click="togglePlayback">
        <Icon v-if="isPlaying" name="lucide:pause" size="18" />
        <Icon v-else name="lucide:play" size="18" />
      </button>
      <span class="TimelineTimestamp mono">{{
        formatSeconds(displayTime)
      }}</span>
      <div
        ref="trackEl"
        class="TimelineTrack"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      >
        <div
          v-for="(segment, i) in segments"
          :key="i"
          class="TimelineSegment"
          :class="getSpeakerColor(segment.speaker)"
          :style="getSegmentStyle(segment)"
        />
        <div class="TimelinePlayhead" :style="{ left: playheadPercent }" />
        <div class="TimelineProgress" :style="{ width: playheadPercent }" />
      </div>
      <span class="TimelineTimestamp mono">{{ formatSeconds(duration) }}</span>
    </div>
  </div>
</template>

<style scoped>
.TimelinePlayer {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* ── Cards area ── */
.TimelineCards {
  height: 14rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--base-30) transparent;
}

.TimelineCardsInner {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
  min-height: 100%;
  justify-content: center;
}

.TimelineCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-0);
  padding: var(--space-bit-2) var(--space-bit-3);
  border-radius: var(--radius);
  background: var(--base-20);
}

.TimelineCard.cardHardInterruption {
  border-left: 3px solid var(--accent-30);
  padding-left: calc(var(--space-bit-3) - 3px);
  background: var(--base);
}

.TimelineCard.cardSoftInterruption {
  border-left: 3px solid var(--base-50);
  padding-left: calc(var(--space-bit-3) - 3px);
}

.CardInterruptionBanner {
  padding-bottom: var(--space-bit-0);
}

.CardInterruptionLabel {
  display: flex;
  align-items: center;
  gap: var(--space-bit-2);
  font-size: var(--caption-text-height);
  font-weight: 700;
}

.CardCutOff {
  color: var(--accent-70);
  font-style: italic;
  font-weight: 400;
}

.CardMeta {
  display: flex;
  align-items: center;
  gap: var(--space-bit-3);
}

.CardSpeaker {
  font-size: var(--caption-text-height);
  font-weight: 700;
  color: var(--base-80);
}

.CardTime {
  font-size: var(--caption-text-height);
  color: var(--base-50);
}

.CardText {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--base-100);
}

.TimelineEmpty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 14rem;
}

.TimelineEmptyHint {
  font-size: var(--caption-text-height);
  color: var(--base-40);
  font-style: italic;
}

/* ── Transition (opacity only — no layout shift) ── */
.card-enter-active,
.card-leave-active {
  transition: opacity 0.12s var(--timing);
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
}

/* ── Controls row ── */
.TimelineControls {
  display: flex;
  align-items: center;
  gap: var(--space-bit-3);
}

.TimelinePlayBtn {
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

.TimelinePlayBtn:hover {
  background: var(--base-30);
  color: var(--base-120);
}

.TimelineTimestamp {
  font-size: var(--caption-text-height);
  color: var(--base-50);
  flex-shrink: 0;
  min-width: 3ch;
  text-align: center;
}

/* ── Track / scrubber ── */
.TimelineTrack {
  position: relative;
  flex: 1;
  height: var(--space-3);
  background: var(--base-20);
  border-radius: var(--radius-inner);
  cursor: pointer;
  touch-action: none;
  overflow: hidden;
}

.TimelineSegment {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--base-60);
  border-radius: var(--radius-inner);
  opacity: 0.5;
  pointer-events: none;
}

.TimelineProgress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--base-40);
  opacity: 0.25;
  pointer-events: none;
}

.TimelinePlayhead {
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
