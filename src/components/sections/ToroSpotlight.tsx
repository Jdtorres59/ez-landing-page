"use client";

import { motion } from "framer-motion";
import { ToroCharacter } from "@/components/ui/ToroCharacter";
import { Check } from "lucide-react";

const bullets = [
  "Personalidad propia — te motiva, reta y celebra contigo",
  "Explica conceptos difíciles en lenguaje de verdad",
  "Siempre disponible, nunca te juzga por preguntar",
  "Aprende de tus hábitos y se adapta a tus metas",
];

export function ToroSpotlight() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#0A1628" }}>
      <div className="absolute inset-0 diagonal-lines pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Toro */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Rayos de luz volumétrica */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute origin-bottom"
                  style={{
                    width: "2px",
                    height: "180px",
                    background: "linear-gradient(to top, rgba(245,184,0,0.3), transparent)",
                    rotate: `${i * 45}deg`,
                    bottom: "50%",
                  }}
                  animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Gold glow */}
            <div
              className="absolute inset-0 rounded-full glow-gold pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
                width: "400px",
                height: "400px",
                margin: "auto",
              }}
            />
            <ToroCharacter variant="full" size={380} />
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest text-ez-gold mb-3 block"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Tu guía financiero
              </span>
              <h2
                className="text-4xl lg:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Conoce a{" "}
                <span className="text-ez-gold">Toro</span>
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Toro no es un chatbot genérico. Es tu compañero financiero — diseñado para acompañarte
              desde tu primer ahorro hasta tu primera inversión, con el lenguaje y la energía de los
              jóvenes colombianos.
            </p>

            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)" }}
                  >
                    <Check className="w-3 h-3 text-ez-gold" />
                  </div>
                  <span className="text-slate-300 text-sm">{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
