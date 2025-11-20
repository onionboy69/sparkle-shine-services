import { useState } from 'react'
import Calendar from 'react-calendar'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCheckCircle, FaArrowRight, FaArrowLeft, FaClock,
  FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa'
import { GiSofa, GiBed, GiCarSeat, GiVacuumCleaner } from 'react-icons/gi'
import { MdCleaningServices } from 'react-icons/md'

const SERVICES = [
  { id: 'canapea-2L', name: 'Canapea 2 locuri', duration: 45, price: '140-170', icon: <GiSofa /> },
  { id: 'canapea-3L', name: 'Canapea 3 locuri', duration: 60, price: '200-250', icon: <GiSofa /> },
  { id: 'saltea-single', name: 'Saltea single', duration: 45, price: '130-170', icon: <GiBed /> },
  { id: 'saltea-matrimon', name: 'Saltea matrimonială', duration: 60, price: '170-230', icon: <GiBed /> },
  { id: 'auto-interior', name: 'Interior Auto Complet', duration: 120, price: '350-500', icon: <GiCarSeat /> },
  { id: 'calorifere', name: 'Calorifere (4 buc)', duration: 30, price: '100-160', icon: <GiVacuumCleaner /> },
  { id: 'baie', name: 'Igienizare Baie', duration: 90, price: '150-250', icon: <MdCleaningServices /> },
]

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

// Mock occupied slots - in real app, fetch from API
const MOCK_OCCUPIED = {
  '2025-11-25': ['09:00', '10:00', '14:00'],
  '2025-11-26': ['11:00', '15:00', '16:00'],
}

export default function BookingCalendar({ onClose }) {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [location, setLocation] = useState('')

  const totalDuration = selectedServices.reduce((sum, id) => {
    const service = SERVICES.find(s => s.id === id)
    return sum + (service?.duration || 0)
  }, 0)

  const estimatedCost = selectedServices.reduce((sum, id) => {
    const service = SERVICES.find(s => s.id === id)
    const avgPrice = service ? parseInt(service.price.split('-')[0]) : 0
    return sum + avgPrice
  }, 0)

  const formatDuration = (mins) => {
    const hours = Math.floor(mins / 60)
    const minutes = mins % 60
    return hours > 0 ? `${hours}h ${minutes > 0 ? minutes + 'min' : ''}` : `${minutes}min`
  }

  const toggleService = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const getDateKey = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getAvailability = (date) => {
    const dateKey = getDateKey(date)
    const occupied = MOCK_OCCUPIED[dateKey] || []
    const availableSlots = TIME_SLOTS.length - occupied.length
    
    if (availableSlots === 0) return 'occupied'
    if (availableSlots <= 2) return 'limited'
    return 'available'
  }

  const tileClassName = ({ date }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (date < today) return 'calendar-disabled'
    const availability = getAvailability(date)
    return `calendar-${availability}`
  }

  const tileDisabled = ({ date }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isTimeSlotAvailable = (time) => {
    if (!selectedDate) return false
    const dateKey = getDateKey(selectedDate)
    const occupied = MOCK_OCCUPIED[dateKey] || []
    
    const timeIndex = TIME_SLOTS.indexOf(time)
    const slotsNeeded = Math.ceil(totalDuration / 60)
    
    for (let i = 0; i < slotsNeeded; i++) {
      const checkTime = TIME_SLOTS[timeIndex + i]
      if (!checkTime || occupied.includes(checkTime)) return false
    }
    return true
  }

  const handleConfirm = () => {
    const booking = {
      services: selectedServices.map(id => SERVICES.find(s => s.id === id).name),
      date: selectedDate.toLocaleDateString('ro-RO'),
      time: selectedTime,
      duration: formatDuration(totalDuration),
      estimatedCost: `~${estimatedCost} lei`,
      location
    }
    
    const whatsappNumber = '+40123456789'
    const message = `Programare Nouă:\nServicii: ${booking.services.join(', ')}\nData: ${booking.date}\nOra: ${booking.time}\nDurata: ${booking.duration}\nCost estimat: ${booking.estimatedCost}\nLocație: ${booking.location}`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h2 className="text-xl font-bold text-dark">Programare Online</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>

        {/* Main Content - Two Columns */}
        <div className="flex flex-col md:flex-row max-h-[calc(90vh-80px)]">
          {/* Left Panel - Service Selection */}
          <div className="w-full md:w-2/5 border-r p-6 bg-white overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-dark">Selectează Serviciile</h3>
            <div className="space-y-3">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl mt-1 ${selectedServices.includes(service.id) ? 'text-blue-600' : 'text-gray-400'}`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-dark">{service.name}</h4>
                      <p className="text-sm text-gray-600">
                        {service.duration} min • {service.price} lei
                      </p>
                    </div>
                    {selectedServices.includes(service.id) && (
                      <FaCheckCircle className="text-blue-600 text-lg mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-dark">
                  Total estimat: {formatDuration(totalDuration)} | ~{estimatedCost} lei
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Calendar & Details */}
          <div className="w-full md:w-3/5 p-6 bg-gray-50 overflow-y-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <h3 className="text-2xl font-bold text-dark mb-4">Curățenie & Igienizare Profesională</h3>
                  <p className="text-gray-600 mb-3">De la Murdar la Impecabil în 2-3 Ore ✨</p>
                  <p className="text-gray-500 text-sm mb-6">
                    Canapele • Saltele • Scaune • Auto • Calorifere • Spații comerciale
                  </p>
                  <p className="text-gray-600 mb-6">
                    Specialiști în curățenie cu echipamente profesionale Kärcher. Servicii rapide, eficiente și cu parfum inclus. Rezultate vizibile, clienți mulțumiți, garanție 100%.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-8">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">🎯</span>
                      <span>Alege Servicii & Programează Instant</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">⏱️ Răspuns &lt;30 min</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">🚗 Deplasare Inclusă</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">✓ 100% Satisfacție Garantată</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">🛡️ Asigurare RCA</span>
                  </div>
                  <button
                    onClick={() => selectedServices.length > 0 && setStep(2)}
                    disabled={selectedServices.length === 0}
                    className="mt-8 px-8 py-3 gradient-orange text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                  >
                    Continuă <FaArrowRight />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-dark">Alege Data</h3>
                  <div className="bg-white p-4 rounded-xl border shadow-sm">
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      minDate={new Date()}
                      tileClassName={tileClassName}
                      tileDisabled={tileDisabled}
                      locale="ro-RO"
                      className="border-0"
                    />
                  </div>

                  <div className="mt-4 flex gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-200 border border-green-500 rounded"></div>
                      <span>Disponibil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-200 border border-orange-500 rounded"></div>
                      <span>Limitat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-200 border border-red-500 rounded"></div>
                      <span>Ocupat</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-dark py-2 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Înapoi
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate}
                      className="flex-1 gradient-orange text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      Continuă
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-bold mb-2 text-dark">Selectează Ora</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Data: <strong>{selectedDate?.toLocaleDateString('ro-RO')}</strong> • Durata: <strong>{formatDuration(totalDuration)}</strong>
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {TIME_SLOTS.map((time) => {
                      const available = isTimeSlotAvailable(time)
                      return (
                        <button
                          key={time}
                          onClick={() => available && setSelectedTime(time)}
                          disabled={!available}
                          className={`p-2 rounded-lg text-sm font-semibold transition-all ${
                            selectedTime === time
                              ? 'bg-green-500 text-white'
                              : available
                              ? 'bg-green-50 border border-green-200 text-dark hover:bg-green-100'
                              : 'bg-red-50 border border-red-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-gray-300 text-dark py-2 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Înapoi
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={!selectedTime}
                      className="flex-1 gradient-orange text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      Continuă
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-dark">Confirmare</h3>
                  
                  <div className="bg-white p-4 rounded-lg mb-4 space-y-2 border">
                    <div>
                      <p className="text-xs text-gray-600">Servicii:</p>
                      <p className="font-semibold text-sm text-dark">
                        {selectedServices.map(id => SERVICES.find(s => s.id === id).name).join(', ')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Data:</p>
                        <p className="font-semibold text-sm text-dark">{selectedDate?.toLocaleDateString('ro-RO')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Ora:</p>
                        <p className="font-semibold text-sm text-dark">{selectedTime}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Durata:</p>
                        <p className="font-semibold text-sm text-dark">{formatDuration(totalDuration)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Cost Estimat:</p>
                        <p className="font-semibold text-sm text-orange">~{estimatedCost} lei</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Locație / Zonă
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-sm"
                    >
                      <option value="">Selectează zona</option>
                      <option value="Târgoviște Centru">Târgoviște Centru</option>
                      <option value="Micro 3">Micro 3</option>
                      <option value="Micro 11">Micro 11</option>
                      <option value="Valea Voievozilor">Valea Voievozilor</option>
                      <option value="Altă zonă">Altă zonă în Târgoviște</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 border-2 border-gray-300 text-dark py-2 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Înapoi
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={!location}
                      className="flex-1 gradient-orange text-white py-3 rounded-lg font-bold disabled:opacity-50"
                    >
                      Confirmă Programarea
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
