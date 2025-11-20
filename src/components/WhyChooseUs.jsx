import { motion } from 'framer-motion'
import { FaCheckCircle, FaSprayCan, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa'

const features = [
  {
    icon: <FaSprayCan />,
    title: "Echipament Profesional",
    description: "Mașini Kärcher de ultimă generație + produse certificate"
  },
  {
    icon: <FaCheckCircle />,
    title: "Rezultate + Parfum inclus",
    description: "Igienizare profundă cu abur + parfum de durată garantat"
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Prețuri transparente",
    description: "Fără costuri ascunse - prețul comunicat = prețul final"
  },
  {
    icon: <FaShieldAlt />,
    title: "Garanție & Asigurare",
    description: "100% satisfacție garantată + asigurare RCA"
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            De ce să ne alegi pe noi?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Servicii de curățenie profesională cu rezultate garantate
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 25px 50px rgba(255, 107, 53, 0.2)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:border-orange dark:hover:border-orange transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-5xl text-orange mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
