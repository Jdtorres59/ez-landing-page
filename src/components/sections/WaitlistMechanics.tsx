"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MessageCircle, Instagram, Twitter } from "lucide-react";

const tiers = [
  {
    rank: "Top 100",
    icon: "👑",
    color: "#F59E0B",
    border: "rgba(245,158,11,0.4)",
    bg: "rgba(245,158,11,0.08)",
    perks: ["Acceso beta exclusivo", "Badge dorado en la app", "Mención en redes EZ"],
  },
  {
    rank: "Top 500",
    icon: "🥇",
    color: "#3B82F6",
    border: "rgba(59,130,246,0.4)",
    bg: "rgba(59,130,246,0.08)",
    perks: ["Acceso anticipado", "Badge azul especial", "Mes premium gratis"],
  },
  {
    rank: "Lista general",
    icon: "✅",
    color: "#64748B",
    border: "rgba(100,116,139,0.3)",
    bg: "rgba(100,116,139,0.05)",
    perks: ["Acceso al lanzamiento", "Notificación prioritaria", "Contenido exclusivo"],
  },
];

const REF_CODE = "EZ2025";
const REF_LINK = `https://ez.app/waitlist?ref=${REF_CODE}`;
const SHARE_TEXT = encodeURIComponent("¡Únete a EZ, la app de educación financiera para jóvenes colombianos! 🚀💸");

export function WaitlistMechanics() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REF_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Sube posiciones.{" "}
            <span className="text-ez-gold">Gana más.</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Refiere amigos y sube en la lista. Los primeros 100 reciben acceso beta exclusivo.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-6 text-center"
              style={{
                background: tier.bg,
                border: `1px solid ${tier.border}`,
              }}
            >
              <div className="text-4xl mb-3">{tier.icon}</div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "var(--font-syne)", color: tier.color }}
              >
                {tier.rank}
              </h3>
              <ul className="flex flex-col gap-2">
                {tier.perks.map((perk, j) => (
                  <li key={j} className="text-sm text-slate-400">
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Referral card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto rounded-2xl p-8"
          style={{
            background: "rgba(13,43,94,0.5)",
            border: "1px solid rgba(59,130,246,0.25)",
          }}
        >
          <h3
            className="text-xl font-bold text-white text-center mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Tu link de referidos
          </h3>
          <p className="text-slate-400 text-sm text-center mb-6">
            Cada amigo que se una con tu link te sube posiciones en la lista.
          </p>

          {/* Link box */}
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-6"
            style={{ background: "rgba(7,14,26,0.6)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <span className="flex-1 text-sm text-slate-300 font-mono truncate">{REF_LINK}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: copied ? "rgba(16,185,129,0.2)" : "rgba(37,99,235,0.2)",
                border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(37,99,235,0.4)"}`,
                color: copied ? "#10B981" : "#3B82F6",
              }}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>

          {/* Share buttons */}
          <div className="flex gap-3 justify-center">
            <a
              href={`https://wa.me/?text=${SHARE_TEXT}%20${encodeURIComponent(REF_LINK)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              WhatsApp
            </a>
            <a
              href={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: "rgba(225,48,108,0.15)", border: "1px solid rgba(225,48,108,0.3)" }}
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              Instagram
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT}%20${encodeURIComponent(REF_LINK)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: "rgba(29,161,242,0.15)", border: "1px solid rgba(29,161,242,0.3)" }}
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              Twitter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
