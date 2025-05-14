import React, { useState, useMemo, useEffect } from "react";
import {
  sizes,
  legs,
  isolation,
  curtain,
  terrace,
  woodBone,
  additionalOptionsDescriptions,
  deliveryOptions,
  paymentMethods,
} from "./data"; // Dostosuj ścieżkę do pliku z danymi

// Importuj komponenty podrzędne
import SizeOptions from "./SizeOptions";
import AdditionalOptions from "./AdditionalOptions";
import DeliveryOptions from "./DeliveryOptions";
import OrderTransitCalculator from "./OrderTransitCalculator";
import PaymentMethods from "./PaymentMethods";
import ContactForm from "./ContactForm"; // Zakładamy, że formularz kontaktowy jest na tej samej stronie
import OrderSummary from "./OrderSummary";

// Definicja typów dla wybranej opcji dodatkowej w stanie
interface SelectedAdditionalOption {
  id: string;
  name: string;
  price: number | undefined; // Cena może być undefined, jeśli rozmiar nie jest wybrany
}

const defaultDelivery =
  deliveryOptions.find((opt) => opt.default) || deliveryOptions[0] || null;
const defaultPayment =
  paymentMethods.find((method) =>
    method.availableFor.includes(defaultDelivery?.id || "")
  ) ||
  paymentMethods[0] ||
  null;

const OrderPage: React.FC = () => {
  // --- Stan zamówienia ---
  const [selectedSizeEntry, setSelectedSizeEntry] = useState<
    (typeof sizes)[keyof typeof sizes] | null
  >(sizes[Object.keys(sizes)[0]] || null); // Domyślnie wybieramy pierwszy rozmiar lub null
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState<
    SelectedAdditionalOption[]
  >([]); // Przechowujemy obiekty wybranych opcji z ceną
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(defaultDelivery); // Domyślna lub pierwsza dostawa
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    defaultPayment
  ); // Domyślna lub pierwsza płatność dla domyślnej dostawy
  const [companyDeliveryCost, setCompanyDeliveryCost] = useState<number | null>(
    null
  ); // Koszt dostawy firmowej obliczony przez kalkulator

  // --- Handlery zmiany stanu ---

  const handleSelectSize = (sizeEntry: (typeof sizes)[keyof typeof sizes]) => {
    console.log("handleSelectSize", sizeEntry);
    setSelectedSizeEntry(sizeEntry);
    // Opcjonalnie: resetuj wybrane opcje dodatkowe, jeśli ich cena zależy od rozmiaru
    // setSelectedAdditionalOptions([]);
    // Note: AdditionalOptions component now handles recalculating prices based on selectedSize prop
  };

  const handleToggleAdditionalOption = (
    optionId: string,
    isChecked: boolean
  ) => {
    // Znajdź dane opcji z pełnymi informacjami (w tym ceną dla wybranego rozmiaru)
    // Potrzebujemy ceny dla aktualnie wybranego rozmiaru
    const currentSizeKey = selectedSizeEntry
      ? Object.keys(sizes).find((key) => sizes[key] === selectedSizeEntry)
      : null;

    const optionData = [
      {
        id: "insulation",
        name: additionalOptionsDescriptions.isolation.name,
        priceObj: isolation,
      },
      {
        id: "legs",
        name: additionalOptionsDescriptions.legs.name,
        priceObj: legs,
      },
      {
        id: "curtain",
        name: additionalOptionsDescriptions.curtain.name,
        priceObj: curtain,
      },
      {
        id: "terrace",
        name: additionalOptionsDescriptions.terrace.name,
        priceObj: terrace,
      },
      {
        id: "wood-bone",
        name: additionalOptionsDescriptions.woodBone.name,
        priceObj: woodBone,
      },
    ].find((opt) => opt.id === optionId);

    if (!optionData) return; // Opcja nie znaleziona

    const optionPriceForSize =
      currentSizeKey && optionData.priceObj[currentSizeKey] !== undefined
        ? optionData.priceObj[currentSizeKey]
        : undefined; // Cena jest zależna od rozmiaru

    const selectedOption: SelectedAdditionalOption = {
      id: optionId,
      name: optionData.name,
      price: optionPriceForSize,
    };

    if (isChecked) {
      // Dodaj opcję, jeśli jej jeszcze nie ma
      if (!selectedAdditionalOptions.find((opt) => opt.id === optionId)) {
        setSelectedAdditionalOptions([
          ...selectedAdditionalOptions,
          selectedOption,
        ]);
      }
    } else {
      // Usuń opcję
      setSelectedAdditionalOptions(
        selectedAdditionalOptions.filter((opt) => opt.id !== optionId)
      );
    }
  };

  const handleSelectDelivery = (option: any) => {
    setSelectedDelivery(option);
    // Jeśli zmieniono dostawę, zresetuj koszt dostawy firmowej
    if (option.id !== "company-delivery") {
      setCompanyDeliveryCost(null);
    }
    // Zresetuj wybraną metodę płatności, jeśli nowa dostawa jej nie obsługuje
    const availableMethodsForNewDelivery = paymentMethods.filter((method) =>
      method.availableFor.includes(option.id)
    );
    if (
      selectedPayment &&
      !availableMethodsForNewDelivery.find((m) => m.id === selectedPayment.id)
    ) {
      setSelectedPayment(availableMethodsForNewDelivery[0] || null); // Wybierz pierwszą dostępną dla nowej dostawy
    }
  };

  const handleSelectPayment = (method: any) => {
    setSelectedPayment(method);
  };

  const handleCompanyDeliveryCostCalculated = (cost: number) => {
    setCompanyDeliveryCost(cost);
  };

  // --- Obliczanie całkowitej ceny (memoizowane) ---
  const totalOrderPrice = useMemo(() => {
    let total = 0;

    // Cena rozmiaru
    if (selectedSizeEntry && selectedSizeEntry.price !== undefined) {
      total += selectedSizeEntry.price;
    }

    // Cena opcji dodatkowych
    total += selectedAdditionalOptions.reduce(
      (sum, option) => sum + (option.price || 0),
      0
    );

    // Cena dostawy
    if (selectedDelivery) {
      if (selectedDelivery.id === "company-delivery") {
        total += companyDeliveryCost || 0; // Dodaj obliczony koszt dostawy firmowej
      } else if (typeof selectedDelivery.price === "number") {
        total += selectedDelivery.price; // Dodaj stały koszt dostawy
      }
    }

    return total;
  }, [
    selectedSizeEntry,
    selectedAdditionalOptions,
    selectedDelivery,
    companyDeliveryCost,
  ]);

  // --- Przygotowanie danych dla podsumowania (memoizowane) ---
  const summaryItems = useMemo(() => {
    const items = [];

    // Dodaj wybrany rozmiar
    if (selectedSizeEntry) {
      items.push({
        name: `Buda: ${selectedSizeEntry.name} (${selectedSizeEntry.dimensions})`,
      });
    }

    // Dodaj wybrane opcje dodatkowe
    selectedAdditionalOptions.forEach((option) => {
      const priceDisplay =
        option.price !== undefined ? ` (+${option.price} zł)` : "";
      items.push({ name: `Opcja: ${option.name}${priceDisplay}` });
    });

    // Dodaj wybraną dostawę
    if (selectedDelivery) {
      let deliveryPriceDisplay = "";
      if (selectedDelivery.id === "company-delivery") {
        deliveryPriceDisplay =
          companyDeliveryCost !== null
            ? ` (+${companyDeliveryCost} zł)`
            : " (Koszt do ustalenia/obliczenia)";
      } else if (typeof selectedDelivery.price === "number") {
        deliveryPriceDisplay = ` (+${selectedDelivery.price} zł)`;
      } else {
        deliveryPriceDisplay = ` (${selectedDelivery.price})`; // Np. "Gratis"
      }
      items.push({
        name: `Dostawa: ${selectedDelivery.name}${deliveryPriceDisplay}`,
      });
    }

    // Dodaj wybraną płatność
    if (selectedPayment) {
      items.push({ name: `Płatność: ${selectedPayment.name}` });
    }

    return items;
  }, [
    selectedSizeEntry,
    selectedAdditionalOptions,
    selectedDelivery,
    selectedPayment,
    companyDeliveryCost,
  ]);

  // --- Efekt synchronizujący wybraną płatność przy zmianie dostawy ---

  const currentSizeKey = selectedSizeEntry
    ? Object.keys(sizes).find((key) => sizes[key] === selectedSizeEntry)
    : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      {" "}
      {/* Kontener strony */}
      <h1 className="text-3xl font-bold text-center text-heading-1 mb-12">
        Konfigurator Zamówienia Budy
      </h1>
      {/* 1. Wybór Rozmiaru */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-heading-1 mb-6">
          Wybierz Rozmiar
        </h2>
        {/* Pass sizes data and handler */}
        <SizeOptions
          sizes={Object.values(sizes)} // Przekazujemy wartości obiektów rozmiarów
          onSelectSize={handleSelectSize}
          selectedSizeName={selectedSizeEntry?.name}
        />
      </div>
      <AdditionalOptions
        size={currentSizeKey} // Przekazujemy klucz rozmiaru (np. "medium")
        onToggleOption={handleToggleAdditionalOption}
        selectedOptions={selectedAdditionalOptions.map((opt) => opt.id)} // Przekazujemy listę ID wybranych opcji
        id="additional-options-section"
      />
      <DeliveryOptions
        onSelectDelivery={handleSelectDelivery}
        selectedDeliveryId={selectedDelivery?.id || null}
      />
      {selectedDelivery?.id === "company-delivery" && (
        <OrderTransitCalculator
          onCostCalculated={handleCompanyDeliveryCostCalculated}
        />
      )}
      <PaymentMethods
        onSelectPayment={handleSelectPayment}
        selectedPaymentId={selectedPayment?.id || null}
      />
      <OrderSummary
        selectedOptions={summaryItems}
        totalPrice={totalOrderPrice}
      />
      <ContactForm />
      <button className="mt-8 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
        Złóż zamówienie
      </button>
    </div>
  );
};

export default OrderPage;
