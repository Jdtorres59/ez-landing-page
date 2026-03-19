export function generateReferralCode(email: string): string {
  const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${base.substring(0, 4).toUpperCase()}${random}`
}

export function getReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('ref')
}
