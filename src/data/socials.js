// Contacto y redes. Una red con `url: null` NO se muestra en ningún lado.
export const PHONE_E164 = '51922798039'      // para wa.me (sin + ni espacios)
export const PHONE_DISPLAY = '+51 922798039'
export const EMAIL = 'djdang45@gmail.com'

export const whatsappUrl = (message) =>
  `https://wa.me/${PHONE_E164}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const socials = [
  { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/idk.teffo/', color: 'bg-pink-500', hover: 'hover:bg-pink-500' },
  { id: 'youtube', name: 'YouTube', icon: 'fab fa-youtube', url: 'https://www.youtube.com/@DjTeffo-in5mt', color: 'bg-red-600', hover: 'hover:bg-red-600' },
  { id: 'soundcloud', name: 'SoundCloud', icon: 'fab fa-soundcloud', url: 'https://soundcloud.com/djteffo', color: 'bg-orange-500', hover: 'hover:bg-orange-500' },
  // TODO(DATOS): URL real de TikTok, ej. 'https://www.tiktok.com/@usuario'
  { id: 'tiktok', name: 'TikTok', icon: 'fab fa-tiktok', url: null, color: 'bg-neutral-700', hover: 'hover:bg-neutral-600' },
  // TODO(DATOS): URL real de Mixcloud (opcional)
  { id: 'mixcloud', name: 'Mixcloud', icon: 'fab fa-mixcloud', url: null, color: 'bg-sky-600', hover: 'hover:bg-sky-600' },
]

export const visibleSocials = socials.filter(s => s.url)
