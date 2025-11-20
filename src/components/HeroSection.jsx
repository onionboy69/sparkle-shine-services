import { motion } from 'framer-motion'
import { FaCalendarAlt, FaTag } from 'react-icons/fa'

function FloatingBubbles() {
  const bubbles = [
    { size: 80, left: '8%', delay: 0, duration: 8 },
    { size: 60, left: '75%', delay: 2, duration: 10 },
    { size: 100, left: '45%', delay: 4, duration: 12 },
    { size: 70, left: '88%', delay: 1, duration: 9 },
    { size: 90, left: '20%', delay: 3, duration: 11 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  )
}

function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        className="relative block w-full h-24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,40 C300,80 600,20 900,60 C1100,90 1200,40 1200,40 L1200,120 L0,120 Z"
          className="fill-white dark:fill-gray-900"
          animate={{
            d: [
              "M0,40 C300,80 600,20 900,60 C1100,90 1200,40 1200,40 L1200,120 L0,120 Z",
              "M0,60 C300,20 600,80 900,40 C1100,70 1200,60 1200,60 L1200,120 L0,120 Z",
              "M0,40 C300,80 600,20 900,60 C1100,90 1200,40 1200,40 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

export default function HeroSection({ onOpenBooking, onScrollToPricing }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 dark:from-blue-800 dark:via-blue-700 dark:to-green-700">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Curățenie & Igienizare
              <span className="block text-green-300">Profesionistă</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-4 font-semibold text-white/95"
            >
              De la Murdar la Impecabil în 2-3 Ore ✨
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl mb-8 text-white/90"
            >
              Canapele • Saltele • Scaune • Auto • Calorifere • Spații comerciale
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenBooking}
                className="group relative px-8 py-7 bg-gradient-to-r from-orange to-orange-light text-white font-bold rounded-full text-lg shadow-2xl overflow-hidden gradient-orange-glow"
                style={{ minHeight: '56px' }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <FaCalendarAlt className="text-xl" />
                  🔴 ALEGE SERVICII & PROGRAMEAZĂ ACUM
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onScrollToPricing}
                className="px-8 py-7 bg-transparent border-2 border-green text-white font-bold rounded-full text-lg hover:bg-green hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                style={{ minHeight: '56px' }}
              >
                <FaTag className="text-xl" />
                Vezi Prețurile
              </motion.button>
            </motion.div>
            
            {/* Urgency badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4 text-white/90 text-sm mt-4"
            >
              <span>⏱️ Răspunsuri în &lt;30 min</span>
              <span>🚗 Deplasare Inclusă</span>
              <span>✓ 100% Satisfacție</span>
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="Curățenie profesională"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <WaveAnimation />
    </section>
  )
}
