import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTOPLAY_MS = 3000

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 95 : -95,
    opacity: 0,
    scale: 0.94,
    rotateZ: direction > 0 ? 1.4 : -1.4,
    filter: 'blur(5px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    filter: 'blur(0px)',
  },
  exit: (direction) => ({
    x: direction > 0 ? -95 : 95,
    opacity: 0,
    scale: 0.94,
    rotateZ: direction > 0 ? -1.4 : 1.4,
    filter: 'blur(5px)',
  }),
}

const extractYouTubeId = (url) => {
  if (!url) return ''

  const match = url.match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )

  return match ? match[1] : ''
}

const toEmbedUrl = (url) => {
  const id = extractYouTubeId(url)
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : ''
}

const toPreviewEmbedUrl = (url) => {
  const id = extractYouTubeId(url)
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=1&fs=1&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1`
    : ''
}

const toThumbnailUrl = (url) => {
  const id = extractYouTubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
}

const Gallery = () => {
  const videosPorCategoria = {
    Cumpleaños: [
      { id: 'v1', youtubeUrl: 'https://youtube.com/shorts/0nq2vyIoDqM', alt: 'Fiesta' },
      { id: 'v2', youtubeUrl: 'https://youtube.com/shorts/1fdOgiXVIO0', alt: 'Fiesta 1' },
    ],
    Infantil: [
      { id: 'v3', youtubeUrl: 'https://youtube.com/shorts/cAb1_qhATSI', alt: 'Evento Infantil' },
    ],
    Privado: [
      { id: 'v4', youtubeUrl: 'https://youtube.com/shorts/cN_o7Qlz7mY', alt: 'Show de Payaso' },
      { id: 'v5', youtubeUrl: 'https://youtube.com/shorts/Hry4_FGmao4', alt: 'Show de Payasa' },
      { id: 'v6', youtubeUrl: 'https://youtube.com/shorts/gWAykSiIKag', alt: 'Fiesta en Piscina' },
      { id: 'v7', youtubeUrl: 'https://youtube.com/shorts/JHBBKy5Og54', alt: 'Fiesta en Piscina 2' },
      { id: 'v8', youtubeUrl: 'https://youtube.com/shorts/H5oebJbpoDA', alt: 'Fiesta en Piscina 3' },
    ],
    XV: [
      { id: 'v9', youtubeUrl: 'https://youtube.com/shorts/Zw3dpGuH7fg', alt: 'Hora Loca' },
    ],
  }

  const categories = ['Todos', 'Cumpleaños', 'Privado', 'Infantil', 'XV']
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [previewId, setPreviewId] = useState(null)

  const filteredVideos = useMemo(() => {
    const items =
      selectedCategory === 'Todos'
        ? Object.values(videosPorCategoria).flat()
        : videosPorCategoria[selectedCategory] || []

    return items
      .map((video) => ({
        ...video,
        embedUrl: toEmbedUrl(video.youtubeUrl),
        previewEmbedUrl: toPreviewEmbedUrl(video.youtubeUrl),
        thumbnailUrl: toThumbnailUrl(video.youtubeUrl),
      }))
      .filter((video) => video.embedUrl)
  }, [selectedCategory])

  useEffect(() => {
    setActiveIndex(0)
    setSlideDirection(1)
    setIsCarouselPaused(false)
    setPreviewId(null)
  }, [selectedCategory])

  const currentVideo = filteredVideos[activeIndex]

  const getWrappedIndex = (index) => {
    if (!filteredVideos.length) return 0
    return (index + filteredVideos.length) % filteredVideos.length
  }

  const prevIndex = filteredVideos.length > 1 ? getWrappedIndex(activeIndex - 1) : null
  const nextIndex = filteredVideos.length > 1 ? getWrappedIndex(activeIndex + 1) : null
  const prevVideo = prevIndex !== null ? filteredVideos[prevIndex] : null
  const nextVideo = nextIndex !== null ? filteredVideos[nextIndex] : null

  useEffect(() => {
    const canAutoplay = filteredVideos.length > 1 && !isCarouselPaused
    if (!canAutoplay) return undefined

    const timer = setInterval(() => {
      setSlideDirection(1)
      setActiveIndex((prev) => (prev === filteredVideos.length - 1 ? 0 : prev + 1))
      setPreviewId(null)
    }, AUTOPLAY_MS)

    return () => clearInterval(timer)
  }, [filteredVideos.length, isCarouselPaused])

  const goToSlide = (index) => {
    if (!filteredVideos.length) return
    const normalizedIndex = getWrappedIndex(index)
    const total = filteredVideos.length
    const forwardSteps = (normalizedIndex - activeIndex + total) % total
    const backwardSteps = (activeIndex - normalizedIndex + total) % total
    setSlideDirection(forwardSteps <= backwardSteps ? 1 : -1)
    setIsCarouselPaused(true)
    setActiveIndex(normalizedIndex)
    setPreviewId(null)
  }

  const prevSlide = () => {
    if (!filteredVideos.length) return
    setSlideDirection(-1)
    setIsCarouselPaused(true)
    setActiveIndex((prev) => (prev === 0 ? filteredVideos.length - 1 : prev - 1))
    setPreviewId(null)
  }

  const nextSlide = () => {
    if (!filteredVideos.length) return
    setSlideDirection(1)
    setIsCarouselPaused(true)
    setActiveIndex((prev) => (prev === filteredVideos.length - 1 ? 0 : prev + 1))
    setPreviewId(null)
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
            Ahora los videos se reproducen directamente desde YouTube para mayor compatibilidad.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${selectedCategory === cat ? 'bg-dj-gold text-dj-dark' : 'bg-neutral-800 text-white hover:bg-dj-gold/70 hover:text-dj-dark'}`}
              onClick={() => setSelectedCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {!currentVideo ? (
          <p className="text-center text-gray-300">No hay videos disponibles en esta categoría.</p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div
              className="flex items-center justify-center gap-3 md:gap-5"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              {prevVideo ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsCarouselPaused(true)
                    goToSlide(prevIndex)
                  }}
                  className="hidden md:block relative w-28 lg:w-36 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black/80 opacity-65 blur-[1.5px] hover:opacity-90 hover:scale-[1.02] transition duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                  aria-label={`Ver video anterior: ${prevVideo.alt}`}
                >
                  <img
                    src={prevVideo.thumbnailUrl}
                    alt={prevVideo.alt}
                    className="w-full h-full object-cover scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                </button>
              ) : (
                <div className="hidden md:block w-28 lg:w-36" />
              )}

              <div className="relative w-[80vw] max-w-[360px]">
                <div className="absolute -inset-3 bg-dj-gold/15 blur-2xl rounded-[2rem] pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                  <div className="relative aspect-[9/16] bg-black overflow-hidden">
                    <AnimatePresence mode="sync" initial={false} custom={slideDirection}>
                      <motion.div
                        key={currentVideo.id}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                        onMouseEnter={() => {
                          setIsCarouselPaused(true)
                          setPreviewId(currentVideo.id)
                        }}
                        onMouseLeave={() => {
                          setPreviewId(null)
                          setIsCarouselPaused(false)
                        }}
                      >
                        <iframe
                          src={previewId === currentVideo.id ? currentVideo.previewEmbedUrl : currentVideo.embedUrl}
                          title={currentVideo.alt}
                          className="w-full h-full"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

                        <div className="absolute bottom-4 right-4 bg-dj-gold text-dj-dark text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                          {activeIndex + 1}/{filteredVideos.length}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                    aria-label="Video anterior"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                    aria-label="Siguiente video"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>

                  {filteredVideos.length > 1 && (
                    <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-white/5 overflow-hidden">
                      {!isCarouselPaused ? (
                        <motion.div
                          key={`${currentVideo.id}-progress`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                          className="h-full bg-dj-gold/55"
                        />
                      ) : (
                        <div className="h-full w-0 bg-dj-gold/55" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {nextVideo ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsCarouselPaused(true)
                    goToSlide(nextIndex)
                  }}
                  className="hidden md:block relative w-28 lg:w-36 aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black/80 opacity-65 blur-[1.5px] hover:opacity-90 hover:scale-[1.02] transition duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                  aria-label={`Ver siguiente video: ${nextVideo.alt}`}
                >
                  <img
                    src={nextVideo.thumbnailUrl}
                    alt={nextVideo.alt}
                    className="w-full h-full object-cover scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/55 via-black/25 to-transparent" />
                </button>
              ) : (
                <div className="hidden md:block w-28 lg:w-36" />
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-5">
              <div className="flex items-center justify-center gap-2">
                {filteredVideos.map((video, index) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all ${activeIndex === index ? 'w-9 bg-dj-gold' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                    aria-label={`Ir al video ${index + 1} de ${filteredVideos.length}`}
                    aria-current={activeIndex === index ? 'true' : 'false'}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300">
                Video {activeIndex + 1} de {filteredVideos.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
