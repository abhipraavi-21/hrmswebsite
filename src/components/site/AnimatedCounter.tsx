import { useEffect, useMemo, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const reduceMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -8% 0px",
    disabled: reduceMotion,
  });
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  const formatter = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [decimals]);

  useEffect(() => {
    if (!isVisible || reduceMotion) {
      if (reduceMotion) {
        setDisplay(value);
      }
      return undefined;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    raf = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(raf);
  }, [duration, isVisible, reduceMotion, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatter.format(display)}
      {suffix}
    </span>
  );
}

