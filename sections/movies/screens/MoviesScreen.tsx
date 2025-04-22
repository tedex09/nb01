"use client";

import dynamic from "next/dynamic";
import { Header } from "@ui/header";
import { Menu } from "@ui/menu";
import { MovieHighlight } from "@sections/movies/components/MovieHighlight";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";

const MovieCarousel = dynamic(() => import("@sections/movies/components/MovieCarousel").then(mod => mod.MovieCarousel), {
  ssr: false,
});

const mockMovies = {
  highlight: {
    title: "Arcane",
    description: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2000"
  },
  trending: [
    { id: "1", type: "special", title: "Arcane", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800" },
    { id: "2", type: "default", title: "Breaking Bad", posterUrl: "https://images.unsplash.com/photo-1562159278-1253a58da141?auto=format&fit=crop&w=800" },
    { id: "3", type: "special", title: "Peaky Blinders", posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800" },
  ],
  popular: [
    { id: "4", type: "default", title: "Stranger Things", posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800" },
    { id: "5", type: "default", title: "The Witcher", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800" },
    { id: "6", type: "special", title: "Wednesday", posterUrl: "https://images.unsplash.com/photo-1562159278-1253a58da141?auto=format&fit=crop&w=800" },
  ]
};

export default function MoviesScreen() {

  const { ref: navigationRef, focusKey: rootFocusKey, focusSelf } = useFocusable();
  
  useEffect(() => {
    focusSelf();
  }, [focusSelf]);



  return (
    <FocusContext.Provider value={rootFocusKey}>
      <main className="min-h-screen bg-slate-950" ref={navigationRef}>
        <Menu />
        {/* <MovieHighlight {...mockMovies.highlight} />
        <div className="mt-[4vw]">
          <MovieCarousel title="Trending Now" movies={mockMovies.trending} />
          <MovieCarousel title="Popular on Nimbus" movies={mockMovies.popular} />
        </div> */}
      </main>
    </FocusContext.Provider>
  );
}