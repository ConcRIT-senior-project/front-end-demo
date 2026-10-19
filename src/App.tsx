import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import SampleView from "./pages/SampleView";
import SampleCheckIn from "./pages/SampleCheckIn";
import TestCheckIn from "./pages/TestCheckIn";
import ProjectIntake from "./pages/ProjectIntake";
import Admin from "./pages/Admin";
import AppLayout from "./components/layout/AppLayout";

interface Sample {
  id: number;
  name: string;
}

const API_URL: string = import.meta.env.VITE_API_URL;


type View = 'tests' | 'test-check-in' | 'samples' | 'sample-check-in' | 'projects' | 'data-structures'

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'tests', label: 'Dashboard' },
  { id: 'test-check-in', label: 'Test Check In' },
  { id: 'samples', label: 'Samples' },
  { id: 'sample-check-in', label: 'Sample Check In' },
  { id: 'projects', label: 'Projects' },
  { id: 'data-structures', label: 'Admin' },
]

export default function App() {
  // const [samples, setSamples] = useState<Sample[]>([]);
  // const [name, setName] = useState<string>("");
  // const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('tests')
  const [isSignedOut, setIsSignedOut] = useState(false)

  const views: Record<View, React.ReactNode> = {
    tests: <Dashboard />,
    'test-check-in': <TestCheckIn />,
    samples: <SampleView onNavigate={setView} />,
    'sample-check-in': <SampleCheckIn />,
    projects: <ProjectIntake />,
    'data-structures': <Admin />,
  }

  const pageLabel =
    NAV_ITEMS.find(item => item.id === view)?.label ?? 'Dashboard'

  // async function loadSamples(): Promise<void> {
  //   try {
  //     const res = await fetch(`${API_URL}/api/samples`);
  //     if (!res.ok) throw new Error(`API returned ${res.status}`);
  //     setSamples((await res.json()) as Sample[]);
  //     setError(null);
  //   } catch (e) {
  //     setError(e instanceof Error ? e.message : "Unknown error");
  //   }
  // }

  // async function addSample(e: FormEvent<HTMLFormElement>): Promise<void> {
  //   e.preventDefault();
  //   if (!name.trim()) return;
  //   try {
  //     const res = await fetch(`${API_URL}/api/samples`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name }),
  //     });
  //     if (!res.ok) throw new Error(`API returned ${res.status}`);
  //     setName("");
  //     await loadSamples();
  //   } catch (e) {
  //     setError(e instanceof Error ? e.message : "Unknown error");
  //   }
  // }

  // useEffect(() => {
  //   void loadSamples();
  // }, []);

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