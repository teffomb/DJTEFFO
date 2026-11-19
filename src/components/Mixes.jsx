import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { mixes } from '../data/mixes'
import { useI18n } from '../i18n'

// Devuelve { platform, src, height } o null si la URL no es soportada.
export const getMixEmbed = (url) => {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'soundcloud.com' || host === 'on.soundcloud.com') {
      return {
        platform: 'soundcloud',
        src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ffd700&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false`,
        height: 166,
      }
    }
    if (host === 'mixcloud.com') {
      return {
        platform: 'mixcloud',
        src: `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=${encodeURIComponent(u.pathname)}`,
        height: 120,
      }
    }
  } catch (e) { /* URL inválida */ }
  return null
}

// El iframe se monta solo cuando la tarjeta entra al viewport.
const MixCard = ({ mix }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const embed = getMixEmbed(mix.url)

  useEffect(() => {
    const el = ref.current
    if (!el || !embed) return undefined
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        io.disconnect()
      }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [embed])

  if (!embed) return null

  return (
    <div ref={ref} className="bg-dj-gray border border-dj-light-gray rounded-2xl p-4">
      <div className="mb-3">
        <h3 className="font-dj font-bold text-dj-gold">{mix.title}</h3>
        {mix.type && <p className="text-sm text-gray-300">{mix.type}</p>}
      </div>
      <div style={{ height: embed.height }} className="rounded-lg overflow-hidden bg-black/40">
        {visible && (
          <iframe
            title={mix.title}
            src={embed.src}
            width="100%"
            height={embed.height}
            frameBorder="0"
            allow="autoplay"
            loading="lazy"
          />
        )}
      </div>
    </div>
  )
}

const Mixes = () => {
  const { t } = useI18n()
  const valid = mixes.filter(m => getMixEmbed(m.url))
  if (!valid.length) return null

  return (
    <section id="mixes" className="section-padding bg-dj-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6 pb-1 leading-tight">
            <span className="text-gradient">{t('mixes.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('mixes.subtitle')}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {valid.map(mix => <MixCard key={mix.url} mix={mix} />)}
        </div>
      </div>
    </section>
  )
}

export default Mixes
