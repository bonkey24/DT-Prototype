import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { useBooking } from '../context/BookingContext'
import { formatDateDDMMYYYY, formatINR } from '../data/mock'

export default function Success() {
  const { bookingResult, search, selectedTrain, selectedClass, passenger, resetBooking } =
    useBooking()
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const ticket = bookingResult || {
    pnr: '4521 897 365',
    rawPnr: '4521897365',
    coachSeat: `Coach B2 • Berth 34 (${passenger.berthPreference || 'Lower Berth'}, Non-Ladder Access)`,
    bookedAt: '10-11-2026',
    transactionId: 'IR784920194',
    paymentMethodLabel: 'UPI (GPay)',
    search,
    train: selectedTrain,
    travelClass: selectedClass,
    passenger: {
      ...passenger,
      name: passenger.name.trim() || 'Debopriya Sen',
      age: passenger.age || '67',
      gender: passenger.gender || 'Female',
    },
    totalPaid: selectedClass.price,
  }

  const handleCopyPnr = async () => {
    try {
      await navigator.clipboard?.writeText(ticket.rawPnr || ticket.pnr.replace(/\s+/g, ''))
    } catch {
      // Fallback handled cleanly by visual inline confirmation
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleBookAnother = () => {
    resetBooking()
    navigate('/search')
  }

  return (
    <PageShell step={null} progressTitle="Step 4 of 4: Booking Confirmed" backTo="/search">
      <div className="space-y-6">
        {/* Top Confirmed Status Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tertiary-container px-4 py-2 text-[0.95rem] font-bold text-on-tertiary shadow-sm">
            <span className="material-symbols-outlined icon-filled text-[22px]" aria-hidden="true">
              check_circle
            </span>
            <span>IRCTC Booking Complete • Confirmed (CNF)</span>
          </span>
        </div>

        {/* Celebratory Reassurance Card */}
        <section
          role="status"
          className="flex flex-col items-center gap-4 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 text-center shadow-sm"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary shadow-md">
            <span className="material-symbols-outlined icon-filled text-[44px]" aria-hidden="true">
              check
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-[1.6rem] leading-tight font-bold text-on-surface">
              Your train ticket is booked and confirmed!
            </h1>
            <p className="text-[1rem] leading-relaxed text-on-surface-variant">
              Sent to <strong className="text-on-surface">{ticket.passenger.email}</strong> and
              via SMS/WhatsApp to{' '}
              <strong className="text-on-surface">+91 {ticket.passenger.mobile}</strong>.
            </p>
          </div>

          <div className="flex w-full items-start gap-3 rounded-xl border border-outline-variant/40 bg-surface-container p-4 text-left">
            <span className="material-symbols-outlined shrink-0 text-[26px] text-primary" aria-hidden="true">
              smartphone
            </span>
            <p className="text-[0.95rem] text-on-surface">
              No physical printout needed. Showing this digital ticket or SMS with your original
              Aadhaar card is valid during travel.
            </p>
          </div>
        </section>

        {/* Prominent 10-Digit PNR & Fast Boarding QR Card */}
        <section
          aria-labelledby="pnr-label"
          className="space-y-5 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-md"
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                id="pnr-label"
                className="text-[0.95rem] font-bold tracking-wider text-on-surface-variant uppercase"
              >
                Your 10-Digit PNR Number
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-container px-3 py-1 text-[0.9rem] font-bold text-on-tertiary">
                <span className="material-symbols-outlined icon-filled text-[18px]" aria-hidden="true">
                  verified
                </span>
                <span>STATUS: CNF (CONFIRMED)</span>
              </span>
            </div>

            <div className="rounded-xl border border-primary/25 bg-surface-container-high px-4 py-3 text-center shadow-inner">
              <span className="font-mono text-[1.75rem] font-bold tracking-widest text-primary select-all">
                {ticket.pnr}
              </span>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border-l-4 border-tertiary-container bg-surface-container-low p-3.5">
              <span
                className="material-symbols-outlined icon-filled mt-0.5 shrink-0 text-[24px] text-tertiary"
                aria-hidden="true"
              >
                airline_seat_recline_normal
              </span>
              <span className="text-[1rem] font-bold text-on-surface">{ticket.coachSeat}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyPnr}
              className={`flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl border-2 px-5 py-3 text-[1rem] font-bold transition-all ${
                copied
                  ? 'border-tertiary bg-tertiary-fixed/50 text-on-tertiary-fixed'
                  : 'border-outline-variant bg-surface-container text-on-surface hover:border-primary hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[22px] text-primary" aria-hidden="true">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'PNR Copied!' : 'Copy 10-Digit PNR'}</span>
            </button>
          </div>

          {/* Fast Boarding Pass QR */}
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-outline-variant/50 bg-surface-container-low p-4 text-center">
            <span className="text-[0.95rem] font-bold text-on-surface">Fast Boarding Pass</span>
            <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-3 shadow-xs">
              <svg
                aria-label={`Boarding pass QR for PNR ${ticket.pnr}`}
                className="h-32 w-32 text-on-surface"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <rect height="30" rx="3" width="30" x="0" y="0" />
                <rect fill="#ffffff" height="20" width="20" x="5" y="5" />
                <rect height="10" width="10" x="10" y="10" />
                <rect height="30" rx="3" width="30" x="70" y="0" />
                <rect fill="#ffffff" height="20" width="20" x="75" y="5" />
                <rect height="10" width="10" x="80" y="10" />
                <rect height="30" rx="3" width="30" x="0" y="70" />
                <rect fill="#ffffff" height="20" width="20" x="5" y="75" />
                <rect height="10" width="10" x="10" y="80" />
                <rect height="8" width="8" x="36" y="6" />
                <rect height="6" width="12" x="50" y="6" />
                <rect height="8" width="16" x="36" y="20" />
                <rect height="16" width="8" x="56" y="20" />
                <rect height="12" width="12" x="12" y="38" />
                <rect height="8" width="14" x="30" y="36" />
                <rect height="18" width="18" x="48" y="36" />
                <rect height="10" width="10" x="72" y="38" />
                <rect height="18" width="8" x="86" y="38" />
                <rect height="16" width="14" x="38" y="76" />
                <rect height="10" width="12" x="58" y="72" />
                <rect height="18" width="18" x="76" y="76" />
              </svg>
            </div>
            <span className="text-[0.9rem] text-on-surface-variant">
              IRCTC Ticket Validation QR • Show to TTE on demand
            </span>
          </div>
        </section>

        {/* Free Sahayak & Battery Car Confirmed Card */}
        {ticket.passenger.sahayakAssist && (
          <section className="space-y-3 rounded-2xl bg-tertiary p-5 text-on-tertiary shadow-md">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tertiary-container">
                <span
                  className="material-symbols-outlined icon-filled text-[28px] text-on-tertiary"
                  aria-hidden="true"
                >
                  accessible_forward
                </span>
              </div>
              <div>
                <h2 className="text-[1.1rem] font-bold text-on-tertiary">
                  Free Sahayak &amp; Battery Car Confirmed
                </h2>
                <p className="text-[0.95rem] text-on-tertiary-container">
                  Senior station assistance booked at ₹0 extra fee
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-3.5 text-[0.95rem] leading-relaxed text-on-tertiary">
              A Sahayak (porter) will meet <strong>{ticket.passenger.name}</strong> at the boarding
              station main porch 45 minutes before departure with battery cart assistance.
            </div>
          </section>
        )}

        {/* Trip Details Summary Card */}
        <section
          aria-label="Trip details"
          className="space-y-4 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[26px] text-primary" aria-hidden="true">
                train
              </span>
              <h2 className="text-[1.15rem] font-bold text-on-surface">
                {ticket.train.number} {ticket.train.name}
              </h2>
            </div>
            <span className="rounded-full bg-secondary-container px-3 py-1 text-[0.95rem] font-bold text-on-secondary-fixed">
              {ticket.travelClass.label}
            </span>
          </div>

          <div className="space-y-3 rounded-xl border border-outline-variant/50 bg-surface-container-low p-4">
            <div>
              <span className="block text-[0.9rem] font-bold text-on-surface-variant uppercase">
                Departs From
              </span>
              <span className="block text-[1.2rem] font-bold text-primary">
                {ticket.train.departureTime}
              </span>
              <span className="block text-[1rem] font-bold text-on-surface">
                {ticket.search.from}
              </span>
              <span className="block text-[0.95rem] text-on-surface-variant">
                {formatDateDDMMYYYY(ticket.search.date)} • {ticket.train.departurePlatform}
              </span>
            </div>

            <div className="border-t border-outline-variant/50 pt-3">
              <span className="block text-[0.9rem] font-bold text-on-surface-variant uppercase">
                Arrives At
              </span>
              <span className="block text-[1.2rem] font-bold text-on-surface">
                {ticket.train.arrivalTime} ({ticket.train.arrivalDayOffset})
              </span>
              <span className="block text-[1rem] font-bold text-on-surface">
                {ticket.search.to}
              </span>
              <span className="block text-[0.95rem] text-on-surface-variant">
                Duration: {ticket.train.duration} • {ticket.train.arrivalPlatform}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-[0.95rem]">
            <div className="rounded-xl border border-outline-variant bg-surface p-3.5">
              <span className="block font-bold text-on-surface">Passenger Details</span>
              <span className="block text-on-surface-variant">
                {ticket.passenger.name} ({ticket.passenger.gender}, Age {ticket.passenger.age} •
                Senior Quota)
              </span>
            </div>

            <div className="rounded-xl border border-outline-variant/50 bg-surface-container-low p-3.5">
              <span className="block text-[0.9rem] font-bold text-on-surface-variant">
                Total Fare Paid
              </span>
              <span className="block text-[1.4rem] font-bold text-on-surface">
                {formatINR(ticket.totalPaid)}
              </span>
              <span className="block text-[0.9rem] text-on-surface-variant">
                Paid via {ticket.paymentMethodLabel} • Transaction ID: {ticket.transactionId}
              </span>
            </div>
          </div>
        </section>

        {/* Action Buttons Group (All >= 56px tall, WCAG AA+ contrast) */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-[1.05rem] font-bold text-on-primary shadow-md hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              download
            </span>
            <span>Download E-Ticket (PDF)</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `EasyRail Ticket Confirmed!\nPNR: ${ticket.rawPnr || ticket.pnr}\nTrain: ${
                ticket.train.number
              } ${ticket.train.name}\nSeat: ${ticket.coachSeat}\nPassenger: ${
                ticket.passenger.name
              }`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl bg-tertiary-container px-5 py-3 text-[1.05rem] font-bold text-on-tertiary shadow-sm hover:bg-tertiary"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              share
            </span>
            <span>Share on WhatsApp</span>
          </a>

          <Link
            to="/aid"
            className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl border-2 border-primary bg-surface-container-lowest px-5 py-3 text-[1.05rem] font-bold text-primary hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              verified_user
            </span>
            <span>Check financial aid status</span>
          </Link>

          <button
            type="button"
            onClick={handleBookAnother}
            className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest px-5 py-3 text-[1.05rem] font-bold text-on-surface hover:border-primary hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[24px] text-primary" aria-hidden="true">
              train
            </span>
            <span>Book another train journey</span>
          </button>
        </div>

        {/* 3 Simple "What happens next?" Reassurance Cards */}
        <section className="space-y-3 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[26px] text-primary" aria-hidden="true">
              lightbulb
            </span>
            <h2 className="text-[1.15rem] font-bold text-on-surface">What happens next?</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                num: '1',
                title: 'Keep ID handy',
                body: 'Keep your original Aadhaar Card or Voter ID ready along with this SMS / e-ticket.',
              },
              {
                num: '2',
                title: 'Arrive 30 mins early',
                body: 'Reach the main porch battery cart counter 30–45 minutes early to meet your Sahayak.',
              },
              {
                num: '3',
                title: 'Board comfortably',
                body: 'Proceed directly to your reserved berth without climbing stairs or ladders.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[1rem] font-bold text-on-primary">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-[1rem] font-bold text-on-surface">{step.title}</h3>
                  <p className="mt-0.5 text-[0.95rem] text-on-surface-variant">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
