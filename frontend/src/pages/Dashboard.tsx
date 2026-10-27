import { useState } from 'react'
import { SAMPLES } from '../data/mockData'
import StatusPill from '../components/common/StatusPill'

export default function Dashboard() {
  const [selectedSample, setSelectedSample] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const statusOrder: Record<string, number> = {
    'Overdue': 0,
    'Awaiting Review': 1,
    'In Progress': 2,
    'Complete': 3,
  }
  const dashboardTests = [...SAMPLES].sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
  const filteredTests = statusFilter
    ? dashboardTests.filter(test => test.status === statusFilter)
    : dashboardTests

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Overview — {new Date().toLocaleDateString()}</p>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
        {['Overdue', 'Awaiting Review', 'In Progress', 'Complete','All'].map(label => {
          const isSelected = label === 'All'
            ? statusFilter === null
            : statusFilter === label

          return (
          <button
            key={label}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setStatusFilter(label === 'All' || statusFilter === label ? null : label)}
            className={`p-5 text-left transition-colors ${
              isSelected
                ? 'bg-[#e5b9b7] shadow-inner'
                : 'bg-[#e8e8e6] hover:bg-[#e4e4e2]'
            }`}
          >
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-4xl font-light text-slate-900 leading-none">
              {label === 'All'
                ? SAMPLES.length
                : SAMPLES.filter(test => test.status === label).length}
            </p>
          </button>
          )
        })}
      </div>

      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-800">Tests</span>
          <span className="text-xs font-mono text-slate-400">
            {filteredTests.length} {statusFilter ? statusFilter.toLowerCase() : 'total'}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#e2e2e0] border-b border-slate-200">
                <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Test Code</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Test Method</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Received</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Due Date</th>
                <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTests.map(s => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedSample(s.id === selectedSample ? null : s.id)}
                  className={`cursor-pointer transition-colors ${
                    s.id === selectedSample ? 'bg-[#e5b9b7] shadow-inner' : 'hover:bg-[#e4e4e2]'
                  }`}
                >
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{s.id}</td>
                  <td className="px-4 py-4 text-slate-800 font-medium">{s.client}</td>
                  <td className="px-4 py-4 text-slate-500 hidden md:table-cell">{s.type}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono text-xs hidden sm:table-cell">{s.received}</td>
                  <td className="px-4 py-4 text-slate-500 font-mono text-xs hidden sm:table-cell">{s.due}</td>
                  <td className="px-5 py-4"><StatusPill status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}