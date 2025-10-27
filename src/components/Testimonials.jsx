import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      event: 'Boda',
      rating: 5,
      comment: 'Increíble trabajo en nuestra boda. La música fue perfecta y todos nuestros invitados quedaron encantados. Definitivamente lo recomendaría para cualquier evento.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      event: 'Fiesta de Cumpleaños',
      rating: 5,
      comment: 'Excelente DJ para mi fiesta de cumpleaños. Supe adaptarse perfectamente al ambiente y mantuvo la energía alta durante toda la noche. ¡Muy profesional!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      event: 'Evento Corporativo',
      rating: 5,
      comment: 'Para nuestro evento corporativo fue perfecto. Música de fondo elegante y profesional. Todos quedaron muy satisfechos con el servicio.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Luis Pérez',
      event: 'Fiesta Privada',
      rating: 5,
      comment: 'Contraté sus servicios para una fiesta privada y superó todas mis expectativas. La música fue variada y el ambiente increíble. ¡Altamente recomendado!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Sofia López',
      event: 'Evento Infantil',
      rating: 5,
      comment: 'Los niños se divirtieron muchísimo. La música infantil y los juegos fueron perfectos para la edad. Muy atento y profesional.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-dj-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6">
            <span className="text-gradient">Testimonios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lo que dicen mis clientes sobre mi trabajo. 
            Cada testimonio es una historia de éxito y satisfacción.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-dj-gray rounded-2xl p-8 h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-dj-gold">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-dj font-bold text-dj-gold mb-2">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {testimonials[currentIndex].event}
                    </p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <i key={i} className="fas fa-star text-dj-gold"></i>
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-center text-gray-300 leading-relaxed text-lg italic">
                    "{testimonials[currentIndex].comment}"
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dj-gold rounded-full flex items-center justify-center text-dj-dark hover:bg-yellow-400 transition-colors"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dj-gold rounded-full flex items-center justify-center text-dj-dark hover:bg-yellow-400 transition-colors"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-dj-gold' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: '500+', label: 'Clientes Satisfechos' },
            { number: '4.9', label: 'Calificación Promedio' },
            { number: '100%', label: 'Recomendación' },
            { number: '24/7', label: 'Soporte' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-dj font-bold text-dj-gold mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials 