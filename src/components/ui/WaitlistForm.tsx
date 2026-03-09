"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  onSuccess?: (position: number) => void;
  placeholder?: string;
  buttonText?: string;
}

export function WaitlistForm({
  onSuccess,
  placeholder = "tu@email.com",
  buttonText = "Únete gratis",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Ingresa un email válido.");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    const position = Math.floor(Math.random() * 600) + 300;
    localStorage.setItem("ez_waitlist_email", email);
    localStorage.setItem("ez_waitlist_position", String(position));

    setLoading(false);
    onSuccess?.(position);
  };

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
            disabled={loading}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-70 whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
            fontFamily: "var(--font-syne)",
          }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
      {error && (
        <p className="mt-2 text-ez-red text-xs font-medium">{error}</p>
      )}
      <p className="mt-3 text-xs text-slate-500">
        Sin spam. Sin tarjeta de crédito. Solo el futuro financiero que mereces.
      </p>
    </form>
  );
}
