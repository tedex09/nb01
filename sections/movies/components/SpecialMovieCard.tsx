"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useMovieStore } from "@sections/movies/store/useMovieStore";
import { shallow } from "zustand/shallow";
import { Play } from "lucide-react";

interface SpecialMovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
}

export const SpecialMovieCard = ({ id, title, posterUrl, backdropUrl }: SpecialMovieCardProps) => {
  const { focusedId, setFocusedId } = useMovieStore(
    (state) => ({
      focusedId: state.focusedId,
      setFocusedId: state.setFocusedId,
    }),
    shallow
  );

  const { ref, focused } = useFocusable({
    onFocus: () => setFocusedId(id),
    focusKey: `special-movie-${id}`,
  });

  const isFocused = focused || focusedId === id;

  return (
    <motion.div
      ref={ref}
      animate={isFocused ? { scale: 1.1, zIndex: 10 } : { scale: 1, zIndex: 1 }}
      className="relative w-[18vw] h-[24vw] rounded-lg overflow-hidden cursor-pointer"
      tabIndex={0}
      aria-label={title}
    >
      <Image
        src={backdropUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="18vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-[2vw] left-[2vw]">
        <h3 className="text-[1.4vw] font-bold text-white mb-[1vw]">{title}</h3>
        {isFocused && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-[0.5vw] bg-white text-black px-[1vw] py-[0.5vw] rounded-lg text-[1vw]"
          >
            <Play className="w-[1vw] h-[1vw]" />
            Play
          </motion.button>
        )}
      </div>
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