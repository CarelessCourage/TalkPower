export default defineNuxtRouteMiddleware((to, from) => {
  const involvesSplash = to.path === '/' || from.path === '/';
  if (!involvesSplash) {
    to.meta.viewTransition = false;
  }
});
