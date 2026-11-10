import { useEffect, useId, useRef, useState } from 'react'
import { useBooking } from '../context/BookingContext'

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function InfoModal({
  isOpen,
  onClose,
  eyebrow = 'Official IRCTC Guidelines',
  title,
  bannerTitle = '',
  bannerText = '',
  summaryItems = [],
  summaryBullets = [],
  readMoreLabel = 'Read more',
  readMoreSections = [],
  fullText = [],
}) {
  const { modalMode } = useBooking()
  const titleId = useId()
  const dialogRef = useRef(null)
  const bodyRef = useRef(null)
  const previousFocusRef = useRef(null)
  const wasOpenRef = useRef(false)

  const [expanded, setExpanded] = useState(false)
  const [dragY, setDragY] = useState(0)
  const dragStartYRef = useRef(null)
  const isDraggingRef = useRef(false)

  // Track previous focus when opening and restore focus to trigger on close
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      previousFocusRef.current = document.activeElement
      setExpanded(false)
      setDragY(0)

      const timer = setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.focus()
        }
      }, 10)
      wasOpenRef.current = true
      return () => clearTimeout(timer)
    }

    if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false
      const target = previousFocusRef.current
      previousFocusRef.current = null
      if (target && typeof target.focus === 'function') {
        setTimeout(() => {
          target.focus()
        }, 10)
      }
    }
  }, [isOpen])

  // Prevent background page scroll while modal is open
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  // Escape key dismissal and Focus Trap for AFTER mode
  useEffect(() => {
    if (!isOpen || modalMode !== 'after') return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
        if (focusables.length === 0) {
          e.preventDefault()
          dialogRef.current.focus()
          return
        }

        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement

        if (e.shiftKey) {
          if (active === first || active === dialogRef.current) {
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
  }, [isOpen, modalMode, onClose])

  if (!isOpen) return null

  // =========================================================================
  // BEFORE MODE (The Problem — kept deliberately bad):
  // Full-screen wall of dense text + tiny low-contrast "x" close button
  // =========================================================================
  if (modalMode === 'before') {
    return (
      <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/70">
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative flex h-full w-full max-w-[390px] flex-col bg-white text-slate-600 shadow-2xl"
        >
          {/* Deliberately tiny, low-contrast "x" in the top-right corner */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center border-0 bg-transparent p-0 text-[11px] leading-none text-slate-300 hover:text-slate-400"
            style={{ outline: 'none' }}
          >
            x
          </button>

          <div className="h-full overflow-y-auto px-3 pt-4 pb-6">
            <h2
              id={titleId}
              className="mb-2 text-[13px] font-semibold tracking-tight text-slate-500 uppercase"
            >
              {title} — Important Notice &amp; Statutory Guidelines
            </h2>
            <div className="space-y-2 text-[11px] leading-[1.32] text-slate-500">
              {fullText.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p>
                ALL TRANSACTIONS REMAIN SUBJECT TO INDIAN RAILWAYS TARIFF REVISIONS, RESERVATION
                CHARTING CUT-OFF WINDOWS, AND ELECTRONIC GATEWAY RECONCILIATION RULES WITHOUT PRIOR
                INDIVIDUAL NOTICE. RETENTION OF THIS ELECTRONIC RECORD CONSTITUTES ACCEPTANCE OF ALL
                CLAUSES CONTAINED HEREIN.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // AFTER MODE (Stitch Cancellation.html Bottom-Sheet Design + Accessibility):
  // Rounded top sheet, plain summary cards, "Read more" accordion, large
  // high-contrast "Close ✕" button, full-width "Got it", swipe-down, tap-outside, Esc
  // =========================================================================
  const handleSwipeStart = (clientY, target) => {
    if (target?.closest?.('button, a, input, select, textarea')) return
    if (bodyRef.current && bodyRef.current.scrollTop > 0 && bodyRef.current.contains(target)) {
      return
    }
    dragStartYRef.current = clientY
    isDraggingRef.current = true
  }

  const handleSwipeMove = (clientY) => {
    if (!isDraggingRef.current || dragStartYRef.current === null) return
    const delta = clientY - dragStartYRef.current
    if (delta > 0) {
      setDragY(delta)
    } else {
      isDraggingRef.current = false
      dragStartYRef.current = null
      setDragY(0)
    }
  }

  const handleSwipeEnd = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    if (dragY > 80) {
      setDragY(0)
      onClose()
    } else {
      setDragY(0)
    }
    dragStartYRef.current = null
  }

  const items =
    summaryItems.length > 0
      ? summaryItems
      : summaryBullets.map((b, i) => ({
          icon: 'check_circle',
          tone: i === 0 ? 'tertiary' : i === 1 ? 'secondary' : 'surface',
          heading: `Rule ${i + 1}`,
          text: b,
        }))

  const hasReadMore = readMoreSections.length > 0 || fullText.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#141b2b]/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: isDraggingRef.current ? 'none' : 'transform 180ms ease-out',
        }}
        onTouchStart={(e) => handleSwipeStart(e.touches[0].clientY, e.target)}
        onTouchMove={(e) => handleSwipeMove(e.touches[0].clientY)}
        onTouchEnd={handleSwipeEnd}
        onPointerDown={(e) => {
          if (e.pointerType === 'touch') return
          handleSwipeStart(e.clientY, e.target)
        }}
        onPointerMove={(e) => {
          if (e.pointerType === 'touch') return
          handleSwipeMove(e.clientY)
        }}
        onPointerUp={(e) => {
          if (e.pointerType === 'touch') return
          handleSwipeEnd()
        }}
        onPointerCancel={(e) => {
          if (e.pointerType === 'touch') return
          handleSwipeEnd()
        }}
        className="animate-sheet-up flex max-h-[88dvh] w-full max-w-[390px] flex-col overflow-hidden rounded-t-[28px] border-t border-outline-variant/60 bg-surface-container-lowest shadow-[0_16px_48px_rgba(0,0,0,0.32)] outline-none"
      >
        {/* Drag Handle + Header */}
        <div className="cursor-grab touch-none border-b border-surface-container bg-surface-container-lowest px-4 pt-3 pb-3.5 select-none active:cursor-grabbing">
          <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-outline-variant" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[0.9rem] font-bold tracking-wide text-tertiary uppercase">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  verified_user
                </span>
                <span>{eyebrow}</span>
              </span>
              <h2
                id={titleId}
                className="mt-0.5 text-[1.25rem] leading-snug font-bold text-on-surface"
              >
                {title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close rules sheet"
              className="inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 border-on-surface bg-surface-container-lowest px-3.5 py-2 text-[1rem] font-bold text-on-surface shadow-xs transition-all hover:bg-surface-container-high active:scale-95"
            >
              <span>Close</span>
              <span className="text-[1.15rem] leading-none font-bold" aria-hidden="true">
                ✕
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Sheet Body */}
        <div ref={bodyRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {/* Reassuring Banner */}
          {bannerTitle && (
            <div className="flex items-start gap-3 rounded-xl border border-outline-variant/70 bg-surface-container-low p-3.5">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-xs">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  verified
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[1rem] font-bold text-on-surface">{bannerTitle}</p>
                {bannerText && (
                  <p className="mt-0.5 text-[0.95rem] leading-relaxed text-on-surface-variant">
                    {bannerText}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 3 Summary Slab Cards */}
          <ul className="space-y-3">
            {items.map((item, idx) => {
              const badgeClasses =
                item.tone === 'tertiary'
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                  : item.tone === 'secondary'
                    ? 'bg-secondary-container text-primary'
                    : 'bg-surface-container-high text-primary'

              return (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 rounded-xl border border-outline-variant/80 bg-surface-bright p-4"
                >
                  <div
                    aria-hidden="true"
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${badgeClasses}`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h3 className="text-[1.05rem] leading-snug font-bold text-on-surface">
                      {item.heading}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-on-surface-variant">
                      {item.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Expandable "Read more" Accordion */}
          {hasReadMore && (
            <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-container"
              >
                <span className="flex items-center gap-2.5 text-[1rem] font-bold text-on-surface">
                  <span
                    className="material-symbols-outlined shrink-0 text-[22px] text-primary"
                    aria-hidden="true"
                  >
                    assignment_late
                  </span>
                  <span>{expanded ? 'Hide detailed rules' : `Read more: ${readMoreLabel}`}</span>
                </span>
                <span
                  className={`material-symbols-outlined shrink-0 text-[26px] font-bold text-on-surface transition-transform duration-200 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>

              {expanded && (
                <div className="space-y-3.5 border-t border-outline-variant/70 bg-surface-container-lowest px-4 py-4">
                  {readMoreSections.length > 0
                    ? readMoreSections.map((sec, idx) => (
                        <div key={idx}>
                          <h4 className="text-[1rem] font-bold text-on-surface">{sec.heading}</h4>
                          <p className="mt-1 text-[0.95rem] leading-relaxed text-on-surface-variant">
                            {sec.text}
                          </p>
                        </div>
                      ))
                    : fullText.map((para, idx) => (
                        <p key={idx} className="text-[0.95rem] leading-relaxed text-on-surface-variant">
                          {para}
                        </p>
                      ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Thumb-reach Full-Width "Got it" Footer */}
        <div className="space-y-2.5 border-t border-surface-container bg-surface-container-lowest p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-[1.1rem] font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              check_circle
            </span>
            <span>Got it</span>
          </button>

          <p className="text-center text-[0.9rem] text-on-surface-variant">
            Need help? Call Railway helpline <strong>139</strong> (Toll-free)
          </p>
        </div>
      </div>
    </div>
  )
}
