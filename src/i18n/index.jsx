import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import es from './es'
import en from './en'

const dictionaries = { es, en }
const STORAGE_KEY = 'djteffo-lang'
export const LANGS = ['es', 'en']

// ?lang= en la URL > preferencia guardada > idioma del navegador (es* → ES, cualquier otro → EN).
function detectLang() {
  // ?lang=es|en fuerza el idioma (útil para compartir links) y lo guarda.
  try {
    const forced = new URLSearchParams(window.location.search).get('lang')
    if (forced && dictionaries[forced]) {
      try { localStorage.setItem(STORAGE_KEY, forced) } catch (e) { /* ignorar */ }
      return forced
    }
  } catch (e) { /* sin window/URL */ }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && dictionaries[saved]) return saved
  } catch (e) { /* storage no disponible */ }
  const nav = (typeof navigator !== 'undefined' && (navigator.languages?.[0] || navigator.language)) || 'es'
  return nav.toLowerCase().startsWith('es') ? 'es' : 'en'
}

const lookup = (dict, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)

const I18nContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  const setLang = useCallback((next) => {
    if (!dictionaries[next]) return
    setLangState(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch (e) { /* ignorar */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    const meta = dictionaries[lang].meta
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.description)
  }, [lang])

  const value = useMemo(() => {
    // t('a.b') → string | array | objeto. Si falta en el idioma actual, cae a ES y luego a la clave.
    const t = (path, vars) => {
      let v = lookup(dictionaries[lang], path)
      if (v === undefined) v = lookup(dictionaries.es, path)
      if (v === undefined) return path
      if (typeof v === 'string' && vars) {
        return v.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`))
      }
      return v
    }
    return { lang, setLang, t, locale: lang === 'es' ? 'es-PE' : 'en-US' }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <LanguageProvider>')
  return ctx
}
