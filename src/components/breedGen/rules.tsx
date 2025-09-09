type Props = { onStart: () => void, disabled: boolean };

const Rules: React.FC<Props> = ({ onStart, disabled }) => {
  return (
    <>
      <h1 className="text-5xl font-semibold text-black text-center st">
        Co to za
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600">
          {" "}
          rasa{" "}
        </span>
        ?
      </h1>
      <div className="flex flex-col items-center space-y-8">
        <div className="text-lg mt-5">
          <p className="mb-5 text-center"> Witaj miłośniku psiaków, zapraszamy cię do naszej gry "co to za rasa?" </p>
          <p className="font-semibold flex justify-center mb-5">Zasady</p>
          <ul className="list-disc list-inside space-y-2 text-left">
            <li>
              Gra polega na zgadywaniu rasy psa który pojawi się na obrazku.
            </li>
            <li>Do wyboru masz jedną z 4 opcji.</li>
            <li>
              Na zgadnięcie rasy jest 10 sekund, po tym czasie gra się kończy.
            </li>
            <li>
              Za każdą złą odpowiedż tracisz 2 sekundy czasu, dobra odpowiedż
              dodaje do czasu 4 sekundy, jeden punkt do sumy punktów.
            </li>
          </ul>
          <p className="font-semibold mt-5 text-center">Miłej rozgrywki!</p>
        </div>
        <div className="flex justify-center items-center gap-12">
          <button
            className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
                hover:after:opacity-100 hover:after:scale-[2.5]
                bg-primary border-transparent hover:border-[#172554] after:bg-[#172554] text-white flex justify-center w-full sm:w-max ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary border-transparent"}`}
            onClick={onStart}
            disabled={disabled}
          >
            <span className="relative z-10">
              Zagraj{" "}
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

export default Rules;
