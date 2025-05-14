import React, { useState } from "react";

// Definicja stałego kodu pocztowego docelowego
const destinationPostalCode = "09-411"; // Płock

// ----- Funkcje do komunikacji z API (mogą być poza komponentem) -----

// Funkcja do pobierania współrzędnych z Nominatim
async function getCoordinates(
  postalCode: string
): Promise<{ lat: number; lon: number }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=poland&format=json`
    );

    if (!response.ok) {
      const errorText = await response.text(); // Próba odczytania szczegółów błędu
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data && data[0]) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
    throw new Error("Nie znaleziono lokalizacji dla podanego kodu pocztowego.");
  } catch (error: any) {
    console.error("Błąd w getCoordinates:", error);
    throw new Error(
      `Błąd podczas pobierania współrzędnych: ${error.message || error}`
    );
  }
}

// Funkcja do pobierania dystansu trasy z OSRM
async function getRouteDistance(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): Promise<number> {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=false`
    );

    if (!response.ok) {
      const errorText = await response.text(); // Próba odczytania szczegółów błędu
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Sprawdź status odpowiedzi OSRM
    if (data.code !== "Ok") {
      throw new Error(
        `OSRM API error: ${data.code} - ${data.message || "Unknown error"}`
      );
    }

    if (data.routes && data.routes[0]) {
      // Konwersja dystansu z metrów na kilometry i zaokrąglenie
      return Math.round(data.routes[0].distance / 1000);
    }
    throw new Error("Nie można wyznaczyć trasy między podanymi lokalizacjami.");
  } catch (error: any) {
    console.error("Błąd w getRouteDistance:", error);
    throw new Error(`Błąd podczas obliczania trasy: ${error.message || error}`);
  }
}

// ----- Komponent React -----

const OrderTransitCalculator: React.FC<any> = ({ onCostCalculated }) => {
  // Stan dla wartości inputu kodu pocztowego użytkownika
  const [userPostalCode, setUserPostalCode] = useState("");
  // Stan dla wyświetlanego wyniku (odległość/koszt lub błąd/komunikat)
  const [calculationResult, setCalculationResult] = useState("");
  // Stan do zarządzania stanem ładowania (blokowanie przycisku)
  const [isLoading, setIsLoading] = useState(false);

  // Handler zmiany wartości w inputcie
  const handlePostalCodeChange = (event: any) => {
    setUserPostalCode(event.target.value);
    // Opcjonalnie: wyczyść wynik, gdy użytkownik zaczyna edytować pole
    // setCalculationResult('');
  };

  // Handler kliknięcia przycisku "Oblicz odległość"
  const handleCalculateClick = async () => {
    // Prosta walidacja formatu kodu pocztowego
    if (!/^\d{2}-\d{3}$/.test(userPostalCode)) {
      setCalculationResult("Wprowadź poprawny kod pocztowy (format: XX-XXX)");
      return;
    }

    setIsLoading(true); // Rozpocznij ładowanie
    setCalculationResult("Obliczanie..."); // Ustaw komunikat ładowania

    try {
      const [userCoords, destinationCoords] = await Promise.all([
        getCoordinates(userPostalCode),
        getCoordinates(destinationPostalCode),
      ]);

      const distance = await getRouteDistance(
        userCoords.lat,
        userCoords.lon,
        destinationCoords.lat,
        destinationCoords.lon
      );

      const deliveryCost = Math.ceil(distance) * 0.5;
      // setCompanyDeliveryCost(deliveryCost.toFixed(2));
      setCalculationResult(
        `Odległość: ${distance} km, Koszt dostawy: ${deliveryCost.toFixed(2)} zł`
      );
      onCostCalculated(Number(deliveryCost.toFixed(2)));
    } catch (error: any) {
      console.error("Błąd podczas obliczania:", error);
      setCalculationResult(
        `Wystąpił błąd: ${error.message || "Nieznany błąd"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-heading-1 mb-4">
        Oblicz koszt dostawy przez naszego pracownika
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-heading-3 mb-1"
          >
            Twój kod pocztowy
          </label>
          <input
            type="text"
            id="postalCode"
            className="w-full max-w-xs px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            placeholder="np. 00-000"
            pattern="[0-9]{2}-[0-9]{3}"
            value={userPostalCode}
            onChange={handlePostalCodeChange}
          />
        </div>
        <button
          id="calculateDistance"
          className="w-fit px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCalculateClick}
          disabled={isLoading}
        >
          {isLoading ? "Obliczanie..." : "Oblicz odległość"}
        </button>

        <div id="transit-result" className="text-heading-3">
          {calculationResult}
        </div>
      </div>
    </div>
  );
};

export default OrderTransitCalculator;
