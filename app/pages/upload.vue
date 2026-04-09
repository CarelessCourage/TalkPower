<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMagicPlayer } from '@maas/vue-equipment/plugins/MagicPlayer';
import { useMeetingAnalysis } from '~/composables/useMeetingAnalysis';
import { useTranscriptSync } from '~/composables/useTranscriptSync';

const {
  transcript,
  volumeAnalysis,
  interruptions,
  uploadStatus,
  errorMessage,
  audioUrl,
  metrics,
  insights,
  hasData,
  uploadAudio,
  loadMockData,
  reset
} = useMeetingAnalysis();

const playerId = ref('meeting-player');
const { currentTime, audioApi } = useMagicPlayer(playerId);

const segments = computed(() => transcript.value?.segments ?? []);
const duration = computed(() => transcript.value?.duration ?? 0);

const { activeIndex } = useTranscriptSync(segments, currentTime);

const speakerTab = ref<'airtime' | 'volume'>('airtime');

const onSeek = (time: number) => {
  audioApi.seek(time);
};
</script>

<template>
  <div class="UploadPage">
    <header class="UploadHeader">
      <div class="UploadBrand">
        <NuxtLink to="/" class="UploadBackLink">&larr; Back to demo</NuxtLink>
        <h1 class="UploadTitle">Analyze your recording</h1>
      </div>
      <button v-if="hasData" class="UploadReset" @click="reset">
        New analysis
      </button>
    </header>

    <main class="UploadMain">
      <!-- Upload state -->
      <AudioUpload
        v-if="!hasData"
        :status="uploadStatus"
        @upload="uploadAudio"
        @demo="loadMockData"
      />

      <p v-if="uploadStatus === 'error'" class="UploadError">
        {{ errorMessage }}
      </p>

      <!-- Analysis dashboard -->
      <template v-if="hasData && metrics">
        <MeetingPlayer v-if="audioUrl" :src="audioUrl" />

        <MeetingSummary :metrics="metrics" />

        <section class="UploadSection UploadHero">
          <h2 class="UploadHeroTitle">Conversation flow</h2>
          <p class="UploadHeroSub">
            Scrub through the meeting to see who spoke, when, and how they
            interacted
          </p>
          <ConversationTimeline
            :segments="segments"
            :duration="duration"
            :current-time="currentTime ?? 0"
            :interruptions="interruptions"
            @seek="onSeek"
          />
        </section>

        <section class="UploadSection">
          <h2 class="UploadSectionTitle">Power dynamics</h2>
          <InsightCards :insights="insights" />
        </section>

        <section class="UploadSection">
          <div class="UploadTabs">
            <button
              class="UploadTab"
              :class="{ tabActive: speakerTab === 'airtime' }"
              @click="speakerTab = 'airtime'"
            >
              Airtime breakdown
            </button>
            <button
              v-if="volumeAnalysis"
              class="UploadTab"
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

        <section class="UploadSection">
          <h2 class="UploadSectionTitle">Full transcript</h2>
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
.UploadPage {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: var(--panel-2);
  margin: 0 auto;
  padding: var(--space-5) var(--space-3);
}

.UploadHeader {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
}

.UploadBrand {
  display: flex;
  flex-direction: column;
  gap: var(--space-bit-0);
}

.UploadBackLink {
  font-size: var(--caption-text-height);
  color: var(--base-60);
  text-decoration: underline;
  transition: color var(--time-2) var(--timing);
}

.UploadBackLink:hover {
  color: var(--base-100);
}

.UploadTitle {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--base-120);
}

.UploadReset {
  font-size: var(--caption-text-height);
  color: var(--base-60);
  text-decoration: underline;
  transition: color var(--time-2) var(--timing);
}

.UploadReset:hover {
  color: var(--base-100);
}

.UploadMain {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.UploadSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.UploadSectionTitle {
  font-size: 1rem;
  font-weight: 700;
  color: var(--base-90);
  letter-spacing: -0.01em;
}

.UploadHero {
  padding: var(--space-3);
  background: var(--base-10);
  border-radius: var(--radius-outer);
  border: 1px solid var(--base-20);
}

.UploadHeroTitle {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--base-120);
  letter-spacing: -0.02em;
}

.UploadHeroSub {
  font-size: var(--caption-text-height);
  color: var(--base-50);
}

.UploadError {
  color: var(--accent-70);
  font-size: var(--caption-text-height);
}

.UploadTabs {
  display: flex;
  gap: var(--space-bit-1);
}

.UploadTab {
  font-size: var(--caption-text-height);
  font-weight: 600;
  color: var(--base-50);
  padding: var(--space-bit-1) var(--space-bit-3);
  border-radius: var(--radius) var(--radius) 0 0;
  transition:
    color var(--time-2) var(--timing),
    background var(--time-2) var(--timing);
}

.UploadTab:hover {
  color: var(--base-80);
}

.UploadTab.tabActive {
  color: var(--base-110);
  background: var(--base-20);
}
</style>
