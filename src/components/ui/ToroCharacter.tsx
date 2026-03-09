"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ToroCharacterProps {
  variant?: "full" | "bust" | "celebrating";
  size?: number;
  className?: string;
  noFloat?: boolean;
}

const variantMap = {
  full: "/screenshots/toro-full.png",
  bust: "/screenshots/toro-bust.png",
  celebrating: "/screenshots/toro-celebrating.png",
};

export function ToroCharacter({ variant = "full", size = 400, className = "", noFloat = false }: ToroCharacterProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={noFloat ? {} : { y: [0, -12, 0] }}
      transition={noFloat ? {} : { duration: 3, ease: "easeInOut", repeat: Infinity }}
    >
      <Image
        src={variantMap[variant]}
        alt="Toro — mascota de EZ"
        width={size}
        height={size}
        className="object-contain drop-shadow-2xl"
        priority={variant === "full"}
      />
    </motion.div>
  );
}
