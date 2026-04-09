import { MagicPlayerPlugin } from '@maas/vue-equipment/plugins/MagicPlayer';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MagicPlayerPlugin);
});
