import React from "react";
import { deliveryOptions } from "./data"; // Dostosuj ścieżkę, jeśli jest inna
import OrderTransit from "./OrderTransitCalculator"; // Importuj komponent React OrderTransit

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number | string;
  default?: boolean;
}

const DeliveryOptions: React.FC<any> = ({
  onSelectDelivery,
  selectedDeliveryId,
}) => {
  // Brak propsów
  return (
    // Używamy className zamiast class
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-heading-1 mb-6">
        Opcje dostawy
      </h2>

      {/* Używamy className zamiast class */}
      <div className="space-y-4">
        {deliveryOptions.map((option: DeliveryOption) => (
          <label
            key={option.id}
            htmlFor={`delivery-${option.id}`} // htmlFor powiązany z id inputu
            className="delivery-option flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer"
          >
            <input
              type="radio"
              id={`delivery-${option.id}`} // Unikalne ID inputu
              name="delivery" // To samo 'name' dla wszystkich radio buttonów w grupie
              value={option.id}
              className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
              defaultChecked={option.default}
              onChange={() => onSelectDelivery(option)}
              checked={selectedDeliveryId === option.id}
            />
            <div className="ml-4">
              <span className="font-medium text-heading-1">{option.name}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {option.description}
              </p>
              {/* Używamy className zamiast class */}
              <span className="text-sm text-primary">
                {typeof option.price === "number"
                  ? `${option.price} zł`
                  : option.price}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
