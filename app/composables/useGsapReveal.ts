import { onMounted, type Ref } from 'vue';
import gsap from 'gsap';

/**
 * Animates a list of child elements into view using a staggered reveal.
 * Targets direct children of the container.
 */
export const useGsapReveal = (
  containerRef: Ref<HTMLElement | null>,
  options: {
    /** CSS selector for children to animate. Default: "> *" */
    selector?: string;
    /** Stagger delay between children */
    stagger?: number;
    /** Total animation duration per item */
    duration?: number;
  } = {}
) => {
  const { selector = ':scope > *', stagger = 0.08, duration = 0.4 } = options;

  onMounted(() => {
    const container = containerRef.value;
    if (!container) return;

    const children = container.querySelectorAll(selector);
    if (children.length === 0) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out'
      }
    );
  });
};
