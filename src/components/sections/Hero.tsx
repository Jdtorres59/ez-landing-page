"use client";

import { useState, useEffect } from "react";
import { useAnimation, motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { ToroCharacter } from "@/components/ui/ToroCharacter";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { useWaitlistCount } from "@/hooks/useWaitlistCount";
import { X, Sparkles } from "lucide-react";

// ─── Background particles (sutiles) ──────────────────────────────────────────
const bgParticles = [
  { symbol: "$",  top: "8%",  left: "5%",  size: 14, opacity: 0.09, duration: 8  },
  { symbol: "%",  top: "15%", left: "88%", size: 12, opacity: 0.08, duration: 11 },
  { symbol: "↑",  top: "30%", left: "92%", size: 13, opacity: 0.10, duration: 9  },
  { symbol: "$",  top: "55%", left: "3%",  size: 11, opacity: 0.08, duration: 13 },
  { symbol: "B",  top: "20%", left: "78%", size: 12, opacity: 0.07, duration: 10 },
  { symbol: "%",  top: "70%", left: "90%", size: 10, opacity: 0.09, duration: 12 },
  { symbol: "↑",  top: "80%", left: "8%",  size: 11, opacity: 0.08, duration: 7  },
  { symbol: "$",  top: "45%", left: "95%", size: 12, opacity: 0.07, duration: 14 },
  { symbol: "%",  top: "90%", left: "20%", size: 10, opacity: 0.09, duration: 9  },
  { symbol: "$",  top: "5%",  left: "40%", size: 11, opacity: 0.07, duration: 11 },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.9,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Toro con glow y animación de entrada + idle ──────────────────────────────
function ToroBounce({ mobileSize = false }: { mobileSize?: boolean }) {
  const toroControls = useAnimation();

  useEffect(() => {
    async function runSequence() {
      await toroControls.start({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 180, damping: 14, delay: 0.2 },
      });
      toroControls.start({
        y: [0, -10, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      });
    }
    runSequence();
  }, [toroControls]);

  const containerClass = mobileSize
    ? "relative w-[65vw] max-w-[280px] mx-auto"
    : "relative w-[340px] xl:w-[420px] mx-auto";

  return (
    <div className={containerClass}>
      {/* Capa 1 — sombra base difusa */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "110%",
          height: "60%",
          bottom: "-5%",
          left: "-5%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      {/* Capa 2 — glow azul exterior lento */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 65%)",
          filter: "blur(25px)",
          zIndex: 0,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ delay: 0.7, duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Capa 3 — glow dorado interior, pulso de latido */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          background: "radial-gradient(circle, rgba(255,184,0,0.20) 0%, transparent 60%)",
          filter: "blur(15px)",
          zIndex: 0,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          scale: [1, 1.08, 0.97, 1.08, 1],
          opacity: [0.7, 1, 0.8, 1, 0.7],
        }}
        transition={{ delay: 0.8, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Toro */}
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.85 }}
        animate={toroControls}
        className="relative z-10"
      >
        <Image
          src="/screenshots/toro-full.png"
          alt="Toro EZ"
          width={420}
          height={520}
          priority
          className="w-full h-auto drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}

// ─── Modal de confirmación (legacy, mantenido) ────────────────────────────────
function ConfirmationModal({ position, onClose }: { position: number; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(7,14,26,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl p-8 text-center overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #0D2B5E, #0A1628)",
            border: "1px solid rgba(245,158,11,0.4)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.15)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <ToroCharacter variant="celebrating" size={160} noFloat className="mx-auto mb-4" />
          <h3
            className="text-2xl font-black text-ez-gold mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            ¡Estás dentro! 🎉
          </h3>
          <p className="text-slate-300 text-sm mb-4">Eres el número</p>
          <div
            className="text-6xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            #{position}
          </div>
          <p className="text-slate-400 text-sm">
            en la lista de espera de EZ. Comparte tu link para subir posiciones.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              fontFamily: "var(--font-syne)",
            }}
          >
            ¡Vamos por más! 🚀
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Badge pill ───────────────────────────────────────────────────────────────
function BadgePill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
    >
      <span
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(245,158,11,0.15)",
          border: "1px solid rgba(245,158,11,0.35)",
          color: "#FCD34D",
        }}
      >
        <Sparkles className="w-3 h-3" />
        Lanzamiento Q2 2025 · Colombia
      </span>
    </motion.div>
  );
}

// ─── Contenido textual (headline, subhead, form, social proof) ────────────────
function HeroContent({ waitlistCount }: { waitlistCount: number }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-ez-white text-center lg:text-left"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Aprende finanzas.{" "}
        <span className="text-ez-gold">Gana</span>{" "}
        en la vida.
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-base lg:text-lg text-slate-300 leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left"
      >
        La primera app gamificada de educación financiera hecha para jóvenes colombianos.
        Aprende, sube de nivel y toma el control de tu plata.
      </motion.p>

      <motion.div variants={itemVariants}>
        <WaitlistForm />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center lg:justify-start gap-3"
      >
        <div className="flex -space-x-2">
          {["🧑🏽", "👩🏻", "👨🏾", "🧑🏼"].map((emoji, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
              style={{ borderColor: "#0D2B5E", background: "#1A4A8A" }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          <span className="text-ez-gold font-semibold">
            {waitlistCount.toLocaleString("es-CO")}+
          </span>{" "}
          ya están en la lista
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero principal ───────────────────────────────────────────────────────────
export function Hero() {
  const [modalPosition, setModalPosition] = useState<number | null>(null);
  const waitlistCount = useWaitlistCount();

  return (
    <section
      id="waitlist"
      className="relative min-h-screen flex items-center overflow-hidden section-wave-bottom"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, #0D2B5E 0%, #070E1A 70%)",
      }}
    >
      {/* Dot texture */}
      <div className="absolute inset-0 dot-texture opacity-60 pointer-events-none" />

      {/* Animated background grid */}
      <HeroBackground />

      {/* Background particles — sutiles */}
      {bgParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none font-bold"
          style={{
            top: p.top,
            left: p.left,
            fontSize: `${p.size}px`,
            color: `rgba(${i % 2 === 0 ? "255,184,0" : "74,158,255"}, ${p.opacity})`,
            zIndex: 0,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          {p.symbol}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ── MOBILE: columna única (badge → Toro → contenido) ── */}
        <div className="flex flex-col lg:hidden items-center gap-6 pt-24 pb-12">
          {/* Badge arriba de Toro para dar contexto inmediato */}
          <BadgePill />

          {/* Toro protagonista en mobile */}
          <ToroBounce mobileSize />

          {/* Contenido debajo de Toro */}
          <div className="w-full">
            <HeroContent waitlistCount={waitlistCount} />
          </div>
        </div>

        {/* ── DESKTOP: dos columnas (texto izquierda, Toro derecha) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            <BadgePill />
            <HeroContent waitlistCount={waitlistCount} />
          </div>

          {/* Columna derecha — Toro */}
          <div className="flex justify-center items-center">
            <ToroBounce />
          </div>
        </div>

      </div>

      {/* Modal (legacy) */}
      {modalPosition !== null && (
        <ConfirmationModal
          position={modalPosition}
          onClose={() => setModalPosition(null)}
        />
      )}
    </section>
  );
}
