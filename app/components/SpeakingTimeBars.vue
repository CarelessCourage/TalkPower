<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import type { SpeakerMetrics } from '~/types/meeting';
import { formatDuration } from '~/utils/metrics';

interface Props {
  speakers: SpeakerMetrics[];
  displayName?: (raw: string) => string;
}

const { speakers, displayName = (raw: string) => raw } = defineProps<Props>();

const barsRef = ref<HTMLElement | null>(null);

/** Speaker color mapping */
const colorClasses = [
  'base-accent',
  'base-info',
  'base-warning',
  'base-success',
  'base-yellow'
];
const getSpeakerColor = (index: number): string =>
  colorClasses[index % colorClasses.length]!;

onMounted(() => {
  if (!barsRef.value) return;
  const bars = barsRef.value.querySelectorAll('.SpeakingTimeBar');
  gsap.fromTo(
    bars,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      transformOrigin: 'left center'
    }
  );
});
</script>

<template>
  <div class="SpeakingTimeBars" ref="barsRef">
    <div
      v-for="(speaker, i) in speakers"
      :key="speaker.speaker"
      class="SpeakingTimeRow"
    >
      <div class="SpeakingTimeLabel">
        <span class="SpeakingTimeName" :class="getSpeakerColor(i)">
          {{ displayName(speaker.speaker) }}
        </span>
        <span class="SpeakingTimeValue mono">
          {{ speaker.percentage.toFixed(0) }}% ·
          {{ formatDuration(speaker.totalTime) }}
        </span>
      </div>
      <div class="SpeakingTimeTrack">
        <div
          class="SpeakingTimeBar"
          :class="getSpeakerColor(i)"
          :style="{ width: speaker.percentage + '%' }"
        />
      </div>
      <div class="SpeakingTimeStats">
        <span class="SpeakingTimeStat">{{ speaker.turns }} turns</span>
        <span class="SpeakingTimeStat"
          >{{ formatDuration(speaker.averageTurnDuration) }} avg</span
        >
        <span
          v-if="speaker.interruptions > 0"
          class="SpeakingTimeStat statInterrupt"
        >
          {{ speaker.interruptions }} interruption{{
            speaker.interruptions === 1 ? '' : 's'
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.SpeakingTimeBars {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.SpeakingTimeRow {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-1);
}

.SpeakingTimeLabel {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.SpeakingTimeName {
  font-weight: 700;
  font-size: var(--caption-text-height);
  color: var(--base-80);
}

.SpeakingTimeValue {
  font-size: var(--caption-text-height);
  color: var(--base-60);
}

.SpeakingTimeTrack {
  height: var(--space-bit-3);
  background: var(--base-20);
  border-radius: var(--radius-inner);
  overflow: hidden;
}

.SpeakingTimeBar {
  height: 100%;
  background: var(--base-70);
  border-radius: var(--radius-inner);
  min-width: 2px;
}

.SpeakingTimeStats {
  display: flex;
  gap: var(--space-2);
}

.SpeakingTimeStat {
  font-size: var(--caption-text-height);
  color: var(--base-50);
}

.SpeakingTimeStat.statInterrupt {
  color: var(--accent-70);
}
</style>
