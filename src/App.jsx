import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Testimonials from './components/Testimonials'

function App() {
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    // Ajustes básicos
    try {
      audioEl.volume = 0.8
      audioEl.loop = false
      audioEl.playsInline = true
    } catch (e) {
      // algunos navegadores pueden restringir propiedades hasta que el elemento esté listo
    }

    let didPlay = false

    const playOnce = () => {
      if (!audioEl || audioEl.dataset.played === 'true' || didPlay) return
      try {
        audioEl.currentTime = 0
      } catch (e) {}
      audioEl.volume = 0.8
      const playPromise = audioEl.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioEl.dataset.played = 'true'
          didPlay = true
        }).catch(() => {
          // Autoplay bloqueado; no marcar como reproducido aquí
        })
      }
    }

    // Intento inicial cuando el audio esté listo
    const onCanPlay = () => playOnce()
    audioEl.addEventListener('canplay', onCanPlay)

    // Fallback: reproducir en la primera interacción del usuario si no se pudo autoplay
    const onUserInteraction = () => playOnce()
    window.addEventListener('click', onUserInteraction)
    window.addEventListener('keydown', onUserInteraction)

    // Si ya está listo, intentar de inmediato
    if (audioEl.readyState >= 2) {
      playOnce()
    }

    return () => {
      audioEl.removeEventListener('canplay', onCanPlay)
      window.removeEventListener('click', onUserInteraction)
      window.removeEventListener('keydown', onUserInteraction)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dj-dark flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-dj-gold text-6xl mb-4">
            <i className="fas fa-music"></i>
          </div>
          <div className="text-dj-gold font-dj text-2xl">DJ TEFFO</div>
          <div className="mt-4">
            <div className="w-16 h-1 bg-dj-gold mx-auto animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    )
  }

  function ScrollManager() {
    const location = useLocation()

    useEffect(() => {
      if (location.hash) {
        const id = location.hash.replace('#', '')
        let attempts = 0
        const maxAttempts = 20
        const intervalMs = 150
        let timer = null

        const tryScroll = () => {
          attempts += 1
          const el = document.getElementById(id)
          if (el) {
            const nav = document.querySelector('nav')
            const navHeight = nav ? nav.offsetHeight : 80
            const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 10
            window.scrollTo({ top, behavior: 'smooth' })
            clearInterval(timer)
          } else if (attempts >= maxAttempts) {
            clearInterval(timer)
          }
        }

        timer = setInterval(tryScroll, intervalMs)
        tryScroll()
        return () => clearInterval(timer)
      }

      const scrollTop = () => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 30)
      }

      scrollTop()
    }, [location.pathname, location.hash])

    return null
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        {/* Reproductor de audio oculto en la app. Se intenta reproducir una sola vez al cargar; también hay fallback por interacción. */}
        <audio id="dj-audio" ref={audioRef} src="/Sounds/djteffo.mp3" preload="auto" />

        <ScrollManager />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <About />
                <Services />
                <Gallery />
                <Testimonials />
                <Footer />
              </motion.div>
            } />
            <Route
              path="/pricing"
              element={(
                <>
                  <Pricing />
                  <Footer />
                </>
              )}
            />
            <Route
              path="/contact"
              element={(
                <>
                  <Contact />
                  <Footer />
                </>
              )}
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
