"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftCircle,
  Search,
  Bookmark,
  Grid,
  Settings as GearIcon
} from "lucide-react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { icon: ArrowLeftCircle, label: "Voltar", key: "voltar" },
  { icon: Search, label: "Procurar", key: "procurar" },
  { icon: Bookmark, label: "Minha Lista", key: "minha-lista" },
  { icon: Grid, label: "Categorias", key: "categorias" },
];

type MenuItemProps = {
  icon: any;
  label: string;
  focusKey: string;
  onFocusChange: (key: string, focused: boolean) => void;
  expanded: boolean;
};

const MenuItem = ({
  icon: Icon,
  label,
  focusKey,
  onFocusChange,
  expanded,
}: MenuItemProps) => {
  const { ref, focused } = useFocusable({ focusKey });

  useEffect(() => {
    onFocusChange(focusKey, focused);

    if (focused) {
      const audio = new Audio("/sounds/focus.mp3");
      audio.volume = 0.2;
      audio.play();
    }

  }, [focused]);

  return (
    <motion.li
      ref={ref}
      className={`flex items-center gap-[1vw] cursor-pointer p-[1vw] rounded-xl transition-all duration-100 
        ${focused ? "bg-white text-slate-900 font-bold tracking-tight shadow-md" : "text-white/60 hover:text-white"}`}
      animate={{ scale: focused ? 1.1 : 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Icon className="w-[2vw] h-[2vw]" />
      {expanded && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-[1.2vw]"
        >
          {label}
        </motion.span>
      )}
    </motion.li>
  );
};


export const Menu = () => {
  const { ref, focusKey } = useFocusable({
    trackChildren: true,
    autoRestoreFocus: true,
  });

  const [isAnyFocused, setIsAnyFocused] = useState(false);
  const focusedItemsRef = useRef<Set<string>>(new Set());

  const handleFocusChange = (key: string, focused: boolean) => {
    if (focused) {
      focusedItemsRef.current.add(key);
    } else {
      focusedItemsRef.current.delete(key);
    }
    setIsAnyFocused(focusedItemsRef.current.size > 0);
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="fixed h-full flex items-center z-50">
        <motion.nav
          ref={ref}
          animate={{ width: isAnyFocused ? "18vw" : "8vw" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-start justify-start h-[90vh] py-[2vw] ml-[1vw] rounded-[2vw] 
            backdrop-blur-[0.5vw] shadow-2xl px-[1vw]
            [background:linear-gradient(theme(colors.slate.900/.20),theme(colors.slate.900))_padding-box,linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box]
            relative before:absolute before:rounded-[2vw] before:inset-0 before:bg-[url('/images/noise.png')] before:bg-[length:10vw_10vw] 
            opacity-90 border border-transparent overflow-hidden"
        >
          {/* Avatar */}
          <div className="mb-[3vw] ml-[0.2vw] flex items-center gap-[0.8vw]">
            <img
              src="/images/avatar.jpg"
              alt=""
              className="w-[3vw] h-[3vw] rounded-full object-cover border border-white/20"
            />
            {isAnyFocused && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col text-white"
              >
                <span className="font-bold leading-tight text-[1vw]">João Silva</span>
                <span className="font-light text-[0.9vw] text-white/70">Trocar perfil</span>
              </motion.div>
            )}
          </div>


          {/* Menu Items */}
          <ul className="flex flex-col gap-[2vw] w-full">
            {menuItems.map((item) => (
              <MenuItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                focusKey={item.key}
                onFocusChange={handleFocusChange}
                expanded={isAnyFocused}
              />
            ))}
          </ul>
          
          {/* Configurações */}
          <div className="mt-auto w-full">
            <MenuItem
              icon={GearIcon}
              label="Configurações"
              focusKey="configuracoes"
              onFocusChange={handleFocusChange}
              expanded={isAnyFocused}
            />
          </div>


        </motion.nav>
      </div>
    </FocusContext.Provider>
  );
};