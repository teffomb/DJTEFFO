import React from 'react'
import { useI18n } from '../i18n'
import { EPK_FILE } from '../data/config'

// __EPK_EXISTS__ lo define vite.config.js: solo se muestra si public/epk/DJ-TEFFO-EPK.pdf existe al hacer build.
/* global __EPK_EXISTS__ */
const EpkButton = ({ className = '' }) => {
  const { t } = useI18n()
  if (!__EPK_EXISTS__) return null
  return (
    <a
      href={`${import.meta.env.BASE_URL}${EPK_FILE}`}
      download
      className={`btn-secondary inline-flex items-center justify-center ${className}`}
    >
      <i className="fas fa-file-pdf mr-2" aria-hidden="true"></i>
      {t('contact.epk')}
    </a>
  )
}

export default EpkButton
