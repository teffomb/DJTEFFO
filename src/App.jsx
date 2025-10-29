import React, { useState, useEffect } from 'react'
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

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
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
                <Footer />
              </motion.div>
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
