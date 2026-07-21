import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type ScrollRevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale";

type ScrollRevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  delay?: number;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function ScrollReveal<T extends ElementType = "div">({
  as,
  children,
  className,
  variant = "fade-up",
  delay = 0,
  once = true,
  threshold,
  rootMargin,
}: ScrollRevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const reduceMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  const { ref, isVisible } = useScrollReveal({
    once,
    threshold,
    rootMargin,
    disabled: reduceMotion,
  });

  return (
    <Component
      ref={ref}
      data-scroll-reveal={variant}
      data-reveal-visible={isVisible ? "true" : "false"}
      className={cn("scroll-reveal", className)}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Component>
  );
}

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  step?: number;
  startDelay?: number;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function StaggerReveal({
  children,
  className,
  variant = "fade-up",
  step = 70,
  startDelay = 0,
  once = true,
  threshold,
  rootMargin,
}: StaggerRevealProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((child, index) => (
        <ScrollReveal
          key={index}
          variant={variant}
          delay={startDelay + index * step}
          once={once}
          threshold={threshold}
          rootMargin={rootMargin}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

