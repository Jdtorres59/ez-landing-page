# EZ Landing Page — Prompt de Mejoras Visuales V2
## Para usar en Claude Code / Cursor después de revisar la V1

---

## CONTEXTO

La V1 de la landing page de EZ está construida y funcional. La estructura, el copy y la tipografía están bien. Ahora necesitamos elevar el impacto visual al siguiente nivel.

**El problema concreto:** La página se ve "correcta" pero no se ve "wow". Le faltan las animaciones y efectos visuales que hacen que alguien la abra y piense "¿cómo hicieron esto?".

**El objetivo de esta iteración:** Agregar la capa de animación y efectos visuales que conviertan una landing buena en una landing memorable.

---

## DIAGNÓSTICO VISUAL DE LA V1

### ✅ Lo que está bien — NO tocar
- Tipografía (Syne + DM Sans) — funciona perfectamente
- Copy en todas las secciones — no cambiar nada
- Colores y paleta — correctos
- Layout general y estructura de secciones — mantener
- Toro EZ en el hero con el glow dorado — está bien, solo potenciar
- El navbar sticky con blur — dejarlo como está

### ❌ Lo que necesita mejora urgente

1. **Hero:** El fondo es un degradado plano. Necesita vida — partículas, elementos flotantes o un efecto de profundidad animado.
2. **AppShowcase:** Los mockups están vacíos (placeholders). Es la sección más débil. Necesita rediseño completo mientras llegan los screenshots reales.
3. **Secciones intermedias:** Todas tienen el mismo fondo oscuro plano. Necesitan variación de profundidad, separadores con forma, y efectos de luz.
4. **Scroll experience:** No hay ningún efecto que sorprenda al hacer scroll. Necesita al menos un momento "wow" al bajar la página.
5. **Footer CTA:** Toro es muy pequeño y la sección se siente vacía. Necesita más presencia visual.
6. **Partículas/ambiente:** La página se siente estática. Necesita elementos flotantes sutiles que den sensación de que algo vivo está pasando.

---

## MEJORAS A IMPLEMENTAR

### MEJORA 1 — Hero: Fondo animado con partículas financieras

Reemplaza el fondo estático del hero por un canvas animado con Framer Motion o CSS puro.

**Opción A (recomendada) — Partículas flotantes:**
Crea un componente `HeroBackground.tsx` que renderice ~25 elementos flotantes en posiciones random:
- Símbolos financieros: `$`, `%`, `+`, `↑`, `₿`, `📈` en tamaños `text-lg` a `text-4xl`
- Color: `rgba(255, 184, 0, 0.08)` a `rgba(74, 158, 255, 0.06)` — MUY sutiles, casi invisibles
- Cada elemento tiene animación `y: [0, -30, 0]` con duration entre 6s y 14s (random por elemento)
- Posiciones fijas en porcentajes para que no se muevan al hacer resize

```tsx
// Ejemplo de un elemento partícula
<motion.div
  className="absolute text-2xl select-none pointer-events-none"
  style={{ left: '15%', top: '20%', color: 'rgba(255,184,0,0.07)' }}
  animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
>
  $
</motion.div>
```

**Opción B — Líneas de grid animadas:**
Agrega un SVG de fondo con líneas de grid perspectiva (estilo synthwave/retrowave) que convergen en el horizonte. Las líneas tienen un gradiente que va de invisible en el borde a `rgba(74, 158, 255, 0.1)` en el centro.

**Implementa AMBAS opciones juntas** — partículas encima del grid.

---

### MEJORA 2 — Hero: Efecto de luz dinámica detrás de Toro

El glow dorado detrás de Toro actualmente es estático. Anímalo:

```tsx
// El div de glow detrás de Toro
<motion.div
  className="absolute rounded-full"
  style={{
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,184,0,0.25) 0%, transparent 70%)',
    filter: 'blur(40px)',
  }}
  animate={{
    scale: [1, 1.15, 1],
    opacity: [0.6, 1, 0.6],
  }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
/>
```

Además, agrega un segundo glow azul más grande y lento detrás del dorado:
```tsx
// Glow azul exterior
style={{
  width: '600px',
  height: '600px', 
  background: 'radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)',
}}
animate={{ scale: [1, 1.08, 1] }}
transition={{ duration: 5, repeat: Infinity }}
```

---

### MEJORA 3 — AppShowcase: Rediseño completo del placeholder

Los mockups vacíos arruinan la sección. Mientras no lleguen los screenshots reales, reemplázalos con mockups que simulen la UI real de EZ.

**Implementación:** En lugar de imágenes, renderiza la UI de la app con HTML/CSS dentro del frame del teléfono.

**Mockup 1 — Pantalla de Login:**
```tsx
<div className="w-full h-full bg-gradient-to-b from-[#0D2B5E] to-[#070E1A] flex flex-col items-center justify-center p-6 gap-4">
  {/* Logo EZ */}
  <div className="text-white font-black text-3xl mb-4">E<span className="text-ez-gold">/</span>Z</div>
  {/* Headline */}
  <div className="text-white font-bold text-lg text-center leading-tight">
    Domina tu dinero,<br/>
    <span className="text-ez-gold">cambia tu futuro</span>
  </div>
  {/* Botón Google */}
  <div className="w-full bg-white rounded-2xl py-3 px-4 flex items-center gap-3 mt-4">
    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-red-500"/>
    <span className="text-gray-800 text-sm font-medium">Continuar con Google</span>
  </div>
</div>
```

**Mockup 2 — Dashboard:**
```tsx
<div className="w-full h-full bg-[#0A1628] flex flex-col p-4 gap-3">
  {/* Header */}
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-1">
      <span className="text-orange-400">🔥</span>
      <span className="text-white font-bold text-sm">365</span>
    </div>
    <div className="text-white font-bold text-sm">E/Z</div>
  </div>
  {/* Toro mini + mensaje */}
  <div className="bg-[#1A3F7A] rounded-xl p-3 flex items-center gap-2">
    <div className="w-8 h-8 bg-orange-400 rounded-full"/> {/* placeholder toro */}
    <span className="text-white text-xs">¡Llevas 4 días registrando gastos! 👏</span>
  </div>
  {/* Balance */}
  <div className="text-center">
    <div className="text-ez-gray text-xs">Resumen diario</div>
    <div className="text-white font-bold text-xl">$250.000 COP</div>
  </div>
  {/* Barras de gasto */}
  {[['Alimentación', '60%', '#FFB800'], ['Transporte', '30%', '#4A9EFF'], ['Otros', '10%', '#50C878']].map(([label, pct, color]) => (
    <div key={label} className="flex items-center gap-2">
      <span className="text-white text-xs w-20">{label}</span>
      <div className="flex-1 h-2 bg-[#1A3F7A] rounded-full">
        <div className="h-full rounded-full" style={{ width: pct, backgroundColor: color }}/>
      </div>
    </div>
  ))}
</div>
```

**Mockup 3 — Lección:**
```tsx
<div className="w-full h-full bg-[#0A1628] flex flex-col items-center p-4 gap-3">
  <div className="text-white font-bold text-sm">E/Z</div>
  {/* Card de lección */}
  <div className="w-full bg-gradient-to-b from-[#1A3F7A] to-[#0D2B5E] rounded-xl p-4 flex flex-col items-center gap-2">
    <div className="w-12 h-12 bg-orange-400 rounded-full"/> {/* toro */}
    <div className="text-white text-xs font-bold text-center">Tipos de gastos y por qué importa saberlos</div>
    <div className="text-ez-gray text-xs">Lección 2 de 8</div>
  </div>
  {/* Medallas */}
  <div className="text-white font-bold text-sm">Medallas</div>
  {['🥇 Ahorro inteligente', '🥈 Sin gastos extra', '🥉 Racha de 7 días'].map(m => (
    <div key={m} className="text-white text-xs">{m}</div>
  ))}
  {/* Progress */}
  <div className="w-full bg-[#1A3F7A] rounded-xl py-2 px-3 mt-auto">
    <div className="text-white text-xs text-center font-bold">Lecciones: 1 de 8</div>
  </div>
</div>
```

**Importante:** Cada mockup debe tener el `overflow-hidden` en el PhoneMockup wrapper para que el contenido quede dentro del frame del teléfono.

---

### MEJORA 4 — Scroll reveal con efecto "número contador" en SocialProof

El `847+` y las otras métricas deben animarse contando desde 0 cuando el usuario llega a esa sección.

Instala o crea un hook `useCountUp`:
```tsx
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  
  return { count, ref };
}
```

---

### MEJORA 5 — Separadores de sección con forma (clip-path)

Entre las secciones actualmente hay cortes rectos que se ven abruptos. Reemplaza los bordes horizontales con formas diagonales o curvas:

```css
/* Separador diagonal — agrega al final de cada sección que necesite separación */
.section-diagonal-bottom {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

.section-diagonal-top {
  clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
}

/* Separador curvo */
.section-curve-bottom::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: #070E1A; /* color de la siguiente sección */
  clip-path: ellipse(55% 100% at 50% 100%);
}
```

Aplica esto específicamente entre: Hero → SocialProof, HowItWorks → AppShowcase, Features → ToroSpotlight.

---

### MEJORA 6 — ToroSpotlight: Efecto de luz volumétrica

En la sección de Toro Spotlight, agrega rayos de luz que emanan desde detrás de Toro hacia afuera, como un efecto de "aura":

```tsx
{/* Rayos de luz — posicionados detrás de Toro */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  {[...Array(8)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute origin-center"
      style={{
        width: '2px',
        height: '200px',
        background: `linear-gradient(to top, rgba(255,184,0,0.3), transparent)`,
        rotate: `${i * 45}deg`,
        transformOrigin: 'bottom center',
        bottom: '50%',
      }}
      animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.8, 1.1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
    />
  ))}
</div>
```

---

### MEJORA 7 — FooterCTA: Toro más grande + efecto de aparición dramática

El Toro en el footer es demasiado pequeño. Cámbialo a 200px de altura mínima.

Además, agrégale una animación de entrada dramática cuando el usuario llega al footer:

```tsx
<motion.div
  initial={{ y: 60, opacity: 0, scale: 0.8 }}
  whileInView={{ y: 0, opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} // spring bounce
  viewport={{ once: true }}
>
  <Image src="/screenshots/toro-bust.png" width={200} height={240} alt="Toro EZ" />
</motion.div>
```

---

### MEJORA 8 — Efecto "XP ganado" flotante al hacer hover en Features

En las cards de features, cuando el usuario hace hover, aparece un elemento flotante que sube y desaparece — como cuando ganas puntos en un videojuego:

```tsx
const [showXP, setShowXP] = useState(false);

// En la card
onMouseEnter={() => setShowXP(true)}
onMouseLeave={() => setShowXP(false)}

// El elemento flotante
{showXP && (
  <motion.div
    className="absolute -top-4 right-4 text-ez-gold font-bold text-sm pointer-events-none"
    initial={{ y: 0, opacity: 1 }}
    animate={{ y: -20, opacity: 0 }}
    transition={{ duration: 0.8 }}
    onAnimationComplete={() => setShowXP(false)}
  >
    +10 XP ⭐
  </motion.div>
)}
```

---

### MEJORA 9 — Línea de progreso animada en HowItWorks

La línea conectora entre los 3 pasos debe animarse de izquierda a derecha cuando la sección entra al viewport, como una barra de carga:

```tsx
<motion.div
  className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-ez-gold to-ez-blue-bright"
  style={{ width: '100%' }}
  initial={{ scaleX: 0, originX: 0 }}
  whileInView={{ scaleX: 1 }}
  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
  viewport={{ once: true }}
/>
```

---

### MEJORA 10 — Cursor personalizado (solo desktop)

Agrega un cursor custom que reemplaza el cursor default con un pequeño símbolo `$` o punto dorado:

```css
/* En globals.css */
@media (min-width: 1024px) {
  * { cursor: none !important; }
  
  .custom-cursor {
    position: fixed;
    width: 12px;
    height: 12px;
    background: #FFB800;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
  }
}
```

```tsx
// Componente CustomCursor.tsx
'use client'
import { useEffect, useState } from 'react'
export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      className="custom-cursor hidden lg:block"
      style={{ left: pos.x - 6, top: pos.y - 6 }}
    />
  )
}
```

Agrega `<CustomCursor />` en el layout principal.

---

## ORDEN DE IMPLEMENTACIÓN RECOMENDADO

Implementa en este orden para ver el mayor impacto visual primero:

1. **Mejora 3** — Mockups reales en AppShowcase (el cambio más visible)
2. **Mejora 1** — Partículas en el hero (segundo cambio más visible)
3. **Mejora 2** — Glow animado detrás de Toro
4. **Mejora 7** — Toro más grande en footer
5. **Mejora 9** — Línea animada en HowItWorks
6. **Mejora 8** — XP flotante en Features
7. **Mejora 6** — Rayos de luz en ToroSpotlight
8. **Mejora 5** — Separadores diagonales entre secciones
9. **Mejora 4** — Contador animado en SocialProof
10. **Mejora 10** — Cursor personalizado (opcional, último)

---

## VERIFICACIÓN FINAL

Después de implementar, revisa:
- [ ] Las partículas del hero no distraen del copy — deben ser casi invisibles
- [ ] Los mockups se ven dentro del frame del teléfono con overflow hidden
- [ ] El glow de Toro pulsa suavemente sin ser epiléptico
- [ ] Los separadores diagonales no rompen el layout en mobile
- [ ] El cursor custom funciona solo en desktop (hidden en mobile)
- [ ] Las animaciones de scroll usan `viewport={{ once: true }}` para no repetirse
- [ ] `npm run build` sin errores de TypeScript

---

*El objetivo es que alguien abra esta página en su celular o computador y la primera reacción sea "wow, esto se ve increíble" — antes de leer una sola palabra.*
