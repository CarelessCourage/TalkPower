<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import type { SpeakerMetrics } from '~/types/meeting';
import { formatDuration } from '~/utils/metrics';
import { useSpeakerColors } from '~/composables/useSpeakerColors';

interface Props {
  speakers: SpeakerMetrics[];
  displayName?: (raw: string) => string;
}

const { speakers, displayName = (raw: string) => raw } = defineProps<Props>();

const { getSpeakerColor } = useSpeakerColors();
const barsRef = ref<HTMLElement | null>(null);

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
    <SpeakerRow
      v-for="(speaker, i) in speakers"
      :key="speaker.speaker"
      :name="displayName(speaker.speaker)"
      :value="`${speaker.percentage.toFixed(0)}% · ${formatDuration(speaker.totalTime)}`"
      :color-class="getSpeakerColor(i)"
    >
      <div class="SpeakingTimeTrack">
        <div
          class="SpeakingTimeBar"
          :class="getSpeakerColor(i)"
          :style="{ width: speaker.percentage + '%' }"
        />
      </div>
      <template #stats>
        <span>{{ speaker.turns }} turns</span>
        <span>{{ formatDuration(speaker.averageTurnDuration) }} avg</span>
        <span v-if="speaker.interruptions > 0" class="statInterrupt">
          {{ speaker.interruptions }} interruption{{
            speaker.interruptions === 1 ? '' : 's'
          }}
        </span>
      </template>
    </SpeakerRow>
  </div>
</template>

<style scoped>
.SpeakingTimeBars {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
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

.statInterrupt {
  color: var(--accent-70);
}
</style>
