<script setup lang="ts">
const router = useRouter();

const enter = () => {
  router.push('/behavior');
};
</script>

<template>
  <div class="SplashPage" @click="enter">
    <h1 class="SplashTitle">TalkPower</h1>
    <p class="SplashTagline">Reveal who runs the room</p>
    <span class="SplashHint">Click anywhere to begin</span>
  </div>
</template>

<style scoped>
.SplashPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  cursor: pointer;
  gap: var(--space-bit-3);
  user-select: none;
}

.SplashTitle {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--base-120);
  view-transition-name: meeting-title;
}

.SplashTagline {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--base-50);
  font-style: italic;
  view-transition-name: meeting-tagline;
}

.SplashHint {
  margin-top: var(--space-4);
  font-size: 0.75rem;
  color: var(--base-30);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}
</style>
