import React from "react";
import { paymentMethods } from "./data";

interface PaymentMethodsProps {
  onSelectPayment: (method: any) => void;
  selectedPaymentId: string | number;
  id?: string;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  onSelectPayment,
  selectedPaymentId,
  id,
}) => {
  return (
    <div className="mt-12" id={id}>
      <h2 className="text-2xl font-semibold text-heading-1 mb-6">
        Metoda płatności
      </h2>

      <div className="space-y-4">
        {paymentMethods.map((method: any) => (
          <label
            key={method.id}
            htmlFor={`payment-${method.id}`}
            className="payment-method flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer"
          >
            <input
              type="radio"
              id={`payment-${method.id}`}
              name="payment"
              value={method.id}
              className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
              onChange={() => onSelectPayment(method)}
              checked={selectedPaymentId === method.id}
            />
            <div className="ml-4">
              <span className="font-medium text-heading-1">{method.name}</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {method.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
