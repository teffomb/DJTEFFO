import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { visibleStats as stats } from '../data/stats'
import { useI18n } from '../i18n'

const About = () => {
  const { t } = useI18n()
  const [bgPos, setBgPos] = useState('75% 40%')
  const audioRef = useRef(null)
  const audioButtonRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const updatePos = () => {
      const w = window.innerWidth
      if (w >= 1280) setBgPos('80% 42%') // very large screens
      else if (w >= 1024) setBgPos('75% 42%') // desktop
      else if (w >= 768) setBgPos('65% 50%') // tablet
      else setBgPos('50% 50%') // mobile
    }
    updatePos()
    window.addEventListener('resize', updatePos)
    return () => window.removeEventListener('resize', updatePos)
  }, [])

  // Use Vite base so paths work both in dev and on GitHub Pages (if base is set)
  const base = import.meta.env.BASE_URL

  // Try to autoplay once on mount. If blocked, add a one-time user-interaction listener to start playback.
  useEffect(() => {
    const audioEl = audioRef.current
    let disposed = false
    audioEl.volume = 0.8

    const tryPlayOnce = () => {
      if (audioEl.dataset.played === 'true' || !audioEl.paused) return
      audioEl.play().then(() => {
        if (disposed) return
        audioEl.dataset.played = 'true'
        window.removeEventListener('pointerdown', handleInteraction)
      }).catch(() => {
        // Browsers may require a user gesture before playing audible media.
      })
    }

    const handleInteraction = event => {
      // Let the music button handle its own click, without toggling playback twice.
      if (audioButtonRef.current?.contains(event.target)) {
        window.removeEventListener('pointerdown', handleInteraction)
        return
      }
      tryPlayOnce()
    }

    window.addEventListener('pointerdown', handleInteraction)
    tryPlayOnce()

    return () => {
      disposed = true
      window.removeEventListener('pointerdown', handleInteraction)
      audioEl.pause()
    }
  }, [])

  const handlePlayAudio = () => {
    const audioEl = audioRef.current
    if (!audioEl) return

    if (!audioEl.paused && !audioEl.ended) {
      audioEl.pause()
      audioEl.currentTime = 0
      return
    }

    audioEl.currentTime = 0
    audioEl.muted = false
    setAudioError(false)
    audioEl.play().then(() => {
      audioEl.dataset.played = 'true'
    }).catch(error => {
      if (error.name !== 'AbortError') setAudioError(true)
    })
  }

  return (
    <section id="about" className="section-padding bg-dj-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              {/* Placeholder for DJ image - use <img> with object-fit for better centering */}
              <div className="w-full h-96 bg-gradient-to-br from-dj-gold/20 to-dj-electric-blue/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={`${base}Images/TeffoDJ-768.webp`}
                  srcSet={`${base}Images/TeffoDJ-480.webp 480w, ${base}Images/TeffoDJ-768.webp 768w`}
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  width="768"
                  height="1376"
                  loading="lazy"
                  decoding="async"
                  alt="DJ Teffo"
                  className="w-full h-full rounded-2xl object-cover"
                  style={{ objectPosition: bgPos }}
                />
              </div>

              <audio
                id="dj-audio"
                ref={audioRef}
                preload="auto"
                src={`${base}Sounds/djteffo.mp3`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setAudioError(true)}
              />

              {/* Floating elements */}
              <motion.button
                ref={audioButtonRef}
                type="button"
                onClick={handlePlayAudio}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 -right-3 w-12 h-12 bg-dj-gold rounded-full flex items-center justify-center shadow-lg focus:outline-none z-20"
                aria-label={isPlaying ? t('about.audioStop') : t('about.audioPlay')}
                aria-pressed={isPlaying}
                title={isPlaying ? t('about.audioStop') : t('about.audioPlay')}
              >
                <i className="fas fa-music text-dj-dark text-lg"></i>
              </motion.button>
            </div>

            {audioError && (
              <p role="alert" className="text-sm text-gray-300">
                {t('about.audioError')}
              </p>
            )}

            <div className="space-y-4">
              <h3 className="text-2xl font-dj font-bold text-dj-gold">
                DJ TEFFO
              </h3>
              <p className="text-gray-300 leading-relaxed">{t('about.p1')}</p>
              <p className="text-gray-300 leading-relaxed">{t('about.p2')}</p>
            </div>
          </motion.div>

          {/* Right side - Stats and features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            {stats.length > 0 && <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-dj-light-gray rounded-xl card-hover"
                >
                  <div className="text-3xl md:text-4xl font-dj font-bold text-dj-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">
                    {t(`stats.${stat.id}`)}
                  </div>
                </motion.div>
              ))}
            </div>}

            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-xl font-dj font-semibold text-dj-gold mb-6">
                {t('about.whyTitle')}
              </h4>

              {['fas fa-headphones', 'fas fa-music', 'fas fa-clock', 'fas fa-heart'].map((icon, index) => ({ icon, ...t('about.features')[index] })).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 bg-dj-light-gray rounded-lg card-hover"
                >
                  <div className="text-dj-gold text-xl mt-1">
                    <i className={feature.icon}></i>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h5>
                    <p className="text-sm text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
