import type { ReactNode } from 'react'
import Sidebar, { type View } from './Sidebar'
import TopBar from './TopBar'

type AppLayoutProps = {
  view: View
  pageLabel: string
  onNavigate: (view: View) => void
  onLogout: () => void
  children: ReactNode
}

export default function AppLayout({
  view,
  pageLabel,
  onNavigate,
  onLogout,
  children,
}: AppLayoutProps) {
  return (
    <div className="h-dvh overflow-hidden bg-[#3d3d3d] flex p-3 gap-3">
      <Sidebar
        view={view}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 min-w-0 h-full overflow-y-auto bg-[#eeeeec] rounded-2xl ml-58">
        <TopBar pageLabel={pageLabel} />

        <div className="w-full min-h-[calc(100%-4rem)] px-8 py-8 bg-[rgb(156,154,154)]">
          {children}
        </div>
      </main>
    </div>
  )
}
