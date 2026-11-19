import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import DatePicker from './DatePicker'
import { useI18n } from '../i18n'
import es from '../i18n/es'

const PACKAGE_VALUES = ['solo-dj', 'pack-principal', 'pack-fiesta']
const PACKAGE_LABELS = {
  'solo-dj': 'Paquete Solo DJ - S/. 250',
  'pack-principal': 'Pack Principal - S/. 399',
  'pack-fiesta': 'Pack Fiesta - S/. 499'
}

// El correo que recibe el dueño siempre va en español.
const EVENT_TYPE_LABELS = es.contact.eventTypes
const EVENT_TYPE_KEYS = Object.keys(es.contact.eventTypes)
const WHATSAPP_NUMBER = '51922798039'

const RECIPIENT_EMAIL = 'djdang45@gmail.com'
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`

const Contact = () => {
  const { t, lang } = useI18n()
  const isEs = lang === 'es'
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    packageType: '',
    date: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  // Google Maps: read API key from Vite env var VITE_GOOGLE_MAPS_API_KEY
  // If not provided, we fall back to a simple embed URL that centers on "Comas, Lima, Peru".
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  const mapSrc = MAP_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${MAP_KEY}&q=Comas,Lima,Peru&zoom=12`
    : 'https://www.google.com/maps?q=Comas+Lima+Peru&output=embed'

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const packageParam = params.get('package')

    if (PACKAGE_VALUES.includes(packageParam)) {
      setFormData(prev => (
        prev.packageType === packageParam
          ? prev
          : { ...prev, packageType: packageParam }
      ))
    }
  }, [location.search])

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
    setSubmitError('')

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      eventType: EVENT_TYPE_LABELS[formData.eventType] || formData.eventType,
      packageType: PACKAGE_LABELS[formData.packageType] || formData.packageType,
      date: formData.date || es.contact.notSpecified,
      idioma: lang,
      message: formData.message.trim(),
      _subject: `Nuevo mensaje desde DJ TEFFO - ${formData.name.trim()}`,
      _captcha: 'false',
      _template: 'table'
    }

    try {
      const response = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          phone: '',
          eventType: '',
          packageType: '',
          date: '',
          message: ''
        })

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000)
      } else {
        setSubmitError(t('contact.error'))
      }
    } catch (error) {
      console.error(error)
      setSubmitError(t('contact.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('contact.whatsappMsg'))}`

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: whatsappUrl,
      color: 'bg-green-500'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://www.instagram.com/idk.teffo/',
      color: 'bg-pink-500'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      url: 'https://www.youtube.com/@DjTeffo-in5mt',
      color: 'bg-red-600'
    },
    {
      name: 'SoundCloud',
      icon: 'fab fa-soundcloud',
      url: 'https://soundcloud.com/djteffo',
      color: 'bg-orange-500'
    }
  ]

  const contactInfo = [
    { icon: 'fas fa-phone', title: t('contact.info.phone'), value: '+51 922798039', action: 'tel:+51922798039' },
    { icon: 'fas fa-envelope', title: t('contact.info.email'), value: 'djdang45@gmail.com', action: 'mailto:djdang45@gmail.com' },
    { icon: 'fas fa-map-marker-alt', title: t('contact.info.location'), value: t('contact.locationValue'), action: '#' },
    ...(t('contact.hoursValue')
      ? [{ icon: 'fas fa-clock', title: t('contact.info.hours'), value: t('contact.hoursValue'), action: '#' }]
      : [])
  ]

  return (
    <section id="contact" className="section-padding bg-dj-dark">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6 pb-1 leading-tight">
            <span className="text-gradient">{t('contact.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
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
              {t('contact.formTitle')}
            </h2>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg mb-6 flex items-center"
              >
                <i className="fas fa-check-circle mr-3 text-xl"></i>
                <span>{t('contact.success')}</span>
              </motion.div>
            )}

            {submitError && !submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-4 rounded-lg mb-6 flex items-center"
              >
                <i className="fas fa-exclamation-triangle mr-3 text-xl"></i>
                <span>{submitError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
                    placeholder={t('contact.namePh')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
                    placeholder={t('contact.phonePh')}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.eventType')}
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dj-gold transition-colors"
                  >
                    <option value="">{t('contact.eventTypePh')}</option>
                    {EVENT_TYPE_KEYS.map(key => (
                      <option key={key} value={key}>{t(`contact.eventTypes.${key}`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {isEs && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.package')}
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    required={isEs}
                    className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dj-gold transition-colors"
                  >
                    <option value="">{t('contact.packagePh')}</option>
                    <option value="solo-dj">Paquete Solo DJ - S/. 250</option>
                    <option value="pack-principal">Pack Principal - S/. 399</option>
                    <option value="pack-fiesta">Pack Fiesta - S/. 499</option>
                  </select>
                </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.date')}
                  </label>
                  <DatePicker
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors resize-none"
                  placeholder={t('contact.messagePh')}
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
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    {t('contact.send')}
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
                {t('contact.infoTitle')}
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
                {t('contact.socialTitle')}
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
                {t('contact.quickTitle')}
              </h3>
              <p className="text-gray-300 mb-6">
                {t('contact.quickText')}
              </p>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                {t('contact.quickButton')}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Map Section (solo ES: el mapa es de Lima) */}
        {isEs && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 mb-16"
        >
              <div className="bg-dj-gray rounded-2xl p-8">
                <h2 className="text-2xl font-dj font-bold text-dj-gold mb-6 text-center">
                  {t('contact.coverageTitle')}
                </h2>
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  {/* Responsive iframe map centered on Comas, Lima, Peru. */}
                  <div className="w-full h-64 sm:h-80 md:h-96">
                    <iframe
                      title={t('contact.mapTitle')}
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                      <div className="p-4 bg-dj-light-gray text-center">
                        <p className="text-gray-300 mb-1">{t('contact.mapHint')}</p>
                      </div>
                </div>
              </div>
        </motion.div>
        )}
      </div>
    </section>
  )
}

export default Contact
