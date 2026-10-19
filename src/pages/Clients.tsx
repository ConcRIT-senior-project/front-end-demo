import { CLIENTS } from "../data/mockData"

export default function Clients() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Account Management</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Clients</h1>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors">
          + Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CLIENTS.map(c => (
          <div key={c.name} className="border border-slate-200 rounded-xl bg-[#e8e8e6] hover:border-slate-400 transition-colors cursor-pointer">
            <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-900">{c.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">Client since {c.since}</p>
              </div>
              {c.active > 0 && (
                <span className="font-mono text-xs bg-[#fff5f5] text-[#6b0500] border border-[#f0aaaa] px-2 py-0.5 rounded">
                  {c.active} active
                </span>
              )}
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-16 shrink-0">Contact</span>
                <span className="text-sm text-slate-700">{c.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-16 shrink-0">Email</span>
                <span className="text-sm text-slate-500 truncate">{c.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 w-16 shrink-0">Samples</span>
                <span className="text-sm text-slate-700">{c.samples} total</span>
              </div>
            </div>
            <div className="px-5 pb-4 flex gap-2">
              <button className="text-xs text-[#940700] font-mono hover:underline">View Samples →</button>
              <span className="text-slate-200 mx-1">|</span>
              <button className="text-xs text-slate-400 font-mono hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}