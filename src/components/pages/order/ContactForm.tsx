import React from "react"; // Importuj React, jeśli używasz starszej wersji lub JSX transform nie jest automatyczny

// Ten komponent nie przyjmuje żadnych propsów na podstawie dostarczonego kodu Astro,
// więc interfejs propsów jest pusty lub możemy pominąć explicite typowanie propsów.
// interface ContactFormProps {}

interface ContactFormProps {
  formData?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
  };
  handleFormChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors?: Record<string, string>;
  handleSubmit?: (e: React.FormEvent) => void;
  id?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData = {},
  handleFormChange,
  formErrors = {},
  handleSubmit,
  id,
}) => {
  return (
    <div className="mt-12 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-heading-1 mb-6">
        Dane kontaktowe w celu realizacji zamówienia
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-heading-3 mb-1"
            >
              Imię
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className={`w-full px-4 py-2 border ${
                formErrors.firstName ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:border-primary`}
              placeholder="Wprowadź imię"
              value={formData.firstName || ""}
              onChange={handleFormChange}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-heading-3 mb-1"
            >
              Nazwisko
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className={`w-full px-4 py-2 border ${
                formErrors.lastName ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:border-primary`}
              placeholder="Wprowadź nazwisko"
              value={formData.lastName || ""}
              onChange={handleFormChange}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-heading-3 mb-1"
          >
            Numer telefonu
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={`w-full px-4 py-2 border ${
              formErrors.phone ? "border-red-500" : "border-gray-200"
            } rounded-lg focus:outline-none focus:border-primary`}
            placeholder="np. 123-456-789"
            value={formData.phone || ""}
            onChange={handleFormChange}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-heading-3 mb-1"
          >
            Adres e-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full px-4 py-2 border ${
              formErrors.email ? "border-red-500" : "border-gray-200"
            } rounded-lg focus:outline-none focus:border-primary`}
            placeholder="Wprowadź adres e-mail"
            value={formData.email || ""}
            onChange={handleFormChange}
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>
      </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Ulica
              </label>
              <input
                type="text"
                id="street"
                name="street"
                required
                className={`w-full px-4 py-2 border ${
                  formErrors.street ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:outline-none focus:border-primary`}
                placeholder="Nazwa ulicy"
                value={formData.street || ""}
                onChange={handleFormChange}
              />
              {formErrors.street && (
                <p className="text-red-500 text-xs mt-1">{formErrors.street}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="houseNumber"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Numer domu/mieszkania
              </label>
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                required
                className={`w-full px-4 py-2 border ${
                  formErrors.houseNumber ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:outline-none focus:border-primary`}
                placeholder="Nr domu/mieszkania"
                value={formData.houseNumber || ""}
                onChange={handleFormChange}
              />
              {formErrors.houseNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.houseNumber}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Kod pocztowy
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                required
                pattern="[0-9]{2}-[0-9]{3}"
                className={`w-full px-4 py-2 border ${
                  formErrors.postalCode ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:outline-none focus:border-primary`}
                placeholder="00-000"
                value={formData.postalCode || ""}
                onChange={handleFormChange}
              />
              {formErrors.postalCode && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.postalCode}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-heading-3 mb-1"
              >
                Miasto
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className={`w-full px-4 py-2 border ${
                  formErrors.city ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:outline-none focus:border-primary`}
                placeholder="Nazwa miasta"
                value={formData.city || ""}
                onChange={handleFormChange}
              />
              {formErrors.city && (
                <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
