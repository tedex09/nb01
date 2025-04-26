"use client";

import { useState, useEffect } from "react";
import { Menu } from "@ui/menu";
import { MovieCarousel } from "@sections/movies/components/MovieCarousel";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";

export default function MoviesScreen() {
  const [focusedRowIndex, setFocusedRowIndex] = useState(0);
  const { ref: navigationRef, focusKey: rootFocusKey, focusSelf } = useFocusable({
    preferredChildFocusKey: 'CAROUSEL-0',
    trackChildren: true,
    saveLastFocusedChild: true,
  });

  const sampleMovies = new Array(20).fill(0).map((_, i) => ({
    id: `movie-${i}`,
    coverUrl: `https://image.tmdb.org/t/p/w1280/d6jUbQj4E4R5MJlFYfdzANEZbkL.jpg`,
  }));

  useEffect(() => {
    focusSelf();
  }, []);

  return (
    <FocusContext.Provider value={rootFocusKey}>
      <main className="relative bg-slate-950 w-full h-screen overflow-hidden" ref={navigationRef}>
        <Menu />
        <div className="absolute top-[20vw] h-[50%] w-full left-0 w-full" >
        {[0, 1, 2, 3, 4, 5, 6].map(rowIndex => {
          const isAbove = rowIndex < focusedRowIndex;
          const isFocused = rowIndex === focusedRowIndex;

          return (
            <div
              key={rowIndex}
              style={{
                transform: isAbove ? `translateY(-4vw) scale(0.92)` : 'translateY(0) scale(1)',
                opacity: isAbove ? 0 : 1,
                marginTop: isAbove ? `-18.4vw` : '0vw',
                transition: isAbove ? 'all 0.4s ease-out' : 'all 0.1s ease-out', // A transição de volta fica mais rápida
                zIndex: isAbove ? 0 : 1,
                willChange: 'transform',
              }}
            >
              <MovieCarousel
                title={`Categoria ${focusedRowIndex}`}
                movies={sampleMovies}
                rowIndex={rowIndex}
                onFocusRow={() => setFocusedRowIndex(rowIndex)}
                focusedRowIndex={focusedRowIndex}
                setFocusedRowIndex={setFocusedRowIndex}
              />
            </div>
          );
        })}
        </div>
      </main>
    </FocusContext.Provider>
  );
}
