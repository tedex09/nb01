import { useEffect, useRef, useState } from "react";

export function useTranslateToAlignTopVW<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});
  const [transformYVW, setTransformYVW] = useState(0);

  const registerItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  const updateTransform = (focusedIndex: number) => {
    const container = containerRef.current;
    const item = itemRefs.current[focusedIndex];
    if (!container || !item) return;

    const containerTop = container.getBoundingClientRect().top;
    const itemTop = item.getBoundingClientRect().top;
    const diffPx = itemTop - containerTop;

    const vw = window.innerWidth / 100;
    const offsetVW = diffPx / vw;

    setTransformYVW(offsetVW);
  };

  return {
    containerRef,
    registerItemRef,
    transformYVW,
    updateTransform,
  };
}
