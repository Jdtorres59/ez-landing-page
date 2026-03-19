import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminPage() {
  const { data: entries, count } = await supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact' })
    .order('position', { ascending: true })
    .limit(100)

  return (
    <div className="min-h-screen bg-[#070E1A] p-8">
      <h1
        className="text-3xl font-black text-white mb-2"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        EZ Waitlist Admin
      </h1>
      <p className="text-[#FFB800] text-xl font-bold mb-8">
        Total: {count} registros
      </p>

      <div className="overflow-x-auto">
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
