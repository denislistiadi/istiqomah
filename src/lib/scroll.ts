/**
 * Robust scroll-to-top utility for mobile PWAs and responsive layouts.
 * Ensures the scroll position resets to the top across all browsers,
 * even during animated page transitions, layout reflows, or unmountings.
 */
export function scrollToTop(behavior: ScrollBehavior = 'smooth') {
  try {
    // 1. Immediate scroll attempt
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }

    // 2. Next animation frame (after initial DOM paint)
    requestAnimationFrame(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior });
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }
    });

    // 3. Short fallback timeout (after Framer Motion exit animation completes)
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior });
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }
    }, 60);
  } catch {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
}
