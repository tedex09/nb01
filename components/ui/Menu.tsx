"use client";

import { motion } from "framer-motion";
import { Home, Film, Tv, Radio } from "lucide-react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

const menuItems = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Film, label: "Movies", key: "movies" },
  { icon: Tv, label: "TV Shows", key: "tv" },
  { icon: Radio, label: "Live", key: "live" },
];

export const Menu = () => {
  const { ref } = useFocusable();

  return (
    <motion.nav
      ref={ref}
      className="fixed left-0 top-0 bottom-0 w-[15vw] bg-black/80 backdrop-blur-lg z-40 pt-[10vw]"
    >
      <ul className="flex flex-col gap-[2vw] px-[2vw]">
        {menuItems.map(({ icon: Icon, label, key }) => (
          <motion.li
            key={key}
            className="flex items-center gap-[1vw] text-white/80 hover:text-white cursor-pointer p-[1vw] rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Icon className="w-[2vw] h-[2vw]" />
            <span className="text-[1.2vw]">{label}</span>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};