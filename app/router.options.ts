import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If navigating between child tabs under /, don't scroll
    const tabRoutes = ['/', '/notes', '/behavior', '/speakers', '/transcript'];
    if (tabRoutes.includes(to.path) && tabRoutes.includes(from.path)) {
      return false;
    }

    // Restore saved position on back/forward
    if (savedPosition) return savedPosition;

    // Default: scroll to top
    return { top: 0 };
  }
};
