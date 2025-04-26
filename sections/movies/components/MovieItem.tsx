import { useEffect } from 'react'
import { useFocusable, KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation'
import Image from 'next/image'
import { setLastFocusedKey } from '@sections/movies/lib/focusManager'

const ITEM_WIDTH = 10 // vw
const ITEM_HEIGHT = 15 // vw
const ITEM_GAP = 0.4 // vw
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
  onArrowPress?: (direction: string, props: object, details: KeyPressDetails) => boolean;
}

export const MovieItem = ({
  movie,
  rowIndex,
  itemIndex,
  onFocus,
  dimmed = false,
  offsetFirstItem = false,
  onArrowPress
}: Props) => {
  const { ref, focused } = useFocusable({
    focusKey: `ITEM-${rowIndex}-${itemIndex}`,
    onFocus,
    onArrowPress
  })

  useEffect(() => {
    if (focused) {
      onFocus()
      setLastFocusedKey(`ITEM-${rowIndex}-${itemIndex}`);
    }
  }, [focused])

  return (
    <div
      ref={ref}
      className="flex-shrink-0 transition-all duration-300 scroll-snap-align-start"
      tabIndex={-1}
      style={{
        width: `${ITEM_WIDTH}vw`,
        height: `${ITEM_HEIGHT}vw`,
        opacity: dimmed ? 0.3 : 1,
        marginLeft: offsetFirstItem ? `${(ITEM_WIDTH + ITEM_GAP) * FOCUS_POSITION}vw` : 0,
      }}
    >
      <Image
        src={movie.coverUrl}
        alt={movie.id}
        width={0}
        height={0}
        className="object-cover rounded w-full h-full"
        sizes="(max-width: 100vw) 10vw"
      />
    </div>
  )
}