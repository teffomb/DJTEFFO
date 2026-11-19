import React from 'react'
import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import { useI18n } from '../i18n'

const Testimonials = () => {
  const { t } = useI18n()
  // Sin testimonios reales cargados, la sección no se muestra.
  if (!testimonials.length) return null

  return (
    <section id="testimonials" className="section-padding bg-dj-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6 pb-1 leading-tight">
            <span className="text-gradient">{t('testimonials.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.figure
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dj-gray rounded-2xl p-6 border border-dj-light-gray flex flex-col"
            >
              {item.image && (
                <img
                  src={`${import.meta.env.BASE_URL}${item.image}`}
                  alt={t('testimonials.screenshotAlt', { name: item.name })}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-h-96 object-contain rounded-lg mb-4 bg-black"
                />
              )}
              {item.text && (
                <blockquote className="text-gray-300 leading-relaxed italic mb-4">
                  “{item.text}”
                </blockquote>
              )}
              <figcaption className="mt-auto">
                <div className="font-dj font-bold text-dj-gold">{item.name}</div>
                <div className="text-sm text-gray-300">
                  {item.event}{item.date ? ` · ${item.date}` : ''}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
