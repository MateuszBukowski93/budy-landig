interface pointsProps {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

export function Points({ points, setPoints }: pointsProps) {
  return (
    <div className="absolute top-1/2 left-[6rem] -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600 h-24 w-24 text-center font-bold text-white flex flex-col justify-center items-center p-2">
      <span className="text-[15px] text-center">Punkty: {points}</span>
    </div>
  );
}
