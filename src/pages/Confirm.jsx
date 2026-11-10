import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import InfoModal from '../components/InfoModal'
import { useBooking } from '../context/BookingContext'
import {
  BANKS,
  MODAL_CONTENT,
  UPI_APPS,
  formatDateDDMMYYYY,
  formatINR,
} from '../data/mock'

export default function Confirm() {
  const {
    search,
    selectedTrain,
    selectedClass,
    passenger,
    payment,
    setPayment,
    completePayment,
  } = useBooking()

  const [termsOpen, setTermsOpen] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(true)
  const [termsError, setTermsError] = useState('')
  const [showTaxDetails, setShowTaxDetails] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const navigate = useNavigate()

  const displayPassengerName = passenger.name.trim() || 'Debopriya Sen'
  const displayAge = passenger.age || '67'

  // Exact fare breakdown matching selectedClass.price
  const reservationCharge = 40
  const superfastCharge = 45
  const irctcFee = 15
  const baseFare = Math.max(0, selectedClass.price - (reservationCharge + superfastCharge + irctcFee))

  const handlePayNow = () => {
    if (!termsAccepted) {
      setTermsError(
        'Please tick the agreement box above to confirm Indian Railways passenger rules before paying.'
      )
      return
    }
    setTermsError('')
    completePayment()
    navigate('/success')
  }

  return (
    <PageShell step={4} progressTitle="Confirm & pay" backTo="/passenger">
      <div className="space-y-6">
        {/* Step 4 Sync Banner */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-high p-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
              <span className="material-symbols-outlined icon-filled text-[20px]" aria-hidden="true">
                check
              </span>
            </span>
            <span className="text-[1.05rem] font-bold text-on-surface">Final Step</span>
          </div>
          <span className="rounded-full bg-surface-container-lowest px-3 py-1 text-[0.95rem] font-bold text-primary">
            100% Ready
          </span>
        </div>

        {/* Page Title */}
        <header className="space-y-2">
          <h1 className="text-[1.6rem] leading-tight font-bold text-on-surface">
            Review your journey &amp; confirm payment
          </h1>
          <p className="text-[1rem] leading-relaxed text-on-surface-variant">
            Check all details below before paying. Your ticket is sent immediately via SMS and
            WhatsApp.
          </p>
        </header>

        {/* 1. Trip Summary Card */}
        <section
          aria-labelledby="journey-summary-heading"
          className="relative space-y-5 overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 pt-6 shadow-md"
        >
          <div className="absolute top-0 right-0 left-0 h-2 bg-primary" aria-hidden="true" />

          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary shadow-xs">
              <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                train
              </span>
            </div>
            <div className="min-w-0">
              <h2
                id="journey-summary-heading"
                className="text-[1.2rem] leading-snug font-bold text-on-surface"
              >
                {selectedTrain.number} {selectedTrain.name}
              </h2>
              <p className="mt-0.5 text-[0.95rem] text-on-surface-variant">
                {search.from} → {search.to}
              </p>
            </div>
          </div>

          <Link
            to="/passenger"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-surface-container px-4 py-2 text-[1rem] font-bold text-primary shadow-xs hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              edit
            </span>
            <span>Change Details</span>
          </Link>

          {/* Departure & Arrival Info Panel */}
          <div className="space-y-4 rounded-xl border border-outline-variant/50 bg-surface-container-low p-4">
            <div>
              <span className="block text-[0.9rem] font-bold tracking-wider text-on-surface-variant uppercase">
                Departs From
              </span>
              <span className="block text-[1.1rem] font-bold text-on-surface">{search.from}</span>
              <span className="block text-[1rem] font-semibold text-on-surface">
                {selectedTrain.departureTime}, {formatDateDDMMYYYY(search.date)}
              </span>
              <span className="mt-1 inline-block rounded border border-outline-variant/60 bg-surface-container-highest px-2.5 py-0.5 text-[0.9rem] font-bold text-on-surface">
                {selectedTrain.departurePlatform}
              </span>
            </div>

            <div className="flex items-center justify-between border-y border-outline-variant/50 py-2 text-[0.95rem] font-bold text-primary">
              <span>Duration: {selectedTrain.duration}</span>
              <span className="inline-flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  verified
                </span>
                Direct Superfast
              </span>
            </div>

            <div>
              <span className="block text-[0.9rem] font-bold tracking-wider text-on-surface-variant uppercase">
                Arrives At
              </span>
              <span className="block text-[1.1rem] font-bold text-on-surface">{search.to}</span>
              <span className="block text-[1rem] font-semibold text-on-surface">
                {selectedTrain.arrivalTime} ({selectedTrain.arrivalDayOffset})
              </span>
              <span className="mt-1 inline-block rounded border border-outline-variant/60 bg-surface-container-highest px-2.5 py-0.5 text-[0.9rem] font-bold text-on-surface">
                {selectedTrain.arrivalPlatform}
              </span>
            </div>
          </div>

          {/* Class & Passenger Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <span className="material-symbols-outlined" aria-hidden="true">
                  airline_seat_recline_extra
                </span>
              </div>
              <div>
                <span className="block text-[0.9rem] text-on-surface-variant">
                  Class &amp; Preference
                </span>
                <span className="block text-[1.05rem] font-bold text-on-surface">
                  {selectedClass.label}
                </span>
                <span className="block text-[0.95rem] text-on-surface-variant">
                  {passenger.berthPreference} • {passenger.autoUpgrade ? 'Auto-Upgrade Opted' : 'Standard'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <span className="material-symbols-outlined" aria-hidden="true">
                  badge
                </span>
              </div>
              <div>
                <span className="block text-[0.9rem] text-on-surface-variant">
                  Passenger Details
                </span>
                <span className="block text-[1.05rem] font-bold text-on-surface">
                  {displayPassengerName}
                </span>
                <span className="inline-flex items-center gap-1 text-[0.95rem] font-bold text-tertiary">
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    elderly
                  </span>
                  <span>
                    {passenger.gender}, Age {displayAge} • Senior Quota
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Confirmed Free Station Assistance */}
          {passenger.sahayakAssist && (
            <div className="flex items-start gap-3 rounded-xl border-2 border-tertiary-fixed bg-surface-container-low p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                <span className="material-symbols-outlined icon-filled text-[26px]" aria-hidden="true">
                  accessibility_new
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[1rem] font-bold text-tertiary">
                    Free Station Assistance
                  </span>
                  <span className="rounded bg-tertiary px-2.5 py-0.5 text-[0.9rem] font-bold text-on-tertiary">
                    Confirmed
                  </span>
                </div>
                <p className="mt-1 text-[0.95rem] text-on-surface">
                  Free Sahayak &amp; Battery Cart confirmed for {displayPassengerName} at boarding
                  and arrival stations.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 2. Fare Breakdown Card */}
        <section
          aria-labelledby="fare-breakdown-heading"
          className="space-y-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-md"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-primary">
              <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                receipt_long
              </span>
            </div>
            <div>
              <h2 id="fare-breakdown-heading" className="text-[1.2rem] font-bold text-on-surface">
                Fare &amp; Cost Breakdown
              </h2>
              <p className="text-[0.95rem] text-on-surface-variant">
                Transparent official IRCTC pricing with zero hidden fees
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-expanded={showTaxDetails}
            onClick={() => setShowTaxDetails((prev) => !prev)}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-[0.95rem] font-bold text-primary hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              info
            </span>
            <span>
              {showTaxDetails ? 'Hide tax & surcharge details' : 'View tax & surcharge details'}
            </span>
          </button>

          {showTaxDetails && (
            <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-surface-container-low p-3.5 text-[0.95rem] text-on-surface">
              <span className="material-symbols-outlined shrink-0 text-[22px] text-primary" aria-hidden="true">
                verified_user
              </span>
              <span>
                Includes statutory taxes (5% GST on AC classes) and fixed ₹15 IRCTC convenience
                fee. Zero extra administrative fees for seniors.
              </span>
            </div>
          )}

          <div className="divide-y divide-outline-variant/40 text-[1rem]">
            <div className="flex items-center justify-between py-2.5">
              <div>
                <span className="block font-semibold text-on-surface">
                  Base Fare ({selectedClass.code})
                </span>
                <span className="block text-[0.9rem] text-on-surface-variant">
                  Includes taxes where applicable
                </span>
              </div>
              <span className="font-bold text-on-surface">{formatINR(baseFare)}</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-semibold text-on-surface">Reservation Charge</span>
              <span className="font-bold text-on-surface">{formatINR(reservationCharge)}</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-semibold text-on-surface">Superfast Surcharge</span>
              <span className="font-bold text-on-surface">{formatINR(superfastCharge)}</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-semibold text-on-surface">IRCTC Convenience Fee</span>
              <span className="font-bold text-on-surface">{formatINR(irctcFee)}</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-semibold text-on-surface">Senior Lower Berth Priority</span>
              <span className="font-bold text-tertiary">₹0 (Free)</span>
            </div>
          </div>

          {/* High-Contrast Total Block */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-primary p-4 text-on-primary shadow-md">
            <div>
              <span className="block text-[0.95rem] font-bold tracking-wide uppercase">
                Total Amount to Pay
              </span>
              <span className="inline-flex items-center gap-1 text-[0.9rem] font-semibold text-inverse-on-surface">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  verified
                </span>
                Guaranteed Final Price
              </span>
            </div>
            <span className="text-[1.75rem] font-bold text-on-primary">
              {formatINR(selectedClass.price)}
            </span>
          </div>
        </section>

        {/* 3. Payment Method Selection (UPI, Debit, Credit, Net Banking) */}
        <section
          aria-labelledby="payment-method-heading"
          className="space-y-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-md"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-primary">
              <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                credit_card
              </span>
            </div>
            <div>
              <h2 id="payment-method-heading" className="text-[1.2rem] font-bold text-on-surface">
                How would you like to pay?
              </h2>
              <p className="text-[0.95rem] text-on-surface-variant">
                Select your preferred payment method (demo mode)
              </p>
            </div>
          </div>

          <div role="radiogroup" aria-label="Payment method" className="space-y-3">
            {/* Option 1: UPI */}
            <div
              className={`rounded-xl border-2 p-4 transition-all ${
                payment.method === 'upi'
                  ? 'border-primary bg-surface-container-high shadow-sm'
                  : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              <button
                type="button"
                role="radio"
                aria-checked={payment.method === 'upi'}
                onClick={() => setPayment((prev) => ({ ...prev, method: 'upi' }))}
                className="flex min-h-[48px] w-full items-center gap-3 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    payment.method === 'upi'
                      ? 'bg-primary text-on-primary'
                      : 'border-2 border-outline bg-surface-container-lowest text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </span>
                <div>
                  <span className="block text-[1.05rem] font-bold text-on-surface">
                    UPI (Instant &amp; Zero Surcharge)
                  </span>
                  <span className="block text-[0.9rem] text-on-surface-variant">
                    Google Pay, PhonePe, Paytm, BHIM UPI
                  </span>
                </div>
              </button>

              {payment.method === 'upi' && (
                <div className="mt-4 space-y-4 border-t border-outline-variant/60 pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {UPI_APPS.map((app) => {
                      const activeApp = payment.upiApp === app.id
                      return (
                        <button
                          key={app.id}
                          type="button"
                          aria-pressed={activeApp}
                          onClick={() =>
                            setPayment((prev) => ({
                              ...prev,
                              upiApp: app.id,
                              upiId: app.defaultVpa,
                            }))
                          }
                          className={`min-h-[48px] rounded-lg border-2 px-3 py-2 text-[0.95rem] font-bold transition-colors ${
                            activeApp
                              ? 'border-primary bg-surface-container-lowest text-primary shadow-xs'
                              : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary'
                          }`}
                        >
                          {app.label}
                        </button>
                      )
                    })}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="upi_id" className="block text-[1rem] font-bold text-on-surface">
                      Enter your UPI ID / VPA
                    </label>
                    <input
                      id="upi_id"
                      type="text"
                      value={payment.upiId}
                      onChange={(e) =>
                        setPayment((prev) => ({ ...prev, upiId: e.target.value }))
                      }
                      className="min-h-[54px] w-full rounded-lg border-2 border-outline-variant bg-surface-container-lowest px-4 text-[1rem] font-semibold text-on-surface focus:border-primary focus:outline-none"
                    />
                    <span className="inline-flex items-center gap-1 text-[0.9rem] font-bold text-tertiary">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        check_circle
                      </span>
                      Verified VPA • Collect request sent to your UPI app
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-expanded={showQr}
                    onClick={() => setShowQr((prev) => !prev)}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-[0.95rem] font-bold text-primary hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                      qr_code_scanner
                    </span>
                    <span>{showQr ? 'Hide BHIM UPI QR Code' : 'Show BHIM UPI QR Code'}</span>
                  </button>

                  {showQr && (
                    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-primary/50 bg-surface-container-lowest p-4 text-center">
                      <span className="text-[1rem] font-bold text-on-surface">
                        Scan to Pay {formatINR(selectedClass.price)}
                      </span>
                      <div className="rounded-xl border border-outline-variant bg-white p-3 shadow-xs">
                        <svg
                          aria-label={`QR Code to Pay ${formatINR(selectedClass.price)}`}
                          className="h-36 w-36"
                          fill="#141b2b"
                          viewBox="0 0 100 100"
                        >
                          <rect fill="#141b2b" height="28" rx="4" width="28" x="5" y="5" />
                          <rect fill="#ffffff" height="20" rx="2" width="20" x="9" y="9" />
                          <rect fill="#0037b0" height="12" rx="1" width="12" x="13" y="13" />
                          <rect fill="#141b2b" height="28" rx="4" width="28" x="67" y="5" />
                          <rect fill="#ffffff" height="20" rx="2" width="20" x="71" y="9" />
                          <rect fill="#0037b0" height="12" rx="1" width="12" x="75" y="13" />
                          <rect fill="#141b2b" height="28" rx="4" width="28" x="5" y="67" />
                          <rect fill="#ffffff" height="20" rx="2" width="20" x="9" y="71" />
                          <rect fill="#0037b0" height="12" rx="1" width="12" x="13" y="75" />
                          <rect height="8" width="8" x="38" y="8" />
                          <rect height="12" width="6" x="50" y="8" />
                          <rect height="6" width="12" x="38" y="20" />
                          <rect height="12" width="6" x="8" y="38" />
                          <rect height="6" width="12" x="20" y="38" />
                          <rect fill="#0037b0" height="22" width="22" x="39" y="39" />
                          <rect fill="#ffffff" height="10" width="10" x="45" y="45" />
                          <rect height="8" width="14" x="68" y="38" />
                          <rect height="12" width="10" x="68" y="50" />
                          <rect height="14" width="8" x="38" y="68" />
                          <rect height="10" width="18" x="48" y="82" />
                          <rect height="10" width="20" x="72" y="80" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Option 2: Debit Card */}
            <div
              className={`rounded-xl border-2 p-4 transition-all ${
                payment.method === 'debit'
                  ? 'border-primary bg-surface-container-high shadow-sm'
                  : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              <button
                type="button"
                role="radio"
                aria-checked={payment.method === 'debit'}
                onClick={() => setPayment((prev) => ({ ...prev, method: 'debit' }))}
                className="flex min-h-[48px] w-full items-center gap-3 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    payment.method === 'debit'
                      ? 'bg-primary text-on-primary'
                      : 'border-2 border-outline bg-surface-container-lowest text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </span>
                <div>
                  <span className="block text-[1.05rem] font-bold text-on-surface">
                    Debit Card (RuPay, Visa, Mastercard)
                  </span>
                  <span className="block text-[0.9rem] text-on-surface-variant">
                    Supports all domestic bank debit cards
                  </span>
                </div>
              </button>

              {payment.method === 'debit' && (
                <p className="mt-3 border-t border-outline-variant/60 pt-3 text-[0.95rem] text-on-surface-variant">
                  Demo mode: Tap Pay Now below to confirm without entering card numbers.
                </p>
              )}
            </div>

            {/* Option 3: Net Banking */}
            <div
              className={`rounded-xl border-2 p-4 transition-all ${
                payment.method === 'netbanking'
                  ? 'border-primary bg-surface-container-high shadow-sm'
                  : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              <button
                type="button"
                role="radio"
                aria-checked={payment.method === 'netbanking'}
                onClick={() => setPayment((prev) => ({ ...prev, method: 'netbanking' }))}
                className="flex min-h-[48px] w-full items-center gap-3 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    payment.method === 'netbanking'
                      ? 'bg-primary text-on-primary'
                      : 'border-2 border-outline bg-surface-container-lowest text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </span>
                <div>
                  <span className="block text-[1.05rem] font-bold text-on-surface">
                    Net Banking
                  </span>
                  <span className="block text-[0.9rem] text-on-surface-variant">
                    SBI, HDFC, ICICI, PNB, Axis and 50+ banks
                  </span>
                </div>
              </button>

              {payment.method === 'netbanking' && (
                <div className="mt-3 space-y-2 border-t border-outline-variant/60 pt-3">
                  <label htmlFor="bank_select" className="block text-[1rem] font-bold text-on-surface">
                    Select Your Bank
                  </label>
                  <select
                    id="bank_select"
                    value={payment.bank}
                    onChange={(e) => setPayment((prev) => ({ ...prev, bank: e.target.value }))}
                    className="min-h-[54px] w-full rounded-lg border-2 border-outline-variant bg-surface-container-lowest px-4 text-[1rem] font-semibold text-on-surface focus:border-primary focus:outline-none"
                  >
                    {BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Terms & Conditions InfoModal Card */}
        <section className="space-y-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-md">
          {termsError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border-2 border-error bg-error-container p-3.5 text-[0.95rem] font-bold text-on-error-container"
            >
              <span className="material-symbols-outlined shrink-0 text-[22px]" aria-hidden="true">
                error
              </span>
              <span>{termsError}</span>
            </div>
          )}

          <label className="flex min-h-[52px] cursor-pointer items-start gap-3.5 rounded-xl border border-outline-variant/60 bg-surface-container-low p-3.5">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked)
                if (e.target.checked) setTermsError('')
              }}
              className="mt-0.5 h-7 w-7 shrink-0 rounded accent-primary"
            />
            <span className="text-[1rem] font-semibold text-on-surface">
              I agree to the Indian Railways Passenger Rules &amp; Cancellation Policy in plain
              language.
            </span>
          </label>

          <div className="space-y-3 rounded-xl border border-outline-variant/50 bg-surface-container-low p-4">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-[22px] text-tertiary" aria-hidden="true">
                history
              </span>
              <p className="text-[0.95rem] font-semibold text-on-surface">
                Official IRCTC refund rules apply on online cancellation. Read a short plain
                summary anytime:
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTermsOpen(true)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-surface-container-lowest px-4 py-2.5 text-[1rem] font-bold text-primary hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                description
              </span>
              <span>Terms and conditions</span>
            </button>
          </div>
        </section>

        {/* 5. Big Accessible Green Pay Now CTA */}
        <section className="space-y-3">
          <button
            type="button"
            onClick={handlePayNow}
            className="flex min-h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-tertiary px-5 py-4 text-[1.15rem] font-bold text-on-tertiary shadow-[0_8px_24px_-4px_rgba(0,79,56,0.45)] transition-all hover:bg-tertiary-container active:scale-[0.98]"
          >
            <span className="material-symbols-outlined icon-filled text-[26px]" aria-hidden="true">
              lock
            </span>
            <span>Pay now • {formatINR(selectedClass.price)}</span>
          </button>

          <p className="text-center text-[0.95rem] font-semibold text-on-surface-variant">
            Prototype mode: No real card or bank charge is made.
          </p>
        </section>
      </div>

      {/* Reusable InfoModal for Terms and Conditions */}
      <InfoModal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        eyebrow={MODAL_CONTENT.terms.eyebrow}
        title={MODAL_CONTENT.terms.title}
        bannerTitle={MODAL_CONTENT.terms.bannerTitle}
        bannerText={MODAL_CONTENT.terms.bannerText}
        summaryItems={MODAL_CONTENT.terms.summaryItems}
        readMoreLabel={MODAL_CONTENT.terms.readMoreLabel}
        readMoreSections={MODAL_CONTENT.terms.readMoreSections}
        fullText={MODAL_CONTENT.terms.fullText}
      />
    </PageShell>
  )
}
