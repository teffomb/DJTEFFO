import React, { useEffect, useRef, useState } from 'react'

// Each carousel slide can use this player without downloading its video upfront.
const GalleryVideo = ({ src, poster, title, onPlaybackChange }) => {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    })
    const pauseWhenHidden = () => {
      if (document.hidden) video.pause()
    }
    observer.observe(video)
    document.addEventListener('visibilitychange', pauseWhenHidden)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [started, src])

  return (
    <div className="relative aspect-[9/16] bg-black">
      {started ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={title}
          className="w-full h-full object-contain"
          controls
          playsInline
          autoPlay
          preload="none"
          onPlay={() => onPlaybackChange?.(true)}
          onPause={() => onPlaybackChange?.(false)}
          onEnded={() => onPlaybackChange?.(false)}
          onError={() => {
            setFailed(true)
            onPlaybackChange?.(false)
          }}
        >
          Tu navegador no puede reproducir este video.
        </video>
      ) : (
        <button
          type="button"
          className="relative block w-full h-full group focus-visible:outline focus-visible:outline-2 focus-visible:outline-dj-gold focus-visible:-outline-offset-4"
          aria-label={`Reproducir: ${title}`}
          onClick={() => {
            onPlaybackChange?.(true)
            setStarted(true)
          }}
        >
          <img
            src={poster}
            alt={title}
            width="360"
            height="640"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/15">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-dj-gold text-dj-dark text-2xl shadow-lg group-hover:bg-yellow-400" aria-hidden="true">
              ▶
            </span>
          </span>
        </button>
      )}
      {failed && (
        <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/90 p-6 text-center">
          <p>No se pudo cargar el video. Inténtalo de nuevo.</p>
          <button type="button" className="btn-primary" onClick={() => {
            setFailed(false)
            setStarted(false)
          }}>
            Volver a intentar
          </button>
        </div>
      )}
    </div>
  )
}

export default GalleryVideo
