"use client";

import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function PhoneMockup({ children, className = "", scale = 1 }: PhoneMockupProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${260 * scale}px`,
        height: `${540 * scale}px`,
      }}
    >
      {/* Phone frame */}
      <div
        className="absolute inset-0 rounded-[36px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1A4A8A, #0D2B5E)",
          border: "2px solid rgba(59, 130, 246, 0.4)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Screen content — fills full frame, image includes its own status bar */}
        <div className="absolute inset-0 overflow-hidden rounded-[34px]">
          <div className="relative w-full h-full">
            {children}
          </div>
        </div>
        {/* Notch — sits on top of the screen content */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-10" />
      </div>
    </div>
  );
}

export function ScreenPlaceholder({ label, icon, color = "#2563EB" }: { label: string; icon: string; color?: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 p-6"
      style={{ background: "linear-gradient(180deg, #070E1A 0%, #0D2B5E 100%)" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
        style={{ background: `${color}33`, border: `1px solid ${color}55` }}
      >
        {icon}
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>
          {label}
        </p>
        <p className="text-slate-500 text-xs mt-1">Prototipo</p>
      </div>
      {/* Fake UI elements */}
      <div className="w-full space-y-2 mt-4">
        {[80, 60, 70, 50].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{ width: `${w}%`, background: "rgba(59,130,246,0.2)", marginLeft: i % 2 === 1 ? "auto" : "0" }}
          />
        ))}
      </div>
    </div>
  );
}
