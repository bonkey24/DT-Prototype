import { useNavigate } from 'react-router-dom'

export default function ProgressBar({
  step = null,
  totalSteps = 4,
  title = '',
  backTo = null,
  backLabel = 'Back',
}) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (!backTo) return
    if (backTo === -1) {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1)
      } else {
        navigate('/search')
      }
    } else {
      navigate(backTo)
    }
  }

  const percent = step ? Math.min(100, Math.max(0, (step / totalSteps) * 100)) : 100

  return (
    <div className="border-t border-b border-outline-variant bg-surface-container-low px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleBack}
          disabled={!backTo}
          aria-label={backTo ? `${backLabel} to previous step` : 'Back (at first step)'}
          className={`inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-1.5 rounded-lg border-2 px-3 text-[0.95rem] font-bold shadow-xs transition-all ${
            backTo
              ? 'border-outline bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-surface-container-high active:scale-95'
              : 'cursor-not-allowed border-outline-variant bg-surface-container text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] font-bold" aria-hidden="true">
            arrow_back
          </span>
          <span>{backLabel}</span>
        </button>

        <div className="flex min-w-0 flex-1 flex-col items-end text-right">
          {step ? (
            <span className="text-[1rem] font-bold text-primary">
              Step {step} of {totalSteps}
              {title ? `: ${title}` : ''}
            </span>
          ) : (
            <span className="text-[1rem] font-bold text-tertiary">{title}</span>
          )}
          <div
            className="mt-1.5 h-3 w-full max-w-[190px] overflow-hidden rounded-full border border-outline-variant bg-surface-container-highest"
            role="progressbar"
            aria-valuenow={step || totalSteps}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={step ? `Step ${step} of ${totalSteps}` : title}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                step ? 'bg-primary' : 'bg-tertiary-container'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
