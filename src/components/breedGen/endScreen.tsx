interface Props {
  onStart: () => void;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const EndScreen: React.FC<Props> = ({ onStart, points, setPoints }: Props) => {
  return (
    <div className="p-4 sm:p-8 flex flex-col items-center max-w-3xl mx-auto">
      <h1 className="lg:text-5xl sm:text-4xl text-3xl font-semibold text-black text-center tracking-wide leading-snug mb-6">Koniec gry!</h1>
      <p className="text-lg sm:text-xl text-center mb-8">Zdobyte punkty: {points} </p>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 sm:gap-12">
        <button
          className="sm:px-6 sm:py-3 px-4 py-2 sm:w-auto rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
                hover:after:opacity-100 hover:after:scale-[2.5]
                bg-primary border-transparent hover:border-[#172554] after:bg-[#172554] text-white flex justify-center w-full sm:w-max"
        >
          <span className="relative z-10" onClick={onStart}>
            Zagraj jeszcze raz!{" "}
          </span>
        </button>
        <button
          className="sm:px-6 sm:py-3 px-4 py-2 sm:w-auto rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
                hover:after:opacity-100 hover:after:scale-[2.5]
                bg-primary border-transparent hover:border-[#172554] after:bg-[#172554] text-white flex justify-center w-full sm:w-max"
        >
          <span
            className="relative z-10"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Wyjdź z gry{" "}
          </span>
        </button>
      </div>
    </div>
  );
}

export default EndScreen;