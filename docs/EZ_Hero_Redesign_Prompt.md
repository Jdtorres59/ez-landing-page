# EZ — Prompt de Rediseño Hero Mobile-First
## Layout nuevo + animación de entrada cinematográfica

---

## CONTEXTO

El hero actual tiene a Toro en dos columnas (texto izquierda, Toro derecha). En mobile esto hace que Toro quede pequeño y la animación no impacta. Vamos a rediseñar el hero completamente para mobile-first.

**Lo que hay que eliminar del código actual:**
- El speech bubble de Toro ("¡Yo te enseño. Sin rollos!")
- El efecto de +10 XP al hacer click
- Las partículas que estén en tamaño mayor a `text-sm` o con opacidad mayor a 0.12

**Lo que hay que mantener:**
- Las partículas de fondo ($, %, ↑, etc.) — solo reducir tamaño a `text-xs` o `text-sm` máximo y opacidad a 0.08-0.12
- El glow detrás de Toro
- La animación idle de float

---

## NUEVO LAYOUT DEL HERO

### Mobile (< 1024px) — Layout vertical, Toro protagonista

```
┌─────────────────────────┐
│                         │
│    [badge pill]         │  ← pequeño, arriba
│                         │
│   ╔═══════════════╗     │
│   ║               ║     │
│   ║   TORO EZ     ║     │  ← 65% del viewport width
│   ║   grande      ║     │     centrado
│   ║               ║     │
│   ╚═══════════════╝     │
│                         │
│  Aprende finanzas.      │  ← headline
│  Gana en la vida.       │
│                         │
│  La primera app...      │  ← subheadline
│                         │
│  [input] [Únete gratis] │  ← formulario
│                         │
│  Sin spam · Sin tarjeta │
│  🔥 847+ ya en la lista │
└─────────────────────────┘
```

### Desktop (≥ 1024px) — Layout dos columnas, mantener como está

```
┌─────────────────────────────────────────┐
│  [badge]                                │
│                                         │
│  Aprende finanzas.      [TORO EZ]       │
│  Gana en la vida.       grande          │
│                         con glow        │
│  La primera app...                      │
│                                         │
│  [input email] [Únete gratis →]         │
│                                         │
│  Sin spam · 847+ en lista               │
└─────────────────────────────────────────┘
```

---

## ESPECIFICACIONES DE TORO EN MOBILE

```tsx
// Tamaño de Toro en mobile
<div className="relative w-[65vw] max-w-[280px] mx-auto">
  <Image
    src="/screenshots/toro-full.png"
    alt="Toro EZ"
    width={280}
    height={350}
    priority
    className="w-full h-auto drop-shadow-2xl"
  />
</div>
```

- Ancho: `65vw` con máximo de `280px`
- Centrado horizontalmente
- `drop-shadow-2xl` para profundidad
- El glow va detrás, centrado bajo Toro

---

## SECUENCIA DE ANIMACIÓN — MOBILE

Timeline exacto al cargar la página:

```
0ms      → Todo invisible
0-500ms  → Fondo hero aparece (fade in del degradado)
0-700ms  → Partículas de fondo aparecen muy sutilmente (opacity 0 → 0.10)
200-900ms → Toro sube desde y:80px con spring bounce
             initial: { y: 80, opacity: 0, scale: 0.85 }
             animate: { y: 0, opacity: 1, scale: 1 }
             transition: { type: "spring", stiffness: 180, damping: 14 }
700ms    → Glow explota detrás de Toro
             initial: { scale: 0, opacity: 0 }
             animate: { scale: 1, opacity: 1 }
             transition: { duration: 0.5, ease: "backOut" }
900ms    → Badge pill aparece (fade + slide down desde y:-10)
1000ms   → Headline aparece (fade + slide up desde y:20)
1150ms   → Subheadline aparece (fade + slide up)
1300ms   → Formulario aparece (fade + slide up)
1500ms   → Contador "847+ en lista" aparece
1500ms+  → Idle loop de Toro comienza (float suave)
```

Implementar con `useAnimation` y `variants` de Framer Motion para el stagger:

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.9, // espera a que Toro aterrice
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}
```

---

## GLOW DE TORO — VERSIÓN MEJORADA

Tres capas de glow para efecto de profundidad real:

```tsx
{/* Capa 1 — sombra base muy difusa */}
<motion.div
  className="absolute rounded-full pointer-events-none"
  style={{
    width: '110%',
    height: '60%',
    bottom: '-5%',
    left: '-5%',
    background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
    filter: 'blur(20px)',
    zIndex: 0,
  }}
/>

{/* Capa 2 — glow azul exterior lento */}
<motion.div
  className="absolute rounded-full pointer-events-none"
  style={{
    width: '120%',
    height: '120%',
    top: '-10%',
    left: '-10%',
    background: 'radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 65%)',
    filter: 'blur(25px)',
    zIndex: 0,
  }}
  animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
/>

{/* Capa 3 — glow dorado interior, pulso de latido */}
<motion.div
  className="absolute rounded-full pointer-events-none"
  style={{
    width: '80%',
    height: '80%',
    top: '10%',
    left: '10%',
    background: 'radial-gradient(circle, rgba(255,184,0,0.20) 0%, transparent 60%)',
    filter: 'blur(15px)',
    zIndex: 0,
  }}
  animate={{ scale: [1, 1.08, 0.97, 1.08, 1], opacity: [0.7, 1, 0.8, 1, 0.7] }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
/>
```

---

## PARTÍCULAS DE FONDO — VERSIÓN CORREGIDA

Reemplaza las partículas actuales con esta versión más sutil:

```tsx
const bgParticles = [
  { symbol: '$',  top: '8%',  left: '5%',  size: 14, opacity: 0.09, duration: 8 },
  { symbol: '%',  top: '15%', left: '88%', size: 12, opacity: 0.08, duration: 11 },
  { symbol: '↑',  top: '30%', left: '92%', size: 13, opacity: 0.10, duration: 9 },
  { symbol: '$',  top: '55%', left: '3%',  size: 11, opacity: 0.08, duration: 13 },
  { symbol: 'B',  top: '20%', left: '78%', size: 12, opacity: 0.07, duration: 10 },
  { symbol: '%',  top: '70%', left: '90%', size: 10, opacity: 0.09, duration: 12 },
  { symbol: '↑',  top: '80%', left: '8%',  size: 11, opacity: 0.08, duration: 7  },
  { symbol: '$',  top: '45%', left: '95%', size: 12, opacity: 0.07, duration: 14 },
  { symbol: '%',  top: '90%', left: '20%', size: 10, opacity: 0.09, duration: 9  },
  { symbol: '$',  top: '5%',  left: '40%', size: 11, opacity: 0.07, duration: 11 },
]

// Renderizado
{bgParticles.map((p, i) => (
  <motion.div
    key={i}
    className="absolute select-none pointer-events-none font-bold"
    style={{
      top: p.top,
      left: p.left,
      fontSize: `${p.size}px`,
      color: `rgba(${i % 2 === 0 ? '255,184,0' : '74,158,255'}, ${p.opacity})`,
      zIndex: 0,
    }}
    animate={{ y: [0, -20, 0] }}
    transition={{
      duration: p.duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.4,
    }}
  >
    {p.symbol}
  </motion.div>
))}
```

---

## IDLE LOOP DE TORO — POST ENTRADA

Después de que termina la animación de entrada, Toro entra en idle:

```tsx
// Usar useAnimation para secuenciar
const toroControls = useAnimation()

useEffect(() => {
  async function runSequence() {
    // Entrada
    await toroControls.start({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 14, delay: 0.2 }
    })
    // Idle loop inmediatamente después
    toroControls.start({
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    })
  }
  runSequence()
}, [toroControls])
```

---

## AJUSTES FINALES

1. **Eliminar** el componente `TypewriterBubble` completamente
2. **Eliminar** la lógica de `xpBursts` y el handler `handleToroTap`
3. **Eliminar** el `cursor-pointer` y `whileTap` de Toro — ya no es clickeable
4. **Verificar** que en desktop el layout siga siendo dos columnas sin cambios
5. **Asegurar** que el badge pill ("Lanzamiento Q2 2025 · Colombia") aparezca ANTES de Toro en mobile para dar contexto inmediato

---

## VERIFICACIÓN

Probar en estos viewports:
- [ ] 375px (iPhone SE) — Toro debe ocupar ~65% del ancho
- [ ] 390px (iPhone 14) — mismo
- [ ] 768px (iPad) — debe verse como mobile (una columna)
- [ ] 1024px (desktop mínimo) — debe cambiar a dos columnas
- [ ] 1440px (desktop estándar) — layout desktop completo

La secuencia de animación completa debe durar máximo 1.5 segundos desde que carga la página hasta que todo está visible.

---

*El objetivo es simple: en mobile, Toro es lo primero que ves. Grande, con glow, aterrizando con energía. Luego el texto. Luego el formulario. En ese orden.*
