# EZ — Prompt de Animación Hero con Toro EZ
## Animación cinematográfica mobile-first para el hero

---

## CONTEXTO

La landing de EZ ya está construida y funcional. Ahora necesitamos elevar la animación de Toro EZ en el hero a nivel cinematográfico, optimizada principalmente para mobile.

**Archivos existentes relevantes:**
- `public/screenshots/toro-full.png` — Toro cuerpo completo, thumbs up
- `public/screenshots/toro-bust.png` — Toro medio cuerpo, guiño
- `public/screenshots/toro-celebrating.png` — Toro brazos arriba celebrando
- `src/components/sections/Hero.tsx` — sección hero actual
- `src/components/ui/ToroCharacter.tsx` — componente actual de Toro

**Stack disponible:** Framer Motion (ya instalado), Tailwind CSS, Next.js 14

---

## LO QUE HAY QUE CONSTRUIR

### Componente nuevo: `src/components/ui/ToroHero.tsx`

Reemplaza el `ToroCharacter.tsx` actual en el hero por este nuevo componente con las siguientes animaciones en secuencia:

---

### SECUENCIA DE ANIMACIÓN (timeline)

```
0ms     — Toro invisible, posicionado 120px abajo de su posición final
0-600ms — Toro sube con bounce dramático a su posición final
          ease: spring { stiffness: 200, damping: 15 }
600ms   — Glow dorado aparece detrás de Toro (fade in 400ms)
800ms   — Speech bubble aparece desde arriba con efecto typewriter
1000ms  — Partículas empiezan a flotar alrededor
1200ms  — Animación idle loop comienza (float suave)
```

---

### ANIMACIÓN 1 — Entrada con bounce

```tsx
// Toro entra desde abajo
initial={{ y: 120, opacity: 0, scale: 0.8 }}
animate={{ y: 0, opacity: 1, scale: 1 }}
transition={{
  type: "spring",
  stiffness: 200,
  damping: 15,
  duration: 0.6
}}
```

---

### ANIMACIÓN 2 — Idle loop (después de la entrada)

Después de que termina la entrada, Toro entra en loop idle suave:

```tsx
// Float suave continuo
animate={{ 
  y: [0, -10, 0],
  rotate: [-1, 1, -1]
}}
transition={{ 
  duration: 4, 
  repeat: Infinity, 
  ease: "easeInOut",
  delay: 0.6 // espera a que termine la entrada
}}
```

Implementa esto con `useAnimation` de Framer Motion para secuenciar entrada → idle:

```tsx
const controls = useAnimation()

useEffect(() => {
  async function sequence() {
    // Entrada
    await controls.start({
      y: 0, opacity: 1, scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    })
    // Idle loop
    controls.start({
      y: [0, -10, 0],
      rotate: [-1, 1, -1],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    })
  }
  sequence()
}, [])
```

---

### ANIMACIÓN 3 — Glow pulsante detrás de Toro

Dos capas de glow, una encima de la otra:

```tsx
{/* Glow exterior azul — lento */}
<motion.div
  className="absolute rounded-full pointer-events-none"
  style={{
    width: '280px',
    height: '280px',
    background: 'radial-gradient(circle, rgba(74,158,255,0.15) 0%, transparent 70%)',
    filter: 'blur(30px)',
    zIndex: 0,
  }}
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ 
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.15, 1]
  }}
  transition={{ 
    duration: 4, 
    repeat: Infinity, 
    ease: "easeInOut",
    delay: 0.6
  }}
/>

{/* Glow interior dorado — rápido, como latido */}
<motion.div
  className="absolute rounded-full pointer-events-none"
  style={{
    width: '180px',
    height: '180px',
    background: 'radial-gradient(circle, rgba(255,184,0,0.25) 0%, transparent 70%)',
    filter: 'blur(20px)',
    zIndex: 0,
  }}
  initial={{ opacity: 0 }}
  animate={{ 
    opacity: [0.5, 1, 0.5],
    scale: [0.95, 1.1, 0.95]
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity, 
    ease: "easeInOut",
    delay: 0.8
  }}
/>
```

---

### ANIMACIÓN 4 — Speech bubble con typewriter

El speech bubble aparece sobre Toro con el texto apareciendo letra por letra:

```tsx
// Componente TypewriterBubble
'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function TypewriterBubble({ text, delay = 0.8 }: { text: string, delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 45) // velocidad de tipeo en ms
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: started ? 1 : 0, y: started ? 0 : -10, scale: started ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
      style={{ zIndex: 10 }}
    >
      <div
        className="bg-white text-ez-dark text-sm font-bold px-4 py-2 rounded-2xl shadow-lg relative"
        style={{ minWidth: '180px', textAlign: 'center' }}
      >
        {displayed}
        {displayed.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
        {/* Cola del bubble */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid white',
          }}
        />
      </div>
    </motion.div>
  )
}
```

Texto del speech bubble: `"¡Yo te enseño. Sin rollos! 🤙"`

---

### ANIMACIÓN 5 — Partículas flotantes alrededor de Toro

8 partículas financieras que orbitan alrededor de Toro en posiciones fijas:

```tsx
const particles = [
  { symbol: '$', x: '-60px', y: '-20px', size: 'text-xl', delay: 0, duration: 6 },
  { symbol: '↑', x: '70px',  y: '-40px', size: 'text-lg', delay: 0.5, duration: 7 },
  { symbol: '%', x: '-70px', y: '40px',  size: 'text-sm', delay: 1, duration: 8 },
  { symbol: '💰', x: '65px', y: '30px',  size: 'text-base', delay: 0.3, duration: 5 },
  { symbol: '📈', x: '-40px', y: '-60px', size: 'text-sm', delay: 0.8, duration: 9 },
  { symbol: '+XP', x: '50px', y: '-65px', size: 'text-xs', delay: 1.2, duration: 6 },
  { symbol: '⭐', x: '-55px', y: '65px',  size: 'text-sm', delay: 0.6, duration: 7 },
  { symbol: '🔥', x: '60px',  y: '65px',  size: 'text-sm', delay: 1.5, duration: 8 },
]

// Renderizado de cada partícula
{particles.map((p, i) => (
  <motion.div
    key={i}
    className={`absolute ${p.size} select-none pointer-events-none font-bold`}
    style={{
      left: `calc(50% + ${p.x})`,
      top: `calc(50% + ${p.y})`,
      color: i % 2 === 0 ? 'rgba(255,184,0,0.6)' : 'rgba(74,158,255,0.6)',
      zIndex: 5,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.8, 0],
      scale: [0, 1, 1, 0.8],
      y: [0, -15, -8, -20],
    }}
    transition={{
      duration: p.duration,
      repeat: Infinity,
      delay: p.delay + 1.2, // empiezan después de que Toro aterrizó
      ease: "easeInOut",
    }}
  />
))}
```

---

### ANIMACIÓN 6 — Tap/Click: confetti de XP

Cuando el usuario toca/hace click en Toro, explota confetti de `+XP`:

```tsx
const [xpBursts, setXpBursts] = useState<{ id: number, x: number, y: number }[]>([])

function handleToroTap() {
  const newBurst = { id: Date.now(), x: Math.random() * 60 - 30, y: Math.random() * -40 - 10 }
  setXpBursts(prev => [...prev, newBurst])
  setTimeout(() => {
    setXpBursts(prev => prev.filter(b => b.id !== newBurst.id))
  }, 1000)
}

// En la imagen de Toro
onClick={handleToroTap}
className="cursor-pointer"

// Renderizado de bursts
{xpBursts.map(burst => (
  <motion.div
    key={burst.id}
    className="absolute text-ez-gold font-black text-lg pointer-events-none select-none"
    style={{ left: `calc(50% + ${burst.x}px)`, top: '30%', zIndex: 20 }}
    initial={{ opacity: 1, y: 0, scale: 1 }}
    animate={{ opacity: 0, y: -60, scale: 1.3 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    +10 XP ⭐
  </motion.div>
))}
```

---

### LAYOUT COMPLETO del componente ToroHero

```tsx
'use client'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ToroHero() {
  // ... todos los estados y efectos descritos arriba

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Contenedor principal — posición relativa para los elementos absolutos */}
      <div className="relative w-64 h-72 md:w-80 md:h-96 flex items-center justify-center">
        
        {/* Glow exterior azul */}
        {/* ... */}
        
        {/* Glow interior dorado */}
        {/* ... */}
        
        {/* Partículas */}
        {/* ... */}
        
        {/* Speech bubble */}
        <TypewriterBubble text="¡Yo te enseño. Sin rollos! 🤙" delay={0.8} />
        
        {/* Toro — elemento principal */}
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.8 }}
          animate={controls}
          onClick={handleToroTap}
          className="relative cursor-pointer z-10"
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/screenshots/toro-full.png"
            alt="Toro EZ"
            width={220}
            height={280}
            priority
            className="drop-shadow-2xl"
          />
        </motion.div>
        
        {/* XP Bursts */}
        {/* ... */}
        
      </div>
    </div>
  )
}
```

---

### AJUSTES EN Hero.tsx

En `src/components/sections/Hero.tsx`:

1. Reemplaza el `<ToroCharacter>` actual por `<ToroHero>`
2. En mobile (por debajo de `lg`), el layout debe ser **una sola columna centrada**:
   - Primero: `<ToroHero>` centrado, tamaño grande
   - Luego: badge, H1, subheadline, formulario
3. En desktop (`lg+`): mantener dos columnas (texto izquierda, Toro derecha)

```tsx
// Layout mobile-first en Hero.tsx
<section className="min-h-screen flex items-center">
  <div className="container mx-auto px-4">
    
    {/* Mobile: columna única */}
    <div className="flex flex-col lg:hidden items-center gap-6 pt-20 pb-10">
      <ToroHero />
      {/* badge, h1, subhead, form */}
    </div>
    
    {/* Desktop: dos columnas */}
    <div className="hidden lg:grid grid-cols-2 gap-12 items-center min-h-screen">
      <div>{/* badge, h1, subhead, form */}</div>
      <div><ToroHero /></div>
    </div>
    
  </div>
</section>
```

---

### CONSIDERACIONES MOBILE

- El tamaño de Toro en mobile debe ser `w-48 h-60` (192x240px) — suficientemente grande para impactar sin ocupar toda la pantalla
- Las partículas en mobile deben tener opacidad reducida (`0.5` en lugar de `0.8`) para no distraer del copy
- El speech bubble debe estar en `font-size: 12px` en mobile para no desbordarse
- `whileTap` en lugar de `whileHover` para el efecto de tap en mobile
- Asegúrate de que `touch-action: none` no interfiera con el scroll

---

### PERFORMANCE

- Todas las animaciones usan `transform` y `opacity` — no causan reflow
- Las partículas usan `will-change: transform` implícito via Framer Motion
- El componente es `'use client'` — se hidrata en el cliente sin bloquear el servidor
- Las imágenes de Toro tienen `priority={true}` para cargar primero

---

## INSTRUCCIONES PARA CLAUDE CODE

1. Crea `src/components/ui/ToroHero.tsx` con todo el código descrito
2. Actualiza `src/components/sections/Hero.tsx` para usar `ToroHero` y el layout mobile-first
3. Elimina o archiva `src/components/ui/ToroCharacter.tsx` si ya no se usa en otro lugar
4. Verifica que no haya errores de TypeScript con `npm run build`
5. Prueba en mobile usando DevTools con viewport de 375px (iPhone SE)

---

*El objetivo es que cuando alguien abra la landing en su celular, Toro aterrice en pantalla, el glow pulse, las partículas floten, y el speech bubble aparezca letra por letra — todo en los primeros 2 segundos. Esa primera impresión es lo que hace que alguien se quede y se registre.*
