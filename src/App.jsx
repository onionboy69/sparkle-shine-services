import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa'
import HeroSection from './components/HeroSection'
import WhyChooseUs from './components/WhyChooseUs'
import HowWeWork from './components/HowWeWork'
import ServicesSection from './components/ServicesSection'
import StatsSection from './components/StatsSection'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import FAQSection from './components/FAQSection'
import TrustBadges from './components/TrustBadges'
import ContactSection from './components/ContactSection'
import BookingCalendar from './components/BookingCalendar'

function App() {
  const [showBooking, setShowBooking] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pricingRef = useRef(null)

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              StreetLab Cleaners
            </motion.div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#servicii" className="px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Servicii</a>
              <button onClick={scrollToPricing} className="px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Prețuri</button>
              <a href="#contact" className="px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Contact</a>
              <motion.a href="tel:+40720779009" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg flex items-center gap-2">
                <FaPhone /> Sună Acum
              </motion.a>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl text-gray-900 dark:text-white">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden pb-4 space-y-2">
              <a href="#servicii" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Servicii</a>
              <button onClick={() => { scrollToPricing(); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Prețuri</button>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Contact</a>
              <a href="tel:+40720779009" className="block px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg text-center"><FaPhone className="inline mr-2" /> Sună Acum</a>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <main className="pt-20">
        <HeroSection onOpenBooking={() => setShowBooking(true)} onScrollToPricing={scrollToPricing} />
        <WhyChooseUs />
        <HowWeWork />
        <div ref={pricingRef}><ServicesSection /></div>
        <StatsSection />
        <TestimonialsCarousel />
        <TrustBadges />
        <FAQSection />
        <ContactSection />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">StreetLab Cleaners</div>
          <p className="text-gray-400 mb-4">Curățenie profesională în Târgoviște și Dâmbovița</p>
          <div className="flex justify-center gap-6 text-gray-400">
            <a href="tel:+40720779009" className="hover:text-white transition-colors">+40 720 779 009</a>
            <span>|</span>
            <a href="mailto:contact@streetlabcleaners.ro" className="hover:text-white transition-colors">contact@streetlabcleaners.ro</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">© 2025 StreetLab Cleaners. Toate drepturile rezervate.</p>
        </div>
      </footer>

      {showBooking && <BookingCalendar onClose={() => setShowBooking(false)} />}
      
      {/* Sticky Mobile WhatsApp CTA */}
      <motion.a
        href="https://wa.me/40720779009"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed bottom-5 right-5 z-50 w-14 h-14 bg-gradient-to-r from-green to-green-light text-white rounded-full shadow-2xl flex items-center justify-center"
        style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.8)' }}
      >
        <FaPhone className="text-2xl" />
      </motion.a>
    </div>
  )
}

export default App
