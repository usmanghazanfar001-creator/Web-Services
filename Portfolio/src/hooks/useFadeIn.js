import { useEffect, useRef } from 'react';

/**
 * Adds the "visible" class to an element once it scrolls into view,
 * replicating the original site's IntersectionObserver fade-in effect.
 */
export default function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
