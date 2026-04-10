<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMagicPlayer } from '@maas/vue-equipment/plugins/MagicPlayer';
import { useMeetingAnalysis } from '~/composables/useMeetingAnalysis';
import { useTranscriptSync } from '~/composables/useTranscriptSync';
import demoVideo from '~/assets/video/argumentAtTheMuseum.mp4';

const {
  transcript,
  volumeAnalysis,
  interruptions,
  interruptionThreshold,
  audioUrl,
  metrics,
  insights,
  hasData,
  loadDemo
} = useMeetingAnalysis();

onMounted(() => {
  if (!hasData.value) loadDemo(demoVideo);
});

const playerId = ref('meeting-player');
const { currentTime, audioApi } = useMagicPlayer(playerId);

const segments = computed(() => transcript.value?.segments ?? []);
const duration = computed(() => transcript.value?.duration ?? 0);

const playerSrc = computed(() => audioUrl.value ?? demoVideo);

const { activeIndex } = useTranscriptSync(segments, currentTime);

const speakerTab = ref<'airtime' | 'volume'>('airtime');

const hardInterruptions = computed(
  () => interruptions.value.filter((i) => i.severity === 'hard').length
);

const softInterruptions = computed(
  () => interruptions.value.filter((i) => i.severity === 'soft').length
);

const onSeek = (time: number) => {
  audioApi.seek(time);
};
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

    <main class="MeetingMain">
      <!-- Analysis dashboard -->
      <template v-if="hasData && metrics">
        <!-- Player with subtitle cards + scrubber -->
        <section class="MeetingSection MeetingHero">
          <MeetingPlayer
            :src="playerSrc"
            :segments="segments"
            :duration="duration"
            :interruptions="interruptions"
            @seek="onSeek"
          />
          <AnalysisSettings
            :threshold="interruptionThreshold"
            :interruption-count="interruptions.length"
            :hard-count="hardInterruptions"
            :soft-count="softInterruptions"
            @update:threshold="interruptionThreshold = $event"
          />
        </section>

        <!-- Summary row -->
        <MeetingSummary :metrics="metrics" />

        <!-- Dominance insights -->
        <section class="MeetingSection">
          <h2 class="MeetingSectionTitle">Power dynamics</h2>
          <InsightCards :insights="insights" />
        </section>

        <!-- Speaker analysis (tabbed) -->
        <section class="MeetingSection">
          <div class="MeetingTabs">
            <button
              class="MeetingTab"
              :class="{ tabActive: speakerTab === 'airtime' }"
              @click="speakerTab = 'airtime'"
            >
              Airtime breakdown
            </button>
            <button
              v-if="volumeAnalysis"
              class="MeetingTab"
              :class="{ tabActive: speakerTab === 'volume' }"
              @click="speakerTab = 'volume'"
            >
              Volume profile
            </button>
          </div>
          <SpeakingTimeBars
            v-if="speakerTab === 'airtime'"
            :speakers="metrics.speakers"
          />
          <VolumeProfile
            v-if="speakerTab === 'volume' && volumeAnalysis"
            :speakers="volumeAnalysis.speakers"
          />
        </section>

        <!-- Transcript -->
        <section class="MeetingSection">
          <h2 class="MeetingSectionTitle">Full transcript</h2>
          <TranscriptView
            :segments="segments"
            :active-index="activeIndex"
            :interruptions="interruptions"
            @seek="onSeek"
          />
        </section>
      </template>
    </main>
  </div>
</template>

<style scoped>
.MeetingPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
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

.MeetingMain {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.MeetingSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.MeetingSectionTitle {
  font-size: 1rem;
  font-weight: 700;
  color: var(--base-90);
  letter-spacing: -0.01em;
}

.MeetingHero {
  background: var(--base-10);
  border-radius: var(--radius-outer);
  border: 1px solid var(--base-20);
  overflow: hidden;
}

.MeetingTabs {
  display: flex;
  gap: var(--space-bit-1);
}

.MeetingTab {
  font-size: var(--caption-text-height);
  font-weight: 600;
  color: var(--base-50);
  padding: var(--space-bit-1) var(--space-bit-3);
  border-radius: var(--radius) var(--radius) 0 0;
  transition:
    color var(--time-2) var(--timing),
    background var(--time-2) var(--timing);
}

.MeetingTab:hover {
  color: var(--base-80);
}

.MeetingTab.tabActive {
  color: var(--base-110);
  background: var(--base-20);
}
</style>
