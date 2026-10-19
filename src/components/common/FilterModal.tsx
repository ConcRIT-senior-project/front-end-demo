import { type ReactNode } from "react"

export default function FilterModal({
  title,
  children,
  onApply,
  onClose,
  onReset,
}: {
  title: string
  children: ReactNode
  onApply: () => void
  onClose: () => void
  onReset: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
    >
      <form
        onSubmit={event => {
          event.preventDefault()
          onApply()
        }}
        onClick={event => event.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-300 bg-[#eeeeec] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[#e2e2e0] px-6 py-5">
          <div>
            <p className="mb-1 text-xs font-mono uppercase tracking-widest text-red-700">Table filters</p>
            <h2 id="filter-modal-title" className="text-xl font-semibold text-slate-900">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-[#eeeeec] hover:text-slate-800"
          >
            Close
          </button>
        </div>
        <div className="space-y-5 p-6">{children}</div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-mono text-slate-500 transition-colors hover:text-[#940700]"
          >
            Reset filters
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#e4e4e2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Apply filters
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}