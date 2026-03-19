"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Copy, Check } from "lucide-react";
import { getReferralFromUrl } from "@/lib/referral";

interface WaitlistFormProps {
  placeholder?: string;
  buttonText?: string;
}

export function WaitlistForm({
  placeholder = "tu@email.com",
  buttonText = "Únete gratis",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<{
    position: number;
    referralUrl: string;
    alreadyRegistered?: boolean;
  } | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReferredBy(getReferralFromUrl());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, referredBy }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data);
        setStatus("success");
        localStorage.setItem("ez_waitlist_email", email);
        localStorage.setItem("ez_referral_url", data.referralUrl);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function copyReferralLink() {
    if (!result?.referralUrl) return;
    await navigator.clipboard.writeText(result.referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === "success" && result) {
    return (
      <div className="w-full space-y-4">
        {/* Posición */}
        <div
          className="rounded-2xl p-6 text-center border"
          style={{
            background: "linear-gradient(135deg, #0D2B5E, #1A3F7A)",
            borderColor: "rgba(74,158,255,0.2)",
          }}
        >
          <div
            className="text-5xl font-black text-ez-gold"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            #{result.position}
          </div>
          <div className="text-slate-400 text-sm mt-1">
            {result.alreadyRegistered
              ? "Ya estabas en la lista 👊"
              : "¡Ya estás en la lista! 🎉"}
          </div>
        </div>

        {/* Link de referido */}
        <div className="space-y-2">
          <p className="text-slate-400 text-sm text-center">
            Comparte tu link y sube 10 posiciones por cada amigo 🚀
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={result.referralUrl}
              className="flex-1 rounded-xl px-3 py-2 text-white text-xs truncate"
              style={{
                background: "rgba(13,43,94,0.6)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            />
            <motion.button
              onClick={copyReferralLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl font-bold text-sm text-ez-dark whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "¡Copiado!" : "Copiar"}
            </motion.button>
          </div>

          {/* WhatsApp share */}
          <a
            href={`https://wa.me/?text=Acabo%20de%20unirme%20a%20EZ%20%E2%80%94%20la%20app%20que%20te%20ense%C3%B1a%20finanzas%20como%20un%20juego.%20%C3%9Anete%3A%20${encodeURIComponent(result.referralUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full font-bold py-3 rounded-xl text-sm text-white transition-colors"
            style={{ background: "#16a34a" }}
          >
            Compartir en WhatsApp →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full px-5 py-4 rounded-xl text-white placeholder-slate-400 text-sm font-medium outline-none focus:ring-2 focus:ring-ez-blue-bright transition-all duration-200"
            style={{
              background: "rgba(13, 43, 94, 0.6)",
              border: "1px solid rgba(59, 130, 246, 0.35)",
              backdropFilter: "blur(12px)",
            }}
            disabled={status === "loading"}
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-70 whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
            fontFamily: "var(--font-syne)",
          }}
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {status === "error" && (
        <p className="mt-2 text-red-400 text-xs font-medium">
          Error al registrarse. Intenta de nuevo.
        </p>
      )}
      {referredBy && (
        <p className="text-blue-400 text-xs mt-2">✓ Entraste con link de referido</p>
      )}
      <p className="mt-3 text-xs text-slate-500">
        Sin spam. Sin tarjeta de crédito. Solo el futuro financiero que mereces.
      </p>
    </form>
  );
}
