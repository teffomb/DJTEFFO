import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('hourly')
  const [centerHovered, setCenterHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const packages = [
    {
      name: '👤 PAQUETE INDIVIDUAL',
      description: 'Perfecto si solo necesitas la música y si cuentas con parlante.',
      features: [
        '🎧 DJ profesional con controladora.',
        '🎤 Micrófono inalámbrico para anuncios o karaoke.',
        '⏰ 5 horas de servicio.',
        '🎁 De Regalo: ¡Te incluimos 1 Farol LED para darle un toque especial a la iluminación de tu evento! ✨'
      ],
      price: 'S/. 250',
      duration: '',
      popular: false,
      icon: 'fas fa-user'
    },
    {
      name: '🎧 PACK PRINCIPAL',
      description: 'Ideal para una fiesta completa y bien equipada.',
      features: [
        '🎛️ DJ profesional con controladora.',
        '🔊 Equipo de sonido de alta calidad.',
        '🎤 Micrófono inalámbrico para anuncios o karaoke.',
        '⏰ 5 horas de música.',
        '🎁 De Regalo: ¡Te incluimos 1 Farol LED para darle un toque especial a la iluminación de tu evento! ✨'
      ],
      price: 'S/. 399',
      duration: '',
      popular: true,
      icon: 'fas fa-headphones'
    },
    {
      name: '🎊 PACK FIESTA',
      description: 'Para una experiencia más inmersiva con mejor sonido en un ambiente espacioso y efectos.',
      features: [
        '🎧 DJ profesional con controladora.',
        '🔊 2 Parlantes profesionales',
        '💨 Máquina de humo',
        '🎤 Micrófono inalámbrico para anuncios o karaoke.',
        '⏰ 5 horas de servicio.',
        '🎁 De Regalo: ¡Te incluimos 2 Faroles LED para darle un toque especial a la iluminación de tu evento! ✨'
      ],
      price: 'S/. 499',
      duration: '',
      popular: false,
      icon: 'fas fa-champagne-glasses'
    }
  ]

  const addOns = [
    {
      name: 'Efectos de Luces',
      price: 'S/. 250',
      description: 'Incluye parante con 4 efectos de luces',
      icon: 'fas fa-lightbulb'
    },
    {
      name: 'Luces individuales',
      price: 'S/. 30-50',
      description: 'Efecto de luces dependiendo el modelo',
      icon: 'fas fa-bolt'
    },
    {
      name: 'Maestro de ceremonia',
      price: 'S/. 150',
      description: 'Anfitrión encargado de dirigir y dar fluidez a un evento',
      icon: 'fas fa-microphone'
    },
    {
      name: 'Tiempo Extra',
      price: 'S/. 70/h',
      description: 'Horas adicionales de servicio',
      icon: 'fas fa-clock'
    }
  ]

  return (
    <div className="min-h-screen bg-dj-dark pt-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-dj font-bold mb-6 drop-shadow-neon">
            <span className="text-gradient-neon">Precios</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            ¡Tu música, tu estilo, tu presupuesto! Paquetes diseñados para que solo te preocupes por disfrutar.<br/>
            <span className="inline-block mt-2 px-4 py-1 bg-dj-gold/20 text-dj-gold rounded-full font-bold animate-pulse border border-dj-gold shadow-neon">Pago Único · ¡Solo pagas una vez!</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'hourly' ? 'text-dj-gold' : 'text-gray-400'}`}>
              Por Hora
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'hourly' ? 'event' : 'hourly')}
              className="relative w-16 h-8 bg-dj-gray rounded-full p-1 transition-colors duration-300"
            >
              <motion.div
                animate={{ x: billingCycle === 'hourly' ? 0 : 32 }}
                className="w-6 h-6 bg-dj-gold rounded-full"
              />
            </button>
            <span className={`text-sm ${billingCycle === 'event' ? 'text-dj-gold' : 'text-gray-400'}`}>
              Por Evento
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => {
            // Determinar la clase de borde
            const borderClass = hoveredIndex === index ? 'border-neon' : 'border-dj-light-gray';
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-dj-gray rounded-2xl p-8 shadow-dj-card overflow-visible border-2 ${borderClass}`}
                style={{
                  boxShadow: hoveredIndex === index
                    ? '0 0 32px 4px #ffe066, 0 0 80px 8px #00f0ff44'
                    : '0 0 16px 2px #222',
                  background: 'radial-gradient(circle at 80% 20%, #222 60%, #1a1a1a 100%)',
                }}
              >
                {/* DJ visual effect: animated soundwave */}
                <div className="absolute top-0 left-0 w-full flex justify-center z-0 pointer-events-none">
                  <div className="h-4 w-32 bg-gradient-to-r from-dj-gold via-blue-400 to-fuchsia-500 blur-lg opacity-60 animate-pulse rounded-full mt-2"></div>
                </div>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-dj-gold to-fuchsia-400 text-dj-dark px-4 py-2 rounded-full text-sm font-bold shadow-neon">
                      Más Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-8 z-10 relative">
                  <div className="text-4xl mb-4 animate-spin-slow drop-shadow-neon">
                    <span role="img" aria-label="dj-icon">{pkg.name.startsWith('👤') ? '🎵' : pkg.name.startsWith('🎧') ? '💿' : '🎉'}</span>
                  </div>
                  <h3 className="text-2xl font-dj font-bold text-dj-gold mb-2 drop-shadow-neon">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="mb-6 flex flex-col items-center">
                    <span className="text-4xl font-dj font-bold text-white drop-shadow-neon">
                      {pkg.price}
                    </span>
                    <span className="inline-block mt-2 px-3 py-1 bg-dj-gold/20 text-dj-gold rounded-full font-bold text-xs shadow-neon">Pago Único</span>
                  </div>
                </div>
                <div className="space-y-4 mb-4 z-10 relative">
                  {pkg.features.filter(f => !f.startsWith('🎁')).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-gradient-to-r from-dj-gold to-fuchsia-400 rounded-full inline-block animate-pulse"></span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {pkg.features.find(f => f.startsWith('🎁')) && (
                  <div className="text-gray-300 text-sm mb-8 z-10 relative">
                    {pkg.features.find(f => f.startsWith('🎁'))}
                  </div>
                )}
                <Link
                  to="/contact"
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-neon hover:scale-105 active:scale-95 ${pkg.popular ? 'bg-gradient-to-r from-dj-gold to-fuchsia-400 text-dj-dark hover:from-yellow-300 hover:to-pink-400' : 'bg-transparent border-2 border-dj-gold text-dj-gold hover:bg-dj-gold hover:text-dj-dark'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span role="img" aria-label="vinilo">💿</span> Reservar este paquete
                </Link>
                <div className="text-xs text-gray-500 opacity-70 select-none absolute bottom-4 right-6 z-10">
                  No incluye movilidad
                </div>
                {/* Fondo de luces tipo discoteca */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="w-full h-full bg-gradient-radial from-transparent via-blue-900/10 to-fuchsia-900/20 animate-disco-lights"></div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-dj font-bold text-center mb-8">
            <span className="text-gradient">Servicios Adicionales</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dj-gray rounded-xl p-6 text-center card-hover"
              >
                <div className="text-dj-gold text-2xl mb-4">
                  <i className={addon.icon}></i>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {addon.name}
                </h3>
                <p className="text-dj-gold font-bold text-xl mb-2">
                  {addon.price}
                </p>
                <p className="text-gray-300 text-sm">
                  {addon.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-dj-gray rounded-2xl p-8"
        >
          <h2 className="text-3xl font-dj font-bold text-center mb-8">
            <span className="text-gradient">Preguntas Frecuentes</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: '¿En donde se ubican?',
                answer: 'Nos ubicamos en la cuidad de Lima, Comas.'
              },
              {
                question: '¿Puedo cancelar o cambiar la fecha?',
                answer: 'Sí, con 48 horas de anticipación. Consulta nuestra política de cancelación.'
              },
              {
                question: '¿Trabajan en toda la ciudad?',
                answer: 'Contamos con servicio para toda Lima Metropolitana, con adicional a la movilidad'
              },
              {
                question: '¿Puedo solicitar música específica?',
                answer: '¡Por supuesto! Trabajamos con tu playlist personalizada a tu gusto.'
              },
              {
                question: '¿Se da un adelanto?',
                answer: 'Si, para separar la fecha se necesita el 50% del monto'
              },
              {
                question: '¿Qué metodos de pago aceptan?',
                answer: 'Se acepta Yape, Tranferencia y efectivo'
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-dj-gold">
                  {faq.question}
                </h3>
                <p className="text-gray-300 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-dj-gold/10 to-dj-electric-blue/10 rounded-2xl p-8 border border-dj-gold/20">
            <h3 className="text-2xl font-dj font-bold text-dj-gold mb-4">
              ¿Necesitas algo personalizado?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Cada evento es único. Contáctame para discutir tus necesidades específicas 
              y crear un paquete personalizado para tu evento.
            </p>
            <Link
              to="/contact"
              className="btn-primary text-lg px-8 py-4"
            >
              <i className="fas fa-envelope mr-2"></i>
              Consulta Personalizada
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Pricing 