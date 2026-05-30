import { useEffect, useRef } from 'react';

export function useScrollAnimation(
  threshold = 0.15,
  rootMargin = '0px'
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

export function useScrollAnimationMultiple(count: number, staggerDelay = 80) {
  const refs = Array.from({ length: count }, () => useRef<HTMLDivElement>(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.getAttribute('data-delay') || 0);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.setAttribute('data-delay', String(index * staggerDelay));
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [count, staggerDelay]);

  return refs;
}
