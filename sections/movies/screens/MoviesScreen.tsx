"use client";

import dynamic from "next/dynamic";
import { Menu } from "@ui/menu";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import { MovieCarousel } from '@sections/movies/components/MovieCarousel'

export default function MoviesScreen() {

  const { ref: navigationRef, focusKey: rootFocusKey, focusSelf } = useFocusable({
    preferredChildFocusKey: 'CAROUSEL-0'
});
  

  const sampleMovies = new Array(20).fill(0).map((_, i) => ({
    id: `movie-${i}`,
    coverUrl: `https://image.tmdb.org/t/p/w1280/d6jUbQj4E4R5MJlFYfdzANEZbkL.jpg`,
  }))

  useEffect(() => {
      focusSelf()
    }, [])

  return (
    <FocusContext.Provider value={rootFocusKey}>
      <main className="min-h-screen bg-slate-950 " ref={navigationRef}>
      <Menu />
      <div className=""><MovieCarousel movies={sampleMovies} rowIndex={0} /></div>
      </main>
    </FocusContext.Provider>
  );
}