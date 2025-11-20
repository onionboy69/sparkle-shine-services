import { motion } from 'framer-motion'
import { FaCheckCircle, FaShieldAlt, FaCertificate, FaLeaf } from 'react-icons/fa'

const badges = [
  {
    icon: <FaCheckCircle />,
    title: "100% Satisfacție Garantată",
    description: "Revenim gratuit dacă nu ești mulțumit"
  },
  {
    icon: <FaShieldAlt />,
    title: "Asigurare RCA",
    description: "Protecție completă pentru bunurile tale"
  },
  {
    icon: <FaCertificate />,
    title: "Prețuri Blocate",
    description: "Fără costuri ascunse sau surprize"
  },
  {
    icon: <FaLeaf />,
    title: "Dezinfectare Ozon",
    description: "Eliminare bacterii + miros perfect inclus"
  }
]

export default function TrustBadges() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-800 dark:to-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center text-white"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-5xl mb-4 flex justify-center"
              >
                {badge.icon}
              </motion.div>
              <h3 className="text-lg font-bold mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-white/80">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
