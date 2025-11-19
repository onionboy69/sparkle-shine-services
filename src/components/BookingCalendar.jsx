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
    if (date < new Date().setHours(0,0,0,0)) return null
    const availability = getAvailability(date)
    return `calendar-${availability}`
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-100"
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-dark">Programare Online</h2>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full flex-1 transition-all ${
                    s <= step ? 'bg-secondary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-dark text-2xl">&times;</button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-4">Selectează Serviciile</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {SERVICES.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? 'border-secondary bg-green-50'
                          : 'border-gray-200 hover:border-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-3xl ${selectedServices.includes(service.id) ? 'text-secondary' : 'text-gray-400'}`}>
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-dark">{service.name}</h4>
                          <p className="text-sm text-gray-600">
                            {service.duration} min • {service.price} lei
                          </p>
                        </div>
                        {selectedServices.includes(service.id) && (
                          <FaCheckCircle className="text-secondary text-xl" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedServices.length > 0 && (
                  <div className="bg-green-100 border-2 border-green-300 p-4 rounded-xl mb-4">
                    <p className="text-lg font-semibold text-dark">
                      Estimat: {formatDuration(totalDuration)} | Total: ~{estimatedCost} lei
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={selectedServices.length === 0}
                  className="w-full gradient-orange text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:animate-glow-orange transition"
                >
                  Continuă <FaArrowRight />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-4">Alege Data</h3>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  minDate={new Date()}
                  tileClassName={tileClassName}
                  locale="ro-RO"
                />

                <div className="mt-4 flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 border-2 border-green-500 rounded"></div>
                    <span>Disponibil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-200 border-2 border-orange-500 rounded"></div>
                    <span>Limitat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 border-2 border-red-500 rounded"></div>
                    <span>Ocupat</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-dark py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft /> Înapoi
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate}
                    className="flex-1 gradient-orange text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuă <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-4">Selectează Ora</h3>
                <p className="text-gray-600 mb-4">
                  Data: <strong>{selectedDate?.toLocaleDateString('ro-RO')}</strong> • Durata: <strong>{formatDuration(totalDuration)}</strong>
                </p>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                  {TIME_SLOTS.map((time, idx) => {
                    const available = isTimeSlotAvailable(time)
                    return (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => available && setSelectedTime(time)}
                        disabled={!available}
                        className={`p-3 rounded-xl font-semibold transition-all ${
                          selectedTime === time
                            ? 'bg-secondary text-white shadow-lg scale-105'
                            : available
                            ? 'bg-green-50 border-2 border-green-200 text-dark hover:border-secondary'
                            : 'bg-red-50 border-2 border-red-200 text-gray-400 cursor-not-allowed opacity-50'
                        } ${!available ? 'animate-pulse-red' : ''}`}
                      >
                        <FaClock className="inline mr-1" />
                        {time}
                      </motion.button>
                    )
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 text-dark py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft /> Înapoi
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!selectedTime}
                    className="flex-1 gradient-orange text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuă <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-4">Confirmare</h3>
                
                <div className="bg-accent p-6 rounded-xl mb-6 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Servicii Selectate:</p>
                    <p className="font-semibold text-dark">
                      {selectedServices.map(id => SERVICES.find(s => s.id === id).name).join(', ')}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaCalendarAlt /> Data:
                      </p>
                      <p className="font-semibold text-dark">{selectedDate?.toLocaleDateString('ro-RO')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaClock /> Ora:
                      </p>
                      <p className="font-semibold text-dark">{selectedTime}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Durata:</p>
                      <p className="font-semibold text-dark">{formatDuration(totalDuration)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost Estimat:</p>
                      <p className="font-semibold text-secondary">~{estimatedCost} lei</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt /> Locație / Zonă
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-secondary focus:outline-none"
                    required
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
                    className="flex-1 border-2 border-gray-300 text-dark py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft /> Înapoi
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!location}
                    className="flex-1 gradient-orange text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-glow-orange"
                  >
                    <FaCheckCircle /> Confirmare Programare
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
