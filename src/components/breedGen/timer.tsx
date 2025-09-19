import { useEffect, useState } from "react";

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  running: boolean;
}
const Timer: React.FC<TimerProps> = ({ time, setTime, running }: TimerProps) => {
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, running]);

  return (
    <div className="rounded-full aspect-square bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600 sm:w-24 w-[5rem] text-center font-bold text-white flex flex-col justify-center items-center sm:p-2 p-1">
      <span className="sm:text-[15px] text-[12px] text-center">
        Pozostały czas:{" "}
        <span className={time < 5 ? "text-red-600" : "null"}>{time}</span>
      </span>
    </div>
  );
}

export default Timer;