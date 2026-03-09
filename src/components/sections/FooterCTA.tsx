"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { ToroCharacter } from "@/components/ui/ToroCharacter";
import { X } from "lucide-react";

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
          className="relative w-full max-w-md rounded-3xl p-8 text-center"
          style={{
            background: "linear-gradient(145deg, #0D2B5E, #0A1628)",
            border: "1px solid rgba(245,158,11,0.4)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <p className="text-slate-300 text-sm mb-2">Estás en el puesto</p>
          <div className="text-6xl font-black text-ez-gold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            #{position}
          </div>
          <p className="text-slate-400 text-sm">¡Comparte tu link para subir posiciones!</p>
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", fontFamily: "var(--font-syne)" }}
          >
            ¡Listo, gracias! 🎉
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function FooterCTA() {
  const [modalPosition, setModalPosition] = useState<number | null>(null);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.06) 0%, #070E1A 70%)",
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <ToroCharacter variant="bust" size={200} noFloat className="mx-auto mb-8" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Tu yo del futuro
          <br />
          <span className="text-ez-gold">te lo va a agradecer.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mb-8"
        >
          Únete ahora, sin compromisos. El mejor momento para aprender finanzas fue ayer. El segundo mejor es hoy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <WaitlistForm onSuccess={(pos) => setModalPosition(pos)} />
        </motion.div>
      </div>

      {modalPosition !== null && (
        <ConfirmationModal position={modalPosition} onClose={() => setModalPosition(null)} />
      )}
    </section>
  );
}
