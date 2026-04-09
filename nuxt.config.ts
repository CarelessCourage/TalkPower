// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY ?? ''
  },

  build: {
    transpile: ['@maas/vue-equipment']
  },

  vite: {
    optimizeDeps: {
      include: ['gsap']
    }
  }
});
