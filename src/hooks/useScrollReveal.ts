import { useEffect, useRef, useState } from "react";

type ScrollRevealOptions = {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  once = true,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  disabled = false,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [disabled, once, threshold, rootMargin]);

  return { ref, isVisible };
}

