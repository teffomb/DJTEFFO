// Videos EXTERNOS de la galería. Edita este archivo para agregar uno.
//
// Campos:
//   url       (obligatorio) YouTube (incl. Shorts), Google Drive, Instagram (reel/post),
//             TikTok (link largo, con /video/ID) o MP4 directo.
//             Drive: el archivo debe estar compartido como "Cualquier persona con el enlace".
//   category  (obligatorio) una de: 'Eventos Privados' | 'Cumpleaños' | 'Quinceañeras' | 'Bodas' | 'Noches Latinas'
//   title     (obligatorio) título que se muestra bajo el video
//   featured  true para los videos principales (gente bailando / tú tocando): salen primero
//   poster    (opcional) imagen de portada (URL o ruta en public/, ej. 'Images/portada1.jpg').
//             YouTube genera su miniatura sola; para los demás sin poster se muestra un placeholder.
//   orientation (opcional) 'portrait' | 'landscape' para forzar el formato
//
// TODO(DATOS): agrega aquí tus videos reales. Ejemplo:
// { url: 'https://www.youtube.com/shorts/XXXXXXXXXXX', category: 'Noches Latinas', title: 'Noche latina en Madison', featured: true },
export const externalVideos = []
