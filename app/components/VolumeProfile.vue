<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import type { SpeakerVolume } from '~/types/meeting';
import { useSpeakerColors } from '~/composables/useSpeakerColors';

interface Props {
  speakers: SpeakerVolume[];
  displayName?: (raw: string) => string;
}

const { speakers, displayName = (raw: string) => raw } = defineProps<Props>();

const { getSpeakerColor } = useSpeakerColors();
const barsRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!barsRef.value) return;
  const bars = barsRef.value.querySelectorAll('.VolumeBar');
  gsap.fromTo(
    bars,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      transformOrigin: 'left center'
    }
  );
});
</script>

<template>
  <div class="VolumeProfile" ref="barsRef">
    <SpeakerRow
      v-for="(speaker, i) in speakers"
      :key="speaker.speaker"
      :name="displayName(speaker.speaker)"
      :value="`${Math.round(speaker.averageRms * 100)}%`"
      :color-class="getSpeakerColor(i)"
    >
      <div class="VolumeTrack">
        <!-- Baseline marker -->
        <div
          class="VolumeBaseline"
          :style="{ left: speaker.baseline * 100 + '%' }"
        />
        <!-- Average bar -->
        <div
          class="VolumeBar"
          :class="getSpeakerColor(i)"
          :style="{ width: speaker.averageRms * 100 + '%' }"
        />
        <!-- Peak marker -->
        <div
          class="VolumePeak"
          :style="{ left: speaker.peakRms * 100 + '%' }"
        />
      </div>
      <template #stats>
        <span>baseline {{ Math.round(speaker.baseline * 100) }}%</span>
        <span>peak {{ Math.round(speaker.peakRms * 100) }}%</span>
        <span v-if="speaker.raisedVoiceCount > 0" class="detailRaised">
          🔊 raised {{ speaker.raisedVoiceCount }}×
        </span>
      </template>
    </SpeakerRow>
  </div>
</template>

<style scoped>
.VolumeProfile {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.VolumeTrack {
  position: relative;
  height: var(--space-bit-3);
  background: var(--base-20);
  border-radius: var(--radius-inner);
  overflow: visible;
}

.VolumeBar {
  height: 100%;
  background: var(--base-60);
  border-radius: var(--radius-inner);
  min-width: 2px;
}

.VolumeBaseline {
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 1px;
  background: var(--base-50);
  z-index: 1;
}

.VolumePeak {
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 2px;
  background: var(--accent-70);
  border-radius: 1px;
  z-index: 1;
}

.detailRaised {
  color: var(--warning-70);
  font-weight: 600;
}
</style>
