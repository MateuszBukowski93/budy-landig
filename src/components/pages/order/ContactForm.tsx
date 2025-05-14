import React from "react"; // Importuj React, jeśli używasz starszej wersji lub JSX transform nie jest automatyczny

// Ten komponent nie przyjmuje żadnych propsów na podstawie dostarczonego kodu Astro,
// więc interfejs propsów jest pusty lub możemy pominąć explicite typowanie propsów.
// interface ContactFormProps {}

const ContactForm: React.FC = () => {
  // Używamy React.FC<object> lub po prostu React.FC jeśli propsy są puste
  return (
    // Zmieniamy 'class' na 'className'
    <div className="mt-12 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-heading-1 mb-6">
        Dane kontaktowe w celu realizacji zamówienia
      </h2>

      {/* Zmieniamy 'class' na 'className' */}
      {/* W React formularze często wymagają obsługi zdarzeń onSubmit i stanu pól (controlled components),
          ale w tym prostym przepisaniu zostawiamy czysty HTML form, tak jak było w Astro. */}
      <form className="space-y-6">
        {/* Zmieniamy 'class' na 'className' */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Zmieniamy 'for' na 'htmlFor' - jest to standardowa praktyka w React dla dostępności */}
            {/* Zmieniamy 'class' na 'className' */}
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-heading-3 mb-1"
            >
              Imię
            </label>
            {/* Zmieniamy 'class' na 'className' */}
            {/* Elementy input powinny być samo-zamykające się w JSX (<input ... />) */}
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Wprowadź imię"
            />
          </div>

          <div>
            {/* Zmieniamy 'for' na 'htmlFor' */}
            {/* Zmieniamy 'class' na 'className' */}
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-heading-3 mb-1"
            >
              Nazwisko
            </label>
            {/* Zmieniamy 'class' na 'className' */}
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Wprowadź nazwisko"
            />
          </div>
        </div>

        <div>
          {/* Zmieniamy 'for' na 'htmlFor' */}
          {/* Zmieniamy 'class' na 'className' */}
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-heading-3 mb-1"
          >
            Numer telefonu
          </label>
          {/* Zmieniamy 'class' na 'className' */}
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            placeholder="np. 123-456-789"
          />
        </div>

        <div>
          {/* Zmieniamy 'class' na 'className' */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {/* Zmieniamy 'for' na 'htmlFor' */}
              {/* Zmieniamy 'class' na 'className' */}
              <label
                htmlFor="street"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Ulica
              </label>
              {/* Zmieniamy 'class' na 'className' */}
              <input
                type="text"
                id="street"
                name="street"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Nazwa ulicy"
              />
            </div>
            <div>
              {/* Zmieniamy 'for' na 'htmlFor' */}
              {/* Zmieniamy 'class' na 'className' */}
              <label
                htmlFor="houseNumber"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Numer domu/mieszkania
              </label>
              {/* Zmieniamy 'class' na 'className' */}
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Nr domu/mieszkania"
              />
            </div>
            <div>
              {/* Zmieniamy 'for' na 'htmlFor' */}
              {/* Zmieniamy 'class' na 'className' */}
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Kod pocztowy
              </label>
              {/* Zmieniamy 'class' na 'className' */}
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                required
                pattern="[0-9]{2}-[0-9]{3}"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                placeholder="00-000"
              />
            </div>
            <div>
              {/* Zmieniamy 'for' na 'htmlFor' */}
              {/* Zmieniamy 'class' na 'className' */}
              <label
                htmlFor="city"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Miasto
              </label>
              {/* Zmieniamy 'class' na 'className' */}
              <input
                type="text"
                id="city"
                name="city"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Nazwa miasta"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
