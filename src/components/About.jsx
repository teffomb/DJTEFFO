import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  const stats = [
    { number: '100+', label: 'Eventos Realizados' },
    { number: '5+', label: 'Años de Experiencia' },
    { number: '100%', label: 'Clientes Satisfechos' },
    { number: '24/7', label: 'Disponibilidad' }
  ]

  return (
    <section id="about" className="section-padding bg-dj-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6">
            <span className="text-gradient">Sobre Mí</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Apasionado por la música y el entretenimiento, creando experiencias únicas 
            que hacen que cada evento sea inolvidable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              {/* Placeholder for DJ image */}
              <div className="w-full h-96 bg-gradient-to-br from-dj-gold/20 to-dj-electric-blue/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-dj-gold text-6xl mb-4">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <p className="text-dj-gold font-semibold">Tu Foto Aquí</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-dj-gold rounded-full flex items-center justify-center"
              >
                <i className="fas fa-music text-dj-dark text-xl"></i>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-dj font-bold text-dj-gold">
                DJ TEFFO
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Con más de 5 años de experiencia en la industria del entretenimiento, 
                he tenido el privilegio de ser parte de cientos de momentos especiales. 
                Desde bodas íntimas hasta grandes eventos corporativos, cada ocasión 
                es una oportunidad para crear magia a través de la música.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Mi pasión por la música y mi compromiso con la excelencia me han 
                permitido construir una reputación sólida en el mercado, ofreciendo 
                no solo música de calidad, sino una experiencia completa de entretenimiento.
              </p>
            </div>
          </motion.div>

          {/* Right side - Stats and features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-dj-light-gray rounded-xl card-hover"
                >
                  <div className="text-3xl md:text-4xl font-dj font-bold text-dj-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-xl font-dj font-semibold text-dj-gold mb-6">
                ¿Por qué elegirme?
              </h4>
              
              {[
                {
                  icon: 'fas fa-headphones',
                  title: 'Equipo Profesional',
                  description: 'Sistema de sonido de alta calidad y equipamiento de última generación'
                },
                {
                  icon: 'fas fa-music',
                  title: 'Música Diversa',
                  description: 'Repertorio amplio que incluye todos los géneros y épocas'
                },
                {
                  icon: 'fas fa-clock',
                  title: 'Puntualidad',
                  description: 'Llegada anticipada para preparar todo perfectamente'
                },
                {
                  icon: 'fas fa-heart',
                  title: 'Atención Personalizada',
                  description: 'Cada evento es único y se adapta a tus necesidades específicas'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 bg-dj-light-gray rounded-lg card-hover"
                >
                  <div className="text-dj-gold text-xl mt-1">
                    <i className={feature.icon}></i>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h5>
                    <p className="text-sm text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 