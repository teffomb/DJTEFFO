import React, { useEffect, useMemo, useRef, useState } from 'react'
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

const Gallery = () => {
  const videosPorCategoria = {
    Cumpleaños: [
      { id: 'v1', src: '/videos/fiesta.mp4', alt: 'Fiesta' },
      { id: 'v2', src: '/videos/fiesta1.mp4', alt: 'Fiesta 1' },
    ],
    Infantil: [
      { id: 'v3', src: '/videos/infantil.mp4', alt: 'Evento Infantil' },
    ],
    Privado: [
      { id: 'v4', src: '/videos/payaso.mp4', alt: 'Show de Payaso' },
      { id: 'v5', src: '/videos/payasa.mp4', alt: 'Show de Payasa' },
      { id: 'v6', src: '/videos/piscina.mp4', alt: 'Fiesta en Piscina' },
      { id: 'v7', src: '/videos/piscina2.mp4', alt: 'Fiesta en Piscina 2' },
      { id: 'v8', src: '/videos/piscina3.mp4', alt: 'Fiesta en Piscina 3' },
    ],
    XV: [
      { id: 'v9', src: '/videos/hora_loca.mp4', alt: 'Hora Loca' },
    ],
  }

  const categories = ['Todos', 'Cumpleaños', 'Privado', 'Infantil', 'XV']
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [previewId, setPreviewId] = useState(null)
  const [playingId, setPlayingId] = useState(null)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)

  const videoRefs = useRef({})

  const filteredVideos = useMemo(() => {
    return selectedCategory === 'Todos'
      ? Object.values(videosPorCategoria).flat()
      : videosPorCategoria[selectedCategory] || []
  }, [selectedCategory])

  useEffect(() => {
    setActiveIndex(0)
    setSlideDirection(1)
    setPreviewId(null)
    setPlayingId(null)
    setIsCarouselPaused(false)

    // Asegura que ningún video quede reproduciéndose al cambiar de categoría.
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (!videoEl) return
      videoEl.pause()
      videoEl.currentTime = 0
      videoEl.controls = false
      videoEl.muted = true
      videoEl.loop = false
    })
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

  const stopAllVideos = () => {
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (!videoEl) return
      videoEl.pause()
      videoEl.currentTime = 0
      videoEl.controls = false
      videoEl.muted = true
      videoEl.loop = false
    })
  }

  useEffect(() => {
    const canAutoplay = filteredVideos.length > 1 && !isCarouselPaused && !playingId
    if (!canAutoplay) return undefined

    const timer = setInterval(() => {
      setSlideDirection(1)
      setActiveIndex((prev) => (prev === filteredVideos.length - 1 ? 0 : prev + 1))
      setPreviewId(null)
      stopAllVideos()
    }, AUTOPLAY_MS)

    return () => clearInterval(timer)
  }, [filteredVideos.length, isCarouselPaused, playingId])

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
    setPlayingId(null)
    stopAllVideos()
  }

  const startPreview = (videoId) => {
    if (!videoId || playingId === videoId) return
    setIsCarouselPaused(true)
    stopAllVideos()
    const videoEl = videoRefs.current[videoId]
    if (!videoEl) return

    videoEl.muted = true
    videoEl.controls = false
    videoEl.loop = true
    videoEl.currentTime = 0
    setPreviewId(videoId)
    setPlayingId(null)

    videoEl.play().catch(() => {
      // Si el navegador bloquea la reproducción automática, dejamos el frame inicial.
    })
  }

  const stopPreview = (videoId) => {
    if (!videoId || previewId !== videoId) return
    const videoEl = videoRefs.current[videoId]
    if (!videoEl) return

    videoEl.pause()
    videoEl.currentTime = 0
    videoEl.loop = false
    setPreviewId(null)
    setIsCarouselPaused(false)
  }

  const playWithSound = (videoId) => {
    if (!videoId) return
    setIsCarouselPaused(true)

    const videoEl = videoRefs.current[videoId]
    if (!videoEl) return

    // Si ya es el video activo, hacemos toggle play/pause sin reiniciar.
    if (playingId === videoId) {
      if (videoEl.paused) {
        const resumePromise = videoEl.play()
        if (resumePromise !== undefined) {
          resumePromise
            .then(() => {
              setPlayingId(videoId)
              videoEl.controls = true
            })
            .catch(() => {
              setPlayingId(videoId)
              videoEl.controls = true
            })
        }
      } else {
        videoEl.pause()
        setPlayingId(videoId)
        videoEl.controls = true
      }
      return
    }

    stopAllVideos()

    setPreviewId(null)
    setPlayingId(null)
    videoEl.currentTime = 0
    videoEl.muted = false
    videoEl.controls = false
    videoEl.loop = false

    const playPromise = videoEl.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlayingId(videoId)
          videoEl.controls = true
        })
        .catch(() => {
          setPlayingId(videoId)
          videoEl.controls = true
        })
    } else {
      setPlayingId(videoId)
      videoEl.controls = true
    }
  }

  const prevSlide = () => {
    if (!filteredVideos.length) return
    setSlideDirection(-1)
    setIsCarouselPaused(true)
    setActiveIndex((prev) => (prev === 0 ? filteredVideos.length - 1 : prev - 1))
    setPreviewId(null)
    setPlayingId(null)
    stopAllVideos()
  }

  const nextSlide = () => {
    if (!filteredVideos.length) return
    setSlideDirection(1)
    setIsCarouselPaused(true)
    setActiveIndex((prev) => (prev === filteredVideos.length - 1 ? 0 : prev + 1))
    setPreviewId(null)
    setPlayingId(null)
    stopAllVideos()
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
            Ahora puedes previsualizar cada video y abrirlo con sonido al hacer click.
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
                  <video
                    src={prevVideo.src}
                    className="w-full h-full object-cover scale-105"
                    muted
                    playsInline
                    preload="metadata"
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
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[currentVideo.id] = el
                          }}
                          src={currentVideo.src}
                          className="w-full h-full object-cover"
                          preload="auto"
                          controls={playingId === currentVideo.id}
                          muted={playingId !== currentVideo.id}
                          playsInline
                          onMouseEnter={() => startPreview(currentVideo.id)}
                          onMouseLeave={() => stopPreview(currentVideo.id)}
                          onFocus={() => startPreview(currentVideo.id)}
                          onBlur={() => stopPreview(currentVideo.id)}
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            playWithSound(currentVideo.id)
                          }}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

                        <div className="absolute top-4 left-4 bg-black/65 text-white text-xs md:text-sm px-3 py-1 rounded-full">
                          {previewId === currentVideo.id ? 'Vista previa (sin sonido)' : 'Haz click para reproducir con sonido'}
                        </div>
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
                      {!isCarouselPaused && !playingId ? (
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
                  <video
                    src={nextVideo.src}
                    className="w-full h-full object-cover scale-105"
                    muted
                    playsInline
                    preload="metadata"
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
