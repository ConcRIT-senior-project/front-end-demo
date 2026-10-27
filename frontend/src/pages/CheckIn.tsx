import { useState } from "react"
import CalendarField from "../components/common/CalendarField"

const API_URL = import.meta.env.VITE_API_URL ?? ''
const API_BASE_URL = API_URL.replace(/\/$/, '')

const getTodayDate = () => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

const emptySampleForm = {
  client: '',
  proj_name: '',
  proj_code: '',

  collectionDate: '',
  source: '',
  sampledFrom: '',
  sampleType: '',

  receivedBy: '',
  receivedDate: '',

  test_codes: '',

  description: '',
}

const availableTestCodes = [
  'Fake-Code-1',
  'Fake-Code-2',
  'Fake-Code-3',
  'Fake-Code-4',
  'Fake-Code-5',
  'Fake-Code-6',
  'Fake-Code-7',
]

function parseTestCodes(value: string) {
  return value.split(',').map(code => code.trim()).filter(Boolean)
}

function TestCodePicker({
  value,
  onChange,
  compact = false,
}: {
  value: string
  onChange: (value: string) => void
  compact?: boolean
}) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const selectedCodes = parseTestCodes(value)
  const suggestions = inputValue.trim()
    ? availableTestCodes.filter(code =>
      code.toLowerCase().includes(inputValue.trim().toLowerCase())
      && !selectedCodes.some(selected => selected.toLowerCase() === code.toLowerCase())
    )
    : []
  const canAddCustomCode = Boolean(inputValue.trim()) && !selectedCodes.some(
    selected => selected.toLowerCase() === inputValue.trim().toLowerCase()
  )

  const addCode = (code: string) => {
    const trimmedCode = code.trim()
    if (!trimmedCode) return
    if (selectedCodes.some(
      selected => selected.toLowerCase() === trimmedCode.toLowerCase()
    )) {
      setInputValue('')
      return
    }

    onChange([...selectedCodes, trimmedCode].join(', '))
    setInputValue('')
  }

  const removeCode = (codeToRemove: string) => {
    onChange(selectedCodes.filter(code => code !== codeToRemove).join(', '))
  }

  return (
    <div className="relative min-w-0">
      <div
        className={`flex min-h-8 min-w-0 flex-wrap items-center gap-1 rounded-md border border-slate-200 bg-white focus-within:border-slate-400 ${
          compact ? 'px-1.5 py-1' : 'rounded-lg px-2.5 py-1.5'
        }`}
      >
        {selectedCodes.map(code => (
          <span
            key={code}
            className={`inline-flex max-w-full items-center gap-1 rounded-full bg-slate-200 text-slate-700 ${
            compact ? 'pl-2 pr-0.5 py-0.5 text-[10px]' : 'pl-2.5 pr-1 py-1 text-xs'
            }`}
          >
            <span className="truncate">{code}</span>
            <button
              type="button"
              onClick={() => removeCode(code)}
              aria-label={`Remove test code ${code}`}
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-300 hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-[#940700] hover:text-red-900"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={event => setInputValue(event.target.value)}
          onKeyDown={event => {
            if ((event.key === 'Enter' || event.key === ',') && inputValue.trim()) {
              event.preventDefault()
              const exactMatch = suggestions.find(
                code => code.toLowerCase() === inputValue.trim().toLowerCase()
              )
              addCode(exactMatch ?? inputValue)
            } else if (event.key === 'Backspace' && !inputValue && selectedCodes.length) {
              removeCode(selectedCodes[selectedCodes.length - 1])
            } else if (event.key === 'Escape') {
              setInputValue('')
              setIsFocused(false)
              event.currentTarget.blur()
            }
          }}
          placeholder={selectedCodes.length ? '' : 'Type to search or add a test code'}
          aria-label="Add test code"
          aria-autocomplete="list"
          aria-expanded={isFocused && (suggestions.length > 0 || canAddCustomCode)}
          className={`min-w-[8rem] flex-1 border-0 bg-transparent text-slate-700 outline-none placeholder:text-slate-400 ${
            compact ? 'py-0.5 text-[11px]' : 'py-1 text-sm'
          }`}
        />
      </div>
      {isFocused && (suggestions.length > 0 || canAddCustomCode) && (
        <ul
          role="listbox"
          aria-label="Suggested test codes"
          className="absolute inset-x-0 top-full z-30 mt-1 max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map(code => (
            <li key={code} role="option" aria-selected="false">
              <button
                type="button"
                onMouseDown={event => event.preventDefault()}
                onClick={() => addCode(code)}
                className={`w-full px-3 text-left text-slate-700 hover:bg-slate-100 ${
                  compact ? 'py-1 text-[11px]' : 'py-2 text-sm'
                }`}
              >
                {code}
              </button>
            </li>
          ))}
          {canAddCustomCode && (
            <li role="option" aria-selected="false">
              <button
                type="button"
                onMouseDown={event => event.preventDefault()}
                onClick={() => addCode(inputValue)}
                className={`w-full px-3 text-left text-slate-500 hover:bg-slate-100 ${
                  compact ? 'py-1 text-[11px]' : 'py-2 text-sm'
                }`}
              >
                Add custom “{inputValue.trim()}”
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

const copy = {
  singular: 'Sample',
  plural: 'Samples',
  singularLower: 'sample',
  pluralLower: 'samples',
  registrationLabel: 'Specimen Registration',
  title: 'Sample Check In',
  printLabel: 'Print Sample Tag(s)',
  listTitle: 'Samples Being Checked In',
  endpoint: '/api/samples/check-in',
  collectionDateLabel: 'Collection Date',
  originLabel: 'Sampled From',
  typeLabel: 'Sample Type',
  descriptionLabel: 'Sample Description',
  descriptionPlaceholder: 'Describe material, condition, and packaging…',
  typeOptions: ['Soil', 'Rock', 'Aggregate', 'Other'],
  emptyMessage: 'Staged samples will appear here.',
}

export default function SampleCheckIn() {
  const checkInEndpoint = `${API_BASE_URL}${copy.endpoint}`
  const [formData, setFormData] = useState(() => ({
    ...emptySampleForm,
    receivedDate: getTodayDate(),
  }))
  const [checkingInSamples, setCheckingInSamples] = useState<
    Array<typeof emptySampleForm & { id: number }>
  >([])
  const [editingSamples, setEditingSamples] = useState<Record<number, boolean>>({})
  const [stageCount, setStageCount] = useState('1')
  const [nextSampleId, setNextSampleId] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState(false)
  const todayDate = getTodayDate()
  const dateValidationError =
    formData.collectionDate > todayDate
      ? 'Collection date cannot be in the future.'
      : formData.receivedDate > todayDate
        ? 'Received date cannot be in the future.'
        : formData.collectionDate && formData.receivedDate && formData.collectionDate > formData.receivedDate
          ? 'Collection date cannot be after the received date.'
          : null

  const updateField = (field: keyof typeof emptySampleForm, value: string) => {
    setFormData(current => ({ ...current, [field]: value }))
  }

  const updateStagedField = (
    sampleId: number,
    field: keyof typeof emptySampleForm,
    value: string,
  ) => {
    setCheckingInSamples(current => current.map(sample => {
      if (sample.id !== sampleId) return sample

      const today = getTodayDate()
      if (field === 'collectionDate' && value && (
        value > today || (sample.receivedDate && value > sample.receivedDate)
      )) {
        return sample
      }
      if (field === 'receivedDate' && value && (
        value > today || (sample.collectionDate && value < sample.collectionDate)
      )) {
        return sample
      }

      return { ...sample, [field]: value }
    }))
  }

  const clearForm = () => setFormData({
    ...emptySampleForm,
    receivedDate: getTodayDate(),
  })

  const stageSample = () => {
    const count = Number(stageCount)
    if (!Number.isSafeInteger(count) || count < 1) return

    setCheckingInSamples(current => [
      ...current,
      ...Array.from({ length: count }, (_, index) => ({
        ...formData,
        id: nextSampleId + index,
      })),
    ])
    setNextSampleId(current => current + count)
    clearForm()
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
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden pr-1">
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
              <div className="p-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#940700] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#760600]"
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  {copy.printLabel}
                </button>
              </div>
            </section>
          </div>

          {/* Check-in creator/editor */}
          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#e8e8e6]">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="grid content-start gap-x-4 gap-y-3 p-4 grid-cols-6">

              <label className="block col-span-2">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">Project Code</span>
                <input
                  type="text"
                  value={formData.proj_code}
                  onChange={event => updateField('proj_code', event.target.value)}
                  placeholder="Enter project code"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <label className="block col-span-2">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">Project Name</span>
                <input
                  type="text"
                  value={formData.proj_name}
                  onChange={event => updateField('proj_name', event.target.value)}
                  placeholder="Search projects..."
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <label className="block col-span-2">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">Client</span>
                <input
                  type="text"
                  value={formData.client}
                  onChange={event => updateField('client', event.target.value)}
                  placeholder="Search clients..."
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <div aria-hidden="true" className="col-span-6 border-t border-slate-300" />

              <CalendarField
                label={copy.collectionDateLabel}
                value={formData.collectionDate}
                onChange={value => updateField('collectionDate', value)}
                maxDate={formData.receivedDate && formData.receivedDate < todayDate
                  ? formData.receivedDate
                  : todayDate}
              />

              <label className="block col-span-3">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">Source</span>
                <input
                  type="text"
                  value={formData.source}
                  onChange={event => updateField('source', event.target.value)}
                  placeholder="Enter source location"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <label className="block col-span-3">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">{copy.originLabel}</span>
                <select
                  value={formData.sampledFrom}
                  onChange={event => updateField('sampledFrom', event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                >
                  <option value="Borehole">Borehole</option>
                  <option value="Test Pit">Test Pit</option>
                  <option value="Stockpile">Stockpile</option>
                  <option value="Surface">Surface</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block col-span-3">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">{copy.typeLabel}</span>
                <select
                  value={formData.sampleType}
                  onChange={event => updateField('sampleType', event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                >
                  {copy.typeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <div aria-hidden="true" className="col-span-6 border-t border-slate-300" />

              <label className="block col-span-3">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">Received By</span>
                <input
                  type="text"
                  value={formData.receivedBy}
                  onChange={event => updateField('receivedBy', event.target.value)}
                  placeholder="Enter name"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <CalendarField
                label="Received Date"
                value={formData.receivedDate}
                onChange={value => updateField('receivedDate', value)}
                minDate={formData.collectionDate || undefined}
                maxDate={todayDate}
              />

              <div aria-hidden="true" className="col-span-6 border-t border-slate-300" />

              <div className="col-span-6">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">
                  Test Assignment
                </span>
                <TestCodePicker
                  value={formData.test_codes}
                  onChange={value => updateField('test_codes', value)}
                />
              </div>

              <div aria-hidden="true" className="col-span-6 border-t border-slate-300" />

              <label className="block col-span-6">
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-500">{copy.descriptionLabel}</span>
                <input
                  type="text"
                  value={formData.description}
                  onChange={event => updateField('description', event.target.value)}
                  placeholder={copy.descriptionPlaceholder}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </label>
              </div>
            </div>

            <div className="sticky bottom-0 z-10 flex shrink-0 justify-between border-t border-slate-100 bg-[#e8e8e6] px-5 py-4">

              <button
                type="button"
                onClick={clearForm}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#e4e4e2]"
              >
                Clear
              </button>

              <div>
                {dateValidationError && (
                  <p role="alert" className="text-xs text-red-800">
                    {dateValidationError}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  Quantity
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={stageCount}
                    onChange={event => setStageCount(event.target.value)}
                    className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-2 text-center text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                    aria-label={`Number of ${copy.pluralLower} to stage`}
                  />
                </label>
                <button
                  type="button"
                  onClick={stageSample}
                  disabled={!Number.isSafeInteger(Number(stageCount)) || Number(stageCount) < 1 || Boolean(dateValidationError)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
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
              <div className="h-full space-y-2 overflow-x-hidden overflow-y-scroll p-3">
                {checkingInSamples.map((sample, index) => {
                  const fixedFields = [
                    ['Project Code', sample.proj_code],
                    ['Received By', sample.receivedBy],
                    ['Received Date', sample.receivedDate],
                  ]
                  const middleFields: Array<{
                    field: keyof typeof emptySampleForm
                    label: string
                    type: 'text' | 'date' | 'select'
                  }> = [
                    { field: 'collectionDate', label: copy.collectionDateLabel, type: 'date' },
                    { field: 'source', label: 'Source', type: 'text' },
                    { field: 'sampledFrom', label: copy.originLabel, type: 'select' },
                    { field: 'sampleType', label: copy.typeLabel, type: 'select' },
                  ]
                  return (
                    <article
                      key={sample.id}
                      className={`rounded-lg border border-slate-200 p-2 shadow-sm ${
                        index % 2 === 0 ? 'bg-[#eeeeec]' : 'bg-[#e4e4e2]'
                      }`}
                    >
                      <div className="mb-1 flex min-h-7 items-center justify-start gap-2">
                        <div className="flex flex-1 items-center justify-start gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {copy.singular}
                          </h3>
                          <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-red-700">
                            #{String(sample.id).padStart(3, '0')}
                          </span>
                        </div>
                        <button
                          type="button"
                          aria-pressed={Boolean(editingSamples[sample.id])}
                          aria-label={`${editingSamples[sample.id] ? 'Done editing' : 'Edit'} ${copy.singularLower} ${sample.id}`}
                          onClick={() => setEditingSamples(current => ({
                            ...current,
                            [sample.id]: !current[sample.id],
                          }))}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#940700]"
                        >
                          <svg
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {editingSamples[sample.id] ? (
                              <path d="m5 12 4 4L19 6" />
                            ) : (
                              <>
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                              </>
                            )}
                          </svg>
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
                      <div
                        id={`sample-description-${sample.id}`}
                        className="mt-1 min-w-0 text-[11px] mb-2"
                      >
                        {editingSamples[sample.id] ? (
                          <label className="block min-w-0">
                            <span className="block font-mono uppercase tracking-wider text-slate-400">
                              {copy.descriptionLabel}
                            </span>
                            <input
                              type="text"
                              value={sample.description}
                              onChange={event => updateStagedField(sample.id, 'description', event.target.value)}
                              className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 focus:border-slate-400 focus:outline-none"
                            />
                          </label>
                        ) : (
                          <p className="flex min-w-0 items-baseline gap-1 whitespace-nowrap">
                            <span className="truncate text-slate-700" title={sample.description || ''}>
                              {sample.description || ''}
                            </span>
                          </p>
                        )}
                      </div>
                      <dl className="mb-1 grid grid-cols-3 gap-x-2 text-[11px]">
                        {fixedFields.map(([label, value]) => (
                          <div key={label} className="flex min-w-0 items-baseline gap-1 whitespace-nowrap">
                            <dt className="shrink-0 font-mono uppercase tracking-wider text-slate-400">{label}</dt>
                            <dd className="truncate text-slate-700" title={value || '—'}>{value || '—'}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mb-1 grid grid-cols-4 gap-x-2 text-[11px]">
                        {middleFields.map(({ field, label, type }) => editingSamples[sample.id] ? (
                          <label key={field} className="block min-w-0">
                            <span className="block font-mono uppercase tracking-wider text-slate-400">
                              {label}
                            </span>
                            {type === 'select' ? (
                              <select
                                value={sample[field]}
                                onChange={event => updateStagedField(sample.id, field, event.target.value)}
                                className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 focus:border-slate-400 focus:outline-none"
                              >
                                <option value="">—</option>
                                {(field === 'sampledFrom'
                                  ? ['Borehole', 'Test Pit', 'Surface', 'Stockpile', 'Other']
                                  : copy.typeOptions
                                ).map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={type}
                                value={sample[field]}
                                max={field === 'collectionDate'
                                  ? sample.receivedDate && sample.receivedDate < todayDate ? sample.receivedDate : todayDate
                                  : field === 'receivedDate' ? todayDate : undefined}
                                min={field === 'receivedDate' ? sample.collectionDate || undefined : undefined}
                                onChange={event => updateStagedField(sample.id, field, event.target.value)}
                                className="w-full rounded-md border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 focus:border-slate-400 focus:outline-none"
                              />
                            )}
                          </label>
                        ) : (
                          <div key={field} className="min-w-0">
                            <dt className="font-mono uppercase tracking-wider text-slate-400">{label}</dt>
                            <dd className="break-words text-slate-700">{sample[field] || '—'}</dd>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px]">
                        <span className="mb-0.5 block font-mono uppercase tracking-wider text-slate-400">
                          Test Assignment
                        </span>
                        <TestCodePicker
                          compact
                          value={sample.test_codes}
                          onChange={value => updateStagedField(sample.id, 'test_codes', value)}
                        />
                      </div>
                    </article>
                  )
                })}
                {checkingInSamples.length === 0 && (
                  <p className="px-2 py-10 text-center text-sm text-slate-500">
                    {copy.emptyMessage}
                  </p>
                )}
              </div>
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
            aria-labelledby="sample-check-in-confirmation-title"
            onClick={event => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-[#eeeeec] p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
              ✓
            </div>
            <h2 id="sample-check-in-confirmation-title" className="text-lg font-semibold text-slate-900">
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
