import React, { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { EPK_FILE } from '../data/config'

// Solo se muestra si el PDF existe de verdad (en dev, el servidor responde index.html a rutas faltantes,
// por eso se valida el content-type).
const EpkButton = ({ className = '' }) => {
  const { t } = useI18n()
  const [exists, setExists] = useState(false)
  const href = `${import.meta.env.BASE_URL}${EPK_FILE}`

  useEffect(() => {
    let cancelled = false
    fetch(href, { method: 'HEAD' })
      .then(r => {
        const type = r.headers.get('content-type') || ''
        if (!cancelled) setExists(r.ok && type.includes('pdf'))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [href])

  if (!exists) return null
  return (
    <a href={href} download className={`btn-secondary inline-flex items-center justify-center ${className}`}>
      <i className="fas fa-file-pdf mr-2" aria-hidden="true"></i>
      {t('contact.epk')}
    </a>
  )
}

export default EpkButton
