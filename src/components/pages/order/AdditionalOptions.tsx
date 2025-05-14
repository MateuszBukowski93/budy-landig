import React, { useMemo } from "react";
import {
  legs,
  isolation,
  curtain,
  terrace,
  woodBone,
  additionalOptionsDescriptions,
} from "./data"; // Dostosuj ścieżkę, jeśli jest inna

// Definicja typów dla propsów
interface AdditionalOptionsProps {
  size?: string; // Prop size, opcjonalny
  id?: string; // Prop id, opcjonalny
  onToggleOption: (optionId: string, isChecked: boolean) => void;
  selectedOptions: string[];
}

// Funkcja pomocnicza do wyświetlania ceny (może być w komponencie lub poza nim)
function getPriceDisplay(
  priceObj: Record<string, number>,
  size: string | undefined
): string {
  // Jeśli mamy rozmiar, wyświetlamy dokładną cenę dla tego rozmiaru
  if (size && size in priceObj) {
    return `${priceObj[size]} zł`;
  }

  // W przeciwnym razie wyświetlamy zakres cen
  const prices = Object.values(priceObj);
  // Sprawdź, czy obiekt cenowy nie jest pusty
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) {
    return `${minPrice} zł`;
  } else {
    return `${minPrice} - ${maxPrice} zł`;
  }
}

const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({
  size,
  id,
  onToggleOption,
  selectedOptions,
}) => {
  // Obliczanie dodatkowych opcji za pomocą useMemo

  const additionalOptions = useMemo(() => {
    // Sprawdzamy, czy rozmiar istnieje w danych cenowych przed próbą dostępu
    // To zapobiega błędom, jeśli np. isolation[size] byłoby undefined
    const insulationPrice =
      size && isolation[size as keyof typeof isolation] !== undefined
        ? isolation[size as keyof typeof isolation]
        : undefined;
    const legsPrice =
      size && legs[size as keyof typeof legs] !== undefined
        ? legs[size as keyof typeof legs]
        : undefined;
    const curtainPrice =
      size && curtain[size as keyof typeof curtain] !== undefined
        ? curtain[size as keyof typeof curtain]
        : undefined;
    const terracePrice =
      size && terrace[size as keyof typeof terrace] !== undefined
        ? terrace[size as keyof typeof terrace]
        : undefined;
    const woodBonePrice =
      size && woodBone[size as keyof typeof woodBone] !== undefined
        ? woodBone[size as keyof typeof woodBone]
        : undefined;

    // Tworzymy tablicę opcji, podobnie jak w Astro
    return [
      {
        id: "insulation",
        name: additionalOptionsDescriptions.isolation.name,
        description: additionalOptionsDescriptions.isolation.description,
        price: insulationPrice, // Cena dla wybranego rozmiaru
        priceDisplay: getPriceDisplay(isolation, size), // Wyświetlany zakres cen
      },
      {
        id: "legs",
        name: additionalOptionsDescriptions.legs.name,
        description: additionalOptionsDescriptions.legs.description,
        price: legsPrice,
        priceDisplay: getPriceDisplay(legs, size),
      },
      {
        id: "curtain",
        name: additionalOptionsDescriptions.curtain.name,
        description: additionalOptionsDescriptions.curtain.description,
        price: curtainPrice,
        priceDisplay: getPriceDisplay(curtain, size),
      },
      {
        id: "terrace",
        name: additionalOptionsDescriptions.terrace.name,
        description: additionalOptionsDescriptions.terrace.description,
        price: terracePrice,
        priceDisplay: getPriceDisplay(terrace, size),
      },
      {
        id: "wood-bone",
        name: additionalOptionsDescriptions.woodBone.name,
        description: additionalOptionsDescriptions.woodBone.description,
        price: woodBonePrice,
        priceDisplay: getPriceDisplay(woodBone, size),
      },
    ];
  }, [size]); // Zależność hooka useMemo - przeliczaj, gdy zmieni się 'size'
  return (
    <div className="mt-12" id={id}>
      <h2 className="text-2xl font-semibold text-heading-1 mb-6">
        Dodatkowe opcje
      </h2>

      <div className="space-y-4">
        {additionalOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer"
          >
            <input
              type="checkbox"
              id={option.id}
              className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
              checked={selectedOptions.includes(option.id)}
              onChange={(e) => onToggleOption(option.id, e.target.checked)}
            />
            <div className="ml-4 flex-grow">
              <span className="font-medium text-heading-1">{option.name}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {option.description}
              </p>
            </div>
            <span className="text-primary font-semibold">
              {option.priceDisplay}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AdditionalOptions;
