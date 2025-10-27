import React from 'react'
import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      icon: 'fas fa-heart',
      title: 'Bodas',
      description: 'Hacemos de tu día especial algo mágico con música romántica y ritmos que harán bailar a todos tus invitados.',
      features: ['Música romántica', 'Primer baile', 'Playlist personalizada', 'Coordinación con fotógrafo']
    },
    {
      icon: 'fas fa-birthday-cake',
      title: 'Fiestas de Cumpleaños',
      description: 'Celebra tu cumpleaños con el mejor ambiente musical, desde los 15 hasta los 100 años.',
      features: ['Música actual', 'Juegos musicales', 'Animación', 'Efectos especiales']
    },
    {
      icon: 'fas fa-baby',
      title: 'Eventos Infantiles',
      description: 'Los más pequeños se divierten con música infantil, juegos y animación especial para niños.',
      features: ['Música infantil', 'Juegos interactivos', 'Animación', 'Efectos de luces']
    },
    {
      icon: 'fas fa-crown',
      title: 'XV',
      description: 'Celebra tus XV años con la mejor música y animación para una noche inolvidable.',
      features: ['Música variada', 'Animación especial', 'Luces y efectos', 'Momentos coreografiados']
    },
    {
      icon: 'fas fa-glass-cheers',
      title: 'Fiestas Privadas',
      description: 'Desde reuniones íntimas hasta grandes celebraciones, creamos el ambiente perfecto.',
      features: ['Música personalizada', 'Ambiente íntimo', 'Flexibilidad horaria', 'Servicio completo']
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Eventos Especiales',
      description: 'Graduaciones, aniversarios, inauguraciones y cualquier ocasión especial que requiera música.',
      features: ['Temática personalizada', 'Música específica', 'Coordinación completa', 'Soporte técnico']
    }
  ]

  return (
    <section id="services" className="section-padding bg-dj-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6">
            <span className="text-gradient">Mis Servicios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrezco una amplia gama de servicios para hacer de tu evento algo inolvidable. 
            Cada ocasión es única y me adapto a tus necesidades específicas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dj-gray rounded-2xl p-6 card-hover border border-dj-light-gray"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-dj-gold to-dj-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${service.icon} text-2xl text-dj-dark`}></i>
                </div>
                <h3 className="text-xl font-dj font-bold text-dj-gold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-dj-gold mb-3">
                  Incluye:
                </h4>
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-dj-gold rounded-full"></div>
                    <span className="text-xs text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Hover effect overlay */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute inset-0 bg-gradient-to-br from-dj-gold/5 to-dj-electric-blue/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-dj-gold/10 to-dj-electric-blue/10 rounded-2xl p-8 border border-dj-gold/20">
            <h3 className="text-2xl font-dj font-bold text-dj-gold mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Cada evento es único y me adapto a tus necesidades específicas. 
              Contáctame para discutir tu evento personalizado.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <i className="fas fa-envelope mr-2"></i>
              Consulta Personalizada
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 