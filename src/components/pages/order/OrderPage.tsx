import { OrderProvider } from './useOrderData';
import SizeSelector from './partials/SizeSelector';
import OptionsSelector from './partials/OptionsSelector';
import DeliverySelector from './partials/DeliverySelector';
import OrderSummary from './partials/OrderSummary';

export default function OrderPage() {
  return (
    <OrderProvider>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-heading-1 mb-8">Zamówienie</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-heading-1 mb-6">Wybierz rozmiar</h2>
          <SizeSelector />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-heading-1 mb-6">Opcje dodatkowe</h2>
          <OptionsSelector />
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold text-heading-1 mb-6">Sposób dostawy</h2>
          <DeliverySelector />
        </section> */}

        <section>
          <h2 className="text-2xl font-semibold text-heading-1 mb-6">Podsumowanie</h2>
          <OrderSummary />
        </section>
      </main>
    </OrderProvider>
  );
}
