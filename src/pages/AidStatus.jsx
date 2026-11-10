import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import StepperStatus from '../components/StepperStatus'
import { AID_APPLICATIONS, formatINR } from '../data/mock'

export default function AidStatus() {
  const [selectedId, setSelectedId] = useState(AID_APPLICATIONS[0].id)
  const activeApp =
    AID_APPLICATIONS.find((a) => a.id === selectedId) || AID_APPLICATIONS[0]

  return (
    <PageShell step={null} progressTitle="Financial aid status" backTo={-1} backLabel="Back">
      <div className="space-y-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-[0.9rem] font-bold text-on-secondary-fixed">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              verified_user
            </span>
            Senior Travel Support Tracker
          </span>
          <h1 className="mt-2 text-[1.55rem] leading-tight font-bold text-on-surface">
            Financial aid status
          </h1>
          <p className="mt-1 text-[1rem] text-on-surface-variant">
            Track your senior travel support money in 3 clear steps: Applied, Verified, and Paid.
          </p>
        </div>

        {/* Select which mock aid request to view */}
        <section aria-label="Choose application to view" className="space-y-2.5">
          <p className="text-[1rem] font-bold text-on-surface">Your applications:</p>
          <div className="space-y-2.5">
            {AID_APPLICATIONS.map((app) => {
              const active = app.id === activeApp.id
              const stageName =
                app.currentStage === 1
                  ? 'Applied'
                  : app.currentStage === 2
                    ? 'Verified'
                    : 'Paid'
              return (
                <button
                  key={app.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(app.id)}
                  className={`flex min-h-[60px] w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                    active
                      ? 'border-primary bg-surface-container-low shadow-sm'
                      : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div>
                    <span className="block text-[1.05rem] font-bold text-on-surface">
                      {app.title}
                    </span>
                    <span className="block text-[0.95rem] text-on-surface-variant">
                      ID: {app.id} • {formatINR(app.amount)}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[0.9rem] font-bold ${
                      app.currentStage === 3
                        ? 'bg-tertiary text-on-tertiary'
                        : app.currentStage === 2
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {stageName}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Active Application Overview */}
        <section className="space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[0.95rem] font-semibold text-on-surface-variant">Applicant</p>
              <h2 className="text-[1.2rem] font-bold text-on-surface">{activeApp.applicant}</h2>
            </div>
            <div className="text-right">
              <p className="text-[0.95rem] font-semibold text-on-surface-variant">Support amount</p>
              <p className="text-[1.25rem] font-bold text-primary">{formatINR(activeApp.amount)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-surface-container-low p-3.5 text-[0.95rem] text-on-surface">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-[22px] text-primary" aria-hidden="true">
              info
            </span>
            <p>{activeApp.note}</p>
          </div>
        </section>

        {/* 3-Step Visual Stepper */}
        <StepperStatus application={activeApp} />

        {/* Return to Ticket Booking */}
        <Link
          to="/search"
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[1.05rem] font-bold text-on-primary shadow-md hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            train
          </span>
          <span>Back to ticket booking</span>
        </Link>
      </div>
    </PageShell>
  )
}
