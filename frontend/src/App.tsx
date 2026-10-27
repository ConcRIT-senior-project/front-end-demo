import { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import { NAV_ITEMS, type View } from "./components/layout/Sidebar";

import CheckIn from "./pages/CheckIn";

export default function App() {
  const [view, setView] = useState<View>('checkIn')
  const [isSignedOut, setIsSignedOut] = useState(false)

  const views: Record<View, React.ReactNode> = {
    checkIn: <CheckIn />,
  }

  const pageLabel =
    NAV_ITEMS.find(item => item.id === view)?.label ?? 'Dashboard'

  if (isSignedOut) {
    return (
      <div className="min-h-screen bg-[#3d3d3d] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-[#eeeeec] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#940700] font-mono text-sm font-bold text-white">
            S
          </div>

          <p className="mb-1 text-xs font-mono uppercase tracking-widest text-red-700">
            S.O.I.L
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            You’re logged out
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your session has ended successfully.
          </p>

          <button
            type="button"
            onClick={() => setIsSignedOut(false)}
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#940700]"
          >
            Sign back in
          </button>
        </div>
      </div>
    )
  }

  return (
    <AppLayout
      view={view}
      pageLabel={pageLabel}
      onNavigate={setView}
      onLogout={() => setIsSignedOut(true)}
    >
      {views[view]}
    </AppLayout>
  )
}