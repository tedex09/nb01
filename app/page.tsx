"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { init, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useAppStore } from "@/store/useAppStore";

//Icons
import { Search, Settings } from "lucide-react";

// Initialize spatial navigation
init({
  debug: false,
  visualDebug: false,
});

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { selectedCard, setSelectedCard, lastUpdate, updateLastUpdate } = useAppStore();
  const { ref: navigationRef } = useFocusable();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playSound = () => {
    const audio = new Audio("/click.mp3");
    audio.volume = 1;
    audio.play();
  };

  const handleCardClick = (cardId: string) => {
    playSound();
    setSelectedCard(selectedCard === cardId ? null : cardId);
    updateLastUpdate(cardId);
  };

  const CardComponent = ({ 
    id, 
    icon: Icon, 
    title, 
    subtitle, 
    delay = 0,
    isNew = false 
  }: {
    id: string;
    icon: any;
    title: string;
    subtitle: string;
    delay?: number;
    isNew?: boolean;
  }) => {
    const { ref, focused } = useFocusable();
    const isSelected = selectedCard === id;

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
        className={`${isSelected ? 'w-[24vw] h-[34vw] shadow-[2vw]' : 'w-[20vw] h-[30vw]'} rounded-[.5vw] shadow-[1vw] backdrop-blur-[0.5vw] [background:linear-gradient(theme(colors.slate.900/.20),theme(colors.slate.900))_padding-box,linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box] relative before:absolute before:inset-0 before:bg-[url('/images/noise.png')] before:bg-[length:10vw_10vw] opacity-90 border border-transparent
          ${focused ? 'focused' : ''}`}
        onClick={() => handleCardClick(id)}
        layout
      >
         {/* Radial gradient */}
        {isSelected && (
          <>
            <div className="absolute bottom-0 w-[8vw] h-[0.2vw] translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none aspect-square" aria-hidden="true">
              <div className="absolute bg-slate-100 w-[8vw] h-[0.2vw]"></div>
            </div>
            <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[8vw] h-[2vw] aspect-square" aria-hidden="true">
              <div className="absolute inset-0 translate-z-0 bg-slate-100 w-[8vw] h-[2vw] blur-[8vw]"></div>
            </div>
          </>

        )}

       {/*  {lastUpdate[id] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 left-2 text-xs text-gray-400"
          >
            Last update: {lastUpdate[id]}
          </motion.div>
        )} */}
        <motion.div
          layout
          className="flex flex-col h-full justify-center px-[3vw]" 
          transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.3 } }}
        >
          {/* Icon */}
          <div className="flex inline-flex mb-[0.8vw]">
            {isSelected && (<div className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[30%] -translate-x-[30%] blur-[2vw] -z-10 rounded-full bg-indigo-600/50" aria-hidden="true" />)}
            <motion.div
              layout
              className={`w-full bg-gradient-to-t from-transparent to-slate-100 inline-block text-transparent bg-clip-text`}
              transition={{ layout: { duration: 1, type: "spring", bounce: 0.3 } }}
            >
              <span className={`icon-${Icon} ${isSelected ? 'text-[8vw]' : 'text-[4vw]'}`} />
            </motion.div>
          </div>
          <motion.h2 
            layout
            className={`font-bold mb-2 text-slate-300 ${isSelected ? 'text-[3vw]' : 'text-[2vw]'}`}
            transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.3 } }}
          >
            {title}
          </motion.h2>
          <motion.p layout transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.3 } }} className="text-slate-600 font-light text-[1.3vw]">{subtitle}</motion.p>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <main className="relative min-h-screen p-[2vw]" ref={navigationRef}>
      {/* Imagem de fundo */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/bg.png')] bg-cover bg-center opacity-20 before:absolute before:inset-0 before:bg-[url('/images/noise.png')] before:bg-[length:20vw_20vw]" />
 
      <nav className="flex justify-between items-center mb-[4vw]">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">Nimbus</h1>
          <div className="flex items-center bg-slate-100/10 p-[1vw] rounded-full">
            <Search className="w-[1.5vw] h-[1.5vw]" />
          </div>
        </div>
        <div className="flex items-center">
          <Settings className="w-[2vw] h-[2vw] cursor-pointer mr-[1vw]" />
          <div className="w-[3vw] h-[3vw] rounded-full bg-indigo-500 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
            onClick={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex gap-[0.3vw] items-center">
        
        <CardComponent
          id="tv"
          icon="tv"
          title="Canais"
          subtitle="+1000 canais"
        />
        <CardComponent
          id="movies"
          icon="movies"
          title="Filmes"
          subtitle="+12000 filmes"
          isNew
        />
        <CardComponent
          id="radio"
          icon="series"
          title="Series"
          subtitle="+3000 séries"
        />
      </div>

      <div className="fixed bottom-[2vw] right-[2vw] text-right bg-gradient-to-t from-transparent to-slate-100 inline-block text-transparent bg-clip-text">
        <div className="text-[3vw] font-light mb-[0.1vw]">
          {format(currentTime, "HH:mm")}
        </div>
        <div className="text-[1.2vw] text-gray-400">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </div>
      </div>
    </main>
  );
}