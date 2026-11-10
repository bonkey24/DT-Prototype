import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function HelpButton() {
  const { helpOpen, setHelpOpen } = useBooking()
  const [selectedAction, setSelectedAction] = useState(null) // 'call' | 'dispute' | null
  const navigate = useNavigate()
  const titleId = useId()
  const sheetRef = useRef(null)
  const triggerRef = useRef(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (helpOpen && !wasOpenRef.current) {
      setSelectedAction(null)
      const timer = setTimeout(() => {
        sheetRef.current?.focus()
      }, 10)
      wasOpenRef.current = true
      return () => clearTimeout(timer)
    }

    if (!helpOpen && wasOpenRef.current) {
      wasOpenRef.current = false
      setTimeout(() => {
        triggerRef.current?.focus()
      }, 10)
    }
  }, [helpOpen])

  useEffect(() => {
    if (!helpOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setHelpOpen(false)
        return
      }

      if (e.key === 'Tab' && sheetRef.current) {
        const focusables = Array.from(sheetRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
        if (focusables.length === 0) {
          e.preventDefault()
          sheetRef.current.focus()
          return
        }
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement
        if (e.shiftKey) {
          if (active === first || active === sheetRef.current) {
            e.preventDefault()
            last.focus()
          }
        } else if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [helpOpen, setHelpOpen])

  const handleGoToAid = () => {
    setHelpOpen(false)
    navigate('/aid')
  }

  return (
    <>
      {/* Persistent Floating Button anchored inside the 390px phone frame */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center">
        <div className="flex w-full max-w-[390px] justify-end px-3">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setHelpOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={helpOpen}
            className="pointer-events-auto relative inline-flex min-h-[56px] min-w-[48px] items-center gap-[8px] rounded-full border-2 border-surface-container-lowest bg-primary px-[18px] py-[10px] text-[18px] font-bold text-on-primary shadow-[0_8px_24px_rgba(0,55,176,0.32)] transition-all hover:bg-primary-container active:scale-[0.98]"
          >
            <span
              aria-hidden="true"
              className="absolute -top-0.5 right-3 h-3.5 w-3.5 rounded-full border-2 border-primary bg-tertiary-fixed"
            />
            <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
              support_agent
            </span>
            <span>Help / Raise a dispute</span>
          </button>
        </div>
      </div>

      {/* Simple 3-Option Help Sheet */}
      {helpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#141b2b]/60 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setHelpOpen(false)
            }
          }}
        >
          <div
            ref={sheetRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="animate-sheet-up flex max-h-[86dvh] w-full max-w-[390px] flex-col overflow-hidden rounded-t-[28px] border-t border-outline-variant/60 bg-surface-container-lowest shadow-[0_16px_48px_rgba(0,0,0,0.32)] outline-none"
          >
            <div className="flex items-center justify-between gap-3 border-b border-surface-container px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-primary" aria-hidden="true">
                  support_agent
                </span>
                <h2 id={titleId} className="text-[1.2rem] font-bold text-on-surface">
                  Railway Help 139
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                aria-label="Close help sheet"
                className="inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 border-on-surface bg-surface-container-lowest px-3.5 py-2 text-[1rem] font-bold text-on-surface hover:bg-surface-container-high"
              >
                <span>Close</span>
                <span className="text-[1.1rem] leading-none font-bold" aria-hidden="true">
                  ✕
                </span>
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto px-5 py-4">
              <p className="text-[1rem] text-on-surface-variant">
                Choose one option below. No long forms or nested menus.
              </p>

              {/* Inline feedback banner when Option 1 or Option 2 is tapped */}
              {selectedAction === 'call' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border-2 border-tertiary bg-tertiary-fixed/50 p-4 text-[1rem] text-on-tertiary-fixed"
                >
                  <span
                    className="material-symbols-outlined icon-filled mt-0.5 shrink-0 text-[24px] text-tertiary"
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="font-bold">Callback requested</p>
                    <p className="mt-1">
                      A friendly EasyRail helper will call you in 5 minutes. You can also dial
                      toll-free <strong>139</strong> (24/7).
                    </p>
                  </div>
                </div>
              )}

              {selectedAction === 'dispute' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border-2 border-tertiary bg-tertiary-fixed/50 p-4 text-[1rem] text-on-tertiary-fixed"
                >
                  <span
                    className="material-symbols-outlined icon-filled mt-0.5 shrink-0 text-[24px] text-tertiary"
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="font-bold">Dispute / TDR logged (#DSP-4092)</p>
                    <p className="mt-1">
                      We received your payment or ticket concern. Our team will check it and send
                      an SMS update within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Option 1 */}
              <button
                type="button"
                onClick={() => setSelectedAction('call')}
                className="flex min-h-[60px] w-full items-center gap-3.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 text-left shadow-xs transition-all hover:border-primary hover:bg-surface-container-low"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-primary">
                  <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                    call
                  </span>
                </span>
                <span>
                  <span className="block text-[1rem] font-bold text-on-surface">
                    1. Talk to a human helper (Helpline 139)
                  </span>
                  <span className="block text-[0.95rem] text-on-surface-variant">
                    Request a free callback in 5 minutes
                  </span>
                </span>
              </button>

              {/* Option 2 */}
              <button
                type="button"
                onClick={() => setSelectedAction('dispute')}
                className="flex min-h-[60px] w-full items-center gap-3.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 text-left shadow-xs transition-all hover:border-primary hover:bg-surface-container-low"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                  <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                    receipt_long
                  </span>
                </span>
                <span>
                  <span className="block text-[1rem] font-bold text-on-surface">
                    2. Raise a dispute or refund (TDR)
                  </span>
                  <span className="block text-[0.95rem] text-on-surface-variant">
                    Report a wrong charge or booking error in one tap
                  </span>
                </span>
              </button>

              {/* Option 3 */}
              <button
                type="button"
                onClick={handleGoToAid}
                className="flex min-h-[60px] w-full items-center gap-3.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 text-left shadow-xs transition-all hover:border-primary hover:bg-surface-container-low"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                    verified_user
                  </span>
                </span>
                <span>
                  <span className="block text-[1rem] font-bold text-on-surface">
                    3. Check financial aid status
                  </span>
                  <span className="block text-[0.95rem] text-on-surface-variant">
                    See Applied → Verified → Paid progress
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
