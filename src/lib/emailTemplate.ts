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
  const twitterText = encodeURIComponent(
    `Acabo de unirme al waitlist de EZ App 🐂 ¿Tú en qué puesto estás? ${referralUrl}`
  )
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`

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

  const barColor =
    position <= 100 ? '#F59E0B' : position <= 500 ? '#3B82F6' : '#64748B'

  const barPercent =
    position <= 100
      ? 100
      : position <= 500
      ? Math.round(((500 - position) / 400) * 60 + 20)
      : Math.max(5, Math.round(((1000 - Math.min(position, 1000)) / 1000) * 20))

  // Recompensas dinámicas según tier
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
          <td style="padding-bottom:10px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:10px;vertical-align:top;padding-top:2px;">
                  <div style="width:6px;height:6px;border-radius:50%;background:${tierColor};margin-top:5px;"></div>
                </td>
                <td style="font-size:14px;color:#CBD5E1;line-height:1.5;">${r}</td>
              </tr>
            </table>
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

          <!-- LOGO -->
          <tr>
            <td style="padding-bottom:28px;">
              <img src="https://ez-landing-page.vercel.app/EZ_logo_transparent_v4.png" width="56" height="56" alt="EZ" style="border-radius:14px;display:block;">
            </td>
          </tr>

          <!-- SECCIÓN 1: BIENVENIDA -->
          <tr>
            <td style="padding-bottom:24px;">
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;color:#F8FAFC;line-height:1.2;">¡Qué más!</h1>
              <p style="margin:0;font-size:15px;color:#94A3B8;line-height:1.8;">
                Ya estás adentro. Mientras medio mundo sigue sufriendo por llegar a fin de mes, tú acabas de dar el primer paso para que tu plata deje de ser un dolor de cabeza y se vuelva un juego que vas a ganar.
              </p>
            </td>
          </tr>

          <!-- SECCIÓN 2: STATUS -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D2B5E,#0A1628);border-radius:20px;padding:32px;margin-bottom:24px;">

              <!-- Posición y tier -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Puesto</p>
                    <p style="margin:0;font-size:64px;font-weight:900;color:#F59E0B;line-height:1;">#${position}</p>
                  </td>
                  <td align="right" style="vertical-align:bottom;">
                    <div style="display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 14px;">
                      <p style="margin:0;font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Tier actual</p>
                      <p style="margin:4px 0 0;font-size:14px;font-weight:800;color:${tierColor};">${tierName}</p>
                    </div>
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

          <!-- SECCIÓN 3: RECOMPENSAS DEL TIER -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;margin-bottom:24px;">
              <p style="margin:0 0 16px;font-size:15px;font-weight:800;color:#F8FAFC;">Lo que te llevás por entrar temprano</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${rewardRows}
              </table>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- SECCIÓN 4: REFERIDOS -->
          <tr>
            <td style="background:rgba(37,99,235,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:16px;padding:24px;margin-bottom:24px;">
              <p style="margin:0 0 12px;font-size:15px;font-weight:800;color:#F8FAFC;">¿Quieres más?</p>
              <p style="margin:0 0 16px;font-size:14px;color:#94A3B8;line-height:1.7;">
                En EZ, el que trae a la manada sube de nivel. Si traes amigos, saltas al siguiente tier y desbloqueas mejores recompensas.
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:1px;font-weight:600;">👉 Tu link</p>
              <div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:12px 14px;font-size:13px;color:#F0F4FF;word-break:break-all;font-family:monospace;margin-bottom:0;">${referralUrl}</div>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- BOTONES DE COMPARTIR -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- WhatsApp -->
                  <td style="padding-right:8px;">
                    <a href="${whatsappUrl}" style="display:block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 20px;border-radius:12px;text-align:center;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-right:8px;vertical-align:middle;">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.524 5.855L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.733.979 1.001-3.642-.235-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818S17.42 21.818 12 21.818z"/></svg>
                                </td>
                                <td style="vertical-align:middle;color:#ffffff;font-weight:700;font-size:14px;">WhatsApp</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Twitter / X -->
                  <td style="padding-left:8px;">
                    <a href="${twitterUrl}" style="display:block;background:rgba(29,161,242,0.15);border:1px solid rgba(29,161,242,0.35);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 20px;border-radius:12px;text-align:center;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-right:8px;vertical-align:middle;">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </td>
                                <td style="vertical-align:middle;color:#1DA1F2;font-weight:700;font-size:14px;">Twitter / X</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:32px;"></td></tr>

          <!-- SECCIÓN 5: CIERRE -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:28px;padding-bottom:28px;">
              <p style="margin:0 0 16px;font-size:14px;color:#94A3B8;line-height:1.8;">
                Abrimos en abril de 2026 para Colombia. De momento solo iPhone — Android viene pronto. Nos vemos adentro.
              </p>
              <p style="margin:0;font-size:15px;font-weight:800;color:#F59E0B;">Toro EZ 🐂</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
              <img src="https://ez-landing-page.vercel.app/EZ_logo_transparent_v4.png" width="28" height="28" alt="EZ" style="border-radius:7px;display:block;margin:0 auto 12px;">
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
