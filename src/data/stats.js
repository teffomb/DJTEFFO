// Única fuente de estadísticas del sitio. Una stat con `value: null` NO se muestra.
// Si todas son null, la fila completa se oculta.
// No inventes números: solo valores reales.
export const stats = [
  // TODO(DATOS): número real de eventos realizados, ej. '120+'
  { id: 'events', value: null, label: 'Eventos Realizados' },
  { id: 'years', value: '5+', label: 'Años de Experiencia' },
  // TODO(DATOS): otras stats reales (opcional), ej. { id: 'x', value: '..', label: '..' }
]

export const visibleStats = stats.filter(s => s.value)
