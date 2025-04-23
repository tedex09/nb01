import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useEffect } from 'react';

export const useCarouselVirtualizer = (size: number, itemWidth: number) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: size,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemWidth,
    horizontal: true,
    overscan: 5,
  });

  useEffect(() => {
    virtualizer.measure();
  }, [size, virtualizer]);

  return { parentRef, virtualizer };
};