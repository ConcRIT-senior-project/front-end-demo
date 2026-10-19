import { WORKFLOW_TESTS } from "../data/mockData"
import StatusPill from "../components/common/StatusPill"

export default function Workflow() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Laboratory Operations</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Test Workflow</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-slate-200 text-sm text-slate-600 rounded-xl hover:bg-[#e4e4e2] transition-colors">Log Result</button>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors">+ Add Test</button>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Running', count: 3 },
          { label: 'Queued', count: 3 },
          { label: 'On Hold', count: 1 },
        ].map(({ label, count }) => (
          <div key={label} className="border border-slate-200 bg-[#e8e8e6] rounded-xl px-5 py-4 text-center">
            <p className="text-3xl font-light text-[#940700]">{count}</p>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Workflow table */}
      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-[#e2e2e0]">
          <span className="text-sm font-semibold text-slate-800">Active & Queued Tests</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Sample</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Test</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Analyst</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Started</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Est. Complete</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {WORKFLOW_TESTS.map((t, i) => (
              <tr key={i} className="hover:bg-[#e4e4e2] transition-colors">
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{t.sample}</td>
                <td className="px-4 py-3.5 text-slate-800">{t.test}</td>
                <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{t.analyst}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-slate-400 hidden sm:table-cell">{t.started}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{t.est}</td>
                <td className="px-4 py-3.5"><StatusPill status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Method reference */}
      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6]">
        <div className="px-5 py-4 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-800">Method Reference</span>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { method: 'ASTM D1557', test: 'Modified Proctor Compaction', time: '4 hr' },
            { method: 'ASTM D2216', test: 'Gravimetric Water Content', time: '24 hr' },
            { method: 'ASTM D422', test: 'Particle Size Analysis', time: '6 hr' },
            { method: 'ASTM D4318', test: 'Atterberg Limits', time: '2 hr' },
            { method: 'ASTM D1498', test: 'Oxidation-Reduction Potential', time: '1 hr' },
            { method: 'ASTM D1172', test: 'pH of Aqueous Solutions', time: '30 min' },
          ].map(m => (
            <div key={m.method} className="border border-slate-100 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors cursor-pointer">
              <p className="font-mono text-xs text-[#940700] mb-0.5">{m.method}</p>
              <p className="text-sm text-slate-700">{m.test}</p>
              <p className="text-xs text-slate-400 mt-1">Est. {m.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}