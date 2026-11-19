import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

const Footer = () => {
  const { t, lang } = useI18n()
  const currentYear = new Date().getFullYear()

  const serviceLabels = t('footer.serviceLinks')
  const footerLinks = {
    servicios: serviceLabels.map(name => ({ name, path: '/#services' })),
    empresa: [
      { name: t('footer.companyLinks.about'), path: '/#about' },
      { name: t('footer.companyLinks.gallery'), path: '/#gallery' },
      { name: t('footer.companyLinks.testimonials'), path: '/#testimonials' },
      // ES: Precios. EN: sin precios fijos → formulario de contacto.
      { name: t('footer.companyLinks.pricing'), path: lang === 'es' ? '/#pricing' : '/#contact' }
    ]
  }

  const socialLinks = [
    { icon: 'fab fa-whatsapp', url: `https://wa.me/51922798039?text=${encodeURIComponent(t('contact.whatsappMsg'))}`, color: 'hover:bg-green-500' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/idk.teffo/', color: 'hover:bg-pink-500' },
    { icon: 'fab fa-youtube', url: 'https://www.youtube.com/@DjTeffo-in5mt', color: 'hover:bg-red-600' },
    { icon: 'fab fa-soundcloud', url: 'https://soundcloud.com/djteffo', color: 'hover:bg-orange-500' }
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
                {t('footer.about')}
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
                {t('footer.services')}
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
                {t('footer.company')}
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
                {t('footer.contact')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dj-gold rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-dj-dark text-sm"></i>
                  </div>
                  <span className="text-white text-sm">
                    +51 922798039
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dj-gold rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-dj-dark text-sm"></i>
                  </div>
                  <span className="text-white text-sm">
                    djdang45@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dj-gold rounded-full flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-dj-dark text-sm"></i>
                  </div>
                  <span className="text-white text-sm">
                    {t('footer.location')}
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
              {t('footer.newsletterTitle')}
            </h3>
                         <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
               {t('footer.newsletterText')}
             </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('footer.emailPh')}
                className="flex-1 px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dj-gold transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                {t('footer.subscribe')}
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
                         <div className="text-gray-300 text-sm">
               © {currentYear} DJ TEFFO. {t('footer.rights')}
             </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-dj-gold transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-dj-gold transition-colors">
                {t('footer.terms')}
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
        aria-label={t('footer.backToTop')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-dj-gold rounded-full flex items-center justify-center text-dj-dark hover:bg-yellow-400 transition-colors shadow-lg z-50"
      >
        <i className="fas fa-chevron-up"></i>
      </motion.button>
    </footer>
  )
}

export default Footer
