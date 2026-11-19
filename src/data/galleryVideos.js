import { externalVideos } from './videos'
import { parseVideoUrl } from '../utils/videoEmbed'

const CLOUDINARY_BASE = 'https://res.cloudinary.com/w4d4usk4/video/upload'

// Preserve each upload's version and public ID for both video and poster URLs.
const uploads = [
  { category: 'Eventos Privados', assets: [
    'v1792813515/IMG_0712',
    'v1792813516/IMG_0713',
    'v1792813516/IMG_0715',
    'v1792813521/IMG_0704_2',
    'v1792813518/IMG_4870',
    'v1792813530/IMG_2908',
  ] },
  { category: 'Cumpleaños', assets: [
    'v1792813523/IMG_7663',
    'v1792813524/IMG_7674',
    'v1792813524/IMG_7673',
    'v1792813522/IMG_5525',
    'v1792813527/IMG_5524',
    'v1792813531/IMG_6588',
    'v1792813529/IMG_1169',
    'v1792813528/IMG_8044',
  ] },
  { category: 'Quinceañeras', assets: [
    'v1792813523/IMG_7055',
    'v1792813516/IMG_1319',
  ] },
  { category: 'Animado', assets: [
    'v1792813520/IMG_1426',
    'v1792813528/IMG_1844',
  ] },
]

const BASE = import.meta.env.BASE_URL
const resolvePoster = (p) => (!p ? undefined : /^(https?:)?\/\//.test(p) ? p : `${BASE}${p.replace(/^\//, '')}`)

const cloudinaryVideos = uploads.flatMap(({ category, assets }) =>
  assets.map((asset, index) => ({
    id: asset,
    category,
    title: `${category} · Video ${index + 1}`,
    type: 'mp4',
    orientation: 'portrait',
    featured: false,
    src: `${CLOUDINARY_BASE}/c_limit,w_720,h_1280,vc_h264,q_auto,f_mp4/${asset}.mov`,
    poster: `${CLOUDINARY_BASE}/so_0,c_limit,w_360,h_640,q_auto,f_auto/${asset}.jpg`,
  }))
)

const external = externalVideos.flatMap((v) => {
  const parsed = parseVideoUrl(v.url)
  if (!parsed) {
    if (import.meta.env.DEV) console.warn('[videos.js] URL de video no soportada, se omite:', v.url)
    return []
  }
  return [{
    id: v.url,
    category: v.category,
    title: v.title,
    featured: !!v.featured,
    ...parsed,
    orientation: v.orientation || parsed.orientation,
    poster: resolvePoster(v.poster) || parsed.poster,
  }]
})

// Destacados primero (orden estable dentro de cada grupo).
export const galleryVideos = [...external, ...cloudinaryVideos]
  .map((v, i) => ({ v, i }))
  .sort((a, b) => (Number(b.v.featured) - Number(a.v.featured)) || (a.i - b.i))
  .map(({ v }) => v)

// Solo categorías que tienen al menos un video.
export const galleryCategories = [
  'Todos',
  ...[...new Set(galleryVideos.map(v => v.category))],
]
