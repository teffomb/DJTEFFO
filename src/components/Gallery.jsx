import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Solo videos, agrupados por categoría
  const videosPorCategoria = {
    'Cumpleaños': [
      { id: 'v1', src: '/videos/fiesta.mp4', alt: 'Fiesta' },
      { id: 'v2', src: '/videos/fiesta1.mp4', alt: 'Fiesta 1' },
    ],
    'Infantil': [
      { id: 'v3', src: '/videos/infantil.mp4', alt: 'Evento Infantil' },
    ],
    'Privado': [
      { id: 'v4', src: '/videos/payaso.mp4', alt: 'Show de Payaso' },
      { id: 'v5', src: '/videos/payasa.mp4', alt: 'Show de Payasa' },
      { id: 'v6', src: '/videos/piscina.mp4', alt: 'Fiesta en Piscina' },
      { id: 'v7', src: '/videos/piscina2.mp4', alt: 'Fiesta en Piscina 2' },
      { id: 'v8', src: '/videos/piscina3.mp4', alt: 'Fiesta en Piscina 3' },
    ],
    'XV': [
      { id: 'v9', src: '/videos/hora_loca.mp4', alt: 'Hora Loca' },
    ],
  };

  const categories = ['Todos', 'Cumpleaños', 'Privado', 'Infantil', 'XV'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener videos a mostrar según filtro
  const filteredVideos = selectedCategory === 'Todos'
    ? Object.values(videosPorCategoria).flat()
    : videosPorCategoria[selectedCategory] || [];

  return (
    <section id="gallery" className="section-padding bg-dj-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-dj font-bold mb-6">
            <span className="text-gradient">Galería</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Momentos especiales capturados en eventos inolvidables. 
            Cada imagen cuenta una historia de música y diversión.
          </p>
        </motion.div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${selectedCategory === cat ? 'bg-dj-gold text-dj-dark' : 'bg-neutral-800 text-white hover:bg-dj-gold/70 hover:text-dj-dark'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Galería de videos filtrados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl"
            >
              <div className="aspect-w-9 aspect-h-16 bg-black">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  style={{ background: '#000' }}
                />
              </div>
              {/* Elimino el nombre debajo del video */}
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            <i className="fas fa-images mr-2"></i>
            Ver Más Fotos
          </motion.button>
        </motion.div>
      </div>

      {/* Elimino el modal (AnimatePresence y todo lo relacionado a selectedImage) */}
    </section>
  )
}

export default Gallery 