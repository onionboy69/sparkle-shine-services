import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'

const testimonials = [
  {
    name: "Maria P.",
    location: "Târgoviște",
    service: "Igienizare Saltea",
    text: "Am avut saltea murdară și cu miros neplăcut de la animale. După StreetLab Cleaners, arată ca nouă! Echipa a fost foarte profesionistă, procesul transparent, iar rezultatul excepțional.",
    rating: 5
  },
  {
    name: "Ion M.",
    location: "Dâmbovița",
    service: "Detailing Auto Complet",
    text: "Mașina mea avea interior foarte murdar după 3 ani de utilizare intensă. Au făcut o treabă impecabilă - tapițerie, plafon, plastice, totul arată ca nou! Prețul corect, echipament profesional Kärcher.",
    rating: 5
  },
  {
    name: "Elena S.",
    location: "Târgoviște Centru",
    service: "Pachet Living Curat",
    text: "Colțarul nostru era într-o stare deplorabila după 5 ani. StreetLab mi-a transformat livingul complet! Totul a durat 2 ore și rezultatul m-a lăsat fără cuvinte. Super recomand!",
    rating: 5
  },
  {
    name: "Andrei T.",
    location: "Moreni",
    service: "Igienizare Calorifere",
    text: "Caloriferele erau negre de praf acumulat în ani. După curățare, sunt albe ca noi și casa miroase fantastic. Serviciu rapid și profesionist. Mulțumesc!",
    rating: 5
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ce spun clienții noștri
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Peste 500 de recenzii cu 5 stele
          </p>
        </motion.div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 p-8 md:p-12 rounded-2xl shadow-2xl"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <FaStar className="text-3xl text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic mb-8 text-center leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonials[currentIndex].location}
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">
                  {testimonials[currentIndex].service}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
            >
              <FaChevronLeft />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
