import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const WEEK_DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const pad2 = (value) => String(value).padStart(2, '0')

const toISODate = (date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`

const fromISODate = (isoDate) => {
  if (!isoDate) return null
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const DatePicker = ({ name, value, onChange }) => {
  const selectedDate = useMemo(() => fromISODate(value), [value])
  const today = useMemo(() => normalizeDate(new Date()), [])
  const todayIso = useMemo(() => toISODate(today), [today])
  const reducedMotion = useReducedMotion()

  const [isOpen, setIsOpen] = useState(false)
  const [monthDirection, setMonthDirection] = useState(1)
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const baseDate = selectedDate || today
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
  })

  const pickerRef = useRef(null)

  useEffect(() => {
    if (!selectedDate) return
    setVisibleMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
  }, [selectedDate])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const monthLabel = `${MONTHS[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`

  const firstDayMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
  const dayOffset = (firstDayMonth.getDay() + 6) % 7
  const gridStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1 - dayOffset)

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    const inCurrentMonth = date.getMonth() === visibleMonth.getMonth()
    const normalized = normalizeDate(date)

    return {
      iso: toISODate(date),
      date,
      label: date.getDate(),
      inCurrentMonth,
      isDisabled: normalized < today
    }
  })

  const canGoPrevious = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1) > new Date(today.getFullYear(), today.getMonth(), 1)

  const changeMonth = (delta) => {
    if (delta < 0 && !canGoPrevious) return
    setMonthDirection(delta)
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + delta, 1))
  }

  const selectDate = (isoDate) => {
    onChange({
      target: {
        name,
        value: isoDate
      }
    })
    setIsOpen(false)
  }

  return (
    <div ref={pickerRef} className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full text-left px-4 py-3 bg-dj-light-gray border border-gray-600 rounded-lg text-white focus:outline-none focus:border-dj-gold transition-colors"
        aria-expanded={isOpen}
        aria-label="Seleccionar fecha del evento"
        whileHover={reducedMotion ? undefined : { scale: 1.01 }}
        whileTap={reducedMotion ? undefined : { scale: 0.99 }}
      >
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {value ? selectedDate.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Selecciona una fecha'}
        </span>
        <motion.i
          className="fas fa-calendar-alt float-right text-dj-gold mt-1"
          animate={reducedMotion ? undefined : { rotate: isOpen ? 12 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        ></motion.i>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="absolute z-20 mt-3 w-full rounded-2xl border border-dj-gold/20 bg-dj-gray/95 p-4 shadow-2xl backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <motion.button
                type="button"
                onClick={() => changeMonth(-1)}
                disabled={!canGoPrevious}
                className="h-9 w-9 rounded-full border border-gray-600 text-gray-200 hover:border-dj-gold hover:text-dj-gold disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Mes anterior"
                whileHover={canGoPrevious && !reducedMotion ? { scale: 1.08, x: -1 } : undefined}
                whileTap={canGoPrevious && !reducedMotion ? { scale: 0.92 } : undefined}
              >
                <i className="fas fa-chevron-left"></i>
              </motion.button>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={monthLabel}
                  initial={reducedMotion ? false : { opacity: 0, x: monthDirection > 0 ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: monthDirection > 0 ? -16 : 16 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold text-dj-gold"
                >
                  {monthLabel}
                </motion.p>
              </AnimatePresence>

              <motion.button
                type="button"
                onClick={() => changeMonth(1)}
                className="h-9 w-9 rounded-full border border-gray-600 text-gray-200 hover:border-dj-gold hover:text-dj-gold"
                aria-label="Mes siguiente"
                whileHover={reducedMotion ? undefined : { scale: 1.08, x: 1 }}
                whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              >
                <i className="fas fa-chevron-right"></i>
              </motion.button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wider text-gray-400">
              {WEEK_DAYS.map((day) => (
                <span key={day} className="py-2">{day}</span>
              ))}
            </div>

            <div className="relative min-h-[252px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${visibleMonth.getFullYear()}-${visibleMonth.getMonth()}`}
                  initial={reducedMotion ? false : { opacity: 0, x: monthDirection > 0 ? 28 : -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: monthDirection > 0 ? -28 : 28 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="grid grid-cols-7 gap-1"
                >
                  {days.map((day, index) => {
                    const isSelected = value === day.iso
                    const isToday = day.iso === todayIso
                    const baseClasses = 'relative h-10 overflow-hidden rounded-lg text-sm font-medium transition-all'
                    const styles = day.isDisabled
                      ? 'cursor-not-allowed text-gray-600'
                      : isSelected
                        ? 'bg-gradient-to-r from-dj-gold to-yellow-400 text-dj-dark shadow-lg shadow-dj-gold/20'
                        : day.inCurrentMonth
                          ? 'text-gray-100 hover:bg-dj-gold/20 hover:text-dj-gold'
                          : 'text-gray-500 hover:bg-dj-light-gray'

                    return (
                      <motion.button
                        key={day.iso}
                        type="button"
                        disabled={day.isDisabled}
                        onClick={() => selectDate(day.iso)}
                        className={`${baseClasses} ${styles}`}
                        aria-label={`Seleccionar ${day.date.toLocaleDateString('es-PE')}`}
                        initial={reducedMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.18, delay: reducedMotion ? 0 : index * 0.008 }}
                        whileHover={!day.isDisabled && !reducedMotion ? { scale: 1.08, y: -1 } : undefined}
                        whileTap={!day.isDisabled && !reducedMotion ? { scale: 0.95 } : undefined}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="selected-day-highlight"
                            className="absolute inset-0 bg-gradient-to-r from-dj-gold to-yellow-400"
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                          ></motion.span>
                        )}
                        <span className={`relative z-10 ${isToday && !isSelected ? 'text-dj-gold' : ''}`}>
                          {day.label}
                        </span>
                        {isToday && !isSelected && (
                          <motion.span
                            className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-dj-gold"
                            animate={reducedMotion ? undefined : { scale: [1, 1.4, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                          ></motion.span>
                        )}
                      </motion.button>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatePicker

