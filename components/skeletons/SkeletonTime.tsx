"use client";

import { motion } from "framer-motion";

export const SkeletonTime = () => (
  <motion.div className="fixed bottom-[2vw] right-[2vw] inline-block animate-pulse">
    <div className="h-[3vw] w-[10vw] bg-slate-700 rounded-md ml-auto mb-[0.1vw]" />
    <div className="h-[1.2vw] w-[13vw] bg-slate-700 rounded-md ml-auto" />
  </motion.div>
);
