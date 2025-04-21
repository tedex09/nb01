"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Info } from "lucide-react";

interface MovieHighlightProps {
  title: string;
  description: string;
  backdropUrl: string;
}

export const MovieHighlight = ({ title, description, backdropUrl }: MovieHighlightProps) => {
  return (
    <div className="relative w-full h-[56.25vw]">
      <Image
        src={backdropUrl}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-[10vw] left-[15vw] max-w-[40vw]"
      >
        <h2 className="text-[4vw] font-bold mb-[2vw] text-white">{title}</h2>
        <p className="text-[1.4vw] text-white/80 mb-[2vw]">{description}</p>
        <div className="flex gap-[1vw]">
          <button className="flex items-center gap-[0.5vw] bg-white text-black px-[2vw] py-[1vw] rounded-lg text-[1.2vw] font-bold">
            <Play className="w-[1.5vw] h-[1.5vw]" />
            Play
          </button>
          <button className="flex items-center gap-[0.5vw] bg-white/20 text-white px-[2vw] py-[1vw] rounded-lg text-[1.2vw]">
            <Info className="w-[1.5vw] h-[1.5vw]" />
            More Info
          </button>
        </div>
      </motion.div>
    </div>
  );
};