import { useEffect, useState } from "react";

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}
export function Timer({ time, setTime }: TimerProps) {
  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="absolute top-1/2 right-[6rem] -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600 h-24 w-24 text-center font-bold text-white flex flex-col justify-center items-center p-2">
      <span className="text-[15px] text-center">
        Pozostały czas:{" "}
        <span className={time < 5 ? "text-red-600" : "null"}>{time}</span>
      </span>
    </div>
  );
}
