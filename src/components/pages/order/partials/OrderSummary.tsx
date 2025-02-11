import { useOrderData } from "../useOrderData";

const OrderSummary = () => {
    const { selectedSize, options, delivery, summary, total } = useOrderData();
    const context = useOrderData();
    console.log({context});
    return (
        <div className="mt-12 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-heading-1 mb-6">Podsumowanie zamówienia</h2>
            
            <div className="space-y-4">
                
                <div className="selected-options">
                    <h3 className="font-medium text-heading-2 mb-3">Wybrane opcje:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        {selectedSize && (
                            <li>{selectedSize}</li>
                        )}
                        {options.insulation && (
                            <li>Ocieplenie</li>
                        )}
                        {options.legs && (
                            <li>Nóżki</li>
                        )}
                        {options.curtain && (
                            <li>Kurtyna</li>
                        )}
                        {delivery !== 'pickup' && (
                            <li>Dostawa: {delivery}</li>
                        )}
                    </ul>
                </div>

                <div className="total mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-heading-1">Suma:</span>
                        <span className="text-lg font-bold text-primary">{total} zł</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;