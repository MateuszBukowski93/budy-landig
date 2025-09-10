import React, { useState, useEffect } from "react";
import axios from "axios";
import Rules from "./rules";
import Timer from "./timer";
import Points from "./points";
import EndScreen from "./endScreen";
import { translations } from "./translations";

interface breedListResponse {
  message: Record<string, string[]>;
  status: string;
}

function getBreedArray(data: breedListResponse): string[] {
  const breeds: string[] = [];
  for (const [breed, subBreeds] of Object.entries(data.message)) {
    if (subBreeds.length === 0) {
      breeds.push(breed);
    } else {
      subBreeds.forEach((sub) => breeds.push(`${breed}-${sub}`));
    }
  }
  return breeds;
}

function getRandomBreeds(
  allBreeds: string[],
  correctBreed: string,
  count: number
): string[] {
  const options = allBreeds.filter((b) => b !== correctBreed);
  const selected: string[] = [];

  while (selected.length < count && options.length > 0) {
    const index = Math.floor(Math.random() * options.length);
    selected.push(options.splice(index, 1)[0]);
  }

  return selected;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function TitleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function BreedFormat(oldBreed: string): string {
  const clean = oldBreed.replace(/_/g, "-");

  if (translations[clean]) return translations[clean];

  const parts = clean.split("-");

  if (parts.length === 1) return TitleCase(parts[0]);
  const [breed, sub] = parts;
  return TitleCase(`${sub} ${breed}`);
}

function preloadImg(url: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = reject;
  });
}

const DogImg: React.FC<any> = () => {
  const [dogUrl, setDogUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [breed, setBreed] = useState("");
  const [nextBreed, setNextBreed] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [nextOptions, setNextOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [time, setTime] = useState(10);
  const [timeChange, setTimeChange] = useState<{ [key: string]: number }>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [transitioning, setTransitioning] = useState(false);
  const [imageTransitioning, setImageTransitioning] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const fetchDogAndBreed = async () => {
    console.log("fetchDog wywołane!");
    try {
      setLoading(true);
      const res = await axios.get("api/breed");
      const { image, breeds } = res.data;

      await preloadImg(image);

      setDogUrl(image);

      console.log("Odpowiedź z API:", res.data);

      const extractedBreed = image
        .split("/breeds/")[1]
        .split("/")[0]
        .replace(/_/g, "-");

      const breedArray = getBreedArray({ message: breeds, status: "success" });
      const randomBreeds = getRandomBreeds(breedArray, extractedBreed, 3);
      const shuffled = shuffleArray([extractedBreed, ...randomBreeds]);

      setBreed(extractedBreed);
      setOptions(shuffled);

      preloadNext();
    } catch (err) {
      console.error("Błąd pobierania zdjęcia psa", err);
    } finally {
      setLoading(false);
    }
  };

  const preloadNext = async () => {
    try {
      const res = await axios.get("api/breed");
      const { image, breeds } = res.data;

      await preloadImg(image);

      const extractedBreed = image
        .split("/breeds/")[1]
        .split("/")[0]
        .replace(/_/g, "-");

      const breedArray = getBreedArray({ message: breeds, status: "success" });
      const randomBreeds = getRandomBreeds(breedArray, extractedBreed, 3);
      const shuffled = shuffleArray([extractedBreed, ...randomBreeds]);

      setNextUrl(image);
      setNextBreed(extractedBreed);
      setNextOptions(shuffled);
    } catch (err) {
      console.error("Błąd preloadu psa", err);
    }
  };

  useEffect(() => {
    fetchDogAndBreed();
  }, []);

  useEffect(() => {
    if (time <= 0 && showGame) {
      setTransitioning(true);
      setTimeout(() => {
        setShowGame(false);
        setEndGame(true);
        setTransitioning(false);
        setTimeout(() => setShowEndScreen(true), 50);
      }, 500);
    }
  }, [time, showGame]);

  const startGame = async () => {
    setDisabled(true);
    setTransitioning(true);
    setTimeout(async () => {
      setTime(10);
      await fetchDogAndBreed();
      setShowGame(true);
      setTransitioning(false);
    }, 400);
  };

  const restartGame = () => {
    setDisabled(false);
    setTransitioning(true);
    setTimeout(() => {
      setPoints(0);
      setShowGame(false);
      setEndGame(false);
      setShowEndScreen(false);
      setTransitioning(false);
    }, 400);
  };

  const resetGame = () => {
    setDisabled(false);
    setTransitioning(true);
    setTimeout(() => {
      setShowGame(false);
      setPoints(0);
      setBreed("");
      setDogUrl("");
      setOptions([]);
      setTransitioning(false);
    }, 400);
  }

  //TODO: animacje fade in oraz fade out przy końcu i początku gry.

  return (
    <>
      <div className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-br from-slate-100 to-zinc-200 dark:from-slate-800 dark:to-zinc-800">
        <div
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ease-in-out ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <h1 className="text-5xl font-semibold text-black animate-pulse">
            Ładowanie...
          </h1>
        </div>
        <div className={`transition-all duration-500 ease-in-out transform ${loading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          {!showGame && !endGame && <Rules onStart={startGame} disabled={disabled} />}

          {showGame && (
            <>
              <button
                onClick={resetGame}
                className="absolute top-0 right-2 rounded-2xl bg-red-600 h-12 w-12 text-center font-semibold text-white flex flex-col justify-center items-center p-2 hover:bg-red-800"
              >
                <span className="text-white text-2xl">X</span>
              </button>
              <div className="flex flex-col justify-center items-center mb-10">
                <span className="mb-10 font-semibold text-3xl text-center z-10">
                  Co to za rasa?
                </span>
                <div
                  className={`relative max-w-[500px] max-h-[400px] rounded-xl overflow-hidden transition-all duration-500 ease-in-out transform ${imageTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                >
                  <img
                    src={dogUrl}
                    alt="random-dog"
                    className="object-cover"
                  />
                </div>
                {showGame ? (
                  <Timer time={time} setTime={setTime}></Timer>
                ) : null}
                {showGame ? (
                  <Points points={points} setPoints={setPoints}></Points>
                ) : null}
              </div>
              <div className="text-center flex justify-center gap-24">
                {options.map((opt: string, i: number) => (
                  <button
                    key={opt}
                    className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
                            hover:after:opacity-100 hover:after:scale-[2.5]
                           text-white flex justify-center w-full sm:w-max
                            ${selected === opt ? (opt === breed ? "bg-green-600" : "bg-red-600") : "bg-primary border-transparent hover:border-[#172554] after:bg-[#172554]"}`}
                    onClick={() => {
                      if (time > 0) {
                        const change = opt === breed ? 4 : -2;
                        setTimeChange({ [opt]: change });
                        setTime((prev) => prev + change);

                        setSelected(opt);

                        if (opt === breed) {
                          setPoints((prev) => prev + 1);
                          setImageTransitioning(true);
                          setTimeout(() => {
                            if (nextUrl) {
                              setDogUrl(nextUrl);
                              setBreed(nextBreed);
                              setOptions(nextOptions);
                            }
                            preloadNext();
                            setSelected(null);
                            setTimeChange({});
                            setImageTransitioning(false);
                          }, 800);
                        } else {
                          setTimeout(() => {
                            setSelected(null);
                            setTimeChange({});
                          }, 800);
                        }
                      }
                    }}
                  >
                    <span className="relative z-10">
                      {i + 1}. {BreedFormat(opt)}
                      {timeChange[opt] !== undefined && (
                        <span
                          className={`ml-2 font-bold ${timeChange[opt] > 0 ? "text-green-800" : "text-red-800"}`}
                        >
                          {timeChange[opt] > 0
                            ? `+${timeChange[opt]}s`
                            : `${timeChange[opt]}s`}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {endGame === true ? (
            <div
              className={`transition-all duration-500 ease-in-out transform ${transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <EndScreen
                points={points}
                setPoints={setPoints}
                onStart={restartGame}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default DogImg