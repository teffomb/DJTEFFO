// Detecta la plataforma de una URL de video y devuelve cómo reproducirla.
// Retorna { type, embedSrc?, src?, poster?, orientation } o null si no se reconoce.
// orientation: 'portrait' (9:16) | 'landscape' (16:9)

const YT_ID = /^[\w-]{11}$/

export function parseVideoUrl(rawUrl) {
  let u
  try { u = new URL(rawUrl) } catch (e) { return null }
  const host = u.hostname.replace(/^(www\.|m\.)/, '')
  const parts = u.pathname.split('/').filter(Boolean)

  // YouTube (watch, youtu.be, embed, shorts)
  if (host === 'youtu.be' || host === 'youtube.com' || host === 'music.youtube.com') {
    let id = null
    let shorts = false
    if (host === 'youtu.be') id = parts[0]
    else if (parts[0] === 'shorts') { id = parts[1]; shorts = true }
    else if (parts[0] === 'embed' || parts[0] === 'live') id = parts[1]
    else id = u.searchParams.get('v')
    if (!id || !YT_ID.test(id)) return null
    return {
      type: 'youtube',
      embedSrc: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`,
      poster: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      orientation: shorts ? 'portrait' : 'landscape',
    }
  }

  // Google Drive → /preview
  if (host === 'drive.google.com' || host === 'docs.google.com') {
    const m = u.pathname.match(/\/file\/d\/([\w-]+)/)
    const id = m ? m[1] : u.searchParams.get('id')
    if (!id) return null
    return {
      type: 'drive',
      embedSrc: `https://drive.google.com/file/d/${id}/preview`,
      orientation: 'portrait',
    }
  }

  // Instagram (reel / p / tv)
  if (host === 'instagram.com') {
    const i = parts.findIndex(p => ['reel', 'reels', 'p', 'tv'].includes(p))
    const code = i >= 0 ? parts[i + 1] : null
    if (!code) return null
    return {
      type: 'instagram',
      embedSrc: `https://www.instagram.com/reel/${code}/embed`,
      orientation: 'portrait',
    }
  }

  // TikTok (links largos; los vm.tiktok.com cortos no traen el ID)
  if (host === 'tiktok.com') {
    const i = parts.indexOf('video')
    const id = i >= 0 ? parts[i + 1] : null
    if (!id || !/^\d+$/.test(id)) return null
    return {
      type: 'tiktok',
      embedSrc: `https://www.tiktok.com/embed/v2/${id}`,
      orientation: 'portrait',
    }
  }

  // MP4 / WebM / MOV directo
  if (/\.(mp4|webm|mov|m4v)$/i.test(u.pathname)) {
    return { type: 'mp4', src: rawUrl, orientation: 'portrait' }
  }

  return null
}
