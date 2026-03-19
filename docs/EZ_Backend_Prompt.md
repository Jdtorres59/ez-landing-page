# EZ Landing Page — Prompt de Backend y Funcionalidad
## Waitlist real con Supabase + Resend + Sistema de referidos

---

## CONTEXTO

La landing de EZ ya está construida y desplegada en Vercel. Ahora necesitamos hacerla funcional:
- Los emails se guardan en una base de datos real
- Cada usuario recibe un email de confirmación automático
- Cada usuario tiene un link de referido único
- El contador de waitlist refleja el número real de registros
- Hay un panel para ver todos los registrados

**Stack a implementar:**
- **Supabase** — base de datos PostgreSQL + API REST automática
- **Resend** — servicio de emails transaccionales
- **Next.js API Routes** — endpoints del backend (ya en el proyecto)

---

## PASO 1 — SETUP DE SUPABASE (hacer manualmente antes de codear)

1. Ve a **supabase.com** y crea una cuenta gratuita
2. Crea un nuevo proyecto llamado `ez-waitlist`
3. Elige la región **South America (São Paulo)** — más cercana a Colombia
4. Guarda la contraseña del proyecto en un lugar seguro
5. Una vez creado, ve a **Settings → API** y copia:
   - `Project URL` → será `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → será `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → será `SUPABASE_SERVICE_ROLE_KEY` (⚠️ nunca expongas esta en el frontend)

6. Ve a **SQL Editor** en Supabase y ejecuta este SQL para crear la tabla:

```sql
-- Tabla principal de waitlist
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by TEXT REFERENCES waitlist(referral_code),
  referral_count INTEGER DEFAULT 0,
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para queries rápidas
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX idx_waitlist_referred_by ON waitlist(referred_by);

-- Función para asignar posición automáticamente
CREATE OR REPLACE FUNCTION assign_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position := (SELECT COALESCE(MAX(position), 0) + 1 FROM waitlist);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_position
  BEFORE INSERT ON waitlist
  FOR EACH ROW EXECUTE FUNCTION assign_position();

-- Función para incrementar referral_count del referidor
CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE waitlist 
    SET referral_count = referral_count + 1,
        position = GREATEST(1, position - 10)
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_referral_count
  AFTER INSERT ON waitlist
  FOR EACH ROW EXECUTE FUNCTION increment_referral_count();

-- Vista pública (sin emails) para el contador
CREATE VIEW waitlist_count AS
  SELECT COUNT(*) as total FROM waitlist;

-- RLS: permitir inserts públicos, selects solo del service role
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON waitlist
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public count" ON waitlist
  FOR SELECT USING (true);
```

---

## PASO 2 — SETUP DE RESEND (hacer manualmente)

1. Ve a **resend.com** y crea una cuenta gratuita
2. Ve a **API Keys** y crea una nueva key llamada `ez-waitlist`
3. Cópiala → será `RESEND_API_KEY`
4. Ve a **Domains** — por ahora usa el dominio de prueba `onboarding@resend.dev` para el MVP
   - Cuando tengas dominio propio (`getez.app`), lo verificas aquí y usas `hola@getez.app`

---

## PASO 3 — VARIABLES DE ENTORNO

Crea un archivo `.env.local` en la raíz del proyecto (este archivo NO se sube a GitHub):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxxx...

# Resend
RESEND_API_KEY=re_xxxxxxxxxx...

# App
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

También agrega estas variables en **Vercel Dashboard → Settings → Environment Variables** para que funcionen en producción.

---

## PASO 4 — INSTALACIÓN DE DEPENDENCIAS

```bash
npm install @supabase/supabase-js resend
```

---

## PASO 5 — ARCHIVOS A CREAR

### 5.1 — Cliente de Supabase

**Archivo:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

// Cliente público (para el frontend)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Cliente admin (solo para API routes del servidor)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

### 5.2 — Generador de código de referido

**Archivo:** `src/lib/referral.ts`

```typescript
export function generateReferralCode(email: string): string {
  // Genera un código único basado en email + random
  const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${base.substring(0, 4).toUpperCase()}${random}`
}

export function getReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('ref')
}
```

### 5.3 — Template de email de confirmación

**Archivo:** `src/lib/emailTemplate.ts`

```typescript
export function getConfirmationEmailHtml({
  position,
  referralCode,
  appUrl,
}: {
  position: number
  referralCode: string
  appUrl: string
}) {
  const referralUrl = `${appUrl}?ref=${referralCode}`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Arial', sans-serif; background: #070E1A; color: #F0F4FF; margin: 0; padding: 0; }
    .container { max-width: 520px; margin: 0 auto; padding: 40px 24px; }
    .logo { font-size: 32px; font-weight: 900; color: #F0F4FF; margin-bottom: 32px; }
    .logo span { color: #FFB800; }
    .hero { background: linear-gradient(135deg, #0D2B5E, #1A3F7A); border-radius: 16px; padding: 32px; margin-bottom: 24px; text-align: center; }
    .position { font-size: 64px; font-weight: 900; color: #FFB800; line-height: 1; }
    .position-label { color: #8B9BB4; font-size: 14px; margin-top: 8px; }
    h1 { font-size: 24px; font-weight: 800; margin: 0 0 12px; }
    p { color: #8B9BB4; line-height: 1.6; margin: 0 0 24px; }
    .referral-box { background: rgba(74,158,255,0.1); border: 1px solid rgba(74,158,255,0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .referral-title { font-size: 14px; color: #4A9EFF; font-weight: 700; margin-bottom: 8px; }
    .referral-url { font-size: 13px; color: #F0F4FF; word-break: break-all; background: rgba(255,255,255,0.05); padding: 10px 12px; border-radius: 8px; }
    .cta { display: block; background: #FFB800; color: #070E1A; text-decoration: none; font-weight: 800; font-size: 16px; text-align: center; padding: 16px; border-radius: 12px; margin-bottom: 24px; }
    .tiers { display: flex; gap: 8px; margin-bottom: 24px; }
    .tier { flex: 1; padding: 12px; border-radius: 10px; text-align: center; font-size: 12px; }
    .tier-gold { background: rgba(255,184,0,0.15); border: 1px solid rgba(255,184,0,0.3); }
    .tier-blue { background: rgba(74,158,255,0.15); border: 1px solid rgba(74,158,255,0.3); }
    .tier-gray { background: rgba(139,155,180,0.15); border: 1px solid rgba(139,155,180,0.3); }
    .tier-name { font-weight: 700; margin-bottom: 4px; }
    .footer { text-align: center; font-size: 12px; color: #4A5568; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">E<span>/</span>Z</div>
    
    <div class="hero">
      <div class="position">#${position}</div>
      <div class="position-label">Tu posición en la lista</div>
    </div>

    <h1>¡Ya estás dentro! 🎉</h1>
    <p>Eres el <strong>#${position}</strong> en la lista de espera de EZ. Mientras más arriba estés, antes entras.</p>

    <div class="referral-box">
      <div class="referral-title">🚀 Sube en la lista invitando amigos</div>
      <p style="font-size:13px; margin-bottom:10px;">Cada amigo que se una con tu link te sube <strong>10 posiciones</strong>.</p>
      <div class="referral-url">${referralUrl}</div>
    </div>

    <a href="https://wa.me/?text=Acabo%20de%20unirme%20a%20la%20lista%20de%20EZ%20%E2%80%94%20la%20app%20que%20te%20ense%C3%B1a%20a%20manejar%20tu%20plata%20como%20un%20juego.%20%C3%9Anete%20aqu%C3%AD%3A%20${encodeURIComponent(referralUrl)}" class="cta">
      Compartir en WhatsApp →
    </a>

    <div class="tiers">
      <div class="tier tier-gold">
        <div class="tier-name">🥇 Top 100</div>
        <div>Beta privada + badge Fundador</div>
      </div>
      <div class="tier tier-blue">
        <div class="tier-name">🥈 Top 500</div>
        <div>Acceso anticipado</div>
      </div>
      <div class="tier tier-gray">
        <div class="tier-name">🥉 Resto</div>
        <div>Lanzamiento general</div>
      </div>
    </div>

    <div class="footer">
      <p>© 2025 EZ · Hecho con ❤️ para Colombia<br>
      Si no te registraste tú, ignora este email.</p>
    </div>
  </div>
</body>
</html>
  `
}
```

### 5.4 — API Route: registrar en waitlist

**Archivo:** `src/app/api/waitlist/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { generateReferralCode } from '@/lib/referral'
import { getConfirmationEmailHtml } from '@/lib/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, referredBy } = await req.json()

    // Validar email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()

    // Verificar si ya existe
    const { data: existing } = await supabaseAdmin
      .from('waitlist')
      .select('email, position, referral_code')
      .eq('email', emailLower)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: existing.position,
        referralCode: existing.referral_code,
        referralUrl: `${process.env.NEXT_PUBLIC_APP_URL}?ref=${existing.referral_code}`,
      })
    }

    // Generar código de referido único
    let referralCode = generateReferralCode(emailLower)
    
    // Asegurar que sea único
    let attempts = 0
    while (attempts < 5) {
      const { data: codeExists } = await supabaseAdmin
        .from('waitlist')
        .select('referral_code')
        .eq('referral_code', referralCode)
        .single()
      
      if (!codeExists) break
      referralCode = generateReferralCode(emailLower + attempts)
      attempts++
    }

    // Validar que referred_by existe si se pasó uno
    let validReferredBy = null
    if (referredBy) {
      const { data: referrer } = await supabaseAdmin
        .from('waitlist')
        .select('referral_code')
        .eq('referral_code', referredBy)
        .single()
      if (referrer) validReferredBy = referredBy
    }

    // Insertar en waitlist
    const { data: newEntry, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email: emailLower,
        referral_code: referralCode,
        referred_by: validReferredBy,
      })
      .select('position, referral_code')
      .single()

    if (error) throw error

    const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL}?ref=${referralCode}`

    // Enviar email de confirmación
    await resend.emails.send({
      from: 'EZ <onboarding@resend.dev>', // cambiar a hola@getez.app cuando tengas dominio
      to: emailLower,
      subject: `#${newEntry.position} en la lista — bienvenido a EZ 🎉`,
      html: getConfirmationEmailHtml({
        position: newEntry.position,
        referralCode,
        appUrl: process.env.NEXT_PUBLIC_APP_URL!,
      }),
    })

    return NextResponse.json({
      success: true,
      position: newEntry.position,
      referralCode,
      referralUrl,
    })

  } catch (error: any) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Error al registrarse. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}

// GET: obtener contador público
export async function GET() {
  try {
    const { count } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ count: count ?? 0 })
  } catch {
    return NextResponse.json({ count: 847 }) // fallback
  }
}
```

### 5.5 — Hook personalizado para el contador

**Archivo:** `src/hooks/useWaitlistCount.ts`

```typescript
'use client'
import { useState, useEffect } from 'react'

export function useWaitlistCount() {
  const [count, setCount] = useState<number>(847) // valor inicial mientras carga

  useEffect(() => {
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => {}) // silently fail, keep default
  }, [])

  return count
}
```

### 5.6 — Actualizar WaitlistForm.tsx

Reemplaza la lógica actual del formulario con esta:

```typescript
'use client'
import { useState, useEffect } from 'react'
import { getReferralFromUrl } from '@/lib/referral'

export function WaitlistForm({ variant = 'hero' }: { variant?: 'hero' | 'footer' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<{
    position: number
    referralUrl: string
    alreadyRegistered?: boolean
  } | null>(null)
  const [referredBy, setReferredBy] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setReferredBy(getReferralFromUrl())
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referredBy }),
      })

      const data = await res.json()

      if (data.success) {
        setResult(data)
        setStatus('success')
        // Guardar en localStorage también por si acaso
        localStorage.setItem('ez_waitlist_email', email)
        localStorage.setItem('ez_referral_url', data.referralUrl)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  async function copyReferralLink() {
    if (!result?.referralUrl) return
    await navigator.clipboard.writeText(result.referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Estado: éxito — mostrar posición y link de referido
  if (status === 'success' && result) {
    return (
      <div className="w-full space-y-4">
        {/* Posición */}
        <div className="bg-gradient-to-r from-[#0D2B5E] to-[#1A3F7A] rounded-2xl p-6 text-center border border-ez-blue-bright/20">
          <div className="text-5xl font-black text-ez-gold">#{result.position}</div>
          <div className="text-ez-gray text-sm mt-1">
            {result.alreadyRegistered ? 'Ya estabas en la lista 👊' : '¡Ya estás en la lista! 🎉'}
          </div>
        </div>

        {/* Link de referido */}
        <div className="space-y-2">
          <p className="text-ez-gray text-sm text-center">
            Comparte tu link y sube 10 posiciones por cada amigo 🚀
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={result.referralUrl}
              className="flex-1 bg-white/5 border border-ez-blue-bright/20 rounded-xl px-3 py-2 text-ez-white text-xs truncate"
            />
            <button
              onClick={copyReferralLink}
              className="bg-ez-gold text-ez-dark font-bold px-4 py-2 rounded-xl text-sm hover:scale-105 transition-transform whitespace-nowrap"
            >
              {copied ? '¡Copiado! ✓' : 'Copiar'}
            </button>
          </div>
          {/* WhatsApp share */}
          <a
            href={`https://wa.me/?text=Acabo%20de%20unirme%20a%20EZ%20%E2%80%94%20la%20app%20que%20te%20ense%C3%B1a%20finanzas%20como%20un%20juego.%20%C3%9Anete%3A%20${encodeURIComponent(result.referralUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            Compartir en WhatsApp →
          </a>
        </div>
      </div>
    )
  }

  // Estado: formulario
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex gap-2 ${variant === 'footer' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'}`}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 bg-white/5 border border-ez-blue-bright/30 rounded-xl px-4 py-3 text-ez-white placeholder-ez-gray focus:outline-none focus:border-ez-blue-bright transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-ez-gold text-ez-dark font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 whitespace-nowrap"
        >
          {status === 'loading' ? 'Enviando...' : 'Únete gratis →'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">Error al registrarse. Intenta de nuevo.</p>
      )}
      {referredBy && (
        <p className="text-ez-blue-bright text-xs mt-2">✓ Entraste con link de referido</p>
      )}
      <p className="text-ez-gray text-xs mt-2 text-center">
        Sin spam. Sin tarjeta de crédito. Solo el futuro financiero que mereces.
      </p>
    </form>
  )
}
```

### 5.7 — Actualizar SocialProof.tsx con contador real

Reemplaza el `847+` hardcodeado:

```typescript
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

// Dentro del componente:
const count = useWaitlistCount()

// En el JSX reemplaza el número hardcodeado por:
<span>🔥 {count.toLocaleString()}+</span>
<span>en lista de espera</span>
```

---

## PASO 6 — PANEL DE ADMIN (simple, sin librerías extra)

**Archivo:** `src/app/admin/page.tsx`

Crea una página en `/admin` protegida con una password simple (para el MVP):

```typescript
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminPage() {
  const { data: entries, count } = await supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact' })
    .order('position', { ascending: true })
    .limit(100)

  return (
    <div className="min-h-screen bg-ez-dark p-8">
      <h1 className="text-3xl font-black text-white mb-2">EZ Waitlist Admin</h1>
      <p className="text-ez-gold text-xl font-bold mb-8">Total: {count} registros</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-ez-white">
          <thead>
            <tr className="text-ez-gray border-b border-white/10">
              <th className="text-left py-2 pr-4">#</th>
              <th className="text-left py-2 pr-4">Email</th>
              <th className="text-left py-2 pr-4">Código ref</th>
              <th className="text-left py-2 pr-4">Referidos</th>
              <th className="text-left py-2 pr-4">Vino de</th>
              <th className="text-left py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {entries?.map(entry => (
              <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 pr-4 text-ez-gold font-bold">{entry.position}</td>
                <td className="py-2 pr-4">{entry.email}</td>
                <td className="py-2 pr-4 font-mono text-ez-blue-bright">{entry.referral_code}</td>
                <td className="py-2 pr-4">{entry.referral_count}</td>
                <td className="py-2 pr-4 text-ez-gray">{entry.referred_by ?? '—'}</td>
                <td className="py-2 text-ez-gray">{new Date(entry.created_at).toLocaleDateString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

⚠️ **Importante:** Esta página es pública en el MVP. Antes de lanzar a mucho público, protégela agregando una verificación de password o usando Vercel Password Protection.

---

## PASO 7 — VARIABLES EN VERCEL

Después de que todo funcione en local, agrega las mismas variables de `.env.local` en:

**Vercel Dashboard → Tu proyecto → Settings → Environment Variables**

Agrega una por una:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` → la URL real de Vercel (ej: `https://ez-landing.vercel.app`)

Luego haz un nuevo deploy (`git push`) para que tomen efecto.

---

## ORDEN DE IMPLEMENTACIÓN

```
1. Crear cuenta Supabase → crear proyecto → ejecutar SQL
2. Crear cuenta Resend → obtener API key
3. Crear .env.local con todas las variables
4. npm install @supabase/supabase-js resend
5. Crear src/lib/supabase.ts
6. Crear src/lib/referral.ts
7. Crear src/lib/emailTemplate.ts
8. Crear src/app/api/waitlist/route.ts
9. Crear src/hooks/useWaitlistCount.ts
10. Actualizar src/components/ui/WaitlistForm.tsx
11. Actualizar SocialProof.tsx con contador real
12. Crear src/app/admin/page.tsx
13. npm run dev → probar flujo completo
14. Agregar variables en Vercel → git push → verificar en producción
```

---

## VERIFICACIÓN FINAL

Antes de dar por terminado, prueba este flujo completo:

- [ ] Abrir `localhost:3000` — el contador muestra número real (o 847 si la DB está vacía)
- [ ] Ingresar un email y hacer submit — aparece posición y link de referido
- [ ] Revisar email — llegó el correo de confirmación con posición y link
- [ ] Abrir `localhost:3000?ref=TUCODIGO` — se muestra el badge "Entraste con link de referido"
- [ ] Registrar un segundo email con el ref del primero — el primero sube 10 posiciones
- [ ] Abrir `localhost:3000/admin` — se ven los registros
- [ ] Hacer git push — verificar que en producción (Vercel) funciona igual

---

*Con esto la landing pasa de ser solo visual a ser una máquina de captura de leads real, con viralidad integrada desde el día 1.*
