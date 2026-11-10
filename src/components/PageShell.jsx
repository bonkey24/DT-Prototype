import Header from './Header'
import ProgressBar from './ProgressBar'

export default function PageShell({
  step = null,
  totalSteps = 4,
  progressTitle = '',
  backTo = null,
  backLabel = 'Back',
  children,
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-surface shadow-2xl">
      <div className="sticky top-0 z-30 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <Header />
        <ProgressBar
          step={step}
          totalSteps={totalSteps}
          title={progressTitle}
          backTo={backTo}
          backLabel={backLabel}
        />
      </div>

      <main className="flex-1 bg-surface px-4 pt-5 pb-32">{children}</main>
    </div>
  )
}
