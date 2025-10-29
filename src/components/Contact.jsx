import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        message: ''
      })
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000)
    }, 2000)
  }

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: 'https://wa.me/51922798039?text=Hola%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20DJ%20%F0%9F%98%81',
      color: 'bg-green-500'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://www.instagram.com/dj_teffo/',
      color: 'bg-pink-500'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      url: 'https://www.youtube.com/@DjTeffo-in5mt',
      color: 'bg-red-600'
    }
  ]

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Teléfono',
      value: '+51 922798039',
      action: 'tel:+51922798039'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'djdang45@gmail.com',
      action: 'mailto:djdang45@gmail.com'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Ubicación',
      value: 'Lima, Comas',
      action: '#'
    },
    {
      icon: 'fas fa-clock',
      title: 'Horarios',
      value: 'Lun-Dom: 9:00 AM - 11:00 PM',
      action: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-dj-dark pt-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-dj font-bold mb-6">
            <span className="text-gradient">Contáctame</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Listo para hacer de tu evento algo inolvidable? 
            Contáctame y conversemos sobre tus ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-dj-gray rounded-2xl p-8"
          >
            <h2 className="text-2xl font-dj font-bold text-dj-gold mb-6">
              Envíame un Mensaje
            </h2>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg mb-6"
              >
                <i className="fas fa-check-circle mr-2"></i>
                ¡Mensaje enviado con éxito! Te responderé pronto.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
                    placeholder="+51 999 999 999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Evento *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dj-gold transition-colors"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="boda">Boda</option>
                    <option value="cumpleaños">Cumpleaños</option>
                    <option value="corporativo">Evento Corporativo</option>
                    <option value="infantil">Evento Infantil</option>
                    <option value="privado">Fiesta Privada</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha del Evento
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dj-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors resize-none"
                  placeholder="Cuéntame sobre tu evento, tus ideas y cualquier detalle especial que tengas en mente..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Enviar Mensaje
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-dj-gray rounded-2xl p-8">
              <h2 className="text-2xl font-dj font-bold text-dj-gold mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.action}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-dj-light-gray rounded-lg hover:bg-dj-gold/10 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-dj-gold rounded-full flex items-center justify-center text-dj-dark group-hover:scale-110 transition-transform">
                      <i className={`${info.icon} text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-dj-gold transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-dj-gray rounded-2xl p-8">
              <h2 className="text-2xl font-dj font-bold text-dj-gold mb-6">
                Sígueme en Redes Sociales
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.color} p-4 rounded-lg text-white text-center hover:opacity-80 transition-opacity`}
                  >
                    <i className={`${social.icon} text-2xl mb-2`}></i>
                    <div className="text-sm font-semibold">{social.name}</div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-dj-gold/10 to-dj-electric-blue/10 rounded-2xl p-8 border border-dj-gold/20">
              <h3 className="text-xl font-dj font-bold text-dj-gold mb-4">
                ¿Necesitas una respuesta rápida?
              </h3>
              <p className="text-gray-300 mb-6">
                Para consultas urgentes, puedes contactarme directamente por WhatsApp.
              </p>
              <motion.a
                href="https://wa.me/+1234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                WhatsApp Rápido
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-dj-gray rounded-2xl p-8">
            <h2 className="text-2xl font-dj font-bold text-dj-gold mb-6 text-center">
              Zona de Cobertura
            </h2>
            <div className="h-64 bg-dj-light-gray rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-map-marked-alt text-dj-gold text-4xl mb-4"></i>
                <p className="text-gray-300 mb-2">
                  Cubrimos toda Lima Metropolitana
                </p>
                <p className="text-dj-gold font-semibold mt-2">
                  Consulta disponibilidad para tu ubicación
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
