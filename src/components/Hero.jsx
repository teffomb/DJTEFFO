import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    // Presets estáticos para cada mitad (no siguen el cursor)
    const presets = {
      left: {
        '--pos1-x': '15%',
        '--pos1-y': '20%',
        '--pos2-x': '30%',
        '--pos2-y': '70%',
        '--pos3-x': '60%',
        '--pos3-y': '80%',
        '--pos4-x': '75%',
        '--pos4-y': '25%'
      },
      right: {
        '--pos1-x': '65%',
        '--pos1-y': '20%',
        '--pos2-x': '85%',
        '--pos2-y': '70%',
        '--pos3-x': '25%',
        '--pos3-y': '80%',
        '--pos4-x': '10%',
        '--pos4-y': '25%'
      }
    }

    let currentSide = null

    const applyPreset = (side) => {
      const p = presets[side]
      if (!p) return
      Object.keys(p).forEach(key => el.style.setProperty(key, p[key]))
      el.dataset.side = side
    }

    // Versión sin suavizado: aplicar preset inmediatamente cuando se detecte el lado
    const onEnter = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const side = relX < rect.width / 2 ? 'left' : 'right'
      if (side !== currentSide) {
        currentSide = side
        applyPreset(side)
      }
      el.dataset.active = 'true'
    }

    // Mientras el mouse se mueva dentro del hero, solo comprobaremos si cruza la mitad
    const onMoveCheckSide = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const side = relX < rect.width / 2 ? 'left' : 'right'
      if (side !== currentSide) {
        currentSide = side
        applyPreset(side)
      }
    }

    const onLeave = () => {
      el.dataset.active = 'false'
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMoveCheckSide)
    el.addEventListener('mouseleave', onLeave)

    // Inicializar con la posición izquierda por defecto, sin activar el glow
    applyPreset('left')
    el.dataset.active = 'false'

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMoveCheckSide)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section ref={heroRef} className="hero min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dj-dark via-dj-gray to-dj-dark"></div>
      
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-dj-gold/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-dj-electric-blue/10 rounded-full blur-xl"
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-dj-gold text-8xl mb-8"
          >
            <i className="fas fa-music"></i>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-dj font-bold mb-6"
          >
            <span className="text-gradient">DJ TEFFO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Transformando momentos ordinarios en experiencias extraordinarias
            <br />
            <span className="text-dj-gold font-semibold">
              Música • Entretenimiento • Diversión
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/pricing"
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <i className="fas fa-dollar-sign"></i>
              <span>Ver Precios</span>
            </Link>
            
            <Link
              to="/contact"
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <i className="fas fa-envelope"></i>
              <span>Contáctame</span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="text-dj-gold text-2xl">
              <i className="fas fa-chevron-down"></i>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
