/**
 * useScrollReveal - Intersection Observer Hook for Scroll Animations
 * 
 * Returns a ref to attach to any element and an `isVisible` boolean
 * that becomes true when the element enters the viewport.
 * 
 * Options:
 * - threshold: How much of the element must be visible (0–1, default 0.1)
 * - rootMargin: Margin around the root viewport (default "0px")
 * - triggerOnce: If true, stays visible after first reveal (default true)
 * 
 * Usage:
 *   const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
 *   <div ref={ref} className={isVisible ? "animate-in" : "hidden"} />
 */

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing after first reveal if triggerOnce is enabled
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
