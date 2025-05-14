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
} from "./data"; // Dostosuj ścieżkę

// Importuj komponenty podrzędne
import SizeOptions from "./SizeOptions";
import AdditionalOptions from "./AdditionalOptions";
import DeliveryOptions from "./DeliveryOptions";
import OrderTransitCalculator from "./OrderTransitCalculator";
import PaymentMethods from "./PaymentMethods";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";

// Importuj klienta Supabase
import { supabase } from "../../../db/supabase"; // Sprawdź poprawność ścieżki

// Definicje typów (przeniesione na górę lub do osobnego pliku types.ts)
interface SizeEntry {
  name: string;
  dimensions: string;
  price: number;
}

interface SelectedAdditionalOption {
  id: string;
  name: string;
  price: number | undefined; // Cena może być undefined, jeśli rozmiar nie jest wybrany lub opcja jest darmowa
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number | string; // Liczba lub np. "Gratis"
  default?: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  availableFor: string[]; // ID dostaw, dla których ta metoda jest dostępna
}

// Znajdź domyślne opcje przy starcie
const defaultDelivery =
  deliveryOptions.find((opt: DeliveryOption) => opt.default) ||
  deliveryOptions[0] ||
  null;
const defaultPayment =
  paymentMethods.find((method: PaymentMethod) =>
    method.availableFor.includes(defaultDelivery?.id || "")
  ) ||
  paymentMethods.filter((method) => method.availableFor.length > 0)[0] ||
  null; // Wybierz jakąś domyślną jeśli nie znaleziono dla domyślnej dostawy

const OrderPage: React.FC = () => {
  // --- Zarządzanie stanem ---
  const [selectedSizeEntry, setSelectedSizeEntry] = useState<SizeEntry | null>(
    // @ts-ignore
    sizes[Object.keys(sizes)[0]] || null // Domyślnie wybieramy pierwszy rozmiar
  );
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState<
    SelectedAdditionalOption[]
  >([]);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(defaultDelivery);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    defaultPayment
  );
  const [companyDeliveryCost, setCompanyDeliveryCost] = useState<number | null>(
    null
  ); // Koszt dostawy firmowej obliczony przez kalkulator

  // Stan formularza kontaktowego
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    notes: "",
  });

  // Stan walidacji formularza
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Stan wysyłki (ładowanie, błąd)
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // Dodajemy stan sukcesu

  // --- Handlery zmiany stanu ---

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Opcjonalnie: usuń błąd dla danego pola po rozpoczęciu pisania
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSelectSize = (sizeEntry: SizeEntry) => {
    setSelectedSizeEntry(sizeEntry);
    // Opcjonalnie: resetuj wybrane opcje dodatkowe, jeśli ich cena zależy od rozmiaru
    // W twoim kodzie AdditionalOptions component już to obsługuje w oparciu o prop `size`
  };

  const handleToggleAdditionalOption = (
    optionId: string,
    isChecked: boolean
  ) => {
    const currentSizeKey = selectedSizeEntry
      ? // @ts-ignore
        Object.keys(sizes).find((key) => sizes[key] === selectedSizeEntry)
      : null;

    const optionMappings = [
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
    ];

    const optionData = optionMappings.find((opt) => opt.id === optionId);

    if (!optionData) return; // Opcja nie znaleziona

    // Oblicz cenę opcji dla aktualnie wybranego rozmiaru
    const optionPriceForSize =
      currentSizeKey &&
      optionData.priceObj &&
      // @ts-ignore
      optionData.priceObj[currentSizeKey] !== undefined
        ? // @ts-ignore
          optionData.priceObj[currentSizeKey]
        : undefined; // Cena jest zależna od rozmiaru

    const selectedOption: SelectedAdditionalOption = {
      id: optionId,
      name: optionData.name,
      price: optionPriceForSize,
    };

    setSelectedAdditionalOptions((prevOptions) => {
      if (isChecked) {
        // Dodaj opcję, jeśli jej jeszcze nie ma
        if (!prevOptions.find((opt) => opt.id === optionId)) {
          return [...prevOptions, selectedOption];
        }
      } else {
        // Usuń opcję
        return prevOptions.filter((opt) => opt.id !== optionId);
      }
      return prevOptions; // Zwróć poprzedni stan, jeśli nic się nie zmieniło
    });
  };

  const handleSelectDelivery = (option: DeliveryOption) => {
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
      setSelectedPayment(availableMethodsForNewDelivery[0] || null); // Wybierz pierwszą dostępną
    }
  };

  const handleSelectPayment = (method: PaymentMethod) => {
    setSelectedPayment(method);
  };

  const handleCompanyDeliveryCostCalculated = (cost: number | null) => {
    setCompanyDeliveryCost(cost);
  };

  // --- Walidacja formularza ---
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "Imię jest wymagane.";
    if (!formData.lastName.trim()) errors.lastName = "Nazwisko jest wymagane.";
    if (!formData.email.trim()) {
      errors.email = "Email jest wymagany.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Niepoprawny format email.";
    }
    if (!formData.phone.trim()) errors.phone = "Numer telefonu jest wymagany.";
    if (!formData.address.trim()) errors.address = "Adres jest wymagany.";
    if (!formData.postalCode.trim()) {
      errors.postalCode = "Kod pocztowy jest wymagany.";
    } else if (!/^\d{2}-\d{3}$/.test(formData.postalCode)) {
      errors.postalCode = "Niepoprawny format (np. 00-000).";
    }
    if (!formData.city.trim()) errors.city = "Miasto jest wymagane.";

    // setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Obliczanie całkowitej ceny (memoizowane) ---
  const totalOrderPrice = useMemo(() => {
    let total = 0;

    // Cena rozmiaru
    if (selectedSizeEntry && typeof selectedSizeEntry.price === "number") {
      total += selectedSizeEntry.price;
    }

    // Cena opcji dodatkowych
    total += selectedAdditionalOptions.reduce(
      (sum, option) => sum + (option.price || 0), // Użyj 0 jeśli cena jest undefined (np. darmowa opcja)
      0
    );

    // Cena dostawy
    let finalDeliveryCost = 0;
    if (selectedDelivery) {
      if (selectedDelivery.id === "company-delivery") {
        // Użyj obliczonego kosztu dla dostawy firmowej, jeśli jest dostępny
        finalDeliveryCost =
          companyDeliveryCost !== null ? companyDeliveryCost : 0;
      } else if (typeof selectedDelivery.price === "number") {
        // Użyj stałego kosztu dla innych metod dostawy
        finalDeliveryCost = selectedDelivery.price;
      }
      // Jeśli selectedDelivery.price jest stringiem ("Gratis"), koszt wynosi 0
    }
    total += finalDeliveryCost;

    // TODO: Opcjonalnie dodać koszt płatności, jeśli jakieś metody płatności są płatne

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
        price: selectedSizeEntry.price, // Dodajemy cenę dla podsumowania
      });
    }

    // Dodaj wybrane opcje dodatkowe
    selectedAdditionalOptions.forEach((option) => {
      items.push({
        name: `Opcja: ${option.name}`,
        price: option.price, // Dodajemy cenę opcji
      });
    });

    // Dodaj wybraną dostawę
    if (selectedDelivery) {
      let deliveryPrice = undefined; // Cena do wyświetlenia w podsumowaniu
      let deliveryPriceDescription = ""; // Opis np. "+ 20 zł" lub "Gratis"

      if (selectedDelivery.id === "company-delivery") {
        deliveryPrice = companyDeliveryCost; // Użyj obliczonego kosztu
        deliveryPriceDescription =
          companyDeliveryCost !== null
            ? `+${companyDeliveryCost} zł`
            : "Koszt do ustalenia";
      } else if (typeof selectedDelivery.price === "number") {
        deliveryPrice = selectedDelivery.price; // Użyj stałego kosztu
        deliveryPriceDescription =
          selectedDelivery.price > 0
            ? `+${selectedDelivery.price} zł`
            : "Gratis";
      } else {
        deliveryPrice = 0; // Dla ceny jako string np. "Gratis"
        deliveryPriceDescription = String(selectedDelivery.price);
      }

      items.push({
        name: `Dostawa: ${selectedDelivery.name} (${deliveryPriceDescription})`,
        price: deliveryPrice,
      });
    }

    // Dodaj wybraną płatność
    if (selectedPayment) {
      // TODO: Dodać cenę płatności jeśli jest płatna
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

  // --- Handlery wysyłki zamówienia ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Zapobiega domyślnej akcji przeglądarki

    setSubmissionError(null); // Wyczyść poprzednie błędy
    setSubmissionSuccess(false); // Zresetuj stan sukcesu

    // 1. Walidacja danych formularza
    // const isFormValid = validateForm();
    // if (!isFormValid) {
    //   // Scroll do pierwszego błędu lub sekcji formularza
    //   const firstErrorField = Object.keys(formErrors)[0];
    //   if (firstErrorField) {
    //     const element = document.querySelector(`[name="${firstErrorField}"]`);
    //     element?.scrollIntoView({ behavior: "smooth", block: "center" });
    //   } else {
    //     // Jeśli brak pól z błędami (np. tylko ogólny błąd walidacji), scroll do formularza
    //     document
    //       .getElementById("contact-form-section")
    //       ?.scrollIntoView({ behavior: "smooth", block: "center" });
    //   }
    //   setSubmissionError(
    //     "Proszę uzupełnić wymagane pola w formularzu kontaktowym."
    //   );
    //   return; // Zatrzymaj proces wysyłki
    // }

    // 2. Walidacja wybranych opcji zamówienia
    if (!selectedSizeEntry) {
      setSubmissionError("Proszę wybrać rozmiar budy.");
      document
        .getElementById("size-options-section")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!selectedDelivery) {
      setSubmissionError("Proszę wybrać metodę dostawy.");
      document
        .getElementById("delivery-options-section")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (
      selectedDelivery.id === "company-delivery" &&
      companyDeliveryCost === null
    ) {
      setSubmissionError("Proszę obliczyć koszt dostawy firmowej.");
      document
        .getElementById("transit-calculator-section")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!selectedPayment) {
      setSubmissionError("Proszę wybrać metodę płatności.");
      document
        .getElementById("payment-methods-section")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // 3. Zbieranie wszystkich danych zamówienia
    const currentSizeKey = selectedSizeEntry
      ? // @ts-ignore
        Object.keys(sizes).find((key) => sizes[key] === selectedSizeEntry)
      : null;

    const finalDeliveryCost = selectedDelivery
      ? selectedDelivery.id === "company-delivery"
        ? companyDeliveryCost
        : typeof selectedDelivery.price === "number"
          ? selectedDelivery.price
          : 0
      : null; // Koszt jest 0 jeśli cena to string "Gratis" lub dostawa nie wybrana

    const orderDataForDb = {
      // Dane kontaktowe
      contact_info: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postal_code: formData.postalCode,
        city: formData.city,
        notes: formData.notes || null, // Ustaw na null jeśli puste
      },

      // Wybrane opcje produktu
      size: selectedSizeEntry
        ? {
            id: currentSizeKey,
            name: selectedSizeEntry.name,
            dimensions: selectedSizeEntry.dimensions,
            price: selectedSizeEntry.price,
          }
        : null,
      additional_options: selectedAdditionalOptions, // Już jest w formacie { id, name, price }
      delivery_option: selectedDelivery
        ? {
            id: selectedDelivery.id,
            name: selectedDelivery.name,
            base_price_desc: String(selectedDelivery.price), // Zapisz opis ceny ("Gratis" lub numer)
          }
        : null,
      company_delivery_cost: finalDeliveryCost,
      payment_method: selectedPayment
        ? {
            id: selectedPayment.id,
            name: selectedPayment.name,
          }
        : null,

      // Ceny
      total_price: totalOrderPrice, // Całkowita cena uwzględniająca wszystko

      // Status zamówienia (domyślnie pending)
      status: "pending",
    };

    // 4. Wysyłka danych do Supabase
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders") // Nazwa Twojej tabeli
        .insert([orderDataForDb]);

      if (error) {
        console.error("Błąd podczas wysyłki zamówienia:", error);
        setSubmissionError(
          `Wystąpił błąd podczas składania zamówienia: ${error.message}. Proszę spróbować ponownie.`
        );
      } else {
        console.log("Zamówienie złożone pomyślnie:", data);
        setSubmissionSuccess(true); // Ustaw stan sukcesu
        // 5. Resetowanie stanu po sukcesie
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          postalCode: "",
          city: "",
          notes: "",
        });
        // @ts-ignore
        setSelectedSizeEntry(sizes[Object.keys(sizes)[0]] || null); // Reset do domyślnego/pierwszego
        setSelectedAdditionalOptions([]);
        setSelectedDelivery(defaultDelivery);
        setSelectedPayment(defaultPayment);
        setCompanyDeliveryCost(null);
        setFormErrors({}); // Wyczyść błędy walidacji
      }
    } catch (error: any) {
      console.error("Nieoczekiwany błąd podczas wysyłki:", error);
      setSubmissionError(
        `Wystąpił nieoczekiwany błąd: ${error.message}. Proszę spróbować ponownie.`
      );
    } finally {
      setIsLoading(false); // Zakończ ładowanie
    }
  };

  // Logika wyłączania przycisku "Złóż zamówienie"
  const isSubmitButtonDisabled = useMemo(() => {
    const isFormIncomplete =
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.postalCode.trim() ||
      !formData.city.trim();

    const isOrderConfigIncomplete =
      !selectedSizeEntry ||
      !selectedDelivery ||
      !selectedPayment ||
      (selectedDelivery?.id === "company-delivery" &&
        companyDeliveryCost === null); // Wymaga obliczenia kosztu firmowej

    return isLoading || isFormIncomplete || isOrderConfigIncomplete;
  }, [
    isLoading,
    formData,
    selectedSizeEntry,
    selectedDelivery,
    selectedPayment,
    companyDeliveryCost,
  ]);

  // Pobierz klucz rozmiaru dla komponentów podrzędnych
  const currentSizeKey = selectedSizeEntry
    ? // @ts-ignore
      Object.keys(sizes).find((key) => sizes[key] === selectedSizeEntry)
    : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-heading-1 mb-12">
        Konfigurator Zamówienia Budy
      </h1>

      <div className="mt-12" id="size-options-section">
        {" "}
        {/* Dodane ID */}
        <h2 className="text-2xl font-semibold text-heading-1 mb-6">
          Wybierz Rozmiar
        </h2>
        {/* Sprawdzamy, czy sizes jest obiektem i ma klucze przed przekazaniem wartości */}
        {Object.keys(sizes).length > 0 ? (
          <SizeOptions
            sizes={Object.values(sizes)}
            onSelectSize={handleSelectSize}
          />
        ) : (
          <p>Brak dostępnych rozmiarów.</p> // Komunikat, gdy brak danych
        )}
      </div>

      <AdditionalOptions
        size={currentSizeKey} // Przekazujemy klucz rozmiaru (np. "medium")
        onToggleOption={handleToggleAdditionalOption}
        selectedOptions={selectedAdditionalOptions.map((opt) => opt.id)} // Przekazujemy listę ID
        id="additional-options-section"
      />

      <DeliveryOptions
        onSelectDelivery={handleSelectDelivery}
        selectedDeliveryId={selectedDelivery?.id || null}
        id="delivery-options-section" // Dodane ID
      />

      {selectedDelivery?.id === "company-delivery" && (
        <div id="transit-calculator-section">
          {" "}
          {/* Dodane ID */}
          <OrderTransitCalculator
            onCostCalculated={handleCompanyDeliveryCostCalculated}
          />
        </div>
      )}

      <PaymentMethods
        onSelectPayment={handleSelectPayment}
        selectedPaymentId={selectedPayment?.id || ""} // Przekaż ID wybranej dostawy
        id="payment-methods-section" // Dodane ID
      />

      <OrderSummary
        selectedOptions={summaryItems}
        totalPrice={totalOrderPrice}
      />

      <ContactForm
        formData={formData}
        handleFormChange={handleFormChange}
        formErrors={formErrors}
        // handleSubmit jest teraz wywoływane przez przycisk, nie przez formularz kontaktowy
        // form ref={formRef} // Jeśli chcesz używać formRef z ContactForm
        id="contact-form-section" // Dodane ID
      />

      {/* Sekcja komunikatów */}
      {submissionError && (
        <div
          className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          role="alert"
        >
          {submissionError}
        </div>
      )}
      {submissionSuccess && (
        <div
          className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
          role="alert"
        >
          Twoje zamówienie zostało złożone pomyślnie! Skontaktujemy się z Tobą
          wkrótce.
        </div>
      )}

      <button
        className="mt-8 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        // disabled={isSubmitButtonDisabled} // Użyj memoizowanej wartości
      >
        {isLoading ? "Przetwarzanie..." : "Złóż zamówienie"}
      </button>
    </div>
  );
};

export default OrderPage;
