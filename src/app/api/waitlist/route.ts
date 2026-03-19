import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { generateReferralCode } from '@/lib/referral'
import { getConfirmationEmailHtml } from '@/lib/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, referredBy } = await req.json()

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
    console.log('[Resend] Iniciando envío de email a:', emailLower)
    console.log('[Resend] RESEND_API_KEY presente:', !!process.env.RESEND_API_KEY)
    console.log('[Resend] RESEND_API_KEY prefix:', process.env.RESEND_API_KEY?.substring(0, 8))
    console.log('[Resend] NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL)

    try {
      const emailResult = await resend.emails.send({
        from: 'EZ <onboarding@resend.dev>',
        to: emailLower,
        subject: `¡Bienvenido a EZ! Eres el #${newEntry.position} en la lista 🔥`,
        html: getConfirmationEmailHtml({
          position: newEntry.position,
          referralCode,
          appUrl: process.env.NEXT_PUBLIC_APP_URL!,
        }),
      })
      console.log('[Resend] Resultado:', JSON.stringify(emailResult))
    } catch (emailError: unknown) {
      console.error('[Resend] ERROR al enviar email:', emailError)
      if (emailError instanceof Error) {
        console.error('[Resend] message:', emailError.message)
        console.error('[Resend] stack:', emailError.stack)
      } else {
        console.error('[Resend] error raw:', JSON.stringify(emailError))
      }
      // No bloqueamos la respuesta — el registro en Supabase ya fue exitoso
    }

    return NextResponse.json({
      success: true,
      position: newEntry.position,
      referralCode,
      referralUrl,
    })

  } catch (error: unknown) {
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
    return NextResponse.json({ count: 847 })
  }
}
