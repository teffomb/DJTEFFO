import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import GalleryVideo, { VideoPoster } from './GalleryVideo'

import { galleryCategories, galleryVideos } from '../data/galleryVideos'
import { useI18n } from '../i18n'

const AUTOPLAY_MS = 5000

const Gallery = () => {
  const { t } = useI18n()
  const carouselRef = useRef(null)
  const isInView = useInView(carouselRef, { amount: 0.25 })
  const [category, setCategory] = useState('Todos')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  // Títulos autogenerados (videos de Cloudinary) se traducen; los de videos.js se muestran tal cual.
  const videoTitle = (video) => video.autoTitle
    ? t('gallery.videoTitle', { category: t(`gallery.categories.${video.category}`) || video.category, n: video.autoTitle })
    : video.title
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
  <section id="gallery" className="section-padding bg-dj-gray overflow-hidden">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6 pb-1 leading-tight">
          <span className="text-gradient">{t('gallery.title')}</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {t('gallery.subtitle')}
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-8" role="group" aria-label={t('gallery.filtersAria')}>
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
            {item === 'Todos' ? t('gallery.all') : (t(`gallery.categories.${item}`) || item)}
          </button>
        ))}
      </div>

      <div
        ref={carouselRef}
        role="region"
        aria-roledescription={t('gallery.carouselRole')}
        aria-label={t('gallery.carouselAria')}
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
            aria-label={t('gallery.prevVideoNamed', { title: previousVideo.title })}
            className="hidden md:block relative shrink-0 w-28 lg:w-36 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black opacity-60 hover:opacity-100 transition-opacity"
          >
            <VideoPoster poster={previousVideo.poster} title="" type={previousVideo.type} className="w-full h-full object-cover" />
          </button>

          <div className={`relative w-full min-w-0 ${currentVideo.orientation === 'landscape' ? 'max-w-xl' : 'max-w-[22.5rem] md:max-w-[min(22.5rem,32svh)]'}`}>
            <div className="absolute -inset-3 bg-dj-gold/15 blur-2xl rounded-[2rem] pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              {/* Immediately unmount the old player to stop and release its video. */}
              <GalleryVideo key={currentVideo.id} {...currentVideo} title={videoTitle(currentVideo)} onPlaybackChange={setIsPlaying} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label={t('gallery.nextVideoNamed', { title: nextVideo.title })}
            className="hidden md:block relative shrink-0 w-28 lg:w-36 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black opacity-60 hover:opacity-100 transition-opacity"
          >
            <VideoPoster poster={nextVideo.poster} title="" type={nextVideo.type} className="w-full h-full object-cover" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-5 mt-6">
          <button type="button" onClick={() => move(-1)} aria-label={t('gallery.prevVideo')} className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-xl">
            <span aria-hidden="true">←</span>
          </button>
          <div className="text-center min-w-0" aria-live={canAdvance ? 'off' : 'polite'} aria-atomic="true">
            <p className="text-sm text-white">{videoTitle(currentVideo)}</p>
            <p className="text-sm text-gray-300 mt-1">{t('gallery.counter', { n: activeIndex + 1, total: videos.length })}</p>
          </div>
          <button type="button" onClick={() => move(1)} aria-label={t('gallery.nextVideo')} className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-xl">
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-1 max-w-2xl mx-auto mt-3" role="group" aria-label={t('gallery.pickVideo')}>
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={t('gallery.goTo', { n: index + 1, title: videoTitle(video) })}
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
          {autoplayEnabled ? t('gallery.pauseAuto') : t('gallery.resumeAuto')}
        </button>
      </div>
    </div>
  </section>
)
}

export default Gallery
