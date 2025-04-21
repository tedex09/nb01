"use client";

import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] py-[2vw] bg-gradient-to-b from-black/80 to-transparent"
    >
      <div className="flex items-center gap-[2vw]">
        <h1 className="text-[2vw] font-bold text-white">Nimbus</h1>
        <motion.div className="flex items-center bg-white/10 p-[1vw] rounded-full cursor-pointer">
          <Search className="w-[1.5vw] h-[1.5vw] text-white" />
        </motion.div>
      </div>
      <div className="flex items-center gap-[2vw]">
        <Bell className="w-[2vw] h-[2vw] text-white cursor-pointer" />
        <User className="w-[2vw] h-[2vw] text-white cursor-pointer" />
      </div>
    </motion.header>
  );
};