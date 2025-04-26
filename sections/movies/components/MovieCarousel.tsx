'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  FocusContext,
  useFocusable,
  setFocus
} from '@noriginmedia/norigin-spatial-navigation'
import { MovieItem } from './MovieItem'
import { motion, AnimatePresence } from 'framer-motion'

interface Movie {
  id: string
  coverUrl: string
}

interface Props {
  movies: Movie[]
  rowIndex: number
  onFocusRow?: () => void
  focusedRowIndex: number
  setFocusedRowIndex: (index: number) => void
  title: string // Novo campo para o título do carrossel
}

export const MovieCarousel = ({
  movies,
  rowIndex,
  onFocusRow,
  focusedRowIndex,
  setFocusedRowIndex,
  title // Recebendo o título como prop
}: Props) => {
  const ITEM_WIDTH = 10 // vw
  const ITEM_GAP = 0.4 // vw
  const VISIBLE_ITEMS = 6
  const FOCUS_POSITION = 1

  const MAX_SHIFT = movies.length - VISIBLE_ITEMS
  const [focusedIndex, setFocusedIndex] = useState(0)

  const focusKey = useMemo(() => `CAROUSEL-${rowIndex}`, [rowIndex])

  const { ref } = useFocusable({
    focusKey,
    trackChildren: true,
    saveLastFocusedChild: true,
    onFocus: () => {
      setFocusedRowIndex(rowIndex)
      onFocusRow?.()
    },
  })

  const shiftIndex = useMemo(() => {
    if (focusedIndex > MAX_SHIFT) return movies.length - VISIBLE_ITEMS
    return Math.max(0, focusedIndex - FOCUS_POSITION)
  }, [focusedIndex, MAX_SHIFT, movies.length])

  const translateX = shiftIndex * (ITEM_WIDTH + ITEM_GAP)

  const focusOverlayOffset = focusedIndex > MAX_SHIFT
    ? (focusedIndex - shiftIndex) * (ITEM_WIDTH + ITEM_GAP)
    : FOCUS_POSITION * (ITEM_WIDTH + ITEM_GAP)

  const onArrowPress = useCallback((dir: string) => {
    if (dir === 'left' && focusedIndex === 0) setFocus('menu')
    return true
  }, [focusedIndex])

  const isCurrentlyFocused = focusedRowIndex === rowIndex

  const items = useMemo(() =>
    movies.map((movie, index) => {
      const dimmed = focusedIndex > MAX_SHIFT
        ? index === shiftIndex
        : index < focusedIndex

      return (
        <MovieItem
          key={movie.id}
          movie={movie}
          rowIndex={rowIndex}
          itemIndex={index}
          onFocus={() => setFocusedIndex(index)}
          dimmed={dimmed}
          offsetFirstItem={index === 0 && focusedIndex === 0}
          onArrowPress={onArrowPress}
        />
      )
    }),
  [movies, focusedIndex, shiftIndex, rowIndex, onArrowPress, MAX_SHIFT])

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="w-full py-[1vw] mb-[2vw] h-[17vw] transition-transform duration-300 ease-in-out">
        
        {/* Título do carrossel */}
        <div className="font-bold text-[1.4vw] mb-[1vw] ml-[10.4vw]">
          {title}
        </div>

        <div className="overflow-hidden w-full relative" ref={ref}>
          <AnimatePresence>
            {isCurrentlyFocused && (
              <motion.div
                className="absolute top-0 left-0 border-2 border-white rounded pointer-events-none z-10"
                initial={{ x: `${focusOverlayOffset}vw` }}
                animate={{ x: `${focusOverlayOffset}vw` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  width: '10vw',
                  height: '15vw'
                }}
              />
            )}
          </AnimatePresence>

          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${translateX}vw)`,
              gap: `${ITEM_GAP}vw`,
              minWidth: 'max-content',
              scrollSnapType: 'x mandatory',
            }}
          >
            {items}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  )
}