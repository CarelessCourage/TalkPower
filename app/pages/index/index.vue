<script setup lang="ts">
const router = useRouter();

const enter = () => {
  router.push('/behavior');
};
</script>

<template>
  <div class="SplashPage" @click="enter">
    <h1 class="SplashTitle">aura</h1>
    <p class="SplashTagline">read the room</p>
    <!-- <div class="SplashRing">
      <div class="SplashRingCap"></div>
    </div> -->
  </div>
</template>

<style scoped>
.SplashRing {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: aqua;
  border-radius: 50%;
  --size: 700px;
  width: var(--size);
  height: var(--size);
  clip-path: polygon(100% 0%, 100% 50%, 0% 50%, 0% 0%);
}

.SplashRingCap {
  --size: 90%;
  width: var(--size);
  height: var(--size);
  background-color: var(--base);
  border-radius: 100%;
}

.SplashPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  cursor: pointer;
  gap: var(--space-bit-4);
  user-select: none;
}

.SplashTitle {
  position: relative;
  z-index: 10;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: clamp(3rem, 10vw, 12rem);
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
