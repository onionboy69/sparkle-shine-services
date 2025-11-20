import { motion } from 'framer-motion'
import { FaCheckCircle, FaShieldAlt, FaCertificate, FaLeaf } from 'react-icons/fa'

const badges = [
  {
    icon: <FaCheckCircle />,
    title: "100% Satisfacție Garantată",
    description: "Dacă nu ești mulțumit, TE RE-CURĂȚĂM GRATUIT în 7 zile"
  },
  {
    icon: <FaCertificate />,
    title: "Prețuri Blocate",
    description: "Fără costuri ascunse, fără surprize. Ce vezi e ce plătești"
  },
  {
    icon: <FaShieldAlt />,
    title: "Asigurare RCA",
    description: "Protecție civilă completă pentru orice situație"
  },
  {
    icon: <FaLeaf />,
    title: "Dezinfectare Ozon",
    description: "Disponibil suplimentar pentru protecție maximă"
  }
]

export default function TrustBadges() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            De Ce Să Ne Alegeți
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.08, boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)" }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border-2 border-green shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-5xl mb-4 flex justify-center text-green"
              >
                {badge.icon}
              </motion.div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
