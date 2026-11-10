import { Link, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

export default function Header() {
  const {
    modalMode,
    setModalMode,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    canIncreaseFont,
    canDecreaseFont,
    language,
    setLanguage,
  } = useBooking()
  const location = useLocation()
  const isAidPage = location.pathname === '/aid'

  return (
    <header className="bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* Row 1: Brand, Aid Link, EN/हिं Visual Toggle, and A- / A+ Controls */}
      <div className="flex items-center justify-between gap-[4px] px-[8px] pt-[8px] pb-[6px]">
        <Link
          to="/search"
          className="inline-flex min-h-[48px] shrink-0 items-center gap-[6px] rounded-xl px-[4px] text-primary hover:bg-surface-container-low"
        >
          <span
            aria-hidden="true"
            className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary shadow-xs"
          >
            <span className="material-symbols-outlined icon-filled text-[20px]">train</span>
          </span>
          <span className="text-[18px] font-bold tracking-tight text-on-surface">
            EasyRail
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-[4px]">
          {/* EN / हिं visual toggle (Stitch requirement: visual control only) */}
          <button
            type="button"
            onClick={() => setLanguage((prev) => (prev === 'EN' ? 'HI' : 'EN'))}
            aria-label={`Language selector: ${language === 'EN' ? 'English' : 'Hindi'} (visual demo)`}
            aria-pressed={language === 'HI'}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border-2 border-outline-variant bg-surface-container-low px-[6px] text-[16px] font-bold text-on-surface transition-colors hover:border-primary hover:bg-surface-container"
          >
            {language === 'EN' ? 'EN/हिं' : 'हिं/EN'}
          </button>

          {/* Financial Aid Status Link */}
          <Link
            to="/aid"
            aria-current={isAidPage ? 'page' : undefined}
            className={`inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-[3px] rounded-lg border-2 px-[6px] text-[16px] font-bold transition-colors ${
              isAidPage
                ? 'border-primary bg-primary text-on-primary'
                : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              verified_user
            </span>
            <span>Aid</span>
          </Link>

          {/* A- / A+ Text Size Controls */}
          <div
            role="group"
            aria-label="Text size"
            className="flex items-center overflow-hidden rounded-lg border-2 border-outline-variant bg-surface-container-low"
          >
            <button
              type="button"
              onClick={decreaseFontSize}
              disabled={!canDecreaseFont}
              aria-label={`Decrease text size (currently ${fontSize}px)`}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center border-r border-outline-variant bg-surface-container-lowest text-[17px] font-bold text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:bg-surface-container-low disabled:text-on-surface-variant"
            >
              A-
            </button>
            <button
              type="button"
              onClick={increaseFontSize}
              disabled={!canIncreaseFont}
              aria-label={`Increase text size (currently ${fontSize}px)`}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center bg-surface-container-lowest text-[18px] font-bold text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:bg-surface-container-low disabled:text-on-surface-variant"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Global Before / After Modal Mode Toggle */}
      <div className="flex items-center justify-between gap-2 border-t border-outline-variant/70 bg-surface-container-low px-3 py-1.5">
        <span className="shrink-0 text-[16px] font-bold text-on-surface">
          Pop-up mode:
        </span>

        <div
          role="group"
          aria-label="Pop-up design mode"
          className="grid flex-1 grid-cols-2 gap-1 rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-0.5"
        >
          <button
            type="button"
            aria-pressed={modalMode === 'before'}
            onClick={() => setModalMode('before')}
            className={`min-h-[48px] rounded-lg px-2 text-[17px] font-bold transition-colors ${
              modalMode === 'before'
                ? 'bg-error text-on-error shadow-xs'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Before
          </button>
          <button
            type="button"
            aria-pressed={modalMode === 'after'}
            onClick={() => setModalMode('after')}
            className={`min-h-[48px] rounded-lg px-2 text-[17px] font-bold transition-colors ${
              modalMode === 'after'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            After
          </button>
        </div>
      </div>
    </header>
  )
}
