import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n, LANGS } from '../i18n'

const LangToggle = ({ className = '' }) => {
  const { lang, setLang, t } = useI18n()
  const next = lang === 'es' ? 'en' : 'es'
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t('nav.switchTo')}
      className={`inline-flex items-center rounded-full border border-dj-gold/60 text-xs font-semibold overflow-hidden ${className}`}
    >
      {LANGS.map(code => (
        <span
          key={code}
          className={`px-3 py-1.5 ${code === lang ? 'bg-dj-gold text-dj-dark' : 'text-white'}`}
        >
          {code.toUpperCase()}
        </span>
      ))}
    </button>
  )
}

const Navbar = () => {
  const { lang, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ES: Precios + Contacto. EN: sin precios fijos, "Request a Quote" lleva al formulario.
  const navItems = [
    { name: t('nav.home'), path: '/', type: 'route' },
    { name: t('nav.about'), path: '#about', type: 'anchor' },
    { name: t('nav.services'), path: '#services', type: 'anchor' },
    { name: t('nav.gallery'), path: '#gallery', type: 'anchor' },
    ...(lang === 'es'
      ? [
          { name: t('nav.pricing'), path: '#pricing', type: 'anchor' },
          { name: t('nav.contact'), path: '#contact', type: 'anchor' }
        ]
      : [{ name: t('nav.pricing'), path: '#contact', type: 'anchor' }])
  ]

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const navHeight = navRef.current ? navRef.current.offsetHeight : 80
    const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 10
    window.scrollTo({ top, behavior: 'smooth' })
    try { window.history.replaceState(null, '', `#${id}`) } catch (e) {}
  }

  const handleAnchorClick = (e, path) => {
    e.preventDefault()
    setIsOpen(false)
    const id = path.replace('#', '')
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(id), 150)
    } else {
      scrollToId(id)
    }
  }

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dj-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-dj-gold text-2xl">
              <i className="fas fa-music"></i>
            </div>
            <span className="font-dj text-xl font-bold text-dj-gold">
              DJ TEFFO
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = item.type === 'route'
                ? location.pathname === item.path
                : location.hash === item.path

              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false)
                      // Si ya estamos en la misma ruta, hacer scroll arriba
                      if (location.pathname === item.path) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-dj-gold ${
                      isActive ? 'text-dj-gold' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              }

              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleAnchorClick(e, item.path)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-dj-gold ${
                    isActive ? 'text-dj-gold' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </div>

          <LangToggle className="hidden md:inline-flex" />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
          <LangToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('nav.closeMenu') : t('nav.menu')}
            aria-expanded={isOpen}
            className="text-white hover:text-dj-gold transition-colors"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0
          }}
          className="md:hidden overflow-hidden bg-dj-gray/95 backdrop-blur-sm"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => {
              const isActive = item.type === 'route'
                ? location.pathname === item.path
                : location.hash === item.path

              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false)
                      if (location.pathname === item.path) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className={`block px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-dj-gold ${
                      isActive ? 'text-dj-gold' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              }

              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleAnchorClick(e, item.path)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-dj-gold ${
                    isActive ? 'text-dj-gold' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
