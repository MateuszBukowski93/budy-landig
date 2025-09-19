interface pointsProps {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

const Points: React.FC<pointsProps> = ({ points, setPoints }: pointsProps) => {
  return (
    <div className="rounded-full aspect-square bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600 sm:w-24 w-16 text-center font-bold text-white flex flex-col justify-center items-center p-1 sm:p-2 ">
      <span className="sm:text-[15px] text-[12px] text-center">Punkty: {points}</span>
    </div>
  );
}

export default Points;
