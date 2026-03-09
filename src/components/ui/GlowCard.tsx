"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  delay?: number;
}

export function GlowCard({ children, className = "", accentColor = "#2563EB", delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        borderColor: accentColor,
        boxShadow: `0 0 30px ${accentColor}33, 0 20px 60px rgba(0,0,0,0.5)`,
        y: -4,
      }}
      style={{
        background: "rgba(13, 43, 94, 0.6)",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      }}
      className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
