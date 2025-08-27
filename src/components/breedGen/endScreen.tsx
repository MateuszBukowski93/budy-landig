interface Props {
  onStart: () => void;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

export function EndScreen({ onStart, points, setPoints }: Props) {
  return (
    <>
      <div className="">
      <h1 className="text-5xl font-semibold text-black text-center st">Koniec gry!</h1>
        <p className="flex justify-center text-lg mt-5 mb-5 ">Zdobyte punkty: {points} </p>
        <div className="flex justify-center items-center gap-12">
          <button
            className="px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
                hover:after:opacity-100 hover:after:scale-[2.5]
                bg-primary border-transparent hover:border-[#172554] after:bg-[#172554] text-white flex justify-center w-full sm:w-max"
          >
            <span className="relative z-10" onClick={onStart}>
              Zagraj jeszcze raz!{" "}
            </span>
          </button>
          <button
            className="px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
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
    </>
  );
}
