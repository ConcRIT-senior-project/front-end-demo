import { RESULTS } from "../data/mockData"

export default function Results() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Reporting</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Results & Reports</h1>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors">
          Generate Report
        </button>
      </div>

      {/* Completed results table */}
      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-[#e2e2e0] flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-800">Completed Results</span>
          <input
            type="text"
            placeholder="Filter…"
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 w-40"
          />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Sample ID</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Client</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Test Panel</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Completed</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden lg:table-cell">Analyst</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Flag</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RESULTS.map(r => (
              <tr key={r.id} className="hover:bg-[#e4e4e2] transition-colors">
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{r.id}</td>
                <td className="px-4 py-3.5 text-slate-800 font-medium">{r.client}</td>
                <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{r.type}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-slate-400 hidden sm:table-cell">{r.completed}</td>
                <td className="px-4 py-3.5 text-slate-500 hidden lg:table-cell">{r.analyst}</td>
                <td className="px-4 py-3.5">
                  {r.flag
                    ? <span className="font-mono text-xs text-blue-600 font-semibold">⚑ FLAG</span>
                    : <span className="font-mono text-xs text-slate-300">—</span>
                  }
                </td>
                <td className="px-4 py-3.5">
                  <button className="text-xs text-[#940700] hover:underline font-mono">PDF ↓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sample result detail wireframe */}
      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6]">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
          <span className="font-mono text-sm text-slate-500">D4318</span>
          <span className="text-sm font-semibold text-slate-800">Elm Creek Co-op — ASTM D4318</span>
          <span className="ml-auto font-mono text-xs text-blue-600 font-semibold">⚑ Flagged</span>
        </div>
        <div className="p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left pb-2 font-mono text-xs text-slate-400 uppercase tracking-wider">Parameter</th>
                <th className="text-right pb-2 font-mono text-xs text-slate-400 uppercase tracking-wider">Result</th>
                <th className="text-right pb-2 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Unit</th>
                <th className="text-right pb-2 font-mono text-xs text-slate-400 uppercase tracking-wider">Reference</th>
                <th className="text-right pb-2 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { param: 'Liquid Limit (LL)', result: '48', unit: '%', ref: '≤ 50', ok: true },
                { param: 'Plastic Limit (PL)', result: '22', unit: '%', ref: '≤ 25', ok: true },
                { param: 'Plasticity Index (PI)', result: '26', unit: '%', ref: '≤ 20', ok: false },
                { param: 'Moisture Content', result: '18.4', unit: '%', ref: '10–25', ok: true },
                { param: 'Dry Density (max)', result: '17.8', unit: 'kN/m³', ref: '≥ 17.0', ok: true },
                { param: 'Optimum Moisture', result: '14.2', unit: '%', ref: '12–16', ok: true },
              ].map(row => (
                <tr key={row.param} className={row.ok ? '' : 'bg-[#fff5f5]'}>
                  <td className="py-2.5 text-slate-700">{row.param}</td>
                  <td className={`py-2.5 text-right font-mono font-semibold ${row.ok ? 'text-slate-800' : 'text-[#6b0500]'}`}>{row.result}</td>
                  <td className="py-2.5 text-right font-mono text-xs text-slate-400 hidden sm:table-cell">{row.unit}</td>
                  <td className="py-2.5 text-right font-mono text-xs text-slate-400">{row.ref}</td>
                  <td className="py-2.5 text-right hidden md:table-cell">
                    <span className={`font-mono text-xs font-medium ${row.ok ? 'text-green-600' : 'text-[#6b0500]'}`}>
                      {row.ok ? 'Normal' : '↑ High'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}