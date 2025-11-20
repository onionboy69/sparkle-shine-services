import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const message = `Bună! Sunt ${formData.name} și sunt interesat de serviciul: ${formData.service}. ${formData.message}`
    const whatsappUrl = `https://wa.me/40720779009?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', phone: '', service: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contactează-ne
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Suntem aici să te ajutăm cu orice întrebare
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg"
            >
              <div className="text-3xl text-blue-600 dark:text-blue-400">
                <FaPhone />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Telefon
                </h3>
                <a 
                  href="tel:+40720779009"
                  className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +40 720 779 009
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg"
            >
              <div className="text-3xl text-green-600 dark:text-green-400">
                <FaWhatsapp />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  WhatsApp
                </h3>
                <a 
                  href="https://wa.me/40720779009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Trimite mesaj
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg"
            >
              <div className="text-3xl text-red-600 dark:text-red-400">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <a 
                  href="mailto:contact@streetlabcleaners.ro"
                  className="text-lg text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  contact@streetlabcleaners.ro
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg"
            >
              <div className="text-3xl text-purple-600 dark:text-purple-400">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Zonă deservită
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Târgoviște și Dâmbovița
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Numele tău"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 w-full"
                  style={{ transformOrigin: 'left' }}
                />
              </div>

              <div className="relative">
                <motion.input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Telefon"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 w-full"
                  style={{ transformOrigin: 'left' }}
                />
              </div>

              <div className="relative">
                <motion.select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('service')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-900 dark:text-white transition-all duration-300"
                >
                  <option value="">Alege serviciul</option>
                  <option value="Canapea">Canapea</option>
                  <option value="Saltea">Saltea</option>
                  <option value="Interior Auto">Interior Auto</option>
                  <option value="Calorifere">Calorifere</option>
                  <option value="Altele">Altele</option>
                </motion.select>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'service' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 w-full"
                  style={{ transformOrigin: 'left' }}
                />
              </div>

              <div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-gray-900 dark:text-white transition-all duration-300 resize-none"
                  placeholder="Mesajul tău..."
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 w-full"
                  style={{ transformOrigin: 'left' }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative">
                  {isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaCheckCircle /> Mesaj trimis!
                    </span>
                  ) : (
                    'Trimite mesaj'
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
