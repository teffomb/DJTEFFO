import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    servicios: [
      { name: 'Bodas', path: '/#services' },
      { name: 'Cumpleaños', path: '/#services' },
      { name: 'Eventos Corporativos', path: '/#services' },
      { name: 'Eventos Infantiles', path: '/#services' }
    ],
    empresa: [
      { name: 'Sobre Mí', path: '/#about' },
      { name: 'Galería', path: '/#gallery' },
      { name: 'Testimonios', path: '/#testimonials' },
      { name: 'Precios', path: '/pricing' }
    ],
    contacto: [
      { name: 'Contacto', path: '/contact' },
      { name: 'WhatsApp', path: 'https://wa.me/+1234567890' },
      { name: 'Instagram', path: 'https://instagram.com/djprofessional' },
      { name: 'Facebook', path: 'https://facebook.com/djprofessional' }
    ]
  }

  const socialLinks = [
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/51922798039?text=Hola%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20DJ%20%F0%9F%98%81', color: 'hover:bg-green-500' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/dj_teffo/', color: 'hover:bg-pink-500' },
    { icon: 'fab fa-youtube', url: 'https://www.youtube.com/@DjTeffo-in5mt', color: 'hover:bg-red-600' }
  ]

  return (
    <footer className="bg-dj-gray border-t border-dj-light-gray">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="text-dj-gold text-2xl">
                  <i className="fas fa-music"></i>
                </div>
                <span className="font-dj text-xl font-bold text-dj-gold">
                  DJ TEFFO
                </span>
              </div>
                             <p className="text-gray-300 mb-6 leading-relaxed">
                 Transformando momentos ordinarios en experiencias extraordinarias. 
                 Música de calidad y entretenimiento garantizado para todos tus eventos con DJ TEFFO.
               </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 bg-dj-light-gray rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color}`}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-dj font-bold text-dj-gold mb-6">
                Servicios
              </h3>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-dj-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-dj font-bold text-dj-gold mb-6">
                Empresa
              </h3>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-dj-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-dj font-bold text-dj-gold mb-6">
                Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dj-gold rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-dj-dark text-sm"></i>
                  </div>
                  <span className="text-gray-300 text-sm">
                    +51 922798039
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dj-gold rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-dj-dark text-sm"></i>
                  </div>
                  <span className="text-gray-300 text-sm">
                    djdang45@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dj-gold rounded-full flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-dj-dark text-sm"></i>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Lima, Comas
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-dj-light-gray py-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-dj font-bold text-dj-gold mb-4">
              ¡Mantente Conectado!
            </h3>
                         <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
               Suscríbete para recibir ofertas especiales, consejos para eventos 
               y las últimas novedades de DJ TEFFO.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-dj-light-gray py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                         <div className="text-gray-400 text-sm">
               © {currentYear} DJ TEFFO. Todos los derechos reservados.
             </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-dj-gold transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-dj-gold transition-colors">
                Términos de Servicio
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-dj-gold transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-dj-gold rounded-full flex items-center justify-center text-dj-dark hover:bg-yellow-400 transition-colors shadow-lg z-50"
      >
        <i className="fas fa-chevron-up"></i>
      </motion.button>
    </footer>
  )
}

export default Footer
