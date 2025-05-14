import React, { useMemo } from "react";
import { sizes } from "./data";

interface SizeOptionsProps {
  sizes?: Array<{
    name: string;
    dimensions: string;
    description: string;
    // Note: The price property might be added here if using imported data,
    // but it's explicitly not in the Astro prop definition.
    // We handle this in the internal type.
  }>;
  prices?: Record<string, number>;
  onSelectSize?: (size: SizeEntry) => void;
}

// Internal type representing an item in the sizeEntries array
interface SizeEntry {
  name: string;
  dimensions: string;
  description: string;
  price?: number; // Price might come from imported data or be absent if using propSizes
}

const SizeOptions: React.FC<SizeOptionsProps> = ({
  sizes: propSizes,
  prices: propPrices,
  onSelectSize,
}) => {
  const sizeEntries: SizeEntry[] = useMemo(() => {
    if (propSizes) {
      // If propSizes is provided, use it directly.
      // Objects from propSizes might not have the 'price' property.
      // We assert the type as SizeEntry[] because SizeEntry allows price to be optional.
      return propSizes as SizeEntry[];
    } else {
      // Otherwise, use the imported 'sizes' data and map it.
      // Assuming 'sizes' is Record<string, { name: string; dimensions: string; description: string; price: number; }>
      // Objects created here WILL have the 'price' property from the data.
      return Object.entries(sizes).map(([key, value]) => ({
        name: value.name,
        dimensions: value.dimensions,
        description: value.description,
        price: value.price,
      }));
    }
  }, [propSizes]);

  const handleSizeClick = (size: SizeEntry) => {
    console.log("handleSizeClick", size);
    if (onSelectSize) {
      onSelectSize(size);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sizeEntries.map((size, index) => (
        <button
          key={size.name || index}
          className="size-option p-6 border-2 border-gray-200 rounded-xl hover:border-primary focus:border-primary focus:outline-none transition-colors"
          onClick={() => handleSizeClick(size)}
          type="button"
        >
          <h2 className="text-xl font-semibold text-heading-1 mb-2">
            {size.name}
          </h2>
          <p className="text-heading-3">{size.dimensions}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {size.description}
          </p>
          <p className="mt-4 text-lg font-semibold text-primary">
            {propPrices && size.name in propPrices
              ? `${propPrices[size.name]} zł`
              : size.price !== undefined
                ? `${size.price} zł`
                : ""}
          </p>
        </button>
      ))}
    </div>
  );
};

export default SizeOptions;
