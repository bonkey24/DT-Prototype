import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { useBooking } from '../context/BookingContext'
import {
  CLASS_FILTERS,
  QUOTAS,
  STATIONS,
  formatDateDDMMYYYY,
} from '../data/mock'

function toIsoDate(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function Search() {
  const { search, setSearch, modalMode } = useBooking()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSwap = () => {
    setError('')
    setSearch((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  const handleQuickDate = (offsetDays) => {
    setError('')
    const d = new Date()
    d.setDate(d.getDate() + offsetDays)
    setSearch((prev) => ({ ...prev, date: toIsoDate(d) }))
  }

  const handleNextMonday = () => {
    setError('')
    const d = new Date()
    const day = d.getDay()
    const diff = (7 - day + 1) % 7 || 7
    d.setDate(d.getDate() + diff)
    setSearch((prev) => ({ ...prev, date: toIsoDate(d) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search.from || !search.to) {
      setError('Please choose both your boarding station and destination station.')
      return
    }
    if (search.from === search.to) {
      setError(
        'Boarding station and destination cannot be the same. Please select a different station.'
      )
      return
    }
    if (!search.date) {
      setError('Please select your journey date.')
      return
    }
    setError('')
    navigate('/trains')
  }

  return (
    <PageShell step={1} progressTitle="Search trains" backTo={null}>
      <div className="space-y-6">
        {/* Top Intro Banner */}
        <section className="space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-3.5 py-1.5 text-[0.95rem] font-bold text-on-secondary-fixed">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
            <span>Step 1 of 4 • IRCTC Planner</span>
          </div>
          <h1 className="text-[1.65rem] leading-tight font-bold tracking-tight text-on-surface">
            Find your train journey
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
            Enter your boarding station, arrival station, travel date, and preferred quota.
          </p>
        </section>

        {/* Inline Mode Status Banner */}
        <div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-secondary-container/60 p-4 text-[0.95rem] text-on-secondary-fixed">
          <span className="material-symbols-outlined mt-0.5 shrink-0 text-[24px] text-primary" aria-hidden="true">
            info
          </span>
          <p>
            <strong>{modalMode === 'after' ? 'After mode (Fixed):' : 'Before mode (Old app):'}</strong>{' '}
            {modalMode === 'after'
              ? 'Information modals open as a calm bottom sheet with a clear Close button.'
              : 'Pop-ups block the whole screen with dense text and a tiny close icon.'}
          </p>
        </div>

        {/* Main Search Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-7 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-md"
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border-2 border-error bg-error-container p-4 text-[1rem] font-bold text-on-error-container"
            >
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-[24px]" aria-hidden="true">
                error
              </span>
              <span>{error}</span>
            </div>
          )}

          {/* Field 1: Boarding Station */}
          <div className="space-y-3">
            <label
              htmlFor="from-station"
              className="flex items-center gap-2.5 text-[1.15rem] font-bold text-on-surface"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[1rem] font-bold text-on-primary">
                1
              </span>
              <span>Where are you leaving from?</span>
            </label>
            <p className="text-[0.95rem] text-on-surface-variant">
              Select boarding station with Indian Railways code
            </p>

            <div className="relative">
              <span
                className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[24px] text-primary"
                aria-hidden="true"
              >
                trip_origin
              </span>
              <select
                id="from-station"
                value={search.from}
                onChange={(e) => {
                  setError('')
                  setSearch((prev) => ({ ...prev, from: e.target.value }))
                }}
                className="min-h-[58px] w-full appearance-none rounded-xl border-2 border-outline-variant bg-surface-container-low pr-11 pl-12 text-[1.05rem] font-bold text-on-surface transition-colors focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              >
                {STATIONS.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <span
                className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[26px] text-on-surface-variant"
                aria-hidden="true"
              >
                expand_more
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="w-full text-[0.9rem] font-semibold text-on-surface-variant">
                Popular stations:
              </span>
              {[
                'Bengaluru City Jn (SBC)',
                'New Delhi (NDLS)',
                'Mumbai CSMT (CSMT)',
                'Chennai Central (MAS)',
              ].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setError('')
                    setSearch((prev) => ({ ...prev, from: st }))
                  }}
                  className={`min-h-[48px] rounded-lg border px-3 py-2 text-[0.9rem] font-bold transition-colors ${
                    search.from === st
                      ? 'border-primary bg-secondary-container text-on-secondary-fixed'
                      : 'border-outline-variant/60 bg-surface-container text-on-surface hover:bg-secondary-container'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Swap Stations Button */}
          <div>
            <button
              type="button"
              onClick={handleSwap}
              className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl border border-outline-variant bg-surface-container-high px-4 py-2.5 text-[1rem] font-bold text-primary shadow-xs transition-all hover:bg-surface-container-highest active:scale-98"
            >
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                swap_vert
              </span>
              <span>Swap departure &amp; destination</span>
            </button>
          </div>

          {/* Field 2: Destination Station */}
          <div className="space-y-3">
            <label
              htmlFor="to-station"
              className="flex items-center gap-2.5 text-[1.15rem] font-bold text-on-surface"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[1rem] font-bold text-on-primary">
                2
              </span>
              <span>Where are you going to?</span>
            </label>
            <p className="text-[0.95rem] text-on-surface-variant">
              Select arrival destination station
            </p>

            <div className="relative">
              <span
                className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[24px] text-primary"
                aria-hidden="true"
              >
                location_on
              </span>
              <select
                id="to-station"
                value={search.to}
                onChange={(e) => {
                  setError('')
                  setSearch((prev) => ({ ...prev, to: e.target.value }))
                }}
                className="min-h-[58px] w-full appearance-none rounded-xl border-2 border-outline-variant bg-surface-container-low pr-11 pl-12 text-[1.05rem] font-bold text-on-surface transition-colors focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              >
                {STATIONS.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <span
                className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[26px] text-on-surface-variant"
                aria-hidden="true"
              >
                expand_more
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="w-full text-[0.9rem] font-semibold text-on-surface-variant">
                Popular arrivals:
              </span>
              {[
                'New Delhi (NDLS)',
                'Howrah Jn (HWH)',
                'Hyderabad (HYB)',
                'Chennai Central (MAS)',
              ].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setError('')
                    setSearch((prev) => ({ ...prev, to: st }))
                  }}
                  className={`min-h-[48px] rounded-lg border px-3 py-2 text-[0.9rem] font-bold transition-colors ${
                    search.to === st
                      ? 'border-primary bg-secondary-container text-on-secondary-fixed'
                      : 'border-outline-variant/60 bg-surface-container text-on-surface hover:bg-secondary-container'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Field 3: Travel Date (DD-MM-YYYY display + native date picker) */}
          <div className="space-y-3">
            <label
              htmlFor="travel-date"
              className="flex items-center gap-2.5 text-[1.15rem] font-bold text-on-surface"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[1rem] font-bold text-on-primary">
                3
              </span>
              <span>When would you like to travel?</span>
            </label>
            <p className="text-[0.95rem] text-on-surface-variant">
              Selected date: <strong className="text-on-surface">{formatDateDDMMYYYY(search.date)}</strong>
            </p>

            <div className="relative">
              <span
                className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[24px] text-primary"
                aria-hidden="true"
              >
                calendar_today
              </span>
              <input
                id="travel-date"
                type="date"
                value={search.date}
                onChange={(e) => {
                  setError('')
                  setSearch((prev) => ({ ...prev, date: e.target.value }))
                }}
                className="min-h-[58px] w-full rounded-xl border-2 border-outline-variant bg-surface-container-low pr-4 pl-12 text-[1.05rem] font-bold text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickDate(0)}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-outline-variant/60 bg-surface-container px-3.5 py-2 text-[0.95rem] font-bold text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
                  today
                </span>
                <span>Today</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate(1)}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-outline-variant/60 bg-surface-container px-3.5 py-2 text-[0.95rem] font-bold text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
                  event_upcoming
                </span>
                <span>Tomorrow</span>
              </button>
              <button
                type="button"
                onClick={handleNextMonday}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-outline-variant/60 bg-surface-container px-3.5 py-2 text-[0.95rem] font-bold text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
                  date_range
                </span>
                <span>Next Monday</span>
              </button>
            </div>
          </div>

          {/* Field 4: Booking Quota & Travel Class */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[1.15rem] font-bold text-on-surface">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[1rem] font-bold text-on-primary">
                4
              </span>
              <span>Booking Quota &amp; Travel Class</span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quota-select" className="block text-[1rem] font-bold text-on-surface">
                Booking Quota
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[24px] text-primary"
                  aria-hidden="true"
                >
                  elderly
                </span>
                <select
                  id="quota-select"
                  value={search.quota}
                  onChange={(e) => {
                    const q = e.target.value
                    setSearch((prev) => ({
                      ...prev,
                      quota: q,
                      seniorQuotaApplied: q === 'SS',
                    }))
                  }}
                  className="min-h-[56px] w-full appearance-none rounded-xl border-2 border-outline-variant bg-surface-container-low pr-11 pl-12 text-[1rem] font-bold text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
                >
                  {QUOTAS.map((q) => (
                    <option key={q.code} value={q.code}>
                      {q.label}
                    </option>
                  ))}
                </select>
                <span
                  className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[26px] text-on-surface-variant"
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="class-select" className="block text-[1rem] font-bold text-on-surface">
                Travel Class
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[24px] text-primary"
                  aria-hidden="true"
                >
                  chair
                </span>
                <select
                  id="class-select"
                  value={search.travelClassFilter}
                  onChange={(e) =>
                    setSearch((prev) => ({ ...prev, travelClassFilter: e.target.value }))
                  }
                  className="min-h-[56px] w-full appearance-none rounded-xl border-2 border-outline-variant bg-surface-container-low pr-11 pl-12 text-[1rem] font-bold text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
                >
                  {CLASS_FILTERS.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <span
                  className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[26px] text-on-surface-variant"
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </div>
            </div>

            {/* Tatkal Advisory Callout */}
            <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-secondary-container/60 p-3.5 text-[0.95rem] text-on-secondary-fixed">
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-[22px] text-primary" aria-hidden="true">
                info
              </span>
              <p>
                <strong>Tatkal Note:</strong> Opens at <strong>10:00 (AC)</strong> and{' '}
                <strong>11:00 (Non-AC)</strong> one day before travel.
              </p>
            </div>

            {/* Senior Citizen Lower Berth Quota Toggle */}
            <div className="space-y-3 rounded-xl border border-outline-variant/70 bg-surface-container-low p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary">
                  <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                    airline_seat_legroom_extra
                  </span>
                </div>
                <div>
                  <h2 className="text-[1.05rem] font-bold text-on-surface">
                    Senior Citizen Lower Berth Quota
                  </h2>
                  <p className="mt-0.5 text-[0.95rem] text-on-surface-variant">
                    Automatic preference for lower berths (men 60+, women 45+).
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={search.seniorQuotaApplied}
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    seniorQuotaApplied: !prev.seniorQuotaApplied,
                    quota: !prev.seniorQuotaApplied ? 'SS' : 'GN',
                  }))
                }
                className={`flex min-h-[52px] w-full items-center justify-between rounded-xl border-2 px-4 py-2.5 text-[1rem] font-bold transition-colors ${
                  search.seniorQuotaApplied
                    ? 'border-primary bg-surface-container-lowest text-on-surface'
                    : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`material-symbols-outlined text-[22px] ${
                      search.seniorQuotaApplied ? 'text-tertiary' : 'text-on-surface-variant'
                    }`}
                  >
                    {search.seniorQuotaApplied ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span>
                    {search.seniorQuotaApplied ? 'Quota Applied (SS)' : 'Standard Quota (GN)'}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
                    search.seniorQuotaApplied ? 'bg-primary' : 'bg-outline'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
                      search.seniorQuotaApplied ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Primary Search CTA */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-xl bg-primary-container px-5 py-3.5 text-[1.1rem] font-bold text-on-primary shadow-md transition-all hover:bg-primary active:scale-[0.99]"
            >
              <span>Search trains</span>
              <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                arrow_forward
              </span>
            </button>
            <p className="text-center text-[0.95rem] text-on-surface-variant">
              Official Indian Railways timetable. No payment required to browse berths.
            </p>
          </div>
        </form>

        {/* Financial Aid & Refund Status Card */}
        <aside className="space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-container-high p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                verified_user
              </span>
            </div>
            <div>
              <h2 className="text-[1.1rem] font-bold text-on-surface">
                Senior Financial Aid &amp; Refund Status
              </h2>
              <p className="mt-1 text-[0.95rem] text-on-surface-variant">
                Check your senior travel aid progress (Applied → Verified → Paid) or concession
                support.
              </p>
            </div>
          </div>

          <Link
            to="/aid"
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border-2 border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-[1rem] font-bold text-primary shadow-xs transition-colors hover:border-primary hover:bg-surface-container"
          >
            <span>Check financial aid status</span>
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </aside>

        {/* 3 Calm Indian Railways Assurance Cards */}
        <section aria-label="Passenger assurances" className="space-y-3">
          {[
            {
              icon: 'airline_seat_recline_extra',
              title: 'Free lower berth priority for seniors',
              desc: 'Guaranteed preference for comfortable lower berths without ladder climbing.',
            },
            {
              icon: 'accessible',
              title: 'Free Wheelchair & Sahayak meeting',
              desc: 'Request battery-operated carts or porter assistance at major junctions.',
            },
            {
              icon: 'price_check',
              title: 'No hidden IRCTC surcharge',
              desc: 'Standard direct IRCTC fare with clear, upfront breakdown.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-xs"
            >
              <span
                className="material-symbols-outlined mt-0.5 shrink-0 text-[28px] text-primary"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <div>
                <h3 className="text-[1rem] font-bold text-on-surface">{item.title}</h3>
                <p className="mt-0.5 text-[0.95rem] text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PageShell>
  )
}
