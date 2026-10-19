
type View = 'tests' | 'test-check-in' |'samples' | 'sample-check-in' | 'projects' | 'data-structures'

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'tests', label: 'Dashboard / Test View' },
  { id: 'test-check-in', label: 'Test Check In' },
  { id: 'samples', label: 'Sample View' },
  { id: 'sample-check-in', label: 'Sample Check In' },
  { id: 'projects', label: 'Projects' },
  { id: 'data-structures', label: 'Admin' },
]

type SidebarProps = {
  view: View
  onNavigate: (view: View) => void
  onLogout: () => void
}

export default function Sidebar({
  view,
  onNavigate,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="fixed h-[97dvh] w-56 shrink-0 bg-[#180200] flex flex-col rounded-2xl overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#4a0400]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-[#940700] rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-mono text-xs font-bold">
              S
            </span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">
              S.O.I.L
            </p>
            <p className="text-[#c94040] text-xs font-mono leading-tight">
              ATL v1.0
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={view === item.id ? 'page' : undefined}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                view === item.id
                  ? 'bg-[#2e0300] text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#2e0300]'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User menu */}
      <div className="px-4 py-4 border-t border-[#4a0400]">
        <details className="group relative">
          <summary className="flex w-full cursor-pointer list-none items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-[#2e0300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c94040] [&::-webkit-details-marker]:hidden">
            <div className="w-7 h-7 rounded-full bg-[#4a0400] flex items-center justify-center text-xs text-[#f0aaaa] font-mono font-medium shrink-0">
              DC
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-white text-xs font-medium truncate">
                Dir. Craig
              </p>
              <p className="text-[#c94040] text-xs truncate">
                Quality Director
              </p>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 shrink-0 text-[#c94040] transition-transform group-open:rotate-180"
            >
              <path
                d="m6 12 4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>

          <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-[#4a0400] bg-[#2e0300] p-1.5 shadow-xl">
            <button
              type="button"
              onClick={onLogout}
              className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#f0aaaa] transition-colors hover:bg-[#4a0400] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#c94040]"
            >
              Log out
            </button>
          </div>
        </details>
      </div>
    </aside>
  )
}
