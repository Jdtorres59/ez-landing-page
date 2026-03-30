import { supabaseAdmin } from '@/lib/supabase'

const PAGE_SIZE = 50

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  const { page: pageParam, q: qParam } = await searchParams
  const page = Math.max(1, Number(pageParam ?? 1))
  const q = qParam?.trim() ?? ''

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact' })
    .order('position', { ascending: true })
    .range(from, to)

  if (q) {
    query = query.ilike('email', `%${q}%`)
  }

  const { data: entries, count } = await query

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE)
  const prevUrl = `/admin?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ''}`
  const nextUrl = `/admin?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ''}`

  return (
    <div className="min-h-screen bg-[#070E1A] p-8">
      <h1
        className="text-3xl font-black text-white mb-2"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        EZ Waitlist Admin
      </h1>
      <p className="text-[#FFB800] text-xl font-bold mb-8">
        Total: {count ?? 0} registros
      </p>

      {/* Búsqueda */}
      <form action="/admin" method="GET" className="mb-6 flex gap-3 max-w-md">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por email..."
          className="flex-1 px-4 py-2 rounded-xl text-sm text-white outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#2563EB" }}
        >
          Buscar
        </button>
        {q && (
          <a
            href="/admin"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 flex items-center"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            Limpiar
          </a>
        )}
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm text-[#F0F4FF]">
          <thead>
            <tr className="text-[#8B9BB4] border-b border-white/10">
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
                <td className="py-2 pr-4 text-[#FFB800] font-bold">{entry.position}</td>
                <td className="py-2 pr-4">{entry.email}</td>
                <td className="py-2 pr-4 font-mono text-[#4A9EFF]">{entry.referral_code}</td>
                <td className="py-2 pr-4">{entry.referral_count}</td>
                <td className="py-2 pr-4 text-[#8B9BB4]">{entry.referred_by ?? '—'}</td>
                <td className="py-2 text-[#8B9BB4]">
                  {new Date(entry.created_at).toLocaleDateString('es-CO')}
                </td>
              </tr>
            ))}
            {(!entries || entries.length === 0) && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#8B9BB4]">
                  {q ? `Sin resultados para "${q}"` : 'No hay registros.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center gap-4">
          {page > 1 ? (
            <a
              href={prevUrl}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              ← Anterior
            </a>
          ) : (
            <span
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 cursor-not-allowed"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              ← Anterior
            </span>
          )}

          <span className="text-sm text-[#8B9BB4]">
            Página {page} de {totalPages}
          </span>

          {page < totalPages ? (
            <a
              href={nextUrl}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              Siguiente →
            </a>
          ) : (
            <span
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 cursor-not-allowed"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              Siguiente →
            </span>
          )}
        </div>
      )}
    </div>
  )
}
