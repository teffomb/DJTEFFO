import React from 'react'
import { useI18n } from '../i18n'
import { whatsappUrl } from '../data/socials'

// Botón flotante abajo a la derecha con mensaje prellenado según el idioma.
const WhatsAppFloat = () => {
  const { t } = useI18n()
  return (
    <a
      href={whatsappUrl(t('contact.whatsappMsg'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('contact.whatsappFloat')}
      title={t('contact.whatsappFloat')}
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-black/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
    >
      <i className="fab fa-whatsapp text-3xl" aria-hidden="true"></i>
    </a>
  )
}

export default WhatsAppFloat
