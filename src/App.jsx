import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import HelpButton from './components/HelpButton'
import Search from './pages/Search'
import Trains from './pages/Trains'
import Passenger from './pages/Passenger'
import Confirm from './pages/Confirm'
import Success from './pages/Success'
import AidStatus from './pages/AidStatus'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-200">
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/passenger" element={<Passenger />} />
            <Route path="/pay" element={<Confirm />} />
            <Route path="/success" element={<Success />} />
            <Route path="/aid" element={<AidStatus />} />
            <Route path="*" element={<Navigate to="/search" replace />} />
          </Routes>
          <HelpButton />
        </div>
      </BrowserRouter>
    </BookingProvider>
  )
}

