import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaUsers, FaClock, FaStar, FaMapMarkerAlt } from 'react-icons/fa'

function AnimatedCounter({ end, duration = 2000, suffix = "+" }) {
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

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const stats = [
  {
    icon: <FaUsers />,
    value: 500,
    label: "Clienți Mulțumiți",
    color: "from-blue-500 to-blue-600",
    suffix: "+"
  },
  {
    icon: <FaClock />,
    value: 10000,
    label: "Ore de Servicii",
    color: "from-green-500 to-green-600",
    suffix: "+"
  },
  {
    icon: <FaStar />,
    value: 98,
    label: "Rating ⭐⭐⭐⭐⭐",
    color: "from-orange-500 to-red-500",
    suffix: "%"
  },
  {
    icon: <FaMapMarkerAlt />,
    value: 30,
    label: "Zone Deservite",
    color: "from-purple-500 to-pink-500",
    suffix: "+"
  }
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 dark:from-blue-800 dark:via-blue-700 dark:to-green-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Rezultate în Numere
          </h2>
          <p className="text-xl text-white/90">
            Încrederea clienților noștri vorbește despre noi
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-8 rounded-2xl shadow-2xl text-white text-center`}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.2
                  }}
                  className="text-5xl mb-4 flex justify-center"
                >
                  {stat.icon}
                </motion.div>
                
                <div className="text-5xl font-bold mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                
                <p className="text-lg font-semibold text-white/90">
                  {stat.label}
                </p>
                
                {/* Progress Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                  className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden"
                  style={{ transformOrigin: 'left' }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.7 }}
                    className="h-full bg-white rounded-full"
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
