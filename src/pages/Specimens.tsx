import { useState } from "react"
import { SAMPLES } from "../data/mockData"
import PriorityTag from "../components/common/PriorityTag"


export default function Specimens() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Specimen Management</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Specimens</h1>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors">
          + Register Sample
        </button>
      </div>

      <div className="flex justify-end">
        <div>
          <input
            type="text"
            placeholder="Search specimens…"
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 font-mono w-56"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#e2e2e0] border-b border-slate-200">
              <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Test code</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Client</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Test Method</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Received</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden lg:table-cell">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SAMPLES.map(s => (
              <tr
                key={s.id}
                onClick={() => setSelected(s.id === selected ? null : s.id)}
                className={`cursor-pointer transition-colors ${s.id === selected ? 'bg-[#e5b9b7] shadow-inner' : 'hover:bg-[#e4e4e2]'}`}
              >
                <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{s.id}</td>
                <td className="px-4 py-3.5 text-slate-800 font-medium">{s.client}</td>
                <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{s.type}</td>
                <td className="px-4 py-3.5 text-slate-400 font-mono text-xs hidden sm:table-cell">{s.received}</td>
                <td className="px-4 py-3.5 hidden lg:table-cell"><PriorityTag priority={s.priority} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="border border-[#f0aaaa] bg-[#fff5f5] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm font-semibold text-[#6b0500]">{selected}</span>
            <button onClick={() => setSelected(null)} className="text-xs text-slate-400 hover:text-slate-600">✕ Close</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Collection Date', 'Field Location', 'Expiration Date', 'Priority'].map(f => (
              <div key={f}>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">{f}</p>
                <p className="text-sm text-slate-700">—</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-xl hover:bg-slate-700 transition-colors">Assign Tests</button>
            <button className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-medium rounded-xl hover:bg-[#e8e8e6] transition-colors">Edit Details</button>
            <button className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-medium rounded-xl hover:bg-[#e8e8e6] transition-colors">Print Label</button>
          </div>
        </div>
      )}
    </div>
  )
}