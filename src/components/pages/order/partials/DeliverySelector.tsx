import { useOrderData } from "../useOrderData";

interface DeliveryOption {
    id: string;
    label: string;
    description: string;
    price: string | number;
    value: string;
}

const deliveryOptions: DeliveryOption[] = [
    {
        id: 'courier',
        label: 'Wysyłka kurierem',
        description: 'Natychmiastowa wysyłka, płatność z góry',
        price: 200,
        value: 'courier'
    },
    {
        id: 'courier-cod',
        label: 'Wysyłka kurierem za pobraniem',
        description: 'Natychmiastowa wysyłka, płatność przy odbiorze',
        price: 250,
        value: 'courier-cod'
    },
    {
        id: 'company-delivery',
        label: 'Dowóz przez naszego pracownika',
        description: '50 zł za każde rozpoczęte 100 km',
        price: 'Cena zależna od odległości',
        value: 'company-delivery'
    },
    {
        id: 'pickup',
        label: 'Odbiór osobisty',
        description: 'Odbiór w miejscu produkcji',
        price: 0,
        value: 'pickup'
    }
];

const DeliverySelector = () => {
    const { selectedDelivery, setDeliveryPrice } = useOrderData();

    const onPriceChange = (price: number) => {
        console.log(price);
        setSelectedDelivery(price);
    }
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold text-heading-1 mb-6">Opcje dostawy</h2>
            
            <div className="space-y-4">
                {deliveryOptions.map((option) => (
                    <label 
                        key={option.id}
                        className="delivery-option flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary cursor-pointer"
                    >
                        <input 
                            type="radio" 
                            name="delivery" 
                            value={option.value}
                            checked={selectedDelivery === option.value}
                            onChange={(e) => onPriceChange(option.price)}
                            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" 
                        />
                        <div className="ml-4">
                            <span className="font-medium text-heading-1">{option.label}</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                            <span className="text-sm text-primary">
                                {typeof option.price === 'number' ? `${option.price} zł` : option.price}
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default DeliverySelector;