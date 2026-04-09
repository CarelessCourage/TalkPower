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
      <button v-if="hasData" class="MeetingReset" @click="reset">
        New analysis
      </button>
    </header>

    <main class="MeetingMain">
      <!-- Upload state -->
      <AudioUpload
        v-if="!hasData"
        :status="uploadStatus"
        @upload="uploadAudio"
        @demo="loadMockData"
      />

      <p v-if="uploadStatus === 'error'" class="MeetingError">
        {{ errorMessage }}
      </p>

      <!-- Analysis dashboard -->
      <template v-if="hasData && metrics">
        <!-- Player (only if real audio) -->
        <MeetingPlayer v-if="audioUrl" :src="audioUrl" />

        <!-- Summary row -->
        <MeetingSummary :metrics="metrics" />

        <!-- Dominance insights -->
        <section class="MeetingSection">
          <h2 class="MeetingSectionTitle">Power dynamics</h2>
          <InsightCards :insights="insights" />
        </section>

        <!-- Speaking time bars -->
        <section class="MeetingSection">
          <h2 class="MeetingSectionTitle">Airtime breakdown</h2>
          <SpeakingTimeBars :speakers="metrics.speakers" />
        </section>

        <!-- Volume profile -->
        <section v-if="volumeAnalysis" class="MeetingSection">
          <h2 class="MeetingSectionTitle">Volume profile</h2>
          <VolumeProfile :speakers="volumeAnalysis.speakers" />
        </section>

        <!-- Timeline -->
        <section class="MeetingSection">
          <h2 class="MeetingSectionTitle">Conversation flow</h2>
          <ConversationTimeline
            :segments="segments"
            :duration="duration"
            :current-time="currentTime ?? 0"
            @seek="onSeek"
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

.MeetingReset {
  font-size: var(--caption-text-height);
  color: var(--base-60);
  text-decoration: underline;
  transition: color var(--time-2) var(--timing);
}

.MeetingReset:hover {
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

.MeetingError {
  color: var(--accent-70);
  font-size: var(--caption-text-height);
}
</style>
