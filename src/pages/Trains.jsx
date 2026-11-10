import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import InfoModal from '../components/InfoModal'
import { useBooking } from '../context/BookingContext'
import {
  MODAL_CONTENT,
  QUOTAS,
  TRAINS,
  formatDateDDMMYYYY,
  formatINR,
} from '../data/mock'

function StatusBadge({ statusType, statusText }) {
  if (statusType === 'AVAILABLE') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-700 bg-emerald-100 px-2.5 py-1 text-[0.9rem] font-bold text-emerald-950">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          check_circle
        </span>
        <span>{statusText}</span>
      </span>
    )
  }
  if (statusType === 'RAC') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800 bg-amber-100 px-2.5 py-1 text-[0.9rem] font-bold text-amber-950">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          schedule
        </span>
        <span>{statusText}</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-red-800 bg-red-100 px-2.5 py-1 text-[0.9rem] font-bold text-red-950">
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        hourglass_top
      </span>
      <span>{statusText}</span>
    </span>
  )
}

export default function Trains() {
  const { search, selectTrain } = useBooking()
  const [rulesOpen, setRulesOpen] = useState(false)
  const [porterBooked, setPorterBooked] = useState(false)
  const [chosenClasses, setChosenClasses] = useState(() =>
    Object.fromEntries(TRAINS.map((t) => [t.id, t.defaultClass]))
  )
  const navigate = useNavigate()

  const quotaLabel =
    QUOTAS.find((q) => q.code === search.quota)?.label || 'Senior Citizen / Lower Berth'

  const handleChooseClass = (trainId, classCode) => {
    setChosenClasses((prev) => ({ ...prev, [trainId]: classCode }))
  }

  const handleSelectTrain = (train) => {
    const classCode = chosenClasses[train.id] || train.defaultClass
    selectTrain(train, classCode)
    navigate('/passenger')
  }

  return (
    <PageShell step={2} progressTitle="Select your train" backTo="/search">
      <div className="space-y-6">
        {/* Current Search Details Strip */}
        <section
          aria-label="Current search details"
          className="space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-container-low p-4 shadow-xs"
        >
          <span className="block text-[0.9rem] font-bold tracking-wider text-secondary uppercase">
            Current Search Details
          </span>
          <h1 className="text-[1.25rem] leading-snug font-bold text-on-surface">
            {search.from} → {search.to}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1 text-[0.9rem] font-bold text-on-secondary-fixed-variant">
              1 {quotaLabel}
            </span>
          </div>
          <p className="text-[0.95rem] text-on-surface-variant">
            {formatDateDDMMYYYY(search.date)} • Direct Express Trains
          </p>
          <Link
            to="/search"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2 text-[1rem] font-bold text-primary shadow-xs hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              tune
            </span>
            <span>Change Search</span>
          </Link>
        </section>

        {/* Top Info Banner + Cancellation Rules InfoModal Trigger */}
        <section className="space-y-3 rounded-2xl border border-outline-variant/60 border-l-8 border-l-tertiary bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed shadow-xs">
              <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                airline_seat_legroom_extra
              </span>
            </div>
            <div>
              <h2 className="text-[1.05rem] font-bold text-on-surface">
                Senior Lower Berth Priority &amp; Refund Rules
              </h2>
              <p className="mt-1 text-[0.95rem] text-on-surface-variant">
                Lower berths near coach doorways are prioritised for seniors. Check refund slabs
                before selecting:
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRulesOpen(true)}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container px-4 py-2.5 text-[1rem] font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
              receipt_long
            </span>
            <span>Cancellation rules</span>
          </button>
        </section>

        {/* Section Heading */}
        <div className="space-y-2">
          <h2 className="text-[1.35rem] font-bold text-on-surface">Available Direct Trains</h2>
          <p className="text-[0.95rem] text-on-surface-variant">
            Showing {TRAINS.length} direct superfast trains on {formatDateDDMMYYYY(search.date)}
          </p>
          <div className="inline-flex items-center gap-2 rounded-xl bg-surface-container px-3.5 py-2 text-[0.9rem] font-bold text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
              accessible
            </span>
            <span>Ramp &amp; Battery Cart Accessible</span>
          </div>
        </div>

        {/* 5 Indian Railways Train Cards */}
        <div className="space-y-5">
          {TRAINS.map((train) => {
            const activeCode = chosenClasses[train.id] || train.defaultClass
            const activeCls =
              train.classes.find((c) => c.code === activeCode) || train.classes[0]

            return (
              <article
                key={train.id}
                className="space-y-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-md"
              >
                {/* Train Header */}
                <div className="space-y-2">
                  <h3 className="text-[1.2rem] leading-snug font-bold text-primary">
                    {train.number} {train.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-[0.9rem] font-bold text-on-secondary-fixed-variant">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        straight
                      </span>
                      <span>{train.serviceBadge}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-xl bg-tertiary-fixed px-3 py-1 text-[0.9rem] font-bold text-on-tertiary-fixed">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        thumb_up
                      </span>
                      <span>{train.punctuality}</span>
                    </span>
                  </div>
                  <p className="text-[0.9rem] font-bold text-on-surface-variant">
                    Runs on: <span className="text-primary">{train.runsOn}</span>
                  </p>
                </div>

                {/* 24-Hour Schedule Block */}
                <div className="space-y-3 rounded-2xl bg-surface-container-low p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="block text-[0.9rem] font-semibold text-on-surface-variant">
                        Departs
                      </span>
                      <span className="text-[1.45rem] font-bold text-on-surface">
                        {train.departureTime}
                      </span>
                      <span className="block text-[0.95rem] font-bold text-on-surface">
                        {train.departureStation}
                      </span>
                      <span className="block text-[0.9rem] text-secondary">
                        {train.departurePlatform}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-[0.9rem] font-semibold text-on-surface-variant">
                        Arrives ({train.arrivalDayOffset})
                      </span>
                      <span className="text-[1.45rem] font-bold text-on-surface">
                        {train.arrivalTime}
                      </span>
                      <span className="block text-[0.95rem] font-bold text-on-surface">
                        {train.arrivalStation}
                      </span>
                      <span className="block text-[0.9rem] text-secondary">
                        {train.arrivalPlatform}
                      </span>
                    </div>
                  </div>

                  {/* Journey Duration Line */}
                  <div className="border-t border-outline-variant/60 pt-2.5 text-center">
                    <span className="block text-[0.95rem] font-bold text-on-surface">
                      {train.duration}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-3 w-3 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <div className="h-1.5 flex-1 rounded-full bg-primary" aria-hidden="true" />
                      <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
                        train
                      </span>
                    </div>
                  </div>
                </div>

                {/* Travel Class Tiles */}
                <div className="space-y-2.5">
                  <span className="block text-[1rem] font-bold text-on-surface">
                    Select Travel Class &amp; Availability:
                  </span>
                  <div className="space-y-2.5">
                    {train.classes.map((cls) => {
                      const isSelected = cls.code === activeCls.code
                      return (
                        <button
                          key={cls.code}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleChooseClass(train.id, cls.code)}
                          className={`flex min-h-[72px] w-full flex-col gap-2 rounded-xl p-4 text-left transition-all ${
                            isSelected
                              ? 'border-2 border-primary bg-surface-container shadow-inner'
                              : 'border border-outline-variant bg-surface-container-low hover:bg-surface-container'
                          }`}
                        >
                          <div className="flex w-full items-start justify-between gap-2">
                            <div>
                              <span className="block text-[1.05rem] font-bold text-on-surface">
                                {cls.label}
                              </span>
                              <span className="block text-[0.9rem] text-on-surface-variant">
                                {cls.description}
                              </span>
                            </div>
                            <span
                              className={`material-symbols-outlined shrink-0 text-[24px] ${
                                isSelected ? 'icon-filled text-primary' : 'text-outline'
                              }`}
                              aria-hidden="true"
                            >
                              {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <div>
                              <span
                                className={`text-[1.25rem] font-bold ${
                                  isSelected ? 'text-primary' : 'text-on-surface'
                                }`}
                              >
                                {formatINR(cls.price)}
                              </span>
                              <span className="block text-[0.9rem] text-on-surface-variant">
                                All inclusive
                              </span>
                            </div>
                            <StatusBadge
                              statusType={cls.statusType}
                              statusText={cls.statusText}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Train Select Footer CTA */}
                <div className="space-y-2.5 border-t border-outline-variant/50 pt-3">
                  <div className="flex items-center gap-2 text-[0.95rem] text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px] text-tertiary" aria-hidden="true">
                      verified
                    </span>
                    <span>Senior Lower Berth prioritised at booking</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectTrain(train)}
                    className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[1.05rem] font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98]"
                  >
                    <span>Select Train • {formatINR(activeCls.price)}</span>
                    <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Free Station Coolie & Battery Car Card */}
        <section className="space-y-3 rounded-2xl border-2 border-secondary-container bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-primary">
              <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                elderly
              </span>
            </div>
            <div>
              <h2 className="text-[1.05rem] font-bold text-on-surface">
                Free Senior Coolie &amp; Battery Car Assistance
              </h2>
              <p className="mt-1 text-[0.95rem] text-on-surface-variant">
                An EasyRail Sahayak meets you at the drop-off porch and guides you via battery cart
                to your coach.
              </p>
            </div>
          </div>

          {porterBooked ? (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-xl border border-tertiary bg-tertiary-fixed/50 p-3.5 text-[0.95rem] font-bold text-on-tertiary-fixed"
            >
              <span className="material-symbols-outlined text-[22px] text-tertiary" aria-hidden="true">
                check_circle
              </span>
              <span>Station Sahayak &amp; Wheelchair request noted for your booking.</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPorterBooked(true)}
              className="flex min-h-[52px] w-full items-center justify-center rounded-xl border border-primary/35 bg-surface-container px-4 py-2.5 text-[1rem] font-bold text-primary hover:bg-surface-container-high"
            >
              Book Station Porter / Wheelchair
            </button>
          )}
        </section>
      </div>

      {/* Reusable InfoModal for Cancellation Rules */}
      <InfoModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
        eyebrow={MODAL_CONTENT.cancellation.eyebrow}
        title={MODAL_CONTENT.cancellation.title}
        bannerTitle={MODAL_CONTENT.cancellation.bannerTitle}
        bannerText={MODAL_CONTENT.cancellation.bannerText}
        summaryItems={MODAL_CONTENT.cancellation.summaryItems}
        readMoreLabel={MODAL_CONTENT.cancellation.readMoreLabel}
        readMoreSections={MODAL_CONTENT.cancellation.readMoreSections}
        fullText={MODAL_CONTENT.cancellation.fullText}
      />
    </PageShell>
  )
}
