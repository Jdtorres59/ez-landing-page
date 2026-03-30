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

  const whatsappText = encodeURIComponent(
    `Acabo de unirme al waitlist de EZ App 🐂 ¿Tú en qué puesto estás? ${referralUrl}`
  )
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`

  // Tier dinámico
  const tierName =
    position <= 100 ? 'Top 100 👑' : position <= 500 ? 'Top 500 🥇' : 'Fundador ✅'

  const tierLabel =
    position <= 100
      ? '👑 ¡Estás en el Top 100! 3 meses de premium gratis + Toro Dorado + WhatsApp con los fundadores'
      : position <= 500
      ? '🥇 ¡Estás en el Top 500! 1 mes de premium gratis + Toro Dorado + acceso anticipado'
      : '✅ Eres Fundador de EZ. Badge exclusivo + multiplicador 1.1x XP para siempre'

  const tierColor =
    position <= 100 ? '#F59E0B' : position <= 500 ? '#3B82F6' : '#64748B'

  const barColor = tierColor

  const barPercent =
    position <= 100
      ? 100
      : position <= 500
      ? Math.round(((500 - position) / 400) * 60 + 20)
      : Math.max(5, Math.round(((1000 - Math.min(position, 1000)) / 1000) * 20))

  const rewards =
    position <= 100
      ? [
          '3 meses de premium gratis',
          'Toro Dorado exclusivo en tu perfil',
          'Grupo de WhatsApp directo con los fundadores',
        ]
      : position <= 500
      ? [
          '1 mes de premium gratis',
          'Toro Dorado exclusivo en tu perfil',
          'Acceso anticipado al lanzamiento',
        ]
      : [
          'Badge "Fundador" en tu perfil',
          'Multiplicador 1.1x XP para siempre',
          'Acceso al lanzamiento en abril 2026',
        ]

  const rewardRows = rewards
    .map(
      (r) => `
        <tr>
          <td style="padding-bottom:10px;font-size:14px;color:#CBD5E1;line-height:1.5;">
            · ${r}
          </td>
        </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a EZ</title>
</head>
<body style="margin:0;padding:0;background-color:#070E1A;font-family:Arial,Helvetica,sans-serif;color:#F0F4FF;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070E1A;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;">

          <!-- ANTI-PROMOCIONES -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0;font-size:12px;color:#475569;line-height:1.6;">
                ¿Este correo llegó a Promociones? Muévelo a Principal para no perderte el lanzamiento 👆
              </p>
            </td>
          </tr>

          <!-- SECCIÓN 1: BIENVENIDA -->
          <tr>
            <td style="padding-bottom:24px;">
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;color:#F8FAFC;line-height:1.2;">¡Hola!</h1>
              <p style="margin:0;font-size:15px;color:#94A3B8;line-height:1.8;">
                Ya estás adentro. Mientras medio mundo sigue sufriendo por llegar a fin de mes, tú acabas de dar el primer paso para que tu plata deje de ser un dolor de cabeza y se vuelva un juego que vas a ganar.
              </p>
            </td>
          </tr>

          <!-- SECCIÓN 2: STATUS -->
          <tr>
            <td style="background:#0D2B5E;border-radius:16px;padding:28px;margin-bottom:24px;">

              <!-- Posición y tier -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Puesto</p>
                    <p style="margin:0;font-size:64px;font-weight:900;color:#F59E0B;line-height:1;">#${position}</p>
                  </td>
                  <td align="right" style="vertical-align:bottom;">
                    <p style="margin:0;font-size:13px;font-weight:800;color:${tierColor};">${tierName}</p>
                  </td>
                </tr>
              </table>

              <!-- Barra de progreso -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                      <tr>
                        <td style="font-size:11px;color:#64748B;">Top 100</td>
                        <td align="right" style="font-size:11px;color:#64748B;">Top 500</td>
                      </tr>
                    </table>
                    <div style="background:rgba(255,255,255,0.08);border-radius:100px;height:8px;overflow:hidden;">
                      <div style="background:${barColor};width:${barPercent}%;height:8px;border-radius:100px;"></div>
                    </div>
                    <p style="margin:10px 0 0;font-size:12px;color:${tierColor};font-weight:700;">${tierLabel}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- SECCIÓN 3: RECOMPENSAS -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0 0 12px;font-size:15px;font-weight:800;color:#F8FAFC;">Lo que te llevás por entrar temprano</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${rewardRows}
              </table>
            </td>
          </tr>

          <!-- SECCIÓN 4: REFERIDOS -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0 0 8px;font-size:15px;font-weight:800;color:#F8FAFC;">¿Quieres más?</p>
              <p style="margin:0 0 16px;font-size:14px;color:#94A3B8;line-height:1.7;">
                En EZ, el que trae a la manada sube de nivel. Si traes amigos, saltas al siguiente tier y desbloqueas mejores recompensas.
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:#64748B;font-weight:600;">👉 Tu link</p>
              <div style="background:#0A1628;border-radius:10px;padding:12px 14px;font-size:13px;color:#F0F4FF;word-break:break-all;font-family:monospace;">${referralUrl}</div>
            </td>
          </tr>

          <!-- BOTÓN WHATSAPP -->
          <tr>
            <td style="padding-bottom:32px;">
              <a href="${whatsappUrl}" style="display:block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 20px;border-radius:12px;text-align:center;">
                Compartir en WhatsApp 📲
              </a>
            </td>
          </tr>

          <!-- SECCIÓN 5: CIERRE -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;padding-bottom:24px;">
              <p style="margin:0 0 12px;font-size:14px;color:#94A3B8;line-height:1.8;">
                Abrimos en abril de 2026 para Colombia. De momento solo iPhone — Android viene pronto. Nos vemos adentro.
              </p>
              <p style="margin:0;font-size:15px;font-weight:800;color:#F59E0B;">Juanda de EZ 🐂</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
              <p style="margin:0;font-size:12px;color:#334155;">© 2026 EZ · Hecho con ❤️ en Colombia</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}
