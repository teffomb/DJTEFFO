// Única fuente de estadísticas del sitio. Una stat con `value: null` NO se muestra.
// Si todas son null, la fila completa se oculta.
// Los textos viven en src/i18n/es.js y en.js bajo `stats.<id>`.
// No inventes números: solo valores reales.
export const stats = [
  // TODO(DATOS): número real de eventos realizados, ej. '120+'
  { id: 'events', value: null },
  { id: 'years', value: '5+' },
  // TODO(DATOS): otras stats reales (opcional): agrega { id: 'x', value: '..' } y su texto en es.js/en.js (stats.x)
]

export const visibleStats = stats.filter(s => s.value)
