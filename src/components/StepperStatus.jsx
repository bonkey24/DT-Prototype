export default function StepperStatus({ application }) {
  const { currentStage, appliedDate, verifiedDate, paidDate, expectedPayDate } = application

  const steps = [
    {
      stepNumber: 1,
      name: 'Applied',
      dateText: appliedDate ? `Completed on ${appliedDate}` : 'Pending',
      description: 'We received your senior travel aid application.',
    },
    {
      stepNumber: 2,
      name: 'Verified',
      dateText: verifiedDate
        ? `Approved on ${verifiedDate}`
        : 'Checking your Aadhaar age card and bank details',
      description: 'Your age proof and bank details are checked and approved.',
    },
    {
      stepNumber: 3,
      name: 'Paid',
      dateText: paidDate ? `Sent on ${paidDate}` : `Expected by ${expectedPayDate}`,
      description: 'Money is sent directly to your bank account.',
    },
  ]

  return (
    <div className="space-y-4">
      {/* Top 3-Step Horizontal Visual Track */}
      <div
        aria-label="Financial aid progress"
        className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-sm"
      >
        <div className="grid grid-cols-3 items-start gap-2">
          {steps.map((s, idx) => {
            const isCompleted =
              currentStage > s.stepNumber || (currentStage === 3 && s.stepNumber === 3)
            const isCurrent = currentStage === s.stepNumber && currentStage < 3

            return (
              <div key={s.stepNumber} className="relative flex flex-col items-center text-center">
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={`absolute top-6 left-1/2 h-1.5 w-full ${
                      currentStage > s.stepNumber
                        ? 'bg-tertiary-container'
                        : 'bg-surface-container-highest'
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold ${
                    isCompleted
                      ? 'border-tertiary bg-tertiary-container text-on-tertiary'
                      : isCurrent
                        ? 'border-primary bg-primary text-on-primary ring-4 ring-primary-fixed'
                        : 'border-outline bg-surface-container-lowest text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                    {isCompleted ? 'check' : isCurrent ? 'schedule' : 'radio_button_unchecked'}
                  </span>
                </div>

                <span
                  className={`mt-2 text-[1rem] font-bold ${
                    isCompleted
                      ? 'text-tertiary'
                      : isCurrent
                        ? 'text-primary'
                        : 'text-on-surface-variant'
                  }`}
                >
                  {s.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detailed Plain-Language Step List */}
      <ol className="space-y-3">
        {steps.map((s) => {
          const isCompleted =
            currentStage > s.stepNumber || (currentStage === 3 && s.stepNumber === 3)
          const isCurrent = currentStage === s.stepNumber && currentStage < 3

          const badgeText = isCompleted ? 'Done' : isCurrent ? 'Current step' : 'Next step'

          return (
            <li
              key={s.stepNumber}
              aria-current={isCurrent ? 'step' : undefined}
              className={`rounded-2xl border-2 p-4 ${
                isCompleted
                  ? 'border-tertiary bg-tertiary-fixed/40'
                  : isCurrent
                    ? 'border-primary bg-surface-container-low'
                    : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[1.1rem] font-bold text-on-surface">
                  {s.stepNumber}. {s.name}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-[0.95rem] font-bold ${
                    isCompleted
                      ? 'bg-tertiary text-on-tertiary'
                      : isCurrent
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  {badgeText}
                </span>
              </div>
              <p className="mt-1.5 text-[1rem] font-bold text-on-surface">{s.dateText}</p>
              <p className="mt-1 text-[0.95rem] text-on-surface-variant">{s.description}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
