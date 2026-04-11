import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Términos de uso — EZ",
  description: "Términos y condiciones de uso de EZ App.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen"
        style={{ backgroundColor: "#070E1A", fontFamily: "var(--font-dm-sans)" }}
      >
        <div className="max-w-[600px] mx-auto px-6 py-32">
          {/* Back link */}
          <Link
            href="/"
            className="inline-block text-sm text-slate-500 hover:text-slate-300 transition-colors mb-10"
          >
            ← Volver al inicio
          </Link>

          <h1
            className="text-3xl font-black text-white mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Términos de uso
          </h1>
          <p className="text-slate-500 text-sm mb-12">
            Última actualización: abril 2026
          </p>

          <div className="space-y-10 text-slate-300 leading-relaxed">
            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                1. ¿Qué es EZ App?
              </h2>
              <p>
                EZ App es una plataforma de{" "}
                <strong className="text-white">educación financiera gamificada</strong>{" "}
                actualmente en desarrollo. Su objetivo es ayudar a jóvenes
                colombianos a aprender a manejar su plata de una manera práctica
                y entretenida — sin aburrirse.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                2. El waitlist
              </h2>
              <p>
                Al registrarte en el waitlist de EZ App estás expresando tu
                interés en el producto. Eso es todo. El registro{" "}
                <strong className="text-white">no implica ningún contrato</strong>,
                suscripción de pago ni compromiso de ningún tipo entre tú y EZ
                App. Puedes salirte cuando quieras.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                3. Sin garantías de fecha o condiciones
              </h2>
              <p>
                EZ App está en construcción activa. Las fechas de lanzamiento,
                funcionalidades, recompensas para el waitlist y cualquier otra
                condición descrita en esta landing son{" "}
                <strong className="text-white">estimaciones de buena fe</strong>,
                no compromisos legales. Pueden cambiar sin previo aviso.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                4. Contenido educativo, no asesoría financiera
              </h2>
              <p>
                Todo el contenido que EZ App publique — en la landing, en emails
                o dentro de la app — es de carácter{" "}
                <strong className="text-white">informativo y educativo</strong>.
                No constituye asesoría financiera profesional. Si necesitas
                orientación específica sobre tus inversiones o finanzas
                personales, consulta a un profesional certificado.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                5. Ley aplicable
              </h2>
              <p>
                Estos términos se rigen por las leyes vigentes en la{" "}
                <strong className="text-white">República de Colombia</strong>.
                Cualquier controversia que surja se resolverá de acuerdo con la
                normativa colombiana.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                6. Contacto
              </h2>
              <p>
                Si tienes preguntas sobre estos términos, escríbenos a{" "}
                <a
                  href="mailto:juanda@ezapp.tech"
                  className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                  juanda@ezapp.tech
                </a>
                .
              </p>
            </section>

            <div
              className="pt-8 mt-8 border-t text-slate-600 text-sm"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              ¿Preguntas? Escríbenos a{" "}
              <a
                href="mailto:juanda@ezapp.tech"
                className="underline underline-offset-2 hover:text-slate-400 transition-colors"
              >
                juanda@ezapp.tech
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
