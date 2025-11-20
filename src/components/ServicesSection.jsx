import { motion } from 'framer-motion'
import { GiSofa, GiBed, GiCarSeat, GiVacuumCleaner } from 'react-icons/gi'
import { MdCleaningServices } from 'react-icons/md'
import { FaHome, FaArrowRight } from 'react-icons/fa'

const serviceCategories = [
  {
    icon: <GiSofa />,
    title: "Curățare Textile & Tapițerii",
    services: [
      { name: "Canapea 2 locuri", price: "140-170 lei", duration: "45 min" },
      { name: "Canapea 3 locuri", price: "200-250 lei", duration: "60 min" },
      { name: "Colțar", price: "300-450 lei", duration: "90 min" },
      { name: "Fotoliu", price: "80-120 lei", duration: "30 min" },
    ]
  },
  {
    icon: <GiBed />,
    title: "Igienizare Saltele",
    services: [
      { name: "Saltea single", price: "130-170 lei", duration: "45 min" },
      { name: "Saltea matrimonială", price: "170-230 lei", duration: "60 min" },
      { name: "Saltea copii", price: "100-140 lei", duration: "35 min" },
    ]
  },
  {
    icon: <GiCarSeat />,
    title: "Interior Auto & Detalii",
    services: [
      { name: "Interior complet", price: "350-500 lei", duration: "2-3 ore" },
      { name: "Plafon auto", price: "80-150 lei", duration: "45 min" },
      { name: "Scaune auto", price: "200-300 lei", duration: "90 min" },
    ]
  },
  {
    icon: <GiVacuumCleaner />,
    title: "Igienizare cu Abur",
    services: [
      { name: "Calorifere (4 buc)", price: "100-160 lei", duration: "30 min" },
      { name: "Baie completă", price: "150-250 lei", duration: "90 min" },
      { name: "Bucătărie", price: "200-300 lei", duration: "2 ore" },
    ]
  },
  {
    icon: <MdCleaningServices />,
    title: "Curățenie Generală",
    services: [
      { name: "Apartament 2 camere", price: "250-350 lei", duration: "3-4 ore" },
      { name: "Apartament 3 camere", price: "350-500 lei", duration: "4-5 ore" },
      { name: "Casă", price: "500-800 lei", duration: "5-7 ore" },
    ]
  },
  {
    icon: <FaHome />,
    title: "Spații Comerciale",
    services: [
      { name: "Birou (per mp)", price: "15-25 lei", duration: "pe măsură" },
      { name: "Restaurant", price: "500-1000 lei", duration: "4-6 ore" },
      { name: "Magazin", price: "400-800 lei", duration: "3-5 ore" },
    ]
  }
]

export default function ServicesSection() {
  return (
    <section id="servicii" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Serviciile Noastre
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Prețuri competitive cu rezultate garantate
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-orange hover:shadow-2xl dark:hover:border-orange transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-orange via-orange-light to-green p-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl text-white mb-3"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {category.services.map((service, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex justify-between items-start border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {service.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ⏱️ {service.duration}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.15, y: -2 }}
                        className="font-bold text-orange animate-bounce-subtle"
                      >
                        {service.price}
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-orange to-orange-light text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-2xl gradient-orange-glow transition-all duration-300"
                >
                  Detalii <motion.span whileHover={{ x: 5 }} className="inline-block"><FaArrowRight /></motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
