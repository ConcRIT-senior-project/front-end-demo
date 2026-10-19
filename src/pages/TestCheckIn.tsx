import { useState } from "react"
import CalendarField from "../components/common/CalendarField"

const API_URL = import.meta.env.VITE_API_URL ?? ''
const API_BASE_URL = API_URL.replace(/\/$/, '')

const emptySampleForm = {
  client: '',
  project: '',
  sample: '',
  startDate: '',
  testCode: '',
  testMethod: '',
  description: '',
}

const copy = {
  singular: 'Test',
  plural: 'Tests',
  singularLower: 'test',
  pluralLower: 'tests',
  registrationLabel: 'Test Registration',
  title: 'Test Check In',
  listTitle: 'Tests Being Checked In',
  endpoint: '/api/tests/check-in',
  collectionDateLabel: 'Test Date',
  testCodeLabel: 'Test Code',
  testMethodLabel: 'Test Method',
  descriptionLabel: 'Description',
  descriptionPlaceholder: 'Describe the requested test and any special handling…',
  typeOptions: ['Moisture Content', 'Sieve Analysis', 'Atterberg Limits', 'Compaction', 'Other'],
  emptyMessage: 'Staged tests will appear here.',
}

export default function TestCheckIn() {
  const checkInEndpoint = `${API_BASE_URL}${copy.endpoint}`
  const [formData, setFormData] = useState(emptySampleForm)
  const [checkingInSamples, setCheckingInSamples] = useState<
    Array<typeof emptySampleForm & { id: number }>
  >([])
  const [duplicateCounts, setDuplicateCounts] = useState<Record<number, string>>({})
  const [hoveredSampleId, setHoveredSampleId] = useState<number | null>(null)
  const [nextSampleId, setNextSampleId] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState(false)

  const updateField = (field: keyof typeof emptySampleForm, value: string) => {
    setFormData(current => ({ ...current, [field]: value }))
  }

  const clearForm = () => setFormData({ ...emptySampleForm })

  const updateStagedField = (
    sampleId: number,
    field: keyof typeof emptySampleForm,
    value: string,
  ) => {
    setCheckingInSamples(current => current.map(sample =>
      sample.id === sampleId ? { ...sample, [field]: value } : sample
    ))
  }

  const stageSample = () => {
    setCheckingInSamples(current => [
      ...current,
      { ...formData, id: nextSampleId },
    ])
    setNextSampleId(current => current + 1)
    clearForm()
  }

  const duplicateSample = (sampleId: number) => {
    const sampleToDuplicate = checkingInSamples.find(sample => sample.id === sampleId)
    if (!sampleToDuplicate) return

    const duplicateCount = Number(duplicateCounts[sampleId] ?? '1')
    if (!Number.isSafeInteger(duplicateCount) || duplicateCount < 1) return

    setCheckingInSamples(current => [
      ...current,
      ...Array.from({ length: duplicateCount }, (_, index) => ({
        ...sampleToDuplicate,
        id: nextSampleId + index,
      })),
    ])
    setNextSampleId(current => current + duplicateCount)
  }

  const checkInSamples = async () => {
    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      // TODO: Replace the placeholder route when the check-in API endpoint is available.
      const response = await fetch(checkInEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkingInSamples),
      })

      if (!response.ok) {
        throw new Error(`${copy.singular} check-in failed with status ${response.status}.`)
      }

      setShowSubmissionConfirmation(true)
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : `${copy.singular} check-in failed due to an unexpected error.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-[calc(100dvh-9.5rem)] min-h-0">
      <div className="grid h-full min-h-0 grid-cols-2 gap-5">
        <div className="flex min-h-0 flex-col gap-4">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-mono uppercase tracking-widest text-red-700">
                {copy.registrationLabel}
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {copy.title}
              </h1>
            </div>
            <section className="h-fit shrink-0 rounded-xl border border-slate-200 bg-[#e8e8e6]">
            </section>
          </div>

          {/* Check-in creator/editor */}
          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#e8e8e6]"> 
            <div className="grid flex-1 content-start gap-5 overflow-hidden p-5 grid-cols-[repeat(2,minmax(15vw,1fr))] [&>*]:min-w-[15vw]">
              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">Client</span>
                <input
                  type="text"
                  value={formData.client}
                  onChange={event => updateField('client', event.target.value)}
                  placeholder="Search clients..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">Project</span>
                <input
                  type="text"
                  value={formData.project}
                  onChange={event => updateField('project', event.target.value)}
                  placeholder="Search projects..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">Sample</span>
                <input
                  type="text"
                  value={formData.sample}
                  onChange={event => updateField('sample', event.target.value)}
                  placeholder="Search samples..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <CalendarField
                label="Start Date"
                value={formData.startDate}
                onChange={value => updateField('startDate', value)}
              />

              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">{copy.testCodeLabel}</span>
                <select
                  value={formData.testCode}
                  onChange={event => updateField('testCode', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                >
                  <option value="Borehole">Borehole</option>
                  <option value="Test Pit">Test Pit</option>
                  <option value="Surface">Surface</option>
                  <option value="Stockpile">Stockpile</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">{copy.testMethodLabel}</span>
                <select
                  value={formData.testMethod}
                  onChange={event => updateField('testMethod', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                >
                  <option value="Borehole">Borehole</option>
                  <option value="Test Pit">Test Pit</option>
                  <option value="Surface">Surface</option>
                  <option value="Stockpile">Stockpile</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block col-span-2">
                <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">{copy.descriptionLabel}</span>
                <input
                  type="text"
                  value={formData.description}
                  onChange={event => updateField('description', event.target.value)}
                  placeholder={copy.descriptionPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>
            </div>

            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={clearForm}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#e4e4e2]"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={stageSample}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                  Stage {copy.singular}
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#e8e8e6]">
            <div className="flex items-center justify-between border-b border-slate-100 bg-[#e2e2e0] px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  {copy.listTitle}
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  {checkingInSamples.length} total
                </span>
              </div>
              <button
                type="button"
                onClick={checkInSamples}
                disabled={checkingInSamples.length === 0 || isSubmitting}
                className="rounded-xl bg-[#940700] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#760600] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Checking In…' : `Check In ${copy.plural}`}
              </button>
            </div>
            {submissionError && (
              <p role="alert" className="border-b border-red-200 bg-red-50 px-5 py-2 text-xs text-red-800">
                {submissionError}
              </p>
            )}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="h-full space-y-3 overflow-x-hidden overflow-y-scroll p-4">
                {checkingInSamples.map((sample, index) => (
                <div
                  key={sample.id}
                  className={`group relative h-[4.5rem] ${
                    hoveredSampleId === sample.id ? 'z-20' : 'z-0'
                  }`}
                  onMouseEnter={() => setHoveredSampleId(sample.id)}
                  onMouseLeave={() => setHoveredSampleId(null)}
                  onFocusCapture={() => setHoveredSampleId(sample.id)}
                  onBlurCapture={event => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setHoveredSampleId(null)
                    }
                  }}
                >
                <article
                  tabIndex={0}
                  className={`absolute inset-x-0 top-0 rounded-xl border border-slate-200 px-3 py-2 shadow-sm ${
                    index % 2 === 0 ? 'bg-[#eeeeec]' : 'bg-[#e4e4e2]'
                  }`}
                >
                  <div className="flex min-h-7 items-center gap-2">
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-red-700">
                      #{String(sample.id).padStart(3, '0')}
                    </span>
                    <h3 className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-900">
                      {sample.sample || 'No sample selected'}
                    </h3>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={duplicateCounts[sample.id] ?? '1'}
                      onFocus={event => event.currentTarget.select()}
                      onChange={event => setDuplicateCounts(current => ({
                        ...current,
                        [sample.id]: event.target.value,
                      }))}
                      className="h-7 w-7 rounded-md border border-slate-300 bg-white p-0 text-center text-xs text-slate-700 focus:border-slate-400 focus:outline-none"
                      aria-label={`Number of copies to duplicate from ${copy.singular} ${sample.id}`}
                    />
                    <button
                      type="button"
                      onClick={() => duplicateSample(sample.id)}
                      disabled={!Number.isSafeInteger(Number(duplicateCounts[sample.id] ?? '1')) || Number(duplicateCounts[sample.id] ?? '1') < 1}
                      className="shrink-0 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Duplicate ${copy.singular} ${sample.id}`}
                    >
                        Duplicate
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckingInSamples(current =>
                        current.filter(item => item.id !== sample.id)
                      )}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-300 text-base leading-none text-[#940700] transition-colors hover:bg-[#fff5f5]"
                      aria-label={`Remove ${copy.singular} ${sample.id} from check-in list`}
                    >
                      ×
                    </button>
                  </div>

                  <p className="flex h-5 min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[10px] text-slate-500">
                    <span className="truncate">{sample.testCode || 'No test code'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{sample.testMethod || 'No test method'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="shrink-0">{sample.startDate || 'No start date'}</span>
                  </p>

                  <div className="invisible grid max-h-0 translate-y-[-4px] grid-cols-2 gap-1.5 overflow-hidden border-t-0 border-slate-200 pt-0 text-[9px] opacity-0 transition-[max-height,opacity,transform,padding,margin,border-width,visibility] duration-[200ms] group-hover:visible group-hover:mt-2 group-hover:max-h-[500px] group-hover:translate-y-0 group-hover:border-t group-hover:pt-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:mt-2 group-focus-within:max-h-[500px] group-focus-within:translate-y-0 group-focus-within:border-t group-focus-within:pt-2 group-focus-within:opacity-100 sm:grid-cols-3">
                    <label className="block">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">Client</span>
                      <input
                        type="text"
                        value={sample.client}
                        onChange={event => updateStagedField(sample.id, 'client', event.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">Project</span>
                      <input
                        type="text"
                        value={sample.project}
                        onChange={event => updateStagedField(sample.id, 'project', event.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">Sample</span>
                      <input
                        type="text"
                        value={sample.sample}
                        onChange={event => updateStagedField(sample.id, 'sample', event.target.value)}
                        placeholder="Enter sample ID"
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">Start Date</span>
                      <input
                        type="text"
                        value={sample.startDate}
                        onChange={event => updateStagedField(sample.id, 'startDate', event.target.value)}
                        placeholder="YYYY-MM-DD"
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">{copy.testCodeLabel}</span>
                      <input
                        type="text"
                        value={sample.testCode}
                        onChange={event => updateStagedField(sample.id, 'testCode', event.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">{copy.testMethodLabel}</span>
                      <input
                        type="text"
                        value={sample.testMethod}
                        onChange={event => updateStagedField(sample.id, 'testMethod', event.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                    <label className="col-span-2 block sm:col-span-3">
                      <span className="mb-1 block font-mono uppercase tracking-wider text-slate-400">Description</span>
                      <input
                        type="text"
                        value={sample.description}
                        onChange={event => updateStagedField(sample.id, 'description', event.target.value)}
                        title={sample.description || undefined}
                        className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-700 focus:border-slate-400 focus:outline-none"
                      />
                    </label>
                  </div>

                </article>
                </div>
                ))}
                {checkingInSamples.length === 0 && (
                  <p className="px-2 py-10 text-center text-sm text-slate-500">
                    {copy.emptyMessage}
                  </p>
                )}
              </div>
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 z-10 bg-slate-900 transition-opacity duration-[200ms] ${
                  hoveredSampleId === null ? 'opacity-0' : 'opacity-50'
                }`}
              />
            </div>
        </section>
      </div>

      {showSubmissionConfirmation && (
        <div
          role="presentation"
          onClick={() => setShowSubmissionConfirmation(false)}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/50 p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="test-check-in-confirmation-title"
            onClick={event => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-[#eeeeec] p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
              ✓
            </div>
            <h2 id="test-check-in-confirmation-title" className="text-lg font-semibold text-slate-900">
              {copy.plural} checked in
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Successfully submitted {checkingInSamples.length} {checkingInSamples.length === 1 ? copy.singularLower : copy.pluralLower}.
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setShowSubmissionConfirmation(false)}
              className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
