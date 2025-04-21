"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useMovieStore } from "@/features/movies/store/useMovieStore";
import { shallow } from "zustand/shallow";

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
}

export const MovieCard = ({ id, title, posterUrl }: MovieCardProps) => {
  const { focusedId, setFocusedId } = useMovieStore(
    (state) => ({
      focusedId: state.focusedId,
      setFocusedId: state.setFocusedId,
    }),
    shallow
  );

  const { ref, focused } = useFocusable({
    onFocus: () => setFocusedId(id),
    focusKey: `movie-${id}`,
  });

  const isFocused = focused || focusedId === id;

  return (
    <motion.div
      ref={ref}
      animate={isFocused ? { scale: 1.1, zIndex: 10 } : { scale: 1, zIndex: 1 }}
      className="relative w-[12vw] h-[18vw] rounded-lg overflow-hidden cursor-pointer"
      tabIndex={0}
      aria-label={title}
    >
      <Image
        src={posterUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="12vw"
      />
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 ring-2 ring-white shadow-lg"
        />
      )}
    </motion.div>
  );
};