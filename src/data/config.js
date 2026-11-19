// Configuración de conversión.

// ID del formulario de Formspree (la parte final de https://formspree.io/f/XXXXXXXX).
// TODO(DATOS): pega aquí tu ID. Mientras esté vacío, el formulario abre tu app de correo (mailto) como fallback.
export const FORMSPREE_ID = ''

// Press Kit: coloca el PDF en public/epk/DJ-TEFFO-EPK.pdf. Si el archivo no existe, el botón se oculta.
export const EPK_FILE = 'epk/DJ-TEFFO-EPK.pdf'

// Video de fondo del hero (mp4 liviano, en loop, sin audio). Si `src` está vacío se mantienen los blobs animados.
// TODO(DATOS): src = URL del mp4 (ideal < 3 MB, 720p, sin audio; puede ir en public/videos/ → 'videos/hero.mp4')
//              poster = imagen de portada (ej. 'Images/hero-poster.jpg'); se muestra mientras carga y si el usuario reduce movimiento.
export const HERO_VIDEO = { src: '', poster: '' }
