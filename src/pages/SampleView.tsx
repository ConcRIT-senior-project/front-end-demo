import { useState } from "react"
import { SAMPLES } from "../data/mockData"
import StatusPill from "../components/common/StatusPill"
import FilterModal from "../components/common/FilterModal"


const filterSelectClasses = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none'
const emptySampleFilters = { status: '', priority: '', client: '' }

type SampleViewProps = {
  onNavigate: (view: 'tests' | 'samples' | 'sample-check-in' | 'projects' | 'data-structures') => void
}

export default function SampleView({ onNavigate }: SampleViewProps) {
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState(emptySampleFilters)
  const [draftFilters, setDraftFilters] = useState(emptySampleFilters)
  const selectedSample = SAMPLES.find(sample => sample.id === selectedSampleId)
  const filteredSamples = SAMPLES.filter(sample =>
    (!filters.status || sample.status === filters.status)
    && (!filters.priority || sample.priority === filters.priority)
    && (!filters.client || sample.client === filters.client)
  )
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const openFilters = () => {
    setDraftFilters({ ...filters })
    setShowFilters(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">View all samples here</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Samples</h1>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('sample-check-in')}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
        >
          + Check In Sample
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-[#e2e2e0] flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-800">Samples</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {filteredSamples.length}{activeFilterCount ? ` of ${SAMPLES.length}` : ''} total
            </span>
            <button
              type="button"
              onClick={openFilters}
              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilterCount
                  ? 'border-[#f0aaaa] bg-[#fff5f5] text-[#6b0500]'
                  : 'border-slate-300 text-slate-600 hover:bg-[#eeeeec]'
              }`}
            >
              Filter{activeFilterCount ? ` (${activeFilterCount})` : ''}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Sample</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Test Method</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Received</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Due Date</th>
                <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSamples.map(sample => (
                <tr
                  key={sample.id}
                  onClick={() => setSelectedSampleId(current => current === sample.id ? null : sample.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedSampleId === sample.id ? 'bg-[#e5b9b7] shadow-inner' : 'hover:bg-[#e4e4e2]'
                  }`}
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{sample.id}</td>
                  <td className="px-4 py-3.5 text-slate-800 font-medium">{sample.client}</td>
                  <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{sample.type}</td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono text-xs hidden sm:table-cell">{sample.received}</td>
                  <td className="px-4 py-3.5 text-slate-500 font-mono text-xs hidden sm:table-cell">{sample.due}</td>
                  <td className="px-5 py-3.5"><StatusPill status={sample.status} /></td>
                </tr>
              ))}
              {filteredSamples.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">
                    No samples match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showFilters && (
        <FilterModal
          title="Filter samples"
          onClose={() => setShowFilters(false)}
          onApply={() => {
            setFilters({ ...draftFilters })
            setShowFilters(false)
          }}
          onReset={() => {
            setDraftFilters({ ...emptySampleFilters })
            setFilters({ ...emptySampleFilters })
          }}
        >
          <label className="block">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Status</span>
            <select
              value={draftFilters.status}
              onChange={event => setDraftFilters(current => ({ ...current, status: event.target.value }))}
              className={filterSelectClasses}
            >
              <option value="">All statuses</option>
              {Array.from(new Set(SAMPLES.map(sample => sample.status))).sort().map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Priority</span>
            <select
              value={draftFilters.priority}
              onChange={event => setDraftFilters(current => ({ ...current, priority: event.target.value }))}
              className={filterSelectClasses}
            >
              <option value="">All priorities</option>
              {Array.from(new Set(SAMPLES.map(sample => sample.priority))).sort().map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Client</span>
            <select
              value={draftFilters.client}
              onChange={event => setDraftFilters(current => ({ ...current, client: event.target.value }))}
              className={filterSelectClasses}
            >
              <option value="">All clients</option>
              {Array.from(new Set(SAMPLES.map(sample => sample.client))).sort().map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </label>
        </FilterModal>
      )}

      {selectedSample && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-tests-title"
          onClick={() => setSelectedSampleId(null)}
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm p-4 flex items-center justify-center"
        >
          <div
            onClick={event => event.stopPropagation()}
            className="w-full max-w-4xl max-h-[85vh] overflow-auto rounded-2xl bg-[#eeeeec] border border-slate-300 shadow-2xl"
          >
            <div className="sticky top-0 z-10 px-6 py-5 bg-[#e2e2e0] border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Sample {selectedSample.id}</p>
                <p id="sample-tests-title" className="text-xl font-semibold text-slate-900">Tests & Assigned Specimens</p>
                <p className="text-sm text-slate-500 mt-1">{selectedSample.client}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSampleId(null)}
                className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-medium rounded-xl hover:bg-[#e8e8e6] transition-colors"
              >
                Close
              </button>
            </div>

            <div className="p-6">
              <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#e2e2e0] border-b border-slate-200">
                      <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Test Method</th>
                      <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Specimen Used</th>
                      <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Specimen Type</th>
                      <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Due Date</th>
                      <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-5 py-4 text-slate-800 font-medium">{selectedSample.type}</td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-600">{selectedSample.id}-01</td>
                      <td className="px-4 py-4 text-slate-500 hidden sm:table-cell">Primary specimen</td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-500">{selectedSample.due}</td>
                      <td className="px-5 py-4"><StatusPill status={selectedSample.status} /></td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 text-slate-800 font-medium">ASTM D2216</td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-600">{selectedSample.id}-02</td>
                      <td className="px-4 py-4 text-slate-500 hidden sm:table-cell">Retained split</td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-500">{selectedSample.due}</td>
                      <td className="px-5 py-4"><StatusPill status="Pending" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}