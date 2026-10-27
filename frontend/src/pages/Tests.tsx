import { WORKFLOW_TESTS } from "../data/mockData"
import StatusPill from "../components/common/StatusPill"

const testStatuses = ['Running', 'Queued', 'Hold'] as const

export default function Tests() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-1 text-xs font-mono uppercase tracking-widest text-red-700">
          Laboratory Operations
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          All Tests
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {testStatuses.map(status => (
          <div
            key={status}
            className="rounded-xl border border-slate-200 bg-[#e8e8e6] px-5 py-4 text-center"
          >
            <p className="text-3xl font-light text-[#940700]">
              {WORKFLOW_TESTS.filter(test => test.status === status).length}
            </p>
            <p className="mt-1 text-xs font-mono uppercase tracking-wider text-slate-400">
              {status === 'Hold' ? 'On Hold' : status}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#e8e8e6]">
        <div className="border-b border-slate-100 bg-[#e2e2e0] px-5 py-4">
          <span className="text-sm font-semibold text-slate-800">
            Test Register
          </span>
          <span className="ml-3 text-xs font-mono text-slate-400">
            {WORKFLOW_TESTS.length} tests
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-400">
                  Sample
                </th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-400">
                  Test Method
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-400 md:table-cell">
                  Analyst
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-400 sm:table-cell">
                  Started
                </th>
                <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-400">
                  Est. Complete
                </th>
                <th className="px-5 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {WORKFLOW_TESTS.map((test, index) => (
                <tr key={`${test.sample}-${test.test}-${index}`} className="hover:bg-[#e4e4e2]">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600">
                    {test.sample}
                  </td>
                  <td className="px-4 py-3.5 text-slate-800">{test.test}</td>
                  <td className="hidden px-4 py-3.5 text-slate-500 md:table-cell">
                    {test.analyst}
                  </td>
                  <td className="hidden px-4 py-3.5 font-mono text-xs text-slate-400 sm:table-cell">
                    {test.started}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                    {test.est}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={test.status} />
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
