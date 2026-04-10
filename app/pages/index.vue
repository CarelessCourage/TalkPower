<script setup lang="ts">
import { ref, computed, provide, onMounted } from 'vue';
import { useMagicPlayer } from '@maas/vue-equipment/plugins/MagicPlayer';
import { useMeetingAnalysis } from '~/composables/useMeetingAnalysis';
import { useTranscriptSync } from '~/composables/useTranscriptSync';
import { meetingStateKey } from '~/composables/useMeetingState';
import demoVideo from '~/assets/video/argumentAtTheMuseum.mp4';

const analysis = useMeetingAnalysis();

const {
  transcript,
  volumeAnalysis,
  interruptions,
  interruptionThreshold,
  behaviorAnalysis,
  behaviorContext,
  analyzingBehavior,
  metrics,
  insights,
  hasData,
  audioUrl,
  loadDemo,
  analyzeBehavior
} = analysis;

onMounted(() => {
  if (!hasData.value) loadDemo(demoVideo);
});

const playerId = ref('meeting-player');
const { currentTime, audioApi } = useMagicPlayer(playerId);

const segments = computed(() => transcript.value?.segments ?? []);
const duration = computed(() => transcript.value?.duration ?? 0);
const playerSrc = computed(() => audioUrl.value ?? demoVideo);
const behaviorLabels = computed(() => behaviorAnalysis.value?.labels ?? []);

const hardInterruptions = computed(
  () => interruptions.value.filter((i) => i.severity === 'hard').length
);
const softInterruptions = computed(
  () => interruptions.value.filter((i) => i.severity === 'soft').length
);

const { activeIndex } = useTranscriptSync(segments, currentTime);

const onSeek = (time: number) => {
  audioApi.seek(time);
};

provide(meetingStateKey, {
  transcript,
  volumeAnalysis,
  behaviorAnalysis,
  behaviorContext,
  analyzingBehavior,
  interruptions,
  interruptionThreshold,
  metrics,
  insights,
  hasData,
  analyzeBehavior,
  segments,
  duration,
  behaviorLabels,
  hardInterruptions,
  softInterruptions,
  currentTime,
  activeIndex,
  onSeek
});

const tabs = [
  { to: '/', label: 'Overview', icon: 'lucide:layout-dashboard' },
  { to: '/behavior', label: 'Behavior', icon: 'lucide:brain' },
  { to: '/speakers', label: 'Speakers', icon: 'lucide:users' },
  { to: '/transcript', label: 'Transcript', icon: 'lucide:scroll-text' }
];
</script>

<template>
  <div class="MeetingPage">
    <header class="MeetingHeader">
      <div class="MeetingBrand">
        <h1 class="MeetingTitle">TalkPower</h1>
        <p class="MeetingTagline">Reveal who runs the room</p>
      </div>
      <NuxtLink to="/upload" class="MeetingUploadLink">
        Try your own recording
      </NuxtLink>
    </header>

    <template v-if="hasData && metrics">
      <!-- Persistent player -->
      <section class="MeetingHero">
        <MeetingPlayer
          :src="playerSrc"
          :segments="segments"
          :duration="duration"
          :interruptions="interruptions"
          :labels="behaviorLabels"
          @seek="onSeek"
        />
      </section>

      <!-- Tab navigation -->
      <nav class="MeetingNav">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="NavTab"
          :class="{ navTabActive: $route.path === tab.to }"
        >
          <Icon :name="tab.icon" size="16" />
          {{ tab.label }}
        </NuxtLink>
      </nav>

      <!-- Routed content -->
      <main class="MeetingMain">
        <NuxtPage />
      </main>
    </template>
  </div>
</template>

<style scoped>
.MeetingPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: var(--panel-2);
  margin: 0 auto;
  padding: var(--space-5) var(--space-3);
}

.MeetingHeader {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
}

.MeetingBrand {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-0);
}

.MeetingTitle {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--base-120);
}

.MeetingTagline {
  font-size: var(--caption-text-height);
  color: var(--base-50);
  font-style: italic;
}

.MeetingUploadLink {
  font-size: var(--caption-text-height);
  color: var(--base-60);
  text-decoration: underline;
  transition: color var(--time-2) var(--timing);
}

.MeetingUploadLink:hover {
  color: var(--base-100);
}

.MeetingHero {
  background: var(--base-10);
  border-radius: var(--radius-outer);
  border: 1px solid var(--base-20);
  overflow: hidden;
}

.MeetingNav {
  display: flex;
  gap: var(--space-bit-1);
  border-bottom: 1px solid var(--base-20);
  padding-bottom: 0;
}

.NavTab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-bit-2);
  padding: var(--space-bit-2) var(--space-bit-4);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--base-50);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition:
    color var(--time-2) var(--timing),
    border-color var(--time-2) var(--timing);
}

.NavTab:hover {
  color: var(--base-80);
}

.NavTab.navTabActive {
  color: var(--base-text);
  border-bottom-color: var(--accent);
}

.MeetingMain {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
