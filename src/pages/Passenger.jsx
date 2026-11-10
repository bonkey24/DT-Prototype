import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { useBooking } from '../context/BookingContext'
import {
  BERTH_PREFERENCES,
  formatDateDDMMYYYY,
  formatINR,
} from '../data/mock'

const GENDERS = ['Female', 'Male', 'Transgender']

export default function Passenger() {
  const {
    search,
    selectedTrain,
    selectedClass,
    setSelectedClassCode,
    passenger,
    setPassenger,
  } = useBooking()
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const parsedAge = Number(passenger.age)
  const isSenior = Number.isFinite(parsedAge) && parsedAge >= 60

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}

    if (!passenger.name.trim()) {
      nextErrors.name = 'Please enter the passenger full name as per Aadhaar / Government ID.'
    }
    if (!passenger.age || Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      nextErrors.age = 'Please enter a valid age between 1 and 120.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    navigate('/pay')
  }

  return (
    <PageShell step={3} progressTitle="Passenger details" backTo="/trains">
      <div className="space-y-5">
        {/* Journey Context Bar */}
        <section
          aria-label="Selected train"
          className="space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-container-low p-4 shadow-xs"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-primary shadow-xs">
              <span className="material-symbols-outlined icon-filled text-[28px]" aria-hidden="true">
                train
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[1.1rem] font-bold text-on-surface">
                  {selectedTrain.number} {selectedTrain.name}
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.9rem] font-bold text-primary">
                  {selectedClass.label}
                </span>
              </div>
              <p className="mt-1 text-[0.95rem] text-on-surface-variant">
                {selectedTrain.departureTime} → {selectedTrain.arrivalTime} (
                {selectedTrain.arrivalDayOffset}) • {formatDateDDMMYYYY(search.date)}
              </p>
            </div>
          </div>

          <Link
            to="/trains"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2 text-[1rem] font-bold text-primary shadow-xs hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              edit_calendar
            </span>
            <span>Change Train</span>
          </Link>
        </section>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <section className="space-y-6 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-sm">
            {/* Section Header */}
            <div className="border-b border-outline-variant/40 pb-4">
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-[0.9rem] font-bold text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  person_outline
                </span>
                <span>Passenger 1 of 1</span>
              </div>
              <h1 className="text-[1.6rem] leading-tight font-bold text-on-surface">
                Who is traveling?
              </h1>
              <p className="mt-1.5 text-[1rem] text-on-surface-variant">
                Enter your details as stated on your Aadhaar card or Government-issued photo ID.
              </p>
            </div>

            {/* Senior Citizen Priority Banner */}
            <div className="flex items-start gap-3 rounded-xl border-2 border-primary/20 bg-secondary-container/70 p-4 shadow-xs">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                  accessible_forward
                </span>
              </div>
              <div>
                <h2 className="text-[1.05rem] font-bold text-on-surface">
                  Senior Citizen Lower Berth Priority Quota
                </h2>
                <p className="mt-0.5 text-[0.95rem] text-on-surface-variant">
                  Senior citizens (60+ men, 58+ women) get automatic lower berth priority on this
                  train.
                </p>
              </div>
            </div>

            {/* Inline Validation Alert (No Pop-ups) */}
            {Object.keys(errors).length > 0 && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border-2 border-error bg-error-container p-4 text-[1rem] font-bold text-on-error-container"
              >
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[24px]" aria-hidden="true">
                  error
                </span>
                <div>
                  <p>Please check these details:</p>
                  <ul className="mt-1 list-disc pl-5 font-semibold">
                    {errors.name && <li>{errors.name}</li>}
                    {errors.age && <li>{errors.age}</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* Field 1: Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="passenger-name"
                className="block text-[1.1rem] font-bold text-on-surface"
              >
                Full Name{' '}
                <span className="text-[0.95rem] font-normal text-on-surface-variant">
                  (as per Aadhaar / Government ID)
                </span>
              </label>
              <p className="text-[0.95rem] text-on-surface-variant">
                Example: Debopriya Sen
              </p>
              <div className="relative flex items-center">
                <input
                  id="passenger-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Debopriya Sen"
                  value={passenger.name}
                  onChange={(e) => {
                    setErrors((prev) => ({ ...prev, name: undefined }))
                    setPassenger((prev) => ({ ...prev, name: e.target.value }))
                  }}
                  aria-invalid={Boolean(errors.name)}
                  className={`min-h-[58px] w-full rounded-xl border-2 bg-surface-container-lowest pr-24 pl-4 text-[1.1rem] font-semibold text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none ${
                    errors.name
                      ? 'border-error'
                      : 'border-outline-variant focus:border-primary'
                  }`}
                />
                {passenger.name && (
                  <button
                    type="button"
                    aria-label="Clear full name field"
                    onClick={() => setPassenger((prev) => ({ ...prev, name: '' }))}
                    className="absolute right-2 min-h-[48px] min-w-[48px] rounded-lg bg-surface-container-high px-3 text-[0.95rem] font-bold text-on-surface hover:bg-surface-container-highest"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Field 2: Age & Nationality */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="passenger-age"
                  className="block text-[1.1rem] font-bold text-on-surface"
                >
                  Age in years
                </label>
                <p className="text-[0.95rem] text-on-surface-variant">
                  Applies Indian Railways senior priority allocation.
                </p>
                <input
                  id="passenger-age"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="120"
                  placeholder="e.g. 67"
                  value={passenger.age}
                  onChange={(e) => {
                    setErrors((prev) => ({ ...prev, age: undefined }))
                    setPassenger((prev) => ({ ...prev, age: e.target.value }))
                  }}
                  aria-invalid={Boolean(errors.age)}
                  className={`min-h-[58px] w-full rounded-xl border-2 bg-surface-container-lowest px-4 text-[1.15rem] font-bold text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none ${
                    errors.age
                      ? 'border-error'
                      : 'border-outline-variant focus:border-primary'
                  }`}
                />

                {isSenior && (
                  <div
                    role="status"
                    className="flex items-center gap-2.5 rounded-xl border border-tertiary/30 bg-tertiary-fixed px-4 py-3 text-[0.95rem] font-bold text-on-tertiary-fixed shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                      verified
                    </span>
                    <span>Senior Citizen Lower Berth Priority Verified</span>
                  </div>
                )}
              </div>

              <div className="flex min-h-[54px] items-center justify-between rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span role="img" aria-label="India Flag" className="text-[1.4rem]">
                    🇮🇳
                  </span>
                  <span className="text-[1rem] font-bold text-on-surface">Nationality: Indian</span>
                </div>
                <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
                  lock
                </span>
              </div>
            </div>

            {/* Field 3: Gender Selection */}
            <div className="space-y-2.5">
              <span id="gender-group-label" className="block text-[1.1rem] font-bold text-on-surface">
                Gender
              </span>
              <p className="text-[0.95rem] text-on-surface-variant">
                Required for Indian Railways berth and coach quota rules.
              </p>
              <div
                role="radiogroup"
                aria-labelledby="gender-group-label"
                className="space-y-2.5"
              >
                {GENDERS.map((g) => {
                  const active = passenger.gender === g
                  return (
                    <button
                      key={g}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setPassenger((prev) => ({ ...prev, gender: g }))}
                      className={`flex min-h-[56px] w-full items-center gap-3.5 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                        active
                          ? 'border-primary bg-surface-container-low shadow-sm'
                          : 'border-outline-variant bg-surface-container-lowest hover:border-primary'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-highest text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      </span>
                      <span className="text-[1.05rem] font-bold text-on-surface">{g}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Field 4: Class Selection */}
            <div className="space-y-2.5">
              <span id="class-group-label" className="block text-[1.1rem] font-bold text-on-surface">
                Travel Class Selection
              </span>
              <p className="text-[0.95rem] text-on-surface-variant">
                Confirm or switch your coach class for {selectedTrain.name}.
              </p>
              <div
                role="radiogroup"
                aria-labelledby="class-group-label"
                className="space-y-2.5"
              >
                {selectedTrain.classes.map((cls) => {
                  const active = selectedClass.code === cls.code
                  return (
                    <button
                      key={cls.code}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedClassCode(cls.code)}
                      className={`flex min-h-[64px] w-full items-start justify-between gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        active
                          ? 'border-primary bg-surface-container-low shadow-sm'
                          : 'border-outline-variant bg-surface-container-lowest hover:border-primary'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                            active
                              ? 'bg-primary text-on-primary'
                              : 'bg-surface-container-highest text-transparent'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </span>
                        <div>
                          <span className="block text-[1.05rem] font-bold text-on-surface">
                            {cls.label}
                          </span>
                          <span className="block text-[0.9rem] text-on-surface-variant">
                            {cls.description}
                          </span>
                          <span className="mt-0.5 block text-[0.9rem] font-bold text-tertiary">
                            {cls.statusText}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-[1.15rem] font-bold text-primary">
                        {formatINR(cls.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Field 5: Contact Details (+91 Mobile & Email) */}
            <div className="space-y-4 border-t border-outline-variant/40 pt-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="mobileNumber"
                  className="block text-[1.05rem] font-bold text-on-surface"
                >
                  Mobile Number for SMS &amp; PNR Updates
                </label>
                <div className="flex items-center overflow-hidden rounded-xl border-2 border-outline-variant bg-surface-container-lowest focus-within:border-primary">
                  <span className="border-r-2 border-outline-variant bg-surface-container-high px-3.5 py-3.5 text-[1rem] font-bold text-on-surface select-none">
                    +91
                  </span>
                  <input
                    id="mobileNumber"
                    type="tel"
                    value={passenger.mobile}
                    onChange={(e) =>
                      setPassenger((prev) => ({ ...prev, mobile: e.target.value }))
                    }
                    className="min-h-[56px] w-full bg-surface-container-lowest px-3.5 text-[1.05rem] font-semibold text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="emailAddress"
                  className="block text-[1.05rem] font-bold text-on-surface"
                >
                  Email for E-Ticket confirmation
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  value={passenger.email}
                  onChange={(e) =>
                    setPassenger((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="min-h-[56px] w-full rounded-xl border-2 border-outline-variant bg-surface-container-lowest px-4 text-[1rem] font-semibold text-on-surface focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Field 6: Berth Preference Cards */}
            <div className="space-y-2.5 border-t border-outline-variant/40 pt-4">
              <span id="berth-group-label" className="block text-[1.1rem] font-bold text-on-surface">
                Berth Preference
              </span>
              <p className="text-[0.95rem] text-on-surface-variant">
                Subject to IRCTC allotment rules
              </p>

              <div
                role="radiogroup"
                aria-labelledby="berth-group-label"
                className="space-y-2.5"
              >
                {BERTH_PREFERENCES.map((berth) => {
                  const active = passenger.berthPreference === berth.value
                  return (
                    <button
                      key={berth.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() =>
                        setPassenger((prev) => ({ ...prev, berthPreference: berth.value }))
                      }
                      className={`flex min-h-[60px] w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition-all ${
                        active
                          ? 'border-primary bg-surface-container-low shadow-sm'
                          : 'border-outline-variant bg-surface-container-lowest hover:border-primary'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-highest text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[1.05rem] font-bold text-on-surface">
                            {berth.label}
                          </span>
                          {berth.badge && (
                            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[0.9rem] font-bold text-on-primary">
                              {berth.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[0.95rem] text-on-surface-variant">
                          {berth.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Field 7: Reservation Choices & Station Care */}
            <div className="space-y-3 border-t border-outline-variant/40 pt-4">
              <h2 className="text-[1.1rem] font-bold text-on-surface">
                Indian Railways Reservation Choices
              </h2>

              <label className="flex min-h-[60px] cursor-pointer items-start gap-3.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 hover:bg-surface-container-low">
                <input
                  type="checkbox"
                  checked={passenger.confirmedOnly}
                  onChange={(e) =>
                    setPassenger((prev) => ({ ...prev, confirmedOnly: e.target.checked }))
                  }
                  className="mt-1 h-7 w-7 shrink-0 rounded accent-primary"
                />
                <div>
                  <span className="block text-[1rem] font-bold text-on-surface">
                    Book only if confirmed berths are allocated (No RAC/WL)
                  </span>
                  <span className="mt-0.5 block text-[0.9rem] text-on-surface-variant">
                    Guarantees your ticket is booked only with a confirmed berth.
                  </span>
                </div>
              </label>

              <label className="flex min-h-[60px] cursor-pointer items-start gap-3.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 hover:bg-surface-container-low">
                <input
                  type="checkbox"
                  checked={passenger.autoUpgrade}
                  onChange={(e) =>
                    setPassenger((prev) => ({ ...prev, autoUpgrade: e.target.checked }))
                  }
                  className="mt-1 h-7 w-7 shrink-0 rounded accent-primary"
                />
                <div>
                  <span className="flex flex-wrap items-center gap-2 text-[1rem] font-bold text-on-surface">
                    <span>Consider for Auto-Upgrade to higher AC class</span>
                    <span className="rounded bg-tertiary-fixed px-2 py-0.5 text-[0.9rem] text-on-tertiary-fixed">
                      Free
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[0.9rem] text-on-surface-variant">
                    Free upgrade at chart preparation if higher class berths remain vacant.
                  </span>
                </div>
              </label>

              <label className="flex min-h-[60px] cursor-pointer items-start gap-3.5 rounded-xl border-2 border-primary/40 bg-surface-container-low p-4 hover:bg-surface-container-high">
                <input
                  type="checkbox"
                  checked={passenger.sahayakAssist}
                  onChange={(e) =>
                    setPassenger((prev) => ({ ...prev, sahayakAssist: e.target.checked }))
                  }
                  className="mt-1 h-7 w-7 shrink-0 rounded accent-primary"
                />
                <div>
                  <span className="flex flex-wrap items-center gap-2 text-[1rem] font-bold text-on-surface">
                    <span>Free Senior Sahayak / Battery Cart assistance</span>
                    <span className="rounded bg-tertiary-fixed px-2 py-0.5 text-[0.9rem] text-on-tertiary-fixed">
                      Complimentary
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[0.9rem] text-on-surface-variant">
                    Authorized Sahayak with battery cart meets you at platform entry.
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Primary Continue CTA */}
          <div className="space-y-2.5">
            <button
              type="submit"
              className="flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3.5 text-[1.1rem] font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-98"
            >
              <span>Continue to Payment &amp; Review ({formatINR(selectedClass.price)})</span>
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                arrow_forward
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-center text-[0.95rem] text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
                lock
              </span>
              <span>No payment is taken at this step.</span>
            </div>
          </div>
        </form>
      </div>
    </PageShell>
  )
}
