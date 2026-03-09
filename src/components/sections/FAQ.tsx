"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Cuándo lanza EZ?",
    a: "Planeamos lanzar en Q2 2025. Los primeros en la lista de espera tendrán acceso beta antes que nadie. ¡Inscríbete ahora para no perderte nada!",
  },
  {
    q: "¿EZ es gratis?",
    a: "EZ tendrá un plan gratuito con acceso a lecciones y funciones básicas. Las funciones avanzadas de IA y seguimiento serán parte del plan premium. Los primeros 500 de la lista recibirán beneficios exclusivos.",
  },
  {
    q: "¿Solo es para Colombia?",
    a: "Arrancamos con Colombia — el contenido está 100% adaptado a la realidad financiera local: pesos, CDTs, Colpensiones, fondos de inversión. Luego expandimos a México y más países de LATAM.",
  },
  {
    q: "¿Mis datos financieros están seguros?",
    a: "Absolutamente. EZ no tiene acceso a tus cuentas bancarias. Todo el contenido de aprendizaje y seguimiento es independiente. Usamos encriptación de nivel bancario para proteger tu información.",
  },
  {
    q: "¿Por qué EZ y no otra app de finanzas?",
    a: "Porque las otras no son para ti. EZ está diseñada desde cero para jóvenes colombianos — lenguaje real, situaciones reales, gamificación que engancha y una IA que entiende tu contexto. No es otra hoja de presupuesto disfrazada de app.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Preguntas frecuentes
          </h2>
          <p className="text-slate-400">¿Algo no quedó claro? Aquí están las respuestas.</p>
        </motion.div>

        <div className="flex flex-col divide-y" style={{ borderColor: "rgba(59,130,246,0.15)" }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-ez-gold transition-colors duration-200"
              >
                <span
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {open === i ? (
                    <Minus className="w-5 h-5 text-ez-gold" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
