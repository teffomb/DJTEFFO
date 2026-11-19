import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'

const PLATFORM_ICON = {
  youtube: 'fab fa-youtube',
  instagram: 'fab fa-instagram',
  tiktok: 'fab fa-tiktok',
  drive: 'fab fa-google-drive',
  mp4: 'fas fa-film',
}

// Portada o placeholder cuando la plataforma no ofrece miniatura.
export const VideoPoster = ({ poster, title, type, className = '', imgProps = {} }) =>
  poster ? (
    <img src={poster} alt={title} loading="lazy" decoding="async" className={className} {...imgProps} />
  ) : (
    <div className={`flex items-center justify-center bg-gradient-to-br from-dj-gray via-dj-light-gray to-dj-gray ${className}`} role="img" aria-label={title}>
      <i className={`${PLATFORM_ICON[type] || 'fas fa-film'} text-4xl text-dj-gold/70`} aria-hidden="true"></i>
    </div>
  )

// El video/iframe se monta solo tras hacer clic: no se descarga nada antes.
const GalleryVideo = ({ type, src, embedSrc, poster, title, orientation, onPlaybackChange }) => {
  const { t } = useI18n()
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const isFile = type === 'mp4'
  const aspect = orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16]'

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

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
    <div className={`relative ${aspect} bg-black`}>
      {started && isFile && (
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
          {t('gallery.unsupported')}
        </video>
      )}
      {started && !isFile && (
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      {!started && (
        <button
          type="button"
          className="relative block w-full h-full group focus-visible:outline focus-visible:outline-2 focus-visible:outline-dj-gold focus-visible:-outline-offset-4"
          aria-label={t('gallery.play', { title })}
          onClick={() => {
            onPlaybackChange?.(true)
            setStarted(true)
          }}
        >
          <VideoPoster
            poster={poster}
            title={title}
            type={type}
            className="w-full h-full object-cover"
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
          <p>{t('gallery.failed')}</p>
          <button type="button" className="btn-primary" onClick={() => {
            setFailed(false)
            setStarted(false)
          }}>
            {t('gallery.retry')}
          </button>
        </div>
      )}
    </div>
  )
}

export default GalleryVideo
