"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  return (
    <div className="fixed bottom-[2vw] right-[2vw] text-right bg-gradient-to-t from-transparent to-slate-100 inline-block text-transparent bg-clip-text">
      <div className="text-[3vw] font-light mb-[0.1vw]">
        {format(currentTime, "HH:mm")}
      </div>
      <div className="text-[1.2vw] text-gray-400">
        {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
      </div>
    </div>
  );
};
