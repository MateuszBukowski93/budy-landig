import { createContext, useContext, useState } from 'react';

interface OrderOption {
  name: string;
  price: number;
}

interface OrderContextType {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  options: {
    insulation: boolean;
    legs: boolean;
    curtain: boolean;
  };
  setOptions: (options: { insulation: boolean; legs: boolean; curtain: boolean }) => void;
  delivery: string;
  setDelivery: (delivery: string) => void;
  deliveryPrice: number;
  setDeliveryPrice: (price: number) => void;
  insulationPrice: number;
  setInsulationPrice: (price: number) => void;
  summary: OrderOption[];
  setSummary: (summary: OrderOption[]) => void;
  total: number;
  setTotal: (total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: any }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [options, setOptions] = useState({
    insulation: false,
    legs: false,
    curtain: false
  });
  const [delivery, setDelivery] = useState('pickup');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [insulationPrice, setInsulationPrice] = useState(100);
  const [summary, setSummary] = useState<OrderOption[]>([]);
  const [total, setTotal] = useState(0);

  return (
    <OrderContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        options,
        setOptions,
        delivery,
        setDelivery,
        deliveryPrice,
        setDeliveryPrice,
        insulationPrice,
        setInsulationPrice,
        summary,
        setSummary,
        total,
        setTotal
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderData() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderData must be used within an OrderProvider');
  }
  return context;
}
