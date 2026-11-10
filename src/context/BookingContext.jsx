import { createContext, useContext, useEffect, useState } from 'react'
import { TRAINS } from '../data/mock'

const BookingContext = createContext(null)

export const FONT_SIZES = [18, 20, 22]

export function BookingProvider({ children }) {
  const [modalMode, setModalMode] = useState('after') // 'before' | 'after'
  const [fontSize, setFontSize] = useState(18)
  const [language, setLanguage] = useState('EN') // visual toggle only ('EN' | 'HI')

  const [search, setSearch] = useState({
    from: 'Bengaluru City Jn (SBC)',
    to: 'New Delhi (NDLS)',
    date: '2026-11-12',
    quota: 'SS',
    travelClassFilter: 'ALL',
    seniorQuotaApplied: true,
  })

  const [selectedTrainId, setSelectedTrainId] = useState(TRAINS[0].id)
  const [selectedClassCode, setSelectedClassCode] = useState(TRAINS[0].defaultClass)

  const [passenger, setPassenger] = useState({
    name: '',
    age: '',
    gender: 'Female',
    mobile: '98450 12345',
    email: 'debopriya.sen@example.com',
    berthPreference: 'Lower Berth',
    confirmedOnly: true,
    autoUpgrade: true,
    sahayakAssist: true,
  })

  const [payment, setPayment] = useState({
    method: 'upi',
    upiApp: 'GPay',
    upiId: 'debopriya@oksbi',
    bank: 'State Bank of India (SBI)',
  })

  const [bookingResult, setBookingResult] = useState(null)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  const increaseFontSize = () => {
    setFontSize((prev) => {
      const idx = FONT_SIZES.indexOf(prev)
      if (idx === -1 || idx === FONT_SIZES.length - 1) return FONT_SIZES[FONT_SIZES.length - 1]
      return FONT_SIZES[idx + 1]
    })
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => {
      const idx = FONT_SIZES.indexOf(prev)
      if (idx <= 0) return FONT_SIZES[0]
      return FONT_SIZES[idx - 1]
    })
  }

  const selectedTrain = TRAINS.find((t) => t.id === selectedTrainId) || TRAINS[0]
  const selectedClass =
    selectedTrain.classes.find((c) => c.code === selectedClassCode) || selectedTrain.classes[0]

  const selectTrain = (train, classCode) => {
    setSelectedTrainId(train.id)
    setSelectedClassCode(classCode || train.defaultClass || train.classes[0].code)
  }

  const completePayment = () => {
    const eightDigits = Math.floor(10000000 + Math.random() * 90000000)
    const rawPnr = `45${eightDigits}` // 10-digit PNR
    const formattedPnr = `${rawPnr.slice(0, 4)} ${rawPnr.slice(4, 7)} ${rawPnr.slice(7)}`
    const berthNum = Math.floor(10 + Math.random() * 55)
    const coach =
      selectedClass.code === 'SL'
        ? 'S4'
        : selectedClass.code === 'CC' || selectedClass.code === '2S'
          ? 'C2'
          : selectedClass.code === '2A'
            ? 'A1'
            : selectedClass.code === '1A'
              ? 'H1'
              : 'B2'

    const methodLabel =
      payment.method === 'upi'
        ? `UPI (${payment.upiApp})`
        : payment.method === 'debit'
          ? 'Debit Card'
          : payment.method === 'credit'
            ? 'Credit Card'
            : `Net Banking (${payment.bank})`

    const result = {
      pnr: formattedPnr,
      rawPnr,
      coachSeat: `Coach ${coach} • Berth ${berthNum} (${passenger.berthPreference}, Non-Ladder Access)`,
      bookedAt: '10-11-2026',
      transactionId: `IR${Math.floor(100000000 + Math.random() * 900000000)}`,
      paymentMethodLabel: methodLabel,
      search: { ...search },
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
    setBookingResult(result)
    return result
  }

  const resetBooking = () => {
    setBookingResult(null)
    setPassenger((prev) => ({
      ...prev,
      name: '',
      age: '',
      gender: 'Female',
    }))
  }

  return (
    <BookingContext.Provider
      value={{
        modalMode,
        setModalMode,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        canIncreaseFont: fontSize < FONT_SIZES[FONT_SIZES.length - 1],
        canDecreaseFont: fontSize > FONT_SIZES[0],
        language,
        setLanguage,
        search,
        setSearch,
        selectedTrain,
        selectedClass,
        setSelectedClassCode,
        selectTrain,
        passenger,
        setPassenger,
        payment,
        setPayment,
        bookingResult,
        completePayment,
        resetBooking,
        helpOpen,
        setHelpOpen,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return ctx
}
