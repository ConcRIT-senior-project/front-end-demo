import { useState } from "react"
import {ADMIN_USERS} from "../data/mockData"

export default function Admin() {
  const [section, setSection] = useState<'data structures' | 'users'>('data structures')

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">System Administration</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Admin</h1>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-300">
        {(['data structures', 'users'] as const).map(item => (
          <button
            key={item}
            onClick={() => setSection(item)}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
              section === item
                ? 'border-[#940700] text-[#940700]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Manage {item}
          </button>
        ))}
      </div>

      {section === 'data structures' ? (
        <p>data structures editing goes here</p>
      ) : (
        <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-[#e2e2e0]">
            <p className="text-sm font-semibold text-slate-800">User Access</p>
            <p className="text-xs text-slate-500 mt-0.5">Manage roles and application permissions</p>
          </div>
          <div className="divide-y divide-slate-100">
            {ADMIN_USERS.map(user => (
              <div key={user.name} className="px-5 py-4 flex items-center gap-4 hover:bg-[#e4e4e2] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#4a0400] flex items-center justify-center text-xs text-[#f0aaaa] font-mono font-medium shrink-0">
                  {user.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
                <div className="hidden sm:block w-36">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Access</p>
                  <p className="text-sm text-slate-700 mt-0.5">{user.access}</p>
                </div>
                <span className="text-xs font-mono text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                  {user.status}
                </span>
                <button className="text-xs font-mono text-[#940700] hover:underline">Manage</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}