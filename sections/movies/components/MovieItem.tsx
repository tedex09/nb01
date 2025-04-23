import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import Image from 'next/image'
import { useEffect } from 'react'

const ITEM_WIDTH = 160
const ITEM_GAP = 16
const FOCUS_POSITION = 1

interface Props {
  movie: {
    id: string
    coverUrl: string
  }
  rowIndex: number
  itemIndex: number
  onFocus: () => void
  dimmed?: boolean
  offsetFirstItem?: boolean
}

export const MovieItem = ({
  movie,
  rowIndex,
  itemIndex,
  onFocus,
  dimmed = false,
  offsetFirstItem = false
}: Props) => {
  const { ref, focused } = useFocusable({
    focusKey: `ITEM-${rowIndex}-${itemIndex}`,
    onFocus,
  })

  useEffect(() => {
    if (focused) {
      onFocus()
    }
  }, [focused])

  return (
    <div
      ref={ref}
      className="w-[160px] h-[240px] flex-shrink-0 transition-all duration-300"
      tabIndex={-1}
      style={{
        opacity: dimmed ? 0.3 : 1,
        marginLeft: offsetFirstItem ? `${(ITEM_WIDTH + ITEM_GAP) * FOCUS_POSITION}px` : 0,
      }}
    >
      <Image
        src={movie.coverUrl}
        alt={movie.id}
        width={160}
        height={240}
        className="object-cover rounded w-full h-full"
      />
    </div>
  )
}
