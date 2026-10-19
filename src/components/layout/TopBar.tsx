
import { useEffect, useRef, useState } from 'react'

type TopBarProps = {
  pageLabel: string
}

export default function TopBar({ pageLabel }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showNotifications) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        !notificationRef.current?.contains(event.target as Node)
      ) {
        setShowNotifications(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [showNotifications])

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between rounded-t-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <span>S.O.I.L</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600">{pageLabel}</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <label className="relative block">
          <span className="sr-only">Search records</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <path
              d="m16 16 4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Search records…"
            className="w-52 rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-500 hover:border-slate-400 focus:w-64 focus:border-[#940700] focus:bg-white focus:outline-none md:w-64 md:focus:w-72"
          />
        </label>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            aria-label="Open notifications"
            aria-expanded={showNotifications}
            aria-haspopup="true"
            onClick={() =>
              setShowNotifications(current => !current)
            }
            className="relative flex rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#940700]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
            >
              <path
                d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM14 21h-4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-white bg-[#940700]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-[#eeeeec] text-left shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 bg-[#e2e2e0] px-4 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Notifications
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    2 unread updates
                  </p>
                </div>
                <span className="rounded-full border border-[#f0aaaa] bg-[#fff5f5] px-2 py-0.5 font-mono text-xs font-medium text-[#6b0500]">
                  2 new
                </span>
              </div>

              <div className="divide-y divide-slate-200">
                <NotificationItem
                  unread
                  title="You’ve been assigned a test"
                  description="D1557 · Modified Proctor Compaction"
                  time="4 min ago"
                />
                <NotificationItem
                  unread
                  title="Result awaiting your review"
                  description="D422 w Hyd · Particle Size Analysis"
                  time="38 min ago"
                />
                <NotificationItem
                  title="Project due tomorrow"
                  description="Storage Pad Design · Elm Creek Co-op"
                  time="Yesterday"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="w-full border-t border-slate-200 px-4 py-3 text-center font-mono text-xs font-medium text-[#940700] transition-colors hover:bg-[#e4e4e2]"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

type NotificationItemProps = {
  title: string
  description: string
  time: string
  unread?: boolean
}

function NotificationItem({
  title,
  description,
  time,
  unread = false,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      className={`flex w-full gap-3 px-4 py-3.5 text-left transition-colors ${
        unread
          ? 'bg-[#fff5f5] hover:bg-[#ffdede]'
          : 'hover:bg-[#e4e4e2]'
      }`}
    >
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
          unread ? 'bg-[#940700]' : 'bg-slate-300'
        }`}
      />
      <span className="min-w-0">
        <span
          className={`block text-sm ${
            unread
              ? 'font-semibold text-slate-900'
              : 'font-medium text-slate-800'
          }`}
        >
          {title}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-600">
          {description}
        </span>
        <span className="mt-1.5 block font-mono text-[11px] text-slate-400">
          {time}
        </span>
      </span>
    </button>
  )
}
