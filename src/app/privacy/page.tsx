import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Política de tratamiento de datos — EZ",
  description: "Cómo EZ App maneja tu información personal.",
};

export default function PrivacyPage() {
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
            Política de tratamiento de datos
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
                1. ¿Quién es responsable de tus datos?
              </h2>
              <p>
                <strong className="text-white">EZ App</strong> es el responsable
                del tratamiento de tu información personal. Si tienes alguna
                pregunta o quieres ejercer tus derechos, escríbenos a{" "}
                <a
                  href="mailto:juanda@ezapp.tech"
                  className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                  juanda@ezapp.tech
                </a>
                .
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                2. ¿Qué información recopilamos?
              </h2>
              <p>
                Solo tu <strong className="text-white">correo electrónico</strong>.
                Nada más. No pedimos nombre, teléfono ni tarjeta de crédito. Solo
                el email con el que te registraste al waitlist.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                3. ¿Para qué usamos tu correo?
              </h2>
              <p>
                Exclusivamente para enviarte actualizaciones sobre el lanzamiento
                de EZ App y novedades relacionadas con el waitlist. No lo
                vendemos, no lo compartimos con terceros para fines comerciales,
                no lo usamos para nada más.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                4. Tus derechos como titular
              </h2>
              <p className="mb-3">
                Bajo la{" "}
                <strong className="text-white">Ley 1581 de 2012</strong> de
                Colombia, tienes derecho a:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span style={{ color: "#F59E0B" }}>·</span>
                  <span>
                    <strong className="text-white">Conocer</strong> qué datos
                    tenemos sobre ti.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "#F59E0B" }}>·</span>
                  <span>
                    <strong className="text-white">Actualizar</strong> o{" "}
                    <strong className="text-white">rectificar</strong> tu
                    información si está incorrecta.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "#F59E0B" }}>·</span>
                  <span>
                    <strong className="text-white">Suprimir</strong> tus datos y
                    salir del waitlist cuando quieras.
                  </span>
                </li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, escríbenos a{" "}
                <a
                  href="mailto:juanda@ezapp.tech"
                  className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                  juanda@ezapp.tech
                </a>{" "}
                y lo resolvemos rápido.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                5. ¿Cuánto tiempo guardamos tu información?
              </h2>
              <p>
                Conservamos tu correo mientras estés en el waitlist y durante un
                período razonable después del lanzamiento de la app. En todo caso,
                si nos pides que eliminemos tus datos, lo hacemos de inmediato.
                El límite máximo es de{" "}
                <strong className="text-white">2 años</strong> desde el
                lanzamiento oficial de EZ App.
              </p>
            </section>

            <section>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "#F59E0B", fontFamily: "var(--font-syne)" }}
              >
                6. Ley aplicable
              </h2>
              <p>
                Esta política se rige por la legislación vigente en la{" "}
                <strong className="text-white">República de Colombia</strong>,
                en particular la Ley 1581 de 2012 y el Decreto 1377 de 2013.
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
