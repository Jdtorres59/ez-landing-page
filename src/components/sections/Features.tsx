"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: "🎮",
    title: "Gamificación real",
    desc: "XP, rachas, logros, niveles, rankings y retos semanales. Aprender finanzas nunca fue tan adictivo.",
    accent: "#F59E0B",
  },
  {
    icon: "🤖",
    title: "IA financiera personal",
    desc: "Tu asistente inteligente analiza tus metas, hábitos e ingresos para darte un plan real y alcanzable.",
    accent: "#2563EB",
  },
  {
    icon: "📈",
    title: "Seguimiento inteligente",
    desc: "Visualiza tu progreso, tus gastos y tus metas en dashboards simples. Sin hojas de Excel.",
    accent: "#10B981",
  },
  {
    icon: "🌎",
    title: "Hecho para LATAM",
    desc: "Contenido en pesos, UVR, Colpensiones, fondos de inversión colombianos y realidades locales.",
    accent: "#A855F7",
  },
];

interface Feature { icon: string; title: string; desc: string; accent: string; }

function FeatureCard({ feature: f, index: i }: { feature: Feature; index: number }) {
  const [showXP, setShowXP] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ boxShadow: `0 0 30px ${f.accent}22, 0 20px 60px rgba(0,0,0,0.4)`, y: -4 }}
      onMouseEnter={() => setShowXP(true)}
      onMouseLeave={() => setShowXP(false)}
      className="relative rounded-2xl p-7 transition-all duration-300 overflow-hidden"
      style={{
        background: "rgba(13,43,94,0.5)",
        border: "1px solid rgba(59,130,246,0.2)",
        borderLeft: `4px solid ${f.accent}`,
      }}
    >
      {/* XP flotante */}
      <AnimatePresence>
        {showXP && (
          <motion.div
            className="absolute -top-4 right-4 font-bold text-sm pointer-events-none z-10"
            style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -24, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.9 }}
            onAnimationComplete={() => setShowXP(false)}
          >
            +10 XP ⭐
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
        {f.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>

      {/* Subtle accent glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${f.accent}0A 0%, transparent 70%)` }}
      />
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-24 relative" style={{ background: "#0A1628" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Por qué EZ es{" "}
            <span className="text-ez-gold">diferente</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            No es otra app de presupuesto. Es un sistema completo para dominar tu dinero.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
