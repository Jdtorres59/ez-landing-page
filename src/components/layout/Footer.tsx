export function Footer() {
  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "rgba(59,130,246,0.15)", background: "#070E1A" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-xl font-black text-ez-gold"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          EZ
        </p>
        <p className="text-xs text-slate-500 text-center">
          © 2025 EZ. Todos los derechos reservados. · Hecho con ❤️ para Colombia.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Privacidad
          </a>
          <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Términos
          </a>
        </div>
      </div>
    </footer>
  );
}
