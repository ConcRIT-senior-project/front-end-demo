export default function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Pending': 'bg-slate-100 text-slate-500',
    'In Progress': 'bg-[#fff5f5] text-[#6b0500] border border-[#f0aaaa]',
    'Running': 'bg-[#fff5f5] text-[#6b0500] border border-[#f0aaaa]',
    'Queued': 'bg-slate-100 text-slate-500',
    'Review': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Awaiting Review': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Overdue': 'bg-red-50 text-red-700 border border-red-200',
    'Hold': 'bg-red-50 text-red-700 border border-red-200',
    'Complete': 'bg-green-50 text-green-700 border border-green-200',
  }
  return (
    <span className={`inline-block text-xs font-mono font-medium px-2.5 py-0.5 rounded-full ${map[status] ?? 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  )
}