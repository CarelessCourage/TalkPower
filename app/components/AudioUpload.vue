<script setup lang="ts">
import { ref } from 'vue';
import { useDropZone } from '@vueuse/core';
import type { UploadStatus } from '~/types/meeting';

interface Props {
  status: UploadStatus;
}

const { status } = defineProps<Props>();

const emit = defineEmits<{
  upload: [file: File];
  demo: [];
}>();

const dropRef = ref<HTMLElement | null>(null);

const onDrop = (files: File[] | null) => {
  const file = files?.[0];
  if (file) emit('upload', file);
};

const { isOverDropZone } = useDropZone(dropRef, { onDrop });

const onFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) emit('upload', file);
  input.value = '';
};

const acceptedFormats = '.mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm';
</script>

<template>
  <div
    ref="dropRef"
    class="AudioUpload"
    :class="{
      dropActive: isOverDropZone,
      uploading: status === 'uploading' || status === 'processing'
    }"
  >
    <template v-if="status === 'idle' || status === 'error'">
      <div class="AudioUploadContent">
        <p class="AudioUploadHeadline">Drop a meeting recording</p>
        <p class="AudioUploadSub">
          or choose a file — mp3, wav, m4a, webm (max 25 MB)
        </p>

        <div class="AudioUploadActions">
          <label class="AudioUploadButton base-accent">
            Choose file
            <input
              type="file"
              :accept="acceptedFormats"
              class="AudioUploadInput"
              @change="onFileSelect"
            />
          </label>

          <button class="AudioUploadDemo" @click="emit('demo')">
            Use demo data instead
          </button>
        </div>
      </div>
    </template>

    <template v-else-if="status === 'uploading' || status === 'processing'">
      <div class="AudioUploadContent">
        <p class="AudioUploadHeadline">
          {{
            status === 'uploading' ? 'Uploading…' : 'Transcribing & diarizing…'
          }}
        </p>
        <p class="AudioUploadSub">
          This may take a moment for longer recordings
        </p>
        <div class="AudioUploadSpinner" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.AudioUpload {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  padding: var(--space-6);
  border: 2px dashed var(--base-40);
  border-radius: var(--radius-outer);
  background: var(--base-10);
  transition:
    border-color var(--time-2) var(--timing),
    background var(--time-2) var(--timing);
  text-align: center;
}

.AudioUpload.dropActive {
  border-color: var(--accent-70);
  background: var(--accent-10);
}

.AudioUpload.uploading {
  border-style: solid;
  border-color: var(--base-30);
}

.AudioUploadContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.AudioUploadHeadline {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--base-110);
}

.AudioUploadSub {
  font-size: var(--caption-text-height);
  color: var(--base-70);
}

.AudioUploadActions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-1);
}

.AudioUploadButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--block-3);
  padding: 0 var(--space-bit-4);
  border-radius: var(--radius);
  background: var(--base-70);
  color: var(--base-text);
  font-weight: 600;
  font-size: var(--caption-text-height);
  cursor: pointer;
  transition: background var(--time-2) var(--timing);
}

.AudioUploadButton:hover {
  background: var(--base-80);
}

.AudioUploadInput {
  display: none;
}

.AudioUploadDemo {
  font-size: var(--caption-text-height);
  color: var(--base-70);
  text-decoration: underline;
  transition: color var(--time-2) var(--timing);
}

.AudioUploadDemo:hover {
  color: var(--base-100);
}

.AudioUploadSpinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--base-40);
  border-top-color: var(--accent-70);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
