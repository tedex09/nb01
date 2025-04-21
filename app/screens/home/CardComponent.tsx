"use client";

import { motion } from "framer-motion";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useAppStore } from "@/store/useAppStore";

interface CardProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  delay?: number;
  isNew?: boolean;
}

export const CardComponent = ({ id, icon: Icon, title, subtitle }: CardProps) => {
  const { selectedCard, setSelectedCard, updateLastUpdate } = useAppStore();
  const { ref, focused } = useFocusable({
    onEnterPress: () => handleClick(),
    focusKey: `card-${id}`,
    trackChildren: true,
  });

  const handleClick = () => {
    const audio = new Audio("/click.mp3");
    audio.volume = 1;
    audio.play();
    setSelectedCard(selectedCard === id ? null : id);
    updateLastUpdate(id);
  };

  const isSelected = selectedCard === id;

  const variants = {
    focused: {
      width: "24vw",
      height: "34vw",
      boxShadow: "0 0 2vw rgba(0,0,0,0.4)",
      transition: { duration: 0.3 },
    },
    unfocused: {
      width: "20vw",
      height: "30vw",
      boxShadow: "0 0 1vw rgba(0,0,0,0.3)",
      transition: { duration: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="unfocused"
      animate={focused ? "focused" : "unfocused"}
      variants={variants}
      className={`
        rounded-[.5vw] backdrop-blur-[0.5vw]
        [background:linear-gradient(theme(colors.slate.900/.20),theme(colors.slate.900))_padding-box,linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box]
        relative before:absolute before:inset-0 before:bg-[url('/images/noise.png')] before:bg-[length:10vw_10vw]
        opacity-90 border border-transparent cursor-pointer
      `}
      onClick={handleClick}
    >
      {focused && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
          <div className="absolute bottom-0 w-[8vw] h-[0.2vw] translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none aspect-square">
            <div className="absolute bg-slate-100 w-[8vw] h-[0.2vw]" />
          </div>
          <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[8vw] h-[2vw] aspect-square">
            <div className="absolute inset-0 translate-z-0 bg-slate-100 w-[8vw] h-[2vw] blur-[8vw]" />
          </div>
        </motion.div>
      )}

      <motion.div className="flex flex-col h-full justify-center px-[3vw]" layout="position">
        <div className="flex inline-flex mb-[0.8vw]">
          {focused && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[30%] -translate-x-[30%] blur-[2vw] -z-10 rounded-full bg-indigo-600/50"
              aria-hidden="true"
            />
          )}
          <motion.div
            className="w-full bg-gradient-to-t from-transparent to-slate-100 inline-block text-transparent bg-clip-text"
            layout="position"
          >
            <span className={`icon-${Icon} ${focused ? "text-[8vw]" : "text-[4vw]"} transition-all duration-300`} />
          </motion.div>
        </div>
        <motion.h2
          className={`font-bold mb-2 text-slate-300 ${focused ? "text-[3vw]" : "text-[2vw]"} transition-all duration-300`}
          layout="position"
        >
          {title}
        </motion.h2>
        <motion.p className="text-slate-600 font-light text-[1.3vw]" layout="position">
          {subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
