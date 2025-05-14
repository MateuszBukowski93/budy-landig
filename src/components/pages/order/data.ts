export const legs = {
  small: 100,
  medium: 100,
  large: 100,
  xlarge: 100,
};
export const isolation = {
  small: 100,
  medium: 100,
  large: 100,
  xlarge: 100,
};
export const curtain = {
  small: 50,
  medium: 50,
  large: 50,
  xlarge: 50,
};
export const terrace = {
  small: 100,
  medium: 150,
  large: 200,
  xlarge: 250,
};
export const woodBone = {
  small: 30,
  medium: 30,
  large: 30,
  xlarge: 30,
};
export const deliveryOptions = [
  {
    id: "courier",
    name: "Wysyłka kurierem",
    description: "Natychmiastowa wysyłka, płatność z góry",
    price: 200,
  },
  {
    id: "courier-cod",
    name: "Wysyłka kurierem za pobraniem",
    description: "Natychmiastowa wysyłka, płatność przy odbiorze",
    price: 200,
  },
  {
    id: "company-delivery",
    name: "Dowóz przez naszego pracownika",
    description: "50 gr za km",
    price: "Cena zależna od odległości",
  },
  {
    id: "pickup",
    name: "Odbiór osobisty",
    description: "Odbiór w miejscu produkcji",
    price: 0,
    default: true,
  },
];
export const paymentMethods = [
  {
    id: "blik",
    name: "BLIK",
    description: "Szybka płatność przez BLIK",
    availableFor: ["courier", "company-delivery", "pickup"],
  },
  {
    id: "bank-transfer",
    name: "Przelew na konto",
    description: "Tradycyjny przelew bankowy",
    availableFor: ["courier", "company-delivery", "pickup"],
  },
  {
    id: "cash-on-delivery",
    name: "Płatność przy odbiorze",
    description: "Zapłać gotówką przy dostawie",
    availableFor: ["courier-cod", "company-delivery", "pickup"],
  },
];

export const sizes = {
  small: {
    name: "Mała Buda",
    dimensions: "50x60 cm",
    description: "Idealna dla małych psów do 10kg",
    price: 300,
  },
  medium: {
    name: "Średnia Buda",
    dimensions: "60x80 cm",
    description: "Odpowiednia dla psów średniej wielkości 10-25kg",
    price: 400,
  },
  large: {
    name: "Duża Buda",
    dimensions: "70x100 cm",
    description: "Dla dużych psów 25-45kg",
    price: 500,
  },
  xlarge: {
    name: "Bardzo Duża Buda",
    dimensions: "90x120 cm",
    description: "Dla największych ras powyżej 45kg",
    price: 600,
  },
};
export const additionalOptionsDescriptions = {
  isolation: {
    name: "Ocieplenie",
    description: "Dodatkowa warstwa izolacyjna chroniąca przed zimnem i upałem",
  },
  legs: {
    name: "Nóżki",
    description: "Podnoszą budę nad poziom podłoża, chroniąc przed wilgocią",
  },
  curtain: {
    name: "Kurtyna",
    description: "Elastyczna zasłona chroniąca przed wiatrem i deszczem",
  },
  terrace: {
    name: "Taras",
    description:
      "Drewniany taras przed wejściem do budy, cena zależy od rozmiaru",
  },
  woodBone: {
    name: "Drewniana kość z imieniem Twojego Psa",
    description: "będzie wisiała nad wejściem do budy",
  },
};

export type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  availableFor: string[];
};

export type DeliveryOption = {
  id: string;
  name: string;
  description: string;
  price: number;
};
