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
  const whatsappUrl = `https://wa.me/?text=Acabo%20de%20unirme%20a%20la%20lista%20de%20EZ%20%F0%9F%94%A5%20%E2%80%94%20la%20app%20que%20te%20ense%C3%B1a%20a%20manejar%20tu%20plata%20como%20un%20juego.%20%C3%9Anete%20aqu%C3%AD%3A%20${encodeURIComponent(referralUrl)}`

  // Barra de progreso: qué tan cerca está del Top 100 / Top 500
  const progressTo100 = position <= 100 ? 100 : Math.max(0, Math.round((1 - (position - 100) / 400) * 100))
  const progressTo500 = position <= 500 ? Math.round(((500 - position) / 500) * 100 + (position <= 100 ? 100 : 50)) : 0
  const barPercent = position <= 100 ? 100 : position <= 500 ? Math.round(((500 - position) / 400) * 60 + 20) : Math.max(5, Math.round((1000 - Math.min(position, 1000)) / 1000 * 20))
  const barColor = position <= 100 ? '#FFB800' : position <= 500 ? '#4A9EFF' : '#8B9BB4'
  const tierLabel = position <= 100 ? '🥇 ¡Estás en el Top 100! Beta privada + badge Fundador' : position <= 500 ? '🥈 Estás en el Top 500 — Acceso anticipado asegurado' : '🥉 Sube invitando amigos para llegar al Top 500'

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
            <td style="padding-bottom:32px;">
              <img src="https://ez-landing-page.vercel.app/EZ_logo_transparent_v4.png" width="64" height="64" alt="EZ" style="border-radius:16px;display:block;">
            </td>
          </tr>

          <!-- HERO BANNER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D2B5E,#1A3F7A);border-radius:20px;padding:40px 32px;text-align:center;margin-bottom:24px;">
              <p style="margin:0 0 4px;font-size:13px;color:#8B9BB4;text-transform:uppercase;letter-spacing:2px;font-weight:600;">TU POSICIÓN</p>
              <p style="margin:0;font-size:80px;font-weight:900;color:#FFB800;line-height:1;">#${position}</p>
              <p style="margin:8px 0 28px;font-size:14px;color:#8B9BB4;">en la lista de espera de EZ</p>

              <!-- Barra de progreso -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                      <tr>
                        <td style="font-size:11px;color:#8B9BB4;">Top 100</td>
                        <td align="right" style="font-size:11px;color:#8B9BB4;">Top 500</td>
                      </tr>
                    </table>
                    <div style="background:rgba(255,255,255,0.1);border-radius:100px;height:8px;overflow:hidden;">
                      <div style="background:${barColor};width:${barPercent}%;height:8px;border-radius:100px;"></div>
                    </div>
                    <p style="margin:10px 0 0;font-size:12px;color:${barColor};font-weight:700;">${tierLabel}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:24px;"></td></tr>

          <!-- COPY -->
          <tr>
            <td>
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#F0F4FF;">¡Ya estás dentro! 🎉</h1>
              <p style="margin:0 0 24px;font-size:15px;color:#8B9BB4;line-height:1.7;">
                Eres el <strong style="color:#F0F4FF;">#${position}</strong> en la lista de espera de EZ.<br>
                Mientras más arriba estés, antes entras — y cada amigo que invites te sube <strong style="color:#FFB800;">10 posiciones</strong>.
              </p>
            </td>
          </tr>

          <!-- REFERRAL BOX -->
          <tr>
            <td style="background:rgba(74,158,255,0.08);border:1px solid rgba(74,158,255,0.25);border-radius:16px;padding:20px;margin-bottom:24px;">
              <p style="margin:0 0 6px;font-size:13px;color:#4A9EFF;font-weight:700;">🚀 Tu link personal de referido</p>
              <p style="margin:0 0 12px;font-size:13px;color:#8B9BB4;">Compártelo y sube 10 posiciones por cada amigo que se una:</p>
              <div style="background:rgba(255,255,255,0.06);border-radius:10px;padding:12px 14px;font-size:13px;color:#F0F4FF;word-break:break-all;font-family:monospace;">${referralUrl}</div>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- WHATSAPP CTA -->
          <tr>
            <td align="center">
              <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:800;font-size:16px;padding:16px 32px;border-radius:14px;width:100%;box-sizing:border-box;text-align:center;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right:10px;vertical-align:middle;">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.524 5.855L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.733.979 1.001-3.642-.235-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818S17.42 21.818 12 21.818z"/></svg>
                          </td>
                          <td style="vertical-align:middle;color:#ffffff;font-weight:800;font-size:16px;">Compartir en WhatsApp</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>

          <tr><td style="height:28px;"></td></tr>

          <!-- QUÉ GANAS SIENDO EARLY -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;">
              <p style="margin:0 0 16px;font-size:15px;font-weight:800;color:#F0F4FF;">¿Qué ganas siendo early? 👀</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:12px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;">
                          <div style="background:rgba(255,184,0,0.2);border-radius:50%;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">🥇</div>
                        </td>
                        <td style="vertical-align:top;">
                          <p style="margin:0;font-size:13px;font-weight:700;color:#FFB800;">Top 100 — Beta privada</p>
                          <p style="margin:2px 0 0;font-size:12px;color:#8B9BB4;">Acceso antes que nadie + badge exclusivo de Fundador en tu perfil</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;">
                          <div style="background:rgba(74,158,255,0.2);border-radius:50%;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">🥈</div>
                        </td>
                        <td style="vertical-align:top;">
                          <p style="margin:0;font-size:13px;font-weight:700;color:#4A9EFF;">Top 500 — Acceso anticipado</p>
                          <p style="margin:2px 0 0;font-size:12px;color:#8B9BB4;">Entra meses antes del lanzamiento general y da forma al producto</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;">
                          <div style="background:rgba(139,155,180,0.2);border-radius:50%;width:36px;height:36px;text-align:center;line-height:36px;font-size:18px;">🥉</div>
                        </td>
                        <td style="vertical-align:top;">
                          <p style="margin:0;font-size:13px;font-weight:700;color:#8B9BB4;">El resto — Lanzamiento general</p>
                          <p style="margin:2px 0 0;font-size:12px;color:#8B9BB4;">Igual entras, solo un poco después — ¡pero puedes subir invitando!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:32px;"></td></tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
              <img src="https://ez-landing-page.vercel.app/EZ_logo_transparent_v4.png" width="32" height="32" alt="EZ" style="border-radius:8px;display:block;margin:0 auto 12px;">
              <p style="margin:0 0 4px;font-size:12px;color:#4A5568;">© 2025 EZ · Hecho con ❤️ para Colombia</p>
              <p style="margin:0;font-size:11px;color:#374151;">Si no te registraste tú, puedes ignorar este email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}
