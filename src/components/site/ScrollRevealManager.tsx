import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = "[data-scroll-reveal], .fade-up, .fade-down, .fade-left, .fade-right, .fade-scale";

export default function ScrollRevealManager() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<WeakSet<Element>>(new WeakSet());

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const markVisible = (element: HTMLElement) => {
      element.dataset.revealVisible = "true";

      const rawDelay = element.style.animationDelay || element.getAttribute("data-reveal-delay") || "";
      if (rawDelay && !element.style.transitionDelay) {
        element.style.transitionDelay = rawDelay;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          markVisible(element);
          if (element.dataset.revealOnce !== "false") {
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observerRef.current = observer;

    const attach = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (observedRef.current.has(element)) return;
        observedRef.current.add(element);

        if (reduceMotion) {
          markVisible(element);
          return;
        }

        element.dataset.revealVisible ??= "false";
        observer.observe(element);
      });
    };

    attach(document);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(REVEAL_SELECTOR)) {
            attach(node.parentElement ?? document);
          } else {
            attach(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      observerRef.current = null;
    };
  }, []);

  return null;
}

