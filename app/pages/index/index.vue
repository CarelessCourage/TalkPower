<script setup lang="ts">
const auraLogoVideo = '/video/auraLogo.mp4';

const router = useRouter();

const enter = () => {
  router.push('/notes');
};
</script>

<template>
  <div class="SplashPage" @click="enter">
    <video
      class="SplashVideo"
      autoplay
      loop
      muted
      playsinline
      :src="auraLogoVideo"
    />
    <h1 class="SplashTitle">aura</h1>
    <p class="SplashTagline">read the room</p>
  </div>
</template>

<style scoped>
.SplashPage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  cursor: pointer;
  gap: var(--space-bit-4);
  user-select: none;
  overflow: hidden;
}

.SplashVideo {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: blur(120px);
  opacity: 0.5;
  pointer-events: none;
}

.SplashTitle {
  position: relative;
  z-index: 10;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: clamp(3rem, 20vw, 32rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--base-120);
  view-transition-name: meeting-title;
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}

.SplashTagline {
  position: relative;
  z-index: 10;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--base-100);
  font-style: italic;
  view-transition-name: meeting-tagline;
}
</style>
