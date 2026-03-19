"use client";

import { CounterBadge } from "@/components/ui/CounterBadge";
import { useWaitlistCount } from "@/hooks/useWaitlistCount";

export function SocialProof() {
  const waitlistCount = useWaitlistCount();

  return (
    <section
      className="py-12 border-y"
      style={{
        background: "#0D2B5E",
        borderColor: "rgba(59,130,246,0.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
          <CounterBadge
            target={waitlistCount}
            label="en lista de espera"
            prefix="🔥 "
            suffix="+"
          />
          <CounterBadge
            target={2}
            label="países · Colombia & México"
            prefix="📍 "
            suffix=""
          />
          <div className="text-center">
            <p
              className="text-4xl font-bold text-ez-gold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              ⭐ 100%
            </p>
            <p className="text-sm text-slate-400 mt-1">Educación que sí funciona</p>
          </div>
        </div>
      </div>
    </section>
  );
}
