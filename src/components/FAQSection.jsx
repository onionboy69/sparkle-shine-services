import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  {
    question: "Ce echipamente folosiți?",
    answer: "Folosim exclusiv echipamente profesionale Kärcher de ultimă generație și produse de curățenie certificate ecologice. Toate produsele sunt sigure pentru copii, animale de companie și persoane cu alergii."
  },
  {
    question: "Cât timp durează uscarea după curățare?",
    answer: "În funcție de serviciu, timpul de uscare variază între 2-6 ore. Pentru textile și tapițerii: 3-4 ore. Pentru saltele: 4-6 ore. Pentru interior auto: 2-3 ore. Recomandăm aerisirea încăperii pentru uscare mai rapidă."
  },
  {
    question: "Oferiți abonamente lunare pentru spații comerciale?",
    answer: "Da! Avem pachete speciale pentru spații comerciale, birouri, restaurante și magazine cu discount-uri de până la 20% pentru contracte lunare. Contactați-ne pentru o ofertă personalizată."
  },
  {
    question: "Lucrați și în weekend?",
    answer: "Desigur! Programul nostru este flexibil: Luni-Vineri: 09:00-20:00, Sâmbătă: 09:00-18:00, Duminică: 10:00-16:00. Puteți alege intervalul orar cel mai potrivit la programare."
  },
  {
    question: "Cum se stabilește prețul final?",
    answer: "Prețul se stabilește în funcție de gradul de murdărire, tipul materialului și dimensiunea suprafeței. La prima programare, facem o evaluare gratuită și vă comunicăm prețul exact înainte de a începe lucrul. Fără costuri ascunse!"
  },
  {
    question: "Aveți garanție pentru servicii?",
    answer: "Da! Oferim garanție de satisfacție 100%. Dacă nu sunteți mulțumit de rezultat, revenim gratuit în maxim 48 de ore. De asemenea, avem asigurare RCA pentru orice situație neprevăzută."
  }
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Întrebări Frecvente
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tot ce trebuie să știi despre serviciile noastre
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FaChevronDown className="text-blue-600 dark:text-blue-400 text-xl" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
