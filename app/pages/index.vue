<script setup lang="ts">
import { ref, computed, provide, onMounted, watch } from 'vue';
import { useMagicPlayer } from '@maas/vue-equipment/plugins/MagicPlayer';
import { useMeetingAnalysis } from '~/composables/useMeetingAnalysis';
import { useTranscriptSync } from '~/composables/useTranscriptSync';
import { meetingStateKey } from '~/composables/useMeetingState';
import { demos, DEFAULT_DEMO, loadDemoData } from '~/data/demos';

const route = useRoute();
const router = useRouter();
const analysis = useMeetingAnalysis();

const isSplash = computed(() => route.path === '/');

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
  demoVideoUrl,
  activeDemo,
  speakerNames,
  loadDemo,
  analyzeBehavior
} = analysis;

const displayName = (raw: string): string => speakerNames.value[raw] || raw;

const currentDemoSlug = computed(
  () => (route.query.demo as string) || DEFAULT_DEMO
);

const switchDemo = async (slug: string) => {
  if (slug === activeDemo.value) return;
  const entry = await loadDemoData(slug);
  if (!entry) return;
  await loadDemo(entry);
  if (slug !== DEFAULT_DEMO) {
    router.replace({ query: { ...route.query, demo: slug } });
  } else {
    const { demo: _, ...rest } = route.query;
    router.replace({ query: rest });
  }
};

onMounted(async () => {
  const slug = currentDemoSlug.value;
  const entry = await loadDemoData(slug);
  if (entry) await loadDemo(entry);
});

const playerId = ref('meeting-player');
const { currentTime, audioApi } = useMagicPlayer(playerId);

const segments = computed(() => transcript.value?.segments ?? []);
const duration = computed(() => transcript.value?.duration ?? 0);
const playerSrc = computed(() => audioUrl.value ?? demoVideoUrl.value ?? '');
const behaviorLabels = computed(() => behaviorAnalysis.value?.labels ?? []);
const emotionLabels = computed(() => behaviorAnalysis.value?.emotions ?? []);
const coachingCards = computed(() => behaviorAnalysis.value?.coaching ?? []);

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
  speakerNames,
  displayName,
  segments,
  duration,
  behaviorLabels,
  emotionLabels,
  coachingCards,
  hardInterruptions,
  softInterruptions,
  currentTime,
  activeIndex,
  onSeek
});

const tabs = [
  { to: '/behavior', label: 'Behavior', icon: 'lucide:brain' },
  { to: '/speakers', label: 'Speakers', icon: 'lucide:users' },
  { to: '/transcript', label: 'Transcript', icon: 'lucide:scroll-text' }
];
</script>

<template>
  <div class="MeetingPage" :class="{ meetingPageSplash: isSplash }">
    <header v-if="!isSplash" class="MeetingHeader">
      <div class="MeetingBrand">
        <h1 class="MeetingTitle">TalkPower</h1>
        <p class="MeetingTagline">Reveal who runs the room</p>
      </div>
      <div class="MeetingActions">
        <div class="DemoSwitcher">
          <button
            v-for="demo in demos"
            :key="demo.slug"
            class="DemoBtn"
            :class="{ demoBtnActive: activeDemo === demo.slug }"
            @click="switchDemo(demo.slug)"
          >
            {{ demo.title }}
          </button>
        </div>
        <NuxtLink to="/upload" class="MeetingUploadLink">
          Try your own recording
        </NuxtLink>
      </div>
    </header>

    <template v-if="!isSplash && hasData && metrics">
      <!-- Persistent player -->
      <section class="MeetingHero">
        <MeetingPlayer
          :src="playerSrc"
          :segments="segments"
          :duration="duration"
          :interruptions="interruptions"
          :labels="behaviorLabels"
          :emotions="emotionLabels"
          :coaching="coachingCards"
          :display-name="displayName"
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
    </template>

    <!-- Routed content (splash page OR meeting sub-page) -->
    <main :class="{ MeetingMain: !isSplash }">
      <NuxtPage />
    </main>
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
  view-transition-name: meeting-title;
}

.MeetingTagline {
  font-size: var(--caption-text-height);
  color: var(--base-50);
  font-style: italic;
  view-transition-name: meeting-tagline;
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

.MeetingActions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-bit-3);
}

.DemoSwitcher {
  display: flex;
  gap: var(--space-bit-2);
}

.DemoBtn {
  padding: var(--space-bit-1) var(--space-bit-4);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--base-50);
  background: var(--base-10);
  border: 1px solid var(--base-20);
  border-radius: var(--radius);
  cursor: pointer;
  transition:
    color var(--time-2) var(--timing),
    background var(--time-2) var(--timing),
    border-color var(--time-2) var(--timing);
}

.DemoBtn:hover {
  color: var(--base-80);
  background: var(--base-20);
}

.DemoBtn.demoBtnActive {
  color: var(--accent-text);
  background: var(--accent);
  border-color: var(--accent);
}

.MeetingMain {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
