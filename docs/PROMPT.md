# EZ — Master Prompt para Claude Code / Cursor
## Landing Page de Waitlist · Next.js + Tailwind + Framer Motion

> **Cómo usar este documento:**
> Pega la sección "PROMPT MAESTRO" directamente en Claude Code o Cursor como primer mensaje.
> Las secciones de referencia son para ti — úsalas para orientar decisiones durante el desarrollo.

---

## REFERENCIA RÁPIDA DE MARCA

| Elemento | Valor |
|---|---|
| Nombre | EZ |
| Tagline principal | "Domina tu dinero. Sin aburrirte en el intento." |
| Mascot | Toro EZ — toro con corbata roja, maletín, thumbs up |
| Color base | `#0A1628` → `#0D2B5E` (degradado azul marino profundo) |
| Accent primario | `#FFB800` (dorado/amarillo monedas) |
| Accent secundario | `#C0392B` (rojo corbata Toro) |
| Accent terciario | `#4A9EFF` (azul claro para highlights) |
| Tipografía display | Clash Display o Syne (Google Fonts) |
| Tipografía body | DM Sans |
| Framework | Next.js 14 App Router + Tailwind CSS + Framer Motion |
| Deploy | Vercel |
| Mercado | Colombia · jóvenes 18–28 años |

---

## PROMPT MAESTRO
### (Pega esto completo en Claude Code / Cursor)

---

Eres un experto en diseño frontend de nivel mundial. Vamos a construir desde cero la landing page de waitlist para **EZ** — una app de educación financiera gamificada para jóvenes colombianos (18–28 años). El concepto es "Duolingo para finanzas personales" pero con identidad propia.

**El objetivo de la landing:** Generar hype, capturar emails de waitlist, y hacer que el usuario sienta "esto es exactamente lo que necesitaba" en menos de 5 segundos.

---

### SETUP INICIAL

Crea un proyecto Next.js 14 con App Router desde cero con este comando:

```bash
npx create-next-app@latest ez-landing --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Luego instala estas dependencias:

```bash
npm install framer-motion @radix-ui/react-dialog @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react next-themes
npm install -D @tailwindcss/typography
```

Configura las fuentes en `src/app/layout.tsx` usando `next/font/google`:
- **Syne** (weights: 400, 600, 700, 800) → variable `--font-syne`
- **DM Sans** (weights: 300, 400, 500, 600) → variable `--font-dm-sans`

---

### PALETA DE COLORES Y TOKENS

En `tailwind.config.ts`, extiende con estos tokens:

```typescript
colors: {
  ez: {
    dark: '#070E1A',
    navy: '#0A1628',
    blue: {
      deep: '#0D2B5E',
      mid: '#1A3F7A',
      bright: '#4A9EFF',
      glow: '#6DB8FF',
    },
    gold: '#FFB800',
    'gold-light': '#FFD166',
    red: '#C0392B',
    white: '#F0F4FF',
    gray: '#8B9BB4',
  }
}
```

---

### ARQUITECTURA DE ARCHIVOS

```
src/
  app/
    layout.tsx          — fonts, metadata, global styles
    page.tsx            — importa todas las secciones
    globals.css         — variables CSS, animaciones custom
  components/
    sections/
      Hero.tsx
      SocialProof.tsx
      Problem.tsx
      HowItWorks.tsx
      AppShowcase.tsx
      Features.tsx
      ToroSpotlight.tsx
      WaitlistMechanics.tsx
      FAQ.tsx
      FooterCTA.tsx
    ui/
      WaitlistForm.tsx   — formulario con lógica de posición
      PhoneMockup.tsx    — wrapper para screenshots de app
      GlowCard.tsx       — card con glow effect reutilizable
      CounterBadge.tsx   — contador animado de waitlist
      ToroCharacter.tsx  — mascot con animaciones
    layout/
      Navbar.tsx
      Footer.tsx
```

---

### SECCIÓN 1: HERO

**Archivo:** `src/components/sections/Hero.tsx`

Construye el hero con estas especificaciones exactas:

**Layout:** Full viewport height (`min-h-screen`). Fondo: degradado radial desde `#0D2B5E` en el centro hacia `#070E1A` en los bordes. Agrega una textura sutil de puntos (`radial-gradient` repetido) con opacidad 0.15 encima.

**Contenido (centrado verticalmente, dos columnas en desktop):**

Columna izquierda:
- Badge pill animado: `✦ Ya somos [COUNTER] en la lista` con borde `#4A9EFF` y fondo semitransparente
- H1 con Syne 800, tamaño `text-5xl md:text-7xl`, color blanco con "Sin aburrirte" en `#FFB800`
- Subheadline en DM Sans: "El primer entrenador financiero gamificado para colombianos. Aprende. Sube de nivel. Domina tu plata."
- Formulario de email → botón "Quiero acceso anticipado →"
- Micro-copy bajo el botón: "Gratis · Sin tarjeta · Primeros 500 obtienen acceso beta"

Columna derecha:
- Usa `toro-full.png` (EZ_thumbs_up_transparent) — Toro de cuerpo completo con thumbs up
- Animación `y: [0, -12, 0]` loop infinito suave con Framer Motion (`animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}`)
- Speech bubble sobre Toro: "¡Yo te enseño. Sin rollos! 🤙"
- Detrás de Toro: glow circular `#4A9EFF` con blur 80px, opacidad 0.3

**Modal de confirmación de waitlist:**
- Usa `toro-celebrating.png` (EZ_celebrando_transparent) — Toro con brazos arriba celebrando
- Aparece cuando el usuario se registra exitosamente

**Animaciones de entrada (Framer Motion):**
- Todo el contenido entra con `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
- Stagger de 0.15s entre elementos
- El badge entra primero, luego H1, subhead, form, y Toro simultáneo con el form

**El formulario WaitlistForm:**
- Input email con borde `#4A9EFF` semitransparente, fondo `rgba(255,255,255,0.05)`, placeholder "tu@email.com"
- Botón: fondo `#FFB800`, texto `#070E1A`, font-weight 700, hover: scale 1.03, sombra dorada
- Al hacer submit: muestra modal de confirmación con posición en waitlist (número random entre 300-850 para el MVP) y opción de compartir

---

### SECCIÓN 2: SOCIAL PROOF BAR

**Archivo:** `src/components/sections/SocialProof.tsx`

Barra horizontal con fondo `#0D2B5E`, padding vertical moderado.

Contenido en flex row, espaciado uniforme:
- `🔥 847 personas ya en la lista` (número animado con `useCountUp`)
- Separador `·`
- `📍 Colombia · México · próximamente más países`
- Separador `·`
- `⭐ Educación financiera que sí funciona`

En mobile: stack vertical, centrado.

---

### SECCIÓN 3: EL PROBLEMA

**Archivo:** `src/components/sections/Problem.tsx`

Título en Syne: "Las finanzas no son difíciles." en blanco, salto de línea, "**Te las enseñaron mal.**" en `#FFB800`.

Subtítulo en DM Sans: "El 73% de los jóvenes colombianos no sabe cuánto gasta al mes. No es tu culpa — nadie te enseñó cómo."

Grid de 3 tarjetas (GlowCard) con:
1. 💸 "Gastas sin saber en qué" — "El dinero desaparece y no sabes exactamente a dónde fue."
2. 📚 "Las apps de finanzas son aburridas" — "Llenas de gráficas que no entiendes y términos que no aplican a tu vida."
3. 😰 "Empezar se siente imposible" — "No sabes por dónde comenzar, así que no empiezas."

**GlowCard:** Fondo `rgba(13, 43, 94, 0.6)`, borde `rgba(74, 158, 255, 0.2)`, border-radius 16px, padding 24px. En hover: borde se ilumina a `rgba(74, 158, 255, 0.6)`, sombra exterior azul suave. Animación de entrada al hacer scroll con `whileInView`.

---

### SECCIÓN 4: CÓMO FUNCIONA EZ

**Archivo:** `src/components/sections/HowItWorks.tsx`

Título: "Aprender finanzas ahora es como subir de nivel" en Syne.

3 pasos en layout horizontal con línea conectora entre ellos (en desktop):

**Paso 1 — Diagnóstico:** Ícono de quiz/test. "Respondes 5 preguntas rápidas. EZ construye tu ruta personalizada de aprendizaje."

**Paso 2 — Aprende jugando:** Ícono de trofeo/estrella. "Lecciones de 3 minutos. Ganas XP, subes de nivel, desbloqueas contenido."

**Paso 3 — Cambia tus hábitos:** Ícono de cohete. "Aplicas lo que aprendes. Tu racha crece. Tu dinero también."

Número de cada paso en Syne 800, `text-6xl`, color `rgba(74, 158, 255, 0.2)` como fondo decorativo.

---

### SECCIÓN 5: APP SHOWCASE

**Archivo:** `src/components/sections/AppShowcase.tsx`

Esta es la sección más importante visualmente. Fondo con gradiente diagonal de `#070E1A` a `#0D2B5E`.

**Layout:** Título centrado arriba. Debajo, 3 PhoneMockups dispuestos así:
- El del centro: más grande (scale 1.1), completamente visible, z-index alto
- Los laterales: ligeramente más pequeños, rotados `-6deg` y `6deg` respectivamente, parcialmente solapados

**PhoneMockup component:**
- Frame de teléfono SVG o div estilizado con: borde `2px solid rgba(255,255,255,0.15)`, border-radius `36px`, sombra dramática `0 40px 80px rgba(0,0,0,0.6)`, notch superior
- Dentro va una imagen `<Image>` de Next.js

**Las 3 pantallas a mostrar (usar placeholders con los nombres correctos):**
1. `screenshot-home.png` — El dashboard con Toro y el resumen diario
2. `screenshot-lesson.png` — La pantalla de lección con la card de Toro
3. `screenshot-login.png` — La pantalla de login con el headline "Domina tu dinero"

**Animación:** En desktop, el showcase tiene parallax suave al hacer scroll. Los teléfonos entran desde abajo con stagger al llegar al viewport.

**Caption bajo las pantallas:** "Prototipo funcional · Lanzamiento Q2 2025"

---

### SECCIÓN 6: FEATURES

**Archivo:** `src/components/sections/Features.tsx`

Título: "Todo lo que necesitas para dominar tu plata"

Grid 2x2 de feature cards grandes:

1. **🎮 Gamificación real**
"Niveles, XP, rachas diarias e insignias. Aprender finanzas se siente como jugar — porque lo es."
Accent color: `#FFB800`

2. **🤖 IA financiera personal**
"Pregúntale cualquier cosa a Toro EZ. Obtén respuestas claras, sin jerga financiera."
Accent color: `#4A9EFF`

3. **📊 Seguimiento inteligente**
"Registra tus gastos, entiende tus patrones y recibe sugerencias personalizadas."
Accent color: `#50C878`

4. **🇨🇴 Hecho para Latinoamérica**
"En español, con ejemplos reales, en pesos colombianos. Para tu vida, no para la de otro."
Accent color: `#FF6B6B`

Cada card: fondo oscuro con borde izquierdo de 3px en el accent color. Ícono grande arriba. Hover: eleva con sombra coloreada según su accent.

---

### SECCIÓN 7: TORO EZ SPOTLIGHT

**Archivo:** `src/components/sections/ToroSpotlight.tsx`

Sección dividida en dos mitades:

**Mitad izquierda:** Usa `toro-full.png` (Toro cuerpo completo, thumbs up). Tamaño 300px+, centrado verticalmente. Detrás: círculo de glow dorado (`#FFB800`, blur 100px, opacidad 0.2). Toro tiene animación idle suave (mismo float que en el hero).

**Mitad derecha:**
- Eyebrow text: "Tu guía financiero personal"
- Título en Syne: "Conoce a **Toro EZ**"
- Descripción: "No es solo un personaje. Es tu entrenador financiero que te acompaña en cada lección, te felicita cuando cumples tus metas y te recuerda cuando llevas días sin practicar."
- 3 bullets con iconos:
  - 🎯 "Te guía lección a lección"
  - 🏆 "Celebra cada logro contigo"
  - 💬 "Responde tus dudas financieras con IA"

**Fondo de la sección:** Patrón sutil de líneas diagonales o grid sobre `#0A1628`.

---

### SECCIÓN 8: WAITLIST MECHANICS

**Archivo:** `src/components/sections/WaitlistMechanics.tsx`

Esta sección convierte visitantes en promotores. Fondo: `#070E1A` con borde superior degradado azul.

**Título:** "Entre más rápido, mejor posición"

**Sistema de tiers (3 cards horizontales):**

🥇 **Top 100** · Fondo dorado semitransparente
"Acceso beta privada + badge exclusivo de Fundador"

🥈 **Top 500** · Fondo azul brillante semitransparente
"Acceso anticipado al lanzamiento"

🥉 **Resto** · Fondo gris azulado
"Lanzamiento general"

**Mecanismo de referidos:**
Card separada debajo con:
- Título: "Sube en la lista invitando amigos"
- "Cada amigo que se una con tu link te sube 10 posiciones"
- Input con link de referido (simulado para el MVP: `ez.app/waitlist?ref=XXXXX`)
- Botón "Copiar link" con ícono de clipboard
- Botones de share: WhatsApp (`https://wa.me/?text=...`), Instagram (copia texto), Twitter/X

---

### SECCIÓN 9: FAQ

**Archivo:** `src/components/sections/FAQ.tsx`

Accordion limpio con 5 preguntas:

1. **¿Cuándo lanza EZ?** — "Estamos en fase de prototipo. El lanzamiento oficial es Q2 2025. Los primeros en la lista serán los primeros en entrar."

2. **¿Es gratis?** — "EZ tendrá un plan gratuito robusto. Los early adopters de la waitlist obtendrán ventajas especiales en el modelo premium."

3. **¿Para quién es EZ?** — "Para cualquier persona que quiera aprender a manejar mejor su dinero, especialmente si eres joven y las finanzas te parecen confusas o aburridas."

4. **¿Qué tan diferentes son las lecciones?** — "Muy cortas (3–5 minutos), interactivas y 100% en español. Nada de teoría aburrida — solo conceptos que puedes aplicar hoy."

5. **¿Está disponible en mi país?** — "Comenzamos en Colombia y México. Próximamente en más países de Latinoamérica."

Estilo del accordion: borde inferior `rgba(74, 158, 255, 0.2)`, sin bordes laterales. Ícono `+`/`-` animado. Respuesta desplegable con animación de altura.

---

### SECCIÓN 10: FOOTER CTA

**Archivo:** `src/components/sections/FooterCTA.tsx`

Sección final con máximo impacto emocional.

Fondo: degradado radial dramático, `#FFB800` con muy baja opacidad (0.05) en el centro sobre `#070E1A`.

Usa `toro-bust.png` (Toro medio cuerpo, guiño) a 120px de altura, mirando al usuario con expresión expectante.

Título en Syne 800, `text-5xl md:text-6xl`, centrado:
"Tu yo del futuro
**te lo va a agradecer.**"

Subtítulo: "Únete a la lista. Es gratis. No te arrepentirás."

Formulario de email repetido (igual que en hero).

Micro-copy: "🔒 Sin spam. Solo te avisamos cuando lanzamos."

---

### NAVBAR

**Archivo:** `src/components/layout/Navbar.tsx`

Sticky, con `backdrop-blur-md` y fondo `rgba(7, 14, 26, 0.8)` al hacer scroll (transparente al inicio).

Contenido:
- Logo EZ en Syne 800 con el slash diagonal estilizado (igual que en la app)
- Links: "Cómo funciona" · "Features" · "FAQ"
- CTA button: "Únete a la lista" en dorado

En mobile: hamburger menu.

---

### ANIMACIONES GLOBALES

En `globals.css` define estas animaciones CSS:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.glow-gold {
  box-shadow: 0 0 40px rgba(255, 184, 0, 0.3);
}

.glow-blue {
  box-shadow: 0 0 40px rgba(74, 158, 255, 0.3);
}
```

---

### METADATA Y SEO

En `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'EZ — Domina tu dinero. Sin aburrirte.',
  description: 'El primer entrenador financiero gamificado para jóvenes latinoamericanos. Aprende finanzas personales como si fuera un videojuego.',
  openGraph: {
    title: 'EZ — Domina tu dinero. Sin aburrirte.',
    description: 'Educación financiera gamificada para jóvenes. Únete a la waitlist.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

---

### SCREENSHOTS DE LA APP

Crea una carpeta `public/screenshots/` y coloca estos archivos exactamente con estos nombres:

**Imágenes de Toro EZ (ya procesadas con fondo transparente):**
- `toro-full.png` → renombrar desde `EZ_thumbs_up_transparent.png` (cuerpo completo, thumbs up, maletín)
- `toro-bust.png` → renombrar desde `EZ_Bust_transparent.png` (medio cuerpo, thumbs up, guiño)
- `toro-celebrating.png` → renombrar desde `EZ_celebrando_transparent.png` (brazos arriba, boca abierta)

**Descripción visual de Toro para referencia:**
Toro es un toro caricatura con piel café oscura, camisa blanca, corbata roja, cinturón café con hebilla dorada, pantalón azul marino y maletín café con billetes verdes. Cuernos amarillos. Expresión amigable y confiada. Estilo flat illustration.

**Screenshots de la app (exportar desde Figma):**
- `screen-login.png` — Pantalla de login: fondo degradado azul, logo EZ, headline "Domina tu dinero, cambia tu futuro", botón "Continuar con Google"
- `screen-home.png` — Dashboard: Toro con speech bubble "¡Buen trabajo!", resumen diario $250.000 COP, gráficas de gastos (Alimentación 60%, Transporte 30%, Otros 10%), racha de 365 días
- `screen-lesson.png` — Pantalla de lección: card con Toro en escenario de ciudad, "Tipos de gastos y por qué importa saberlos", "Lección 2 de 8", sección de Medallas

**Mientras no tengas los screenshots de la app**, usa placeholders así:
```tsx
<div className="w-full h-full bg-gradient-to-b from-[#0D2B5E] to-[#070E1A] flex items-center justify-center rounded-[32px]">
  <span className="text-ez-gray text-sm">[screen-home]</span>
</div>
```

---

### CONSIDERACIONES FINALES DE IMPLEMENTACIÓN

1. **Performance:** Todas las imágenes con `next/image`. Los screenshots del app con `priority={true}` solo en el hero.

2. **Responsive:** Mobile-first. Los breakpoints críticos son `sm` (640px) y `lg` (1024px).

3. **Formulario de waitlist:** Para el MVP, guarda emails en `localStorage` y muestra un número de posición aleatorio entre 300–900. Cuando conectes un backend real, usa Supabase o un simple endpoint de API Route de Next.js.

4. **Contador de waitlist:** Empieza en 847 (hardcodeado) con una animación de conteo al entrar al viewport. Esto genera credibilidad social inmediata.

5. **Imágenes de Toro:** Los 3 PNGs de Toro ya tienen fondo transparente. Úsalos directamente con `next/image` — se integran perfectamente sobre cualquier fondo oscuro de la landing.

6. **Fuentes alternativas si Syne no carga:** Fallback a `'Georgia', serif` para el display font.

---

### ORDEN DE IMPLEMENTACIÓN RECOMENDADO

Construye en este orden para poder previsualizar progreso rápido:

1. Setup + globals.css + tailwind.config.ts
2. Layout + Navbar
3. Hero (la más importante — muestra primero)
4. WaitlistForm component (reutilizable)
5. AppShowcase (impacto visual inmediato)
6. Features + ToroSpotlight
7. Problem + HowItWorks
8. WaitlistMechanics
9. SocialProof + FAQ
10. FooterCTA + Footer

---

*Construye esto con el nivel de calidad de una landing de producto de YC. Cada píxel importa. El objetivo es que un colombiano de 22 años abra esta página y piense "necesito esto ahora mismo".*

---

## NOTAS DE IMPLEMENTACIÓN PARA TI

### Archivos listos para `public/screenshots/`

**✅ Toro EZ — ya tienes estos 3 PNGs con fondo transparente:**
- [ ] `EZ_thumbs_up_transparent.png` → renombrar a `toro-full.png`
- [ ] `EZ_Bust_transparent.png` → renombrar a `toro-bust.png`
- [ ] `EZ_celebrando_transparent.png` → renombrar a `toro-celebrating.png`

**⏳ Screenshots de la app — exportar desde Figma en PNG 2x:**
- [ ] `screen-login.png` — Pantalla de login
- [ ] `screen-home.png` — Dashboard principal
- [ ] `screen-lesson.png` — Pantalla de lección con la card de Toro

### Próximos pasos después del MVP visual
1. **Backend de waitlist:** Conecta con [Loops.so](https://loops.so) (gratis hasta 1000 contactos) o Supabase para guardar emails reales
2. **Analytics:** Agrega Vercel Analytics (gratis) desde el día 1
3. **Dominio:** `getez.app` o `ezfinanzas.co` son opciones disponibles — revísalas en Namecheap
4. **OG Image:** Crea una imagen 1200x630 para compartir en redes con Toro EZ y el headline

### Componentes de 21st.dev recomendados para buscar
- "Animated counter" — para el contador de waitlist
- "Glow card" — para las feature cards
- "Waitlist form" — formulario con animación de confirmación
- "Phone mockup" — frame de teléfono para los screenshots
- "Accordion" — para el FAQ
- "Floating badge" — para el social proof badge del hero
