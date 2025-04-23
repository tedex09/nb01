'use client'

import { useEffect, useRef, useState } from 'react'
import {
  FocusContext,
  useFocusable
} from '@noriginmedia/norigin-spatial-navigation'
import { MovieItem } from './MovieItem'

interface Movie {
  id: string
  coverUrl: string
}

interface Props {
  movies: Movie[]
  rowIndex: number
}

export const MovieCarousel = ({ movies, rowIndex }: Props) => {
  const ITEM_WIDTH = 160
  const ITEM_GAP = 16
  const VISIBLE_ITEMS = 6
  const FOCUS_POSITION = 1

  const MAX_SHIFT = movies.length - VISIBLE_ITEMS

  const [focusedIndex, setFocusedIndex] = useState(0)

  const {
    ref,
    focusKey
  } = useFocusable({
    focusKey: `CAROUSEL-${rowIndex}`,
    trackChildren: true
  })

  const isFixedPosition = focusedIndex <= MAX_SHIFT
  const isFinalMovable = focusedIndex > MAX_SHIFT
  const shiftIndex = isFinalMovable
    ? movies.length - VISIBLE_ITEMS
    : Math.max(0, focusedIndex - FOCUS_POSITION)

  const translateX = shiftIndex * (ITEM_WIDTH + ITEM_GAP)

  const focusOverlayOffset = isFixedPosition
    ? FOCUS_POSITION * (ITEM_WIDTH + ITEM_GAP)
    : (focusedIndex - shiftIndex) * (ITEM_WIDTH + ITEM_GAP)

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="relative w-full py-4">
        <div className="overflow-hidden w-full relative" ref={ref}>
          {/* Focador fixo */}
          <div
            className="absolute top-0 left-0 w-[160px] h-[240px] border-2 border-white rounded pointer-events-none z-10 transition-all duration-300"
            style={{ transform: `translateX(${focusOverlayOffset}px)` }}
          />

          {/* Carrossel */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${translateX}px)`,
              gap: `${ITEM_GAP}px`,
              minWidth: 'max-content',
            }}
          >
            {movies.map((movie, index) => {
              let dimmed = false

              if (isFixedPosition) {
                dimmed = index < focusedIndex
              } else if (isFinalMovable) {
                dimmed = index === shiftIndex
              } else {
                dimmed = index < focusedIndex
              }

              return (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  rowIndex={rowIndex}
                  itemIndex={index}
                  onFocus={() => setFocusedIndex(index)}
                  dimmed={dimmed}
                  offsetFirstItem={index === 0 && focusedIndex === 0}
                />
              )
            })}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  )
}
