import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ServicePreview from './ServicePreview'
import { useI18n } from '../i18n'

const Services = () => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const { t } = useI18n()
  const icons = {
    weddings: 'fas fa-heart',
    birthdays: 'fas fa-birthday-cake',
    kids: 'fas fa-baby',
    quince: 'fas fa-crown',
    private: 'fas fa-glass-cheers',
    latin: 'fas fa-compact-disc',
    corporate: 'fas fa-briefcase',
    special: 'fas fa-calendar-alt',
  }
  const services = t('services.items').map(item => ({ ...item, icon: icons[item.id] }))

  return (
    <section id="services" className="section-padding bg-dj-dark pb-12 md:pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6 pb-1 leading-tight">
            <span className="text-gradient">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-dj-gray rounded-2xl p-6 card-hover border border-dj-light-gray"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-dj-gold to-dj-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${service.icon} text-2xl text-dj-dark`}></i>
                </div>
                <h3 className="text-xl font-dj font-bold text-dj-gold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-dj-gold mb-3">
                  {t('services.includes')}
                </h4>
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-dj-gold rounded-full"></div>
                    <span className="text-xs text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <button
                type="button"
                aria-label={t('services.expand', { title: service.title })}
                aria-haspopup="dialog"
                onClick={() => setSelectedIndex(index)}
                className="absolute inset-0 w-full h-full cursor-pointer bg-gradient-to-br from-dj-gold/5 to-dj-electric-blue/5 rounded-2xl opacity-0 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dj-gold transition-opacity duration-300"
              >
                <span className="absolute top-3 right-3 text-dj-gold" aria-hidden="true">
                  <i className="fas fa-expand-alt" />
                </span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-dj-gold/10 to-dj-electric-blue/10 rounded-2xl p-8 border border-dj-gold/20">
            <h3 className="text-2xl font-dj font-bold text-dj-gold mb-4">
              {t('services.ctaTitle')}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {t('services.ctaText')}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                const el = document.getElementById('contact')
                if (!el) return
                e.preventDefault()
                const nav = document.querySelector('nav')
                window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - (nav ? nav.offsetHeight : 80) - 10, behavior: 'smooth' })
              }}
              className="btn-primary inline-block"
            >
              <i className="fas fa-envelope mr-2"></i>
              {t('services.ctaButton')}
            </motion.a>
          </div>
        </motion.div>
      </div>
      {selectedIndex !== null && (
        <ServicePreview
          services={services}
          activeIndex={selectedIndex}
          onNavigate={direction => setSelectedIndex(index => (index + direction + services.length) % services.length)}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  )
}

export default Services
