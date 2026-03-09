"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const screens = [
  {
    src: "/app images/Inicio sesion oficial_.png",
    alt: "Pantalla de inicio de sesión de EZ",
    rotation: -6,
    scale: 0.85,
  },
  {
    src: "/app images/Control de gastos.png",
    alt: "Dashboard de control de gastos de EZ",
    rotation: 0,
    scale: 1.05,
  },
  {
    src: "/app images/Lecciones.png",
    alt: "Pantalla de lecciones de EZ",
    rotation: 6,
    scale: 0.85,
  },
];

export function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden section-wave-bottom" style={{ background: "#070E1A" }}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            La app que{" "}
            <span className="text-ez-blue-glow">estabas esperando</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Diseñada desde cero para que aprender sea tan adictivo como un juego.
          </p>
        </motion.div>

        {/* Phones */}
        <motion.div style={{ y }} className="flex items-center justify-center gap-4 lg:gap-8">
          {screens.map((screen, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{ rotate: screen.rotation, zIndex: i === 1 ? 10 : 1 }}
              className="flex-shrink-0"
            >
              <PhoneMockup scale={screen.scale}>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                />
              </PhoneMockup>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-500 mt-12"
        >
          Prototipo funcional · Lanzamiento Q2 2025
        </motion.p>
      </div>
    </section>
  );
}
