import { motion } from 'framer-motion'
import { FaPhone, FaClipboardCheck, FaSprayCan, FaCheckCircle } from 'react-icons/fa'

const steps = [
  {
    icon: <FaPhone />,
    title: "Contactare",
    description: "Sună sau completează formularul online pentru programare"
  },
  {
    icon: <FaClipboardCheck />,
    title: "Evaluare",
    description: "Evaluăm suprafața și stabilim prețul exact pe loc"
  },
  {
    icon: <FaSprayCan />,
    title: "Curățare",
    description: "Igienizare profesională cu echipament Kärcher de ultimă generație"
  },
  {
    icon: <FaCheckCircle />,
    title: "Finalizare",
    description: "Verificăm rezultatul împreună și primești garanția noastră"
  }
]

export default function HowWeWork() {
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
            Cum lucrăm?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Proces simplu în 4 pași pentru rezultate perfecte
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600 transform -translate-y-1/2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-600 to-green-500"
              style={{ transformOrigin: 'left' }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number Badge */}
                <motion.div
                  initial={{ scale: 0, rotateY: 0 }}
                  whileInView={{ scale: 1, rotateY: 360 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-green-500 text-white font-bold text-3xl flex items-center justify-center mb-6 shadow-xl z-10 relative"
                >
                  {index + 1}
                </motion.div>
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-5xl text-blue-600 dark:text-blue-400 mb-4"
                >
                  {step.icon}
                </motion.div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
