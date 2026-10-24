import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const ServicePreview = ({ services, activeIndex, onNavigate, onClose }) => {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(document.activeElement)
  const service = services[activeIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()

    return () => {
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="service-preview-title"
      aria-describedby="service-preview-description"
      className="fixed left-[50svw] top-[50svh] right-auto bottom-auto m-0 -translate-x-1/2 -translate-y-1/2 w-[calc(100svw_-_2rem)] max-w-3xl max-h-[calc(100svh_-_2rem)] overflow-y-auto rounded-3xl border border-dj-gold/30 bg-dj-gray p-0 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      onClose={onClose}
      onClick={event => {
        if (event.target === event.currentTarget) dialogRef.current.close()
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          onNavigate(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-dj-gray px-6 py-3">
        <p className="text-sm text-gray-300">Servicio {activeIndex + 1} de {services.length}</p>
        <button
          type="button"
          autoFocus
          aria-label="Cerrar vista previa"
          onClick={() => dialogRef.current.close()}
          className="flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full text-2xl hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dj-gold"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="px-6 py-6 sm:px-10 sm:py-8" aria-live="polite" aria-atomic="true">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-dj-gold to-dj-electric-blue rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <i className={`${service.icon} text-4xl text-dj-dark`} />
          </div>
          <h2 id="service-preview-title" className="text-2xl md:text-4xl font-dj font-bold text-dj-gold mb-4">
            {service.title}
          </h2>
          <p id="service-preview-description" className="text-base md:text-lg text-gray-300 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-dj-dark/40 p-6">
          <h3 className="text-lg font-semibold text-dj-gold mb-4">Incluye:</h3>
          <ul className="space-y-3">
            {service.features.map(feature => (
              <li key={feature} className="flex items-start gap-3 text-base md:text-lg text-gray-200 leading-relaxed">
                <span className="w-2 h-2 shrink-0 rounded-full bg-dj-gold mt-2" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sticky bottom-0 flex justify-between gap-4 border-t border-white/10 bg-dj-gray px-6 py-4">
        <button type="button" aria-label="Servicio anterior" onClick={() => onNavigate(-1)} className="flex items-center justify-center gap-3 min-h-[44px] px-4 rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dj-gold">
          <span aria-hidden="true">←</span> Anterior
        </button>
        <button type="button" aria-label="Servicio siguiente" onClick={() => onNavigate(1)} className="flex items-center justify-center gap-3 min-h-[44px] px-4 rounded-full bg-dj-gold text-dj-dark hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          Siguiente <span aria-hidden="true">→</span>
        </button>
      </div>
    </dialog>,
    document.body
  )
}

export default ServicePreview
