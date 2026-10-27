import { useState } from "react"
import { PROJECTS } from "../data/mockData"
import StatusPill from "../components/common/StatusPill"
import FilterModal from "../components/common/FilterModal"
import CalendarField from "../components/common/CalendarField"
const filterSelectClasses = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none'
const emptyProjectFilters = { status: '', client: '', assignee: '' }

export default function ProjectIntake() {
  const [showNewProject, setShowNewProject] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState(emptyProjectFilters)
  const [draftFilters, setDraftFilters] = useState(emptyProjectFilters)
  const filteredProjects = PROJECTS.filter(project =>
    (!filters.status || project.status === filters.status)
    && (!filters.client || project.client === filters.client)
    && (!filters.assignee || project.assignee === filters.assignee)
  )
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const openFilters = () => {
    setDraftFilters({ ...filters })
    setShowFilters(true)
  }
  const emptyProjectForm = {
    client: '',
    projectName: '',
    startDate: '',
    dueDate: '',
    assignee: '',
    notes: '',
}

    const [formData, setFormData] = useState(emptyProjectForm)

    const updateField = (
    field: keyof typeof emptyProjectForm,
    value: string
    ) => {
    setFormData(current => ({
        ...current,
        [field]: value,
    }))
    }

    const clearForm = () => {
    setFormData({ ...emptyProjectForm })
    }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-red-700 uppercase tracking-widest mb-1">Project Management</p>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Projects</h1>
        </div>
        <button
          type="button"
          aria-expanded={showNewProject}
          onClick={() => setShowNewProject(current => !current)}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
        >
          {showNewProject ? 'Close Form' : '+ Add Project'}
        </button>
      </div>

      {showNewProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div id="project-intake-form" className="lg:col-span-2 border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden scroll-mt-20">
            <div className="px-5 py-4 border-b border-slate-100 bg-[#e2e2e0]">
              <p className="text-sm font-semibold text-slate-800">New Project</p>
              <p className="text-xs text-slate-500 mt-0.5">Set up the client, schedule, and project owner</p>
            </div> 
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Client */}
            <label className="block">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                Client
                </span>
                <input
                type="text"
                value={formData.client}
                onChange={event => updateField('client', event.target.value)}
                placeholder="Select client"
                className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                />
            </label>

            {/* Project Name */}
            <label className="block">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                Project Name
                </span>
                <input
                type="text"
                value={formData.projectName}
                onChange={event => updateField('projectName', event.target.value)}
                placeholder="Enter project name"
                className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                />
            </label>

            {/* Start Date */}
            <CalendarField
                label="Start Date"
                value={formData.startDate}
                onChange={value => updateField('startDate', value)}
            />

            {/* Due Date */}
            <CalendarField
                label="Due Date"
                value={formData.dueDate}
                onChange={value => updateField('dueDate', value)}
            />

            {/* Assignee */}
            <label className="block">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                Assignee
                </span>
                <input
                type="text"
                value={formData.assignee}
                onChange={event => updateField('assignee', event.target.value)}
                placeholder="Select assignee"
                className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                />
            </label>

            {/* Project Notes */}
            <label className="block sm:col-span-2">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                Project Notes
                </span>
                <textarea
                rows={3}
                value={formData.notes}
                onChange={event => updateField('notes', event.target.value)}
                placeholder="Add scope, billing, or testing notes…"
                className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 resize-none"
                />
            </label>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button type="button" onClick={clearForm} className="px-4 py-2 border border-slate-300 text-slate-600 text-sm font-medium rounded-xl hover:bg-[#e4e4e2] transition-colors">
                Clear
                </button>
              <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors">
                Create Project
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] h-fit">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800">Project Defaults</p>
            </div>
            <div className="p-5 space-y-4">
              {['Log samples on receipt', 'Ready to invoice on approval', 'Notify assignee when overdue'].map((item, index) => (
                <label key={item} className="flex items-start gap-3">
                  <input type="checkbox" defaultChecked={index < 2} className="mt-0.5 accent-[#940700]" />
                  <span className="text-sm text-slate-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border border-slate-200 rounded-xl bg-[#e8e8e6] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-[#e2e2e0] flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-800">Projects</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {filteredProjects.length}{activeFilterCount ? ` of ${PROJECTS.length}` : ''} total
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
                <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Project</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden md:table-cell">Start Date</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:table-cell">Due Date</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider hidden lg:table-cell">Assignee</th>
                <th className="text-left px-5 py-3 font-mono text-xs text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map(project => (
                <tr key={project.name} className="hover:bg-[#e4e4e2] transition-colors">
                  <td className="px-5 py-3.5 text-slate-800 font-medium">{project.name}</td>
                  <td className="px-4 py-3.5 text-slate-600">{project.client}</td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono text-xs hidden md:table-cell">{project.start}</td>
                  <td className="px-4 py-3.5 text-slate-500 font-mono text-xs hidden sm:table-cell">{project.due}</td>
                  <td className="px-4 py-3.5 text-slate-500 hidden lg:table-cell">{project.assignee}</td>
                  <td className="px-5 py-3.5"><StatusPill status={project.status} /></td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">
                    No projects match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showFilters && (
        <FilterModal
          title="Filter projects"
          onClose={() => setShowFilters(false)}
          onApply={() => {
            setFilters({ ...draftFilters })
            setShowFilters(false)
          }}
          onReset={() => {
            setDraftFilters({ ...emptyProjectFilters })
            setFilters({ ...emptyProjectFilters })
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
              {Array.from(new Set(PROJECTS.map(project => project.status))).sort().map(status => (
                <option key={status} value={status}>{status}</option>
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
              {Array.from(new Set(PROJECTS.map(project => project.client))).sort().map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Assignee</span>
            <select
              value={draftFilters.assignee}
              onChange={event => setDraftFilters(current => ({ ...current, assignee: event.target.value }))}
              className={filterSelectClasses}
            >
              <option value="">All assignees</option>
              {Array.from(new Set(PROJECTS.map(project => project.assignee))).sort().map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </label>
        </FilterModal>
      )}
    </div>
  )
}