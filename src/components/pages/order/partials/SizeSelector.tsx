import { useOrderData } from "../useOrderData";


interface SizeData {
  label: string;
  dimensions: string;
  price: number;
  description: string;
}

const sizeData: SizeData[] = [
  {
    label: 'Mała Buda',
    dimensions: '50x60 cm',
    price: 450,
    description: 'Idealna dla małych psów do 10kg'
  },
  {
    label: 'Średnia Buda', 
    dimensions: '60x80 cm',
    price: 600,
    description: 'Odpowiednia dla psów średniej wielkości 10-25kg'
  },
  {
    label: 'Duża Buda',
    dimensions: '70x100 cm', 
    price: 700,
    description: 'Dla dużych psów 25-45kg'
  },
  {
    label: 'Bardzo Duża Buda',
    dimensions: '90x120 cm',
    price: 1000,
    description: 'Dla największych ras powyżej 45kg'
  }
];

const SizeSelector = () => {
    const { selectedSize, setSelectedSize } = useOrderData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sizeData.map((size) => (
                <button
                    key={size.label}
                    className={`size-option p-6 border-2 ${
                        selectedSize === size.label ? 'border-primary' : 'border-gray-200'
                    } rounded-xl hover:border-primary focus:border-primary focus:outline-none transition-colors`}
                    onClick={() => setSelectedSize(size.label)}
                >
                    <h2 className="text-xl font-semibold text-heading-1 mb-2">{size.label}</h2>
                    <p className="text-heading-3">{size.dimensions}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{size.description}</p>
                    <p className="mt-4 text-lg font-semibold text-primary">{size.price} zł</p>
                </button>
            ))}
        </div>
    );
};

export default SizeSelector;
