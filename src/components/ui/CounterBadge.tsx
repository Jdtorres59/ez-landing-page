"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterBadgeProps {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function CounterBadge({ target, label, prefix = "", suffix = "", duration = 2000 }: CounterBadgeProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p
        className="text-4xl font-bold text-ez-gold"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {prefix}{count.toLocaleString("es-CO")}{suffix}
      </p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </motion.div>
  );
}
