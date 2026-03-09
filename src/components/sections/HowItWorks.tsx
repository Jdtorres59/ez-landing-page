"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: "🧠",
    title: "Aprende con misiones",
    desc: "Lecciones cortas de 5 minutos diseñadas para que entiendas de verdad. No memorizar — entender.",
  },
  {
    number: "02",
    icon: "🏆",
    title: "Gana puntos y sube de nivel",
    desc: "Cada lección completada te da XP. Desbloquea logros, racha diaria y compite con tus amigos.",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Aplica y crece",
    desc: "La IA de EZ analiza tus metas y te guía paso a paso hacia tu primera inversión real.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden" style={{ background: "#0A1628" }}>
      <div className="absolute inset-0 diagonal-lines pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Así funciona EZ
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Simple, progresivo, adictivo — de la mejor manera posible.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) — animated */}
          <motion.div
            className="hidden lg:block absolute top-12 left-1/6 right-1/6 h-px"
            style={{
              background: "linear-gradient(90deg, #F59E0B, #2563EB)",
              originX: 0,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative text-center"
              >
                {/* Big number */}
                <div
                  className="text-8xl font-black absolute -top-6 left-1/2 -translate-x-1/2 select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: "rgba(37,99,235,0.12)",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </div>

                {/* Icon circle */}
                <div
                  className="relative mx-auto mb-6 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
                  style={{
                    background: "rgba(13,43,94,0.7)",
                    border: "1px solid rgba(59,130,246,0.35)",
                    boxShadow: "0 8px 30px rgba(37,99,235,0.15)",
                  }}
                >
                  {step.icon}
                </div>

                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
