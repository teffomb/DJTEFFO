# Guía de contenido – DJ TEFFO

Todo el contenido real sale de `src/data/`. Si una lista está vacía, su sección se oculta sola.
Tras editar: `npm run build` (o `npm run dev` para verlo en vivo) y commit/push a `master`.

## Agregar un video (`src/data/videos.js`)
```js
{ url: 'https://www.youtube.com/shorts/XXXXXXXXXXX', category: 'Noches Latinas', title: 'Noche latina en Madison', featured: true },
```
- `url`: YouTube (incl. Shorts), Google Drive (compartido como "Cualquier persona con el enlace"), Instagram (reel/post), TikTok (link largo con `/video/ID`; los `vm.tiktok.com` no sirven) o MP4 directo.
- `category`: `Eventos Privados` | `Cumpleaños` | `Quinceañeras` | `Bodas` | `Noches Latinas`.
- `featured: true` los pone primero (gente bailando / tú tocando).
- `poster` (opcional) para Drive/Instagram/TikTok/MP4; YouTube trae su miniatura.
- Una URL no reconocida se omite (en `npm run dev` avisa en la consola).

## Agregar un mix (`src/data/mixes.js`)
```js
{ title: 'Reggaetón Mix 2026', type: 'Reggaetón', url: 'https://soundcloud.com/djteffo/nombre-del-mix' },
```
SoundCloud o Mixcloud; la plataforma se detecta por la URL. Con al menos un mix aparecen la sección Mixes y el botón "Escucha mis mixes" del hero.

## Agregar un testimonio (`src/data/testimonials.js`)
```js
{ name: 'Nombre', event: 'Boda', text: 'Texto real…', date: 'Mayo 2026', image: 'testimonials/captura1.jpg' },
```
`date` e `image` son opcionales. La captura (por ejemplo de WhatsApp) va en `public/testimonials/`. Solo testimonios reales.

## Otros archivos
| Qué | Dónde |
|---|---|
| Stats (eventos, años…) | `src/data/stats.js` (+ texto en `src/i18n/es.js` y `en.js`, clave `stats.<id>`) |
| Redes, teléfono, correo | `src/data/socials.js` (TikTok/Mixcloud con `url: null` no se muestran) |
| ID de Formspree, ruta del EPK, video del hero | `src/data/config.js` |
| Géneros | `src/data/genres.js` |
| Todo el texto del sitio (ES/EN) | `src/i18n/es.js` y `src/i18n/en.js` (mismas claves en ambos) |
| EPK | `public/epk/DJ-TEFFO-EPK.pdf` (el botón aparece solo si existe al hacer build; reinicia `npm run dev` si lo agregas) |
| Imagen de previews (WhatsApp/IG) | `public/og-image.jpg` (1200×630) |

## Links útiles
- Forzar idioma: `https://teffomb.github.io/DJTEFFO/?lang=en` o `?lang=es`.
- Los previews de WhatsApp se cachean: si cambias `og-image.jpg`, puede tardar en actualizarse.
