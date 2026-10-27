
import { useId, useState } from 'react'

type CalendarFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minDate?: string
  maxDate?: string
}

function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseISODate(value: string): Date | null {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null

  return new Date(year, month - 1, day)
}

function formatDate(value: string): string {
  const date = parseISODate(value)
  if (!date) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

function parseDisplayDate(value: string): string | null {
  const trimmedValue = value.trim()
  const match = /^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/.exec(trimmedValue)
    ?? /^(\d{2})(\d{2})(\d{4})$/.exec(trimmedValue)
  if (!match) return null

  const [, month, day, year] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  if (
    date.getFullYear() !== Number(year)
    || date.getMonth() !== Number(month) - 1
    || date.getDate() !== Number(day)
  ) {
    return null
  }

  return toISODate(date)
}

export default function CalendarField({
  label,
  value,
  onChange,
  placeholder = 'MM / DD / YYYY',
  minDate,
  maxDate,
}: CalendarFieldProps) {
  const inputId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(new Date())
  const [dateText, setDateText] = useState('')
  const [dateTextError, setDateTextError] = useState<string | null>(null)

  const selectedDate = parseISODate(value)
  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()

  // Start the calendar grid on Monday.
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7

  // Always render six weeks for a consistent calendar size.
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    return new Date(year, month, index - firstDayOffset + 1)
  })

  const today = toISODate(new Date())
  const isDateAllowed = (date: string) =>
    (!minDate || date >= minDate) && (!maxDate || date <= maxDate)
  const getDateBoundsMessage = () =>
    `Choose a date${minDate ? ` on or after ${formatDate(minDate)}` : ''}${minDate && maxDate ? ' and' : ''}${maxDate ? ` on or before ${formatDate(maxDate)}` : ''}.`

  function changeMonth(offset: number) {
    setVisibleMonth(current =>
      new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1
      )
    )
  }

  return (
    <div className="block col-span-3">
      <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <div className="flex w-full items-center overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors focus-within:border-slate-400">
        <button
          type="button"
          onClick={() => {
            setVisibleMonth(selectedDate ?? new Date())
            setDateText(formatDate(value))
            setDateTextError(null)
            setIsOpen(true)
          }}
          aria-label={`Choose ${label.toLowerCase()}`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="flex min-w-0 flex-1 items-center justify-between gap-2 px-2.5 py-1.5 text-left text-sm outline-none"
        >
          <span className={value ? 'text-slate-700' : 'text-slate-400'}>
            {value ? formatDate(value) : placeholder}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChange(today)}
          disabled={!isDateAllowed(today)}
          className="mr-1 shrink-0 rounded-lg px-2 py-1 text-xs font-semibold bg-[#f0f0ef] text-[#940700] transition-colors hover:bg-[#f1e0df] focus-visible:outline-2 focus-visible:outline-[#940700]"
        >
          Set to Today
        </button>
      </div>

      {isOpen && (
        <div
          role="presentation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/30 p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={`${label} date picker`}
            onClick={event => event.stopPropagation()}
            className="w-full max-w-[320px] rounded-2xl border border-slate-200 bg-[#eeeeec] p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#940700]">
                  Select date
                </p>
                <h3 className="mt-1 text-base font-semibold text-slate-900">
                  {label}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close calendar"
                className="rounded-lg px-2.5 py-1.5 text-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                ‹
              </button>

              <p className="text-sm font-semibold text-slate-800">
                {visibleMonth.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                ›
              </button>
            </div>

            <form
              className="mb-4"
              onSubmit={event => {
                event.preventDefault()
                const date = parseDisplayDate(dateText)
                if (!date) {
                  setDateTextError('Enter a valid date as MM/DD/YYYY.')
                  return
                }
                if (!isDateAllowed(date)) {
                  setDateTextError(getDateBoundsMessage())
                  return
                }

                onChange(date)
                setDateTextError(null)
                setIsOpen(false)
              }}
            >
              <label
                htmlFor={inputId}
                className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-500"
              >
                Enter date
              </label>
              <div className="flex gap-2">
                <input
                  id={inputId}
                  type="text"
                  autoFocus
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="MM / DD / YYYY"
                  value={dateText}
                  aria-invalid={Boolean(dateTextError)}
                  aria-describedby={dateTextError ? `${inputId}-error` : undefined}
                  onChange={event => {
                    setDateText(event.target.value)
                    setDateTextError(null)
                  }}
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700"
                >
                  Apply
                </button>
              </div>
              {dateTextError && (
                <p
                  id={`${inputId}-error`}
                  role="alert"
                  className="mt-1.5 text-xs text-[#940700]"
                >
                  {dateTextError}
                </p>
              )}
            </form>

            <div className="grid grid-cols-7 gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
                (day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="py-2 text-center text-xs font-mono text-slate-400"
                  >
                    {day}
                  </div>
                )
              )}

              {calendarDays.map(date => {
                const dateValue = toISODate(date)
                const isSelected = dateValue === value
                const isToday = dateValue === today
                const isCurrentMonth = date.getMonth() === month
                const isDisabled = !isDateAllowed(dateValue)

                return (
                  <button
                    key={dateValue}
                    type="button"
                    onClick={() => {
                      onChange(dateValue)
                      setIsOpen(false)
                    }}
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    aria-label={date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    className={`relative flex h-9 items-center justify-center rounded-lg text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                      isSelected
                        ? 'bg-[#940700] font-semibold text-white'
                        : isCurrentMonth
                          ? 'text-slate-700 hover:bg-[#e5cecc]'
                          : 'text-slate-300 hover:bg-slate-200'
                    } ${
                      isToday && !isSelected
                        ? 'font-bold ring-1 ring-inset ring-[#940700]'
                        : ''
                    }`}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setDateText('')
                  setDateTextError(null)
                  setIsOpen(false)
                }}
                className="text-xs font-medium text-slate-500 hover:text-[#940700]"
              >
                Clear date
              </button>

              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  const todayValue = toISODate(now)
                  if (!isDateAllowed(todayValue)) return
                  onChange(todayValue)
                  setDateText(formatDate(toISODate(now)))
                  setDateTextError(null)
                  setVisibleMonth(now)
                  setIsOpen(false)
                }}
                disabled={!isDateAllowed(today)}
                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700"
              >
                Today
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
