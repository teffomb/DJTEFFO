import React from 'react'
import { motion } from 'framer-motion'
import { genres } from '../data/genres'
import { useI18n } from '../i18n'

const Genres = () => {
  const { t } = useI18n()
  if (!genres.length) return null
  return (
    <section id="genres" className="section-padding bg-dj-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6 pb-1 leading-tight">
            <span className="text-gradient">{t('genres.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('genres.subtitle')}
          </p>
        </motion.div>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {genres.map((g, index) => (
            <motion.li
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-dj-gray border border-dj-light-gray rounded-2xl px-4 py-4 card-hover"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-dj-gold to-dj-electric-blue flex items-center justify-center text-dj-dark" aria-hidden="true">
                <i className={g.icon}></i>
              </span>
              <span className="font-semibold text-white text-sm md:text-base">{g.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Genres
