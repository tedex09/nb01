"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import { useAppStore } from "@/store/useAppStore";
import { Search, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import Image from 'next/image'; 
import { shallow } from "zustand/shallow";
import LazyHydrate from "react-lazy-hydration";
import bg from '@/public/images/bg.png';


// Skeletons refinados
import { CardComponent } from "../components/CardComponent";
import { SkeletonTime } from "@ui/skeletons/SkeletonTime";

const CurrentTime = dynamic(() => import("@/components/CurrentTime").then(mod => mod.CurrentTime), {
  loading: () => <SkeletonTime />,
  ssr: false,
});

export default function HomeScreen() {
  const { selectedCard, setSelectedCard } = useAppStore(
    state => ({
      selectedCard: state.selectedCard,
      setSelectedCard: state.setSelectedCard
    }),
    shallow
  );
  const { ref: navigationRef, focusKey: rootFocusKey, focusSelf } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={rootFocusKey}>
      <main className="relative min-h-screen p-[2vw]" ref={navigationRef}>
        <div className="absolute inset-0 -z-20 before:absolute before:inset-0 before:bg-[url('/images/noise.png')] before:bg-[length:20vw_20vw]" />
        <Image
          src={bg}
          alt="Background"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center opacity-20"
        />
        <nav className="flex justify-between items-center mb-[4vw]">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Nimbus</h1>
            <motion.div className="flex items-center bg-slate-100/10 p-[1vw] rounded-full cursor-pointer">
              <Search className="w-[1.5vw] h-[1.5vw]" />
            </motion.div>
          </div>
          <div className="flex items-center">
            <motion.div className="cursor-pointer">
              <Settings className="w-[2vw] h-[2vw] mr-[1vw]" />
            </motion.div>
            <motion.div className="w-[3vw] h-[3vw] rounded-full bg-indigo-500 cursor-pointer" />
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
              onClick={() => setSelectedCard(null)}
            />
          )}
        </AnimatePresence>

        <div className="flex gap-[0.3vw] items-center h-[34vw]">
          
          <CardComponent id="tv" icon="tv" titleKey="card.home1.title" subtitleKey="card.home1.subtitle" />
          
          <LazyHydrate whenVisible>
            <CardComponent id="movies" icon="movies" titleKey="card.home2.title" subtitleKey="card.home2.subtitle" />
          </LazyHydrate>
          <LazyHydrate whenVisible>
            <CardComponent id="radio" icon="series" titleKey="card.home3.title" subtitleKey="card.home3.subtitle" />
          </LazyHydrate>
        </div>

        <CurrentTime />
      </main>
    </FocusContext.Provider>
  );
}
