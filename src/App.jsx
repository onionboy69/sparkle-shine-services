import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FaCheckCircle, FaSprayCan, FaCouch, FaCar, FaHome, 
  FaWhatsapp, FaPhone, FaEnvelope, FaStar, FaShieldAlt,
  FaClock, FaMoneyBillWave, FaUsers, FaAward, FaMedal,
  FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight,
  FaCalendarAlt
} from 'react-icons/fa'
import { GiVacuumCleaner, GiSofa, GiBed, GiCarSeat } from 'react-icons/gi'
import { MdCleaningServices, MdOutlineLocalOffer } from 'react-icons/md'
import BookingCalendar from './components/BookingCalendar'

function FloatingBubbles() {
  const bubbles = [
    { size: 60, left: '10%', delay: 0 },
    { size: 40, left: '70%', delay: 2 },
    { size: 80, left: '40%', delay: 4 },
    { size: 50, left: '85%', delay: 1 },
    { size: 70, left: '25%', delay: 3 },
  ]

  return (
    <>
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="floating-bubble animate-float"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: `${20 + i * 15}%`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </>
  )
}

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      let startTime
      let animationFrame

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = (currentTime - startTime) / duration

        if (progress < 1) {
          setCount(Math.floor(end * progress))
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, end, duration, hasAnimated])

  return <span ref={ref}>{count}+</span>
}

function App() {
  const [activeFAQ, setActiveFAQ] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const testimonials = [
    {
      name: "Maria P.",
      location: "Târgoviște",
      service: "Igienizare Saltea",
      text: "Am avut saltea murdară și cu miros neplăcut de la animale. După StreetLab Cleaners, arată ca nouă! Echipa a fost foarte profesionistă, procesul transparent, iar rezultatul excepțional. Mi-au explicat pas cu pas ce fac. Recomand cu încredere și voi da referral la prieteni pentru reducerea de 20%!",
      rating: 5
    },
    {
      name: "Ion M.",
      location: "Dâmbovița",
      service: "Detailing Auto Complet",
      text: "Mașina mea avea interior foarte murdar după 3 ani de utilizare intensă. Au făcut o treabă impecabilă - tapițerie, plafon, plastice, totul arată ca nou! Ozonarea a eliminat complet mirosul de țigară. Prețul corect, echipament profesional Kärcher. Merită fiecare leu! Mulțumesc echipei!",
      rating: 5
    },
    {
      name: "Elena S.",
      location: "Târgoviște Centru",
      service: "Pachet Living Curat",
      text: "Am ales pachetul combo pentru living - canapea, fotolii, scaune și calorifere. Economie de 80 lei față de prețul individual! Rezultate vizibile imediat, parfum plăcut în toată casa. Echipa punctuală, profesionistă, curată după ei. Am recomandat deja la 2 vecine și aștept reducerea mea de referral!",
      rating: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappNumber = '+40123456789' // Replace with your actual number
    const message = `Bună ziua! Nume: ${formData.name}, Telefon: ${formData.phone}, Serviciu: ${formData.service}, Mesaj: ${formData.message}`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full z-50 py-4 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-3xl font-bold text-gradient bg-white dark:bg-gray-800 px-8 py-4 rounded-full shadow-lg">
            StreetLab Cleaners
          </div>
          <div className="hidden md:flex gap-2">
            <a href="#servicii" className="text-dark dark:text-gray-200 hover:text-primary dark:hover:text-primary transition bg-white dark:bg-gray-800 px-5 py-3 rounded-full shadow-md hover:shadow-lg font-medium">Servicii</a>
            <a href="#preturi" className="text-dark dark:text-gray-200 hover:text-primary dark:hover:text-primary transition bg-white dark:bg-gray-800 px-5 py-3 rounded-full shadow-md hover:shadow-lg font-medium">Prețuri</a>
            <a href="#despre" className="text-dark dark:text-gray-200 hover:text-primary dark:hover:text-primary transition bg-white dark:bg-gray-800 px-5 py-3 rounded-full shadow-md hover:shadow-lg font-medium">Despre Noi</a>
            <a href="#contact" className="text-dark dark:text-gray-200 hover:text-primary dark:hover:text-primary transition bg-white dark:bg-gray-800 px-5 py-3 rounded-full shadow-md hover:shadow-lg font-medium">Contact</a>
          </div>
          <a 
            href="tel:+40123456789" 
            className="bg-gradient-to-r from-orange to-primary text-white px-8 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg"
          >
            <FaPhone className="animate-pulse" /> Sună Acum
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollY / 500),
          filter: `blur(${Math.min(scrollY / 100, 10)}px)`,
          transform: `translateY(-${scrollY * 0.5}px)`
        }}
      >
        <FloatingBubbles />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-700 dark:text-gray-200"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight fade-in-stagger text-dark dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Curățenie & Igienizare <span className="text-gradient drop-shadow-lg">Profesionistă</span>
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 text-orange-500 fade-in-stagger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                De la Murdar la Impecabil în 2-3 Ore ✨
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-700 dark:text-gray-300 mb-4 fade-in-stagger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Canapele • Saltele • Scaune • Auto • Calorifere • Spații comerciale
              </motion.p>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed fade-in-stagger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Specialiști în curățenie cu echipamente profesionale Kärcher. Servicii rapide, eficiente și cu parfum inclus. 
                Rezultate vizibile, clienți mulțumiți, garanție 100%.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8 fade-in-stagger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  onClick={() => setShowBooking(true)}
                  className="gradient-orange text-white px-8 py-4 rounded-full hover:shadow-2xl transition animate-glow-orange flex items-center gap-2 font-bold text-lg"
                >
                  <FaCalendarAlt size={20} /> Alege Servicii & Programează Instant
                </button>
                  <a 
                  href="#contact" 
                  className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-dark dark:text-gray-200 px-8 py-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-primary transition font-semibold"
                >
                  <FaWhatsapp className="inline mr-2" /> Cere Ofertă Gratuită
                </a>
              </motion.div>
              <motion.div 
                className="flex flex-wrap gap-6 text-sm text-gray-600 fade-in-stagger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="flex items-center gap-2">⚡ Răspuns &lt;30 min</span>
                <span className="flex items-center gap-2">📍 Deplasare Inclusă</span>
                <span className="flex items-center gap-2">✓ 100% Satisfacție Garantată</span>
                <span className="flex items-center gap-2">🔒 Asigurare RCA</span>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" 
                  alt="Professional Cleaning" 
                  className="w-full h-[500px] object-cover animate-scale-up"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* SVG Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Booking Calendar Modal */}
      {showBooking && <BookingCalendar onClose={() => setShowBooking(false)} />}

      {/* De ce noi? Section */}
      <section id="despre" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">De ce să ne alegi pe noi?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Expertiză, profesionalism și rezultate garantate</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <GiVacuumCleaner className="text-5xl text-primary" />,
                title: "Echipament Profesional Kärcher",
                description: "Doar aparate de ultimă generație. Rezultate vizibile și durabile."
              },
              {
                icon: <FaStar className="text-5xl text-secondary" />,
                title: "Rezultate + Parfum Inclus",
                description: "Rezultate imediate + miros plăcut la final, pentru un spațiu proaspăt."
              },
              {
                icon: <FaMoneyBillWave className="text-5xl text-primary" />,
                title: "Prețuri Transparente & Clare",
                description: "Tarife clare, deplasare inclusă în zona Târgoviște + limitrofe. Fără costuri ascunse."
              },
              {
                icon: <MdCleaningServices className="text-5xl text-secondary" />,
                title: "Servicii Complete – Un singur contact",
                description: "Textile, auto, suprafețe dure, spații comerciale – orice nevoie de curățare în ONE call."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-accent to-white p-8 rounded-xl hover-lift text-center group overflow-hidden relative border border-gray-100 hover:border-secondary transition-all duration-300"
              >
                <div className="mb-4 inline-block group-hover:animate-rotate-360 transition-transform duration-600">{item.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-3 relative">
                  {item.title}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"></div>
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cum Lucrăm Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Cum Lucrăm?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Proces simplu și transparent în 4 pași</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Contactare",
                description: "Sună-ne pe WhatsApp/Telefon sau completează formularul online. Răspunsuri în <30 min. Disponibil 09:00-20:00, luni-sâmbătă.",
                icon: <FaPhone />
              },
              {
                step: "2",
                title: "Evaluare",
                description: "Venim la fața locului, evaluăm situația, estimăm durata și costul final. Ofertă gratuită, fără angajament.",
                icon: <FaCheckCircle />
              },
              {
                step: "3",
                title: "Curățare",
                description: "Executăm serviciul cu echipament profesional Kärcher. Proces transparent – poți urmări lucrarea.",
                icon: <FaSprayCan />
              },
              {
                step: "4",
                title: "Finalizare",
                description: "Verificare finală + client confirmat. Satisfact? Recomandări pentru menținere. Ofertă -20% pentru referral (2 prieteni).",
                icon: <FaAward />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover-lift group">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-orange to-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                      initial={{ opacity: 0, rotateY: -90 }}
                      whileInView={{ opacity: 1, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    >
                      {item.step}
                    </motion.div>
                    <div className="text-3xl text-orange group-hover:animate-bounce-subtle">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 3 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange to-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  ></motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicii Section */}
      <section id="servicii" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Serviciile Noastre</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Soluții complete de curățenie profesională</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <GiSofa className="text-6xl text-primary" />,
                title: "Curățare Canapele & Fotolii",
                description: "Curățare profundă cu echipament Kärcher. Eliminăm pete, miros și bacterii.",
                features: ["Canapele 2-3 locuri", "Colțare", "Fotolii"]
              },
              {
                icon: <GiBed className="text-6xl text-secondary" />,
                title: "Igienizare Saltele",
                description: "Elimină acarieni, alergeni și bacterii. Somn sănătos garantat.",
                features: ["Saltele single/matrimoniale", "Perne", "Anti-acarieni UV"]
              },
              {
                icon: <GiCarSeat className="text-6xl text-primary" />,
                title: "Detailing Auto Interior",
                description: "Interior auto impecabil. Tapițerie, plafon, plastice, covorașe.",
                features: ["Curățare completă", "Ozonare", "Protecție hidrofobă"]
              },
              {
                icon: <FaHome className="text-6xl text-secondary" />,
                title: "Curățare cu Abur",
                description: "Dezinfectare și igienizare fără chimicale. Ecologic și eficient.",
                features: ["Baie și bucătărie", "Calorifere", "Gresie/faianță"]
              },
              {
                icon: <MdCleaningServices className="text-6xl text-primary" />,
                title: "Spații Comerciale",
                description: "Soluții pentru birouri, restaurante, hoteluri, magazine.",
                features: ["Curățenie generală", "Igienizare profesională", "Contract mentenanță"]
              },
              {
                icon: <FaShieldAlt className="text-6xl text-secondary" />,
                title: "Servicii Suplimentare",
                description: "Completează curățarea cu servicii premium.",
                features: ["Ozonare", "Tratament anti-miros", "Lampă UV"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-accent to-white p-8 rounded-xl shadow-lg hover-lift border border-gray-100 hover:border-orange group transition-all duration-300"
              >
                <div className="mb-4 inline-block group-hover:animate-rotate-360">{service.icon}</div>
                <h3 className="text-2xl font-bold text-dark mb-3 relative">
                  {service.title}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange to-primary w-0 group-hover:w-full transition-all duration-500"></div>
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <FaCheckCircle className="text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prețuri Section */}
      <section id="preturi" className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">Prețuri & Pachete</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Tarife transparente, fără costuri ascunse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Textile & Tapițerii */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg relative"
            >
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <GiSofa /> Textile & Tapițerii
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span>Canapea 2 locuri</span>
                  <span className="font-semibold">140-170 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Canapea 3 locuri</span>
                  <span className="font-semibold">200-250 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Colțar (4-6 locuri)</span>
                  <span className="font-semibold">300-450 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Saltea single</span>
                  <span className="font-semibold">130-170 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Saltea matrimonială</span>
                  <span className="font-semibold">170-230 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Fotoliu</span>
                  <span className="font-semibold">50-80 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Scaun tapițat</span>
                  <span className="font-semibold">25-30 lei/buc</span>
                </li>
                <li className="flex justify-between">
                  <span>Interior auto complet</span>
                  <span className="font-semibold">350-500 lei</span>
                </li>
              </ul>
            </motion.div>

            {/* Servicii cu Abur */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                <FaSprayCan /> Servicii cu Abur
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span>Calorifere</span>
                  <span className="font-semibold">25-40 lei/buc</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Baie (igienizare)</span>
                  <span className="font-semibold">150-250 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Bucătărie (igienizare)</span>
                  <span className="font-semibold">200-300 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Gresie/faianță</span>
                  <span className="font-semibold">12-18 lei/mp</span>
                </li>
              </ul>
              <h3 className="text-2xl font-bold text-primary mb-6 mt-8 flex items-center gap-2">
                <MdOutlineLocalOffer /> Servicii Suplimentare
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span>Tratament anti-miros</span>
                  <span className="font-semibold">50-80 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Protecție hidrofobă</span>
                  <span className="font-semibold">120-200 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Ozonare auto</span>
                  <span className="font-semibold">100-150 lei</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Ozonare cameră</span>
                  <span className="font-semibold">150-250 lei</span>
                </li>
                <li className="flex justify-between">
                  <span>Lampă UV anti-acarieni</span>
                  <span className="font-semibold">40-70 lei</span>
                </li>
              </ul>
            </motion.div>

            {/* Pachete COMBO */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-xl shadow-lg relative"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaMedal /> PACHETE COMBO
                <span className="text-sm bg-white text-primary px-3 py-1 rounded-full ml-auto">Economie 50-100 lei</span>
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                  <h4 className="font-bold text-lg mb-2">Pachet "Living Curat"</h4>
                  <p className="text-sm mb-2 opacity-90">Canapea 3L + 2 fotolii + 4 scaune + covor mic + calorifer</p>
                  <p className="text-2xl font-bold">370-470 lei</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                  <h4 className="font-bold text-lg mb-2">Pachet "Dormitor Fresh"</h4>
                  <p className="text-sm mb-2 opacity-90">Saltea matrimon. + 2 perne + covor + abur zonă pat</p>
                  <p className="text-2xl font-bold">270-350 lei</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                  <h4 className="font-bold text-lg mb-2">Pachet "Mașină ca Nouă"</h4>
                  <p className="text-sm mb-2 opacity-90">Interior auto complet + plafon + plastice șterse</p>
                  <p className="text-2xl font-bold">370-500 lei</p>
                  <p className="text-sm mt-2 opacity-90">+ ozonare: +120 lei | + protecție: +150 lei</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-gray-700"><strong>Zona Deservită:</strong> Operăm în Târgoviște, Dâmbovița și zone limitrofe (rază 30km). <span className="text-primary font-semibold">Deplasare INCLUSĂ în preț.</span> Pentru zone mai îndepărtate: contactați pentru supliment mic.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Rezultate în Numere</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 500, label: "Clienți Satisfăcuți", suffix: "", icon: <FaUsers /> },
              { number: 10000, label: "Ore de Serviciu Profesional", suffix: "", icon: <FaClock /> },
              { number: 98, label: "Rating Mediu Google ⭐⭐⭐⭐⭐", suffix: "%", icon: <FaStar /> },
              { number: 30, label: "Zone Deservite în Dâmbovița", suffix: "", icon: <FaHome /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-accent to-white rounded-xl shadow-lg hover-lift"
              >
                <div className="text-5xl text-primary mb-4">{stat.icon}</div>
                <div className="text-5xl font-bold text-gradient mb-2">
                  <AnimatedCounter end={stat.number} />{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Ce Spun Clienții Noștri</h2>
            <p className="text-gray-600">Feedback real de la clienți mulțumiți</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-xl shadow-2xl hover-lift mx-4"
              >
                <div className="flex mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-2xl" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">"{testimonials[currentTestimonial].text}"</p>
                <div className="border-t pt-6">
                  <p className="font-bold text-dark text-xl">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">din {testimonials[currentTestimonial].location}</p>
                  <p className="text-primary font-semibold mt-2">Serviciu: {testimonials[currentTestimonial].service}</p>
                </div>
              </motion.div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition z-10"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition z-10"
              aria-label="Next testimonial"
            >
              <FaChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentTestimonial ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Garantii Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Garanție & Siguranță</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Satisfacție 100% Garantată",
                description: "Dacă nu ești mulțumit, TE RE-CURĂȚĂM GRATUIT"
              },
              {
                icon: <FaMoneyBillWave className="text-4xl" />,
                title: "Prețuri Blocate",
                description: "Nicio majorare surpriză - prețul ofertat = prețul final"
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Asigurare RCA",
                description: "Asigurare responsabilitate civilă - nicio grijă"
              },
              {
                icon: <MdCleaningServices className="text-4xl" />,
                title: "Dezinfectare Completă",
                description: "Ozon + UV la cerere pentru igienizare maximă"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-accent to-white p-6 rounded-xl shadow-lg text-center hover-lift"
              >
                <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                <div className="flex items-start gap-2 mb-2 justify-center">
                  <FaCheckCircle className="text-secondary mt-1 flex-shrink-0" />
                  <h3 className="font-bold text-dark">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Întrebări Frecvente</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Ce echipamente folosiți?",
                a: "Folosim exclusiv echipamente profesionale Kärcher de ultimă generație, recunoscute la nivel mondial pentru eficiență și durabilitate. Aparatele noastre asigură curățare profundă și rezultate superioare."
              },
              {
                q: "Cât timp durează uscarea după curățare?",
                a: "În funcție de materialul curățat și condițiile de ventilare, uscarea durează între 2-6 ore. Recomandăm aerisirea spațiului pentru rezultate optime. Pentru saltele și canapele, se pot folosi după 4-6 ore."
              },
              {
                q: "Oferiți reduceri pentru abonamente?",
                a: "Da! Pentru contracte de mentenanță regulată (lunar/trimestrial), oferim reduceri de până la 15%. Plus, dacă recomandați 2 prieteni care folosesc serviciile noastre, primiți 20% reducere la următoarea programare."
              },
              {
                q: "Lucrați sâmbătă și duminică?",
                a: "Lucrăm luni-sâmbătă între orele 09:00-20:00. Pentru programări de duminică sau în afara programului, vă rugăm să ne contactați - vom încerca să găsim o soluție."
              },
              {
                q: "Ce se include în pachetele combo?",
                a: "Pachetele combo includ serviciile listate + parfum inclus + verificare finală. Pachetul Living include canapea 3 locuri, 2 fotolii, 4 scaune, covor mic și calorifer. Economisiți 50-100 lei față de prețul individual!"
              },
              {
                q: "Cum mă pot programa?",
                a: "Puteți suna direct, ne puteți scrie pe WhatsApp sau completați formularul de contact de pe site. Răspundem în maxim 30 minute și programăm evaluarea gratuită la un moment convenabil pentru dumneavoastră."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-accent transition"
                >
                  <span className="font-bold text-dark pr-4">{faq.q}</span>
                  {activeFAQ === index ? <FaChevronUp className="text-primary flex-shrink-0" /> : <FaChevronDown className="text-primary flex-shrink-0" />}
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-6 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Articole Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Sfaturi & Articole Utile</h2>
            <p className="text-gray-600">Ghiduri practice pentru menținerea curățeniei</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "5 Semne că Saltea Ta Trebuie Curățată Urgent",
                description: "Afla când e momentul perfect pentru o igienizare profesională a saltelei tale. Semnele clare că acarienii și bacteriile s-au acumulat.",
                image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80"
              },
              {
                title: "Cum Menții Canapea Curată (Sfaturi Profesionale)",
                description: "Trucuri simple de la profesioniști pentru a păstra canapea curată mai mult timp după curățarea profesională. Îngrijire zilnică eficientă.",
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
              },
              {
                title: "Interior Auto Impecabil - Pași Simpli de Îngrijire",
                description: "Ghid complet pentru menținerea interiorului mașinii tale curat între sesiunile de detailing profesional. Metode rapide și eficiente.",
                image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80"
              }
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-accent rounded-xl overflow-hidden shadow-lg hover-lift"
              >
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <a href="#contact" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                    Citește mai mult →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Solicită Ofertă Gratuită</h2>
            <p className="text-white/90 max-w-2xl mx-auto">Completează formularul sau sună-ne direct. Răspundem în maxim 30 minute!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Numele tău"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telefon"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Selectează serviciul</option>
                    <option value="Canapea/Fotoliu">Canapea/Fotoliu</option>
                    <option value="Saltea">Saltea</option>
                    <option value="Interior Auto">Interior Auto</option>
                    <option value="Curățare cu Abur">Curățare cu Abur</option>
                    <option value="Pachet Combo">Pachet Combo</option>
                    <option value="Altele">Altele</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Mesajul tău (opțional)"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-accent transition shadow-lg"
                >
                  Trimite Cererea
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Contactează-ne Direct</h3>
                <div className="space-y-4">
                  <a href="tel:+40123456789" className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition backdrop-blur">
                    <FaPhone className="text-2xl" />
                    <div>
                      <p className="font-semibold">Telefon</p>
                      <p className="text-white/90">+40 123 456 789</p>
                    </div>
                  </a>
                  <a href="https://wa.me/+40123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition backdrop-blur">
                    <FaWhatsapp className="text-2xl" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-white/90">Mesaj Direct</p>
                    </div>
                  </a>
                  <a href="mailto:contact@curateniepr o.ro" className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition backdrop-blur">
                    <FaEnvelope className="text-2xl" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/90">contact@curateniepr o.ro</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h4 className="font-bold text-xl mb-3">Program de Lucru</h4>
                <p className="text-white/90">Luni - Sâmbătă: 09:00 - 20:00</p>
                <p className="text-white/90 mt-2 text-sm">Răspundem în maxim 30 minute!</p>
              </div>

              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h4 className="font-bold text-xl mb-3">De la murdar la impecabil - în 2-3 ore</h4>
                <p className="text-white/90">Nu lăsa murdăria să aibă control – noi te curățăm profesionist!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp Button */}
      <a
        href="https://wa.me/+40123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition animate-pulse-glow z-50"
      >
        <FaWhatsapp size={32} />
      </a>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">StreetLab Cleaners</h3>
              <p className="text-gray-400">Servicii profesionale de curățenie și igienizare în Târgoviște și Dâmbovița.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Link-uri Rapide</h4>
              <ul className="space-y-2">
                <li><a href="#servicii" className="text-gray-400 hover:text-secondary transition">Servicii</a></li>
                <li><a href="#preturi" className="text-gray-400 hover:text-secondary transition">Prețuri</a></li>
                <li><a href="#despre" className="text-gray-400 hover:text-secondary transition">Despre Noi</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-secondary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Târgoviște, Dâmbovița</li>
                <li>+40 123 456 789</li>
                <li>contact@streetlabcleaners.ro</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StreetLab Cleaners. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
