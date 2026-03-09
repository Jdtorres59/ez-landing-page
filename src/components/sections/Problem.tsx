"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const problems = [
  {
    icon: "📚",
    title: "El colegio no te enseñó nada",
    desc: "Pasaste años aprendiendo logaritmos y cero sobre cómo manejar tu primer sueldo, ahorrar o invertir.",
  },
  {
    icon: "😵",
    title: "Las apps de finanzas son aburridas",
    desc: "Interfaces grises, jerga bancaria y cero motivación. ¿El resultado? Abandonas a la segunda semana.",
  },
  {
    icon: "💸",
    title: "El dinero se va sin saber cómo",
    desc: "Fin de quincena y la cuenta en ceros. Sin un sistema, sin claridad, sin estrategia.",
  },
];

export function Problem() {
  return (
    <section className="py-24" style={{ background: "#070E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl font-black text-ez-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Las finanzas no son difíciles.
            <br />
            <span className="text-ez-gold">Te las enseñaron mal.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No es tu culpa. El sistema nunca fue diseñado para enseñarte. Nosotros sí.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <GlowCard key={i} delay={i * 0.15}>
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {p.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
