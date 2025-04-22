"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import LazyHydrate from "react-lazy-hydration";
import { MovieCard } from "./MovieCard";

const SpecialMovieCard = dynamic(() => import("./SpecialMovieCard").then(mod => mod.SpecialMovieCard), {
  ssr: false,
});

interface Movie {
  id: string;
  type: "default" | "special";
  title: string;
  posterUrl: string;
  backdropUrl?: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

export const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToFocused = (element: HTMLElement) => {
    const container = containerRef.current;
    if (!container) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (elementRect.left < containerRect.left) {
      container.scrollLeft -= containerRect.left - elementRect.left + 20;
    } else if (elementRect.right > containerRect.right) {
      container.scrollLeft += elementRect.right - containerRect.right + 20;
    }
  };

  return (
    <LazyHydrate whenVisible>
      <div className="mb-[4vw]">
        <h2 className="text-[2vw] font-bold text-white mb-[2vw] ml-[15vw]">{title}</h2>
        <div
          ref={containerRef}
          className="flex gap-[1vw] overflow-x-auto pl-[15vw] pr-[4vw] pb-[2vw] scrollbar-hide"
        >
          {movies.map((movie) => (
            movie.type === "special" ? (
              <SpecialMovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                backdropUrl={movie.backdropUrl || movie.posterUrl}
              />
            ) : (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
              />
            )
          ))}
        </div>
      </div>
    </LazyHydrate>
  );
};