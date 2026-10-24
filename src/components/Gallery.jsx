import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import GalleryVideo from './GalleryVideo'

import { galleryCategories, galleryVideos } from '../data/galleryVideos'

const AUTOPLAY_MS = 5000

const Gallery = () => {
  const carouselRef = useRef(null)
  const isInView = useInView(carouselRef, { amount: 0.25 })
  const [category, setCategory] = useState('Todos')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const videos = category === 'Todos'
    ? galleryVideos
    : galleryVideos.filter(video => video.category === category)
  const currentVideo = videos[activeIndex]
  const previousVideo = videos[(activeIndex - 1 + videos.length) % videos.length]
  const nextVideo = videos[(activeIndex + 1) % videos.length]
  const canAdvance = autoplayEnabled && isInView && pageVisible
    && !isPlaying && !isHovered && !hasFocus && videos.length > 1

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    if (!canAdvance) return undefined

    const timer = window.setTimeout(() => {
      setActiveIndex(index => (index + 1) % videos.length)
    }, AUTOPLAY_MS)

    return () => window.clearTimeout(timer)
  }, [canAdvance, activeIndex, category, videos.length])

  const goToSlide = (index) => {
    setIsPlaying(false)
    setActiveIndex(index)
  }

  const move = (direction) => {
    setIsPlaying(false)
    setActiveIndex(index => (index + direction + videos.length) % videos.length)
  }

  return (
  <section id="gallery" className="section-padding bg-dj-gray">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6">
          <span className="text-gradient">Galería</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Momentos especiales capturados en eventos inolvidables.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-8" role="group" aria-label="Categorías de videos">
        {galleryCategories.map(item => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${category === item ? 'bg-dj-gold text-dj-dark' : 'bg-neutral-800 text-white hover:bg-dj-gold/70 hover:text-dj-dark'}`}
            onClick={() => {
              setCategory(item)
              setActiveIndex(0)
              setIsPlaying(false)
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        ref={carouselRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Videos de eventos"
        className="max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
        }}
      >
        <div className="flex items-center justify-center gap-5 lg:gap-8">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={`Ver video anterior: ${previousVideo.title}`}
            className="hidden md:block relative shrink-0 w-28 lg:w-36 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black opacity-60 hover:opacity-100 transition-opacity"
          >
            <img src={previousVideo.poster} alt="" width="360" height="640" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </button>

          <div className="relative w-full max-w-[22.5rem] md:max-w-[min(22.5rem,32svh)] min-w-0">
            <div className="absolute -inset-3 bg-dj-gold/15 blur-2xl rounded-[2rem] pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              {/* Immediately unmount the old player to stop and release its video. */}
              <GalleryVideo key={currentVideo.id} {...currentVideo} onPlaybackChange={setIsPlaying} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label={`Ver siguiente video: ${nextVideo.title}`}
            className="hidden md:block relative shrink-0 w-28 lg:w-36 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black opacity-60 hover:opacity-100 transition-opacity"
          >
            <img src={nextVideo.poster} alt="" width="360" height="640" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-5 mt-6">
          <button type="button" onClick={() => move(-1)} aria-label="Video anterior" className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-xl">
            <span aria-hidden="true">←</span>
          </button>
          <div className="text-center min-w-0" aria-live={canAdvance ? 'off' : 'polite'} aria-atomic="true">
            <p className="text-sm text-white">{currentVideo.title}</p>
            <p className="text-sm text-gray-300 mt-1">Video {activeIndex + 1} de {videos.length}</p>
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Siguiente video" className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-xl">
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-1 max-w-2xl mx-auto mt-3" role="group" aria-label="Elegir video">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ir al video ${index + 1}: ${video.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="flex items-center justify-center w-8 h-9"
            >
              <span aria-hidden="true" className={`h-2.5 rounded-full ${index === activeIndex ? 'w-7 bg-dj-gold' : 'w-2.5 bg-white/40'}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={() => setAutoplayEnabled(enabled => !enabled)}
          className="px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-white/10 hover:text-white"
        >
          {autoplayEnabled ? 'Pausar avance automático' : 'Activar avance automático'}
        </button>
      </div>
    </div>
  </section>
)
}

export default Gallery
