"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { ToroCharacter } from "@/components/ui/ToroCharacter";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { X, Sparkles } from "lucide-react";

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
          <p className="text-slate-300 text-sm mb-4">
            Eres el número
          </p>
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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const [modalPosition, setModalPosition] = useState<number | null>(null);

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

      {/* Animated background particles + grid */}
      <HeroBackground />

      {/* Glow orb */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex">
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

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black leading-[1.05] text-ez-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Aprende finanzas.{" "}
              <span className="text-ez-gold">Gana</span>{" "}
              en la vida.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-300 leading-relaxed max-w-md"
            >
              La primera app gamificada de educación financiera hecha para jóvenes colombianos.
              Aprende, sube de nivel y toma el control de tu plata.
            </motion.p>

            {/* Form */}
            <motion.div variants={itemVariants}>
              <WaitlistForm onSuccess={(pos) => setModalPosition(pos)} />
            </motion.div>

            {/* Social proof mini */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
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
                <span className="text-ez-gold font-semibold">847+</span> ya están en la lista
              </p>
            </motion.div>
          </motion.div>

          {/* Right column — Toro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Glow azul exterior — lento */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Glow dorado interior — pulsante */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <ToroCharacter variant="full" size={420} />

            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
              className="absolute top-8 right-0 lg:right-4 max-w-[180px]"
            >
              <div
                className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm font-medium text-white relative"
                style={{
                  background: "rgba(13,43,94,0.9)",
                  border: "1px solid rgba(245,158,11,0.4)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                ¡Únete ahora y sé de los primeros! 🚀
                <div
                  className="absolute -bottom-2 left-4 w-4 h-4"
                  style={{
                    background: "rgba(13,43,94,0.9)",
                    borderRight: "1px solid rgba(245,158,11,0.4)",
                    borderBottom: "1px solid rgba(245,158,11,0.4)",
                    transform: "rotate(45deg)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {modalPosition !== null && (
        <ConfirmationModal
          position={modalPosition}
          onClose={() => setModalPosition(null)}
        />
      )}
    </section>
  );
}
