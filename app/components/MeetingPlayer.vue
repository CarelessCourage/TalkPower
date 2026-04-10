<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMagicPlayer } from '@maas/vue-equipment/plugins/MagicPlayer';
import { formatSeconds } from '~/utils/metrics';

interface Props {
  src: string;
}

const { src } = defineProps<Props>();

const playerId = ref('meeting-player');

const playerOptions = computed(() => ({
  src,
  mode: 'video' as const,
  srcType: 'native' as const,
  preload: 'metadata' as const,
  autoplay: false
}));

const { currentTime, duration, playing, audioApi } = useMagicPlayer(playerId);

const progress = computed(() => {
  if (!duration.value || duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

const seek = (time: number) => {
  audioApi.seek(time);
};

defineExpose({ currentTime, duration, seek });
</script>

<template>
  <div class="MeetingPlayer surface">
    <MagicPlayerProvider :id="playerId" :options="playerOptions">
      <MagicPlayerVideo />
    </MagicPlayerProvider>

    <div class="PlayerControls">
      <button class="PlayerPlayBtn base-accent" @click="audioApi.togglePlay()">
        {{ playing ? 'Pause' : 'Play' }}
      </button>

      <div
        class="PlayerProgress"
        @click="
          (e: MouseEvent) => {
            const el = e.currentTarget as HTMLElement;
            const rect = el.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            seek(ratio * (duration ?? 0));
          }
        "
      >
        <div class="PlayerProgressFill" :style="{ width: progress + '%' }" />
      </div>

      <span class="PlayerTime mono">
        {{ formatSeconds(currentTime ?? 0) }} /
        {{ formatSeconds(duration ?? 0) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.MeetingPlayer {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-2);
  padding: var(--space-bit-3) var(--space-bit-4);
  border-radius: var(--radius-outer);
  overflow: hidden;
}

.MeetingPlayer :deep(video) {
  width: 100%;
  border-radius: var(--radius);
  display: block;
}

.PlayerControls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.PlayerPlayBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--block-2);
  padding: 0 var(--space-bit-3);
  border-radius: var(--radius);
  background: var(--base-70);
  color: var(--base-text);
  font-weight: 600;
  font-size: var(--caption-text-height);
  min-width: 64px;
  transition: background var(--time-2) var(--timing);
}

.PlayerPlayBtn:hover {
  background: var(--base-80);
}

.PlayerProgress {
  flex: 1;
  height: var(--space-bit-2);
  background: var(--base-30);
  border-radius: var(--radius-inner);
  cursor: pointer;
  overflow: hidden;
}

.PlayerProgressFill {
  height: 100%;
  background: var(--accent-70);
  border-radius: var(--radius-inner);
  transition: width 0.1s linear;
}

.PlayerTime {
  font-size: var(--caption-text-height);
  color: var(--base-60);
  white-space: nowrap;
}
</style>
