import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EZ — Aprende finanzas. Gana en la vida.",
  icons: {
    icon: "/EZ_logo_transparent_v4.png",
    apple: "/EZ_logo_transparent_v4.png",
  },
  description:
    "La app de educación financiera gamificada para jóvenes colombianos. Aprende a manejar tu plata, invertir y construir tu futuro — sin aburrirte.",
  keywords: ["finanzas personales", "educación financiera", "Colombia", "gamificación", "inversión", "jóvenes"],
  authors: [{ name: "EZ" }],
  openGraph: {
    title: "EZ — Aprende finanzas. Gana en la vida.",
    description:
      "La app de educación financiera gamificada para jóvenes colombianos. Únete a la lista de espera.",
    type: "website",
    locale: "es_CO",
    siteName: "EZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "EZ — Aprende finanzas. Gana en la vida.",
    description:
      "La app de educación financiera gamificada para jóvenes colombianos. Únete a la lista de espera.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} antialiased bg-ez-dark text-ez-white`}
      >
        {children}
      </body>
    </html>
  );
}
