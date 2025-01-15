import visibilityDilemma from "../assets/images/visibility-dilemma.jpg";
import engagementGap from "../assets/images/engagement-gap.jpg";
import resultsInHibernation from "../assets/images/results-in-hibernation.jpg";
import whyUs from "../assets/images/why-us.webp";
import howWeDo from "../assets/images/how-we-do.webp";
import howYouShouldBuy from "../assets/images/how-you-should.webp";

const services = [
  {
    title: "Mała Buda (50x60 cm)",
    features: [
      "Przeznaczenie: psy małe i średnie.",
      "Zakres wagowy: do 15 kg.",
      "Przykłady ras: jamnik, mops, shih tzu, mały kundelek.",
      "Cena: 450zł",
    ],
 },
  {
    title: "Średnia Buda (60x80 cm)",
    features: [
      "Przeznaczenie: psy średniej wielkości.",
      "Zakres wagowy: 15–30 kg.",
        "Przykłady ras: bokser, beagle, cocker spaniel, średni kundelek.",
      "Cena: 600zł",
    ],
},
  {
    title: "Duża Buda (70x100 cm)",
    features: [
      "Przeznaczenie: psy duże.",
      "Zakres wagowy: 30–45 kg.",
      "Przykłady ras: owczarek niemiecki, golden retriever, labrador, duży kundelek.",
      "Cena: 700zł",
    ],
 },
  {
    title: "Bardzo Duża Buda (90x120 cm)",
    features: [
      "Przeznaczenie: psy bardzo duże.",
      "Zakres wagowy: 45 kg i więcej.",
      "Przykłady ras: bernardyn, dog niemiecki, mastif, bardzo duży kundelek.",
      "Cena: 1000zł",
    ],
 },
  {
    title: "Dodatkowe opcje",
    features: [
      "Ocieplenie 100 - 150zł",
      "Niestandardowy kolor 100zł",
      "taras 50 - 150zł",
      "Wysyłka na terenie Polski 150-250zł",
      "Wysyłka na terenie Europy 250 zł",
    ],
  },
];

const solutions = [
  {
    title: "Dlaczego warto kupić budę dla swojego psa?",
    painPoint:
      "Twój pies zasługuje na własne miejsce, które zapewni mu komfort, bezpieczeństwo i ochronę przed warunkami atmosferycznymi. ",
    agitatepainPoint:
      "Buda to nie tylko schronienie, ale także przestrzeń, w której Twój czworonożny przyjaciel może się zrelaksować i poczuć się jak w domu. Dobra buda chroni psa przed deszczem, wiatrem, śniegiem czy nadmiernym upałem, co jest kluczowe dla jego zdrowia i dobrego samopoczucia.",
    solution:
      "Zapewnij swojemu psu wygodę i bezpieczeństwo, które na co dzień dają mu miłość i troskę.",
    img: whyUs,
  },
  {
    title: "Dlaczego warto kupić budę u nas?",
    painPoint:
      "Nasze budy to połączenie jakości, trwałości i dbałości o potrzeby Twojego psa.",
    agitatepainPoint:
      "Oferujemy modele w trzech różnych rozmiarach, dzięki czemu idealnie dopasujesz budę do wielkości swojego pupila. Wszystkie nasze produkty są wykonane z ekologicznych materiałów, które są nie tylko odporne na warunki atmosferyczne, ale także całkowicie bezpieczne dla zwierząt. Każda buda powstaje ręcznie, z najwyższą precyzją, co gwarantuje funkcjonalność i estetykę. Wierzymy, że każdy pies zasługuje na najlepsze schronienie, dlatego zapewniamy indywidualne podejście do każdego klienta, oferując możliwość personalizacji produktu..",
    solution:
      "Wybierając nas, wybierasz troskę o komfort i bezpieczeństwo swojego czworonożnego przyjaciela",
    img: howYouShouldBuy,
  },
  {
    title: " Jak wykonujemy nasze budy?",
    painPoint:
      "Nasze budy są tworzone z pasją i dbałością o każdy szczegół.",
    agitatepainPoint:
      "Proces produkcji rozpoczynamy od starannego wyboru materiałów – używamy drewna najwyższej jakości, które zapewnia trwałość i naturalny wygląd. Konstrukcja jest solidna, z izolacją, która chroni psa przed zimnem i upałem. Każda buda jest starannie montowana, a wykończenie zapewnia estetyczny wygląd i bezpieczeństwo użytkowania. Na koniec impregnujemy drewno, aby było odporne na deszcz i inne warunki atmosferyczne. ",
    solution:
      "Każda buda to wynik naszej troski o dobro Twojego psa.",
    img: howWeDo,
  },
];

const faqs = [
  {
    question: "How can social media marketing benefit my business?",
    answer:
      "Social media marketing can significantly benefit your business by increasing brand awareness, engaging your target audience, driving website traffic, and generating leads. It also allows for direct interaction with your customers, fostering brand loyalty and providing valuable insights into consumer behavior.",
  },
  {
    question: "What sets your agency apart from others?",
    answer:
      "Our agency stands out through a combination of tailored strategies, data-driven decision-making, and a commitment to client collaboration. We prioritize understanding your unique business goals and offer personalized solutions that deliver measurable results.",
  },
  {
    question: "How do you measure the success of social media campaigns?",
    answer:
      "We employ a comprehensive approach to measure campaign success. This includes tracking key performance indicators (KPIs) such as engagement metrics, conversion rates, reach, and customer feedback. Our goal is to provide you with transparent and actionable insights into the effectiveness of your social media efforts.",
  },
  {
    question:
      "Can you give examples of your successful social media campaigns?",
    answer:
      "Certainly! We have a portfolio of successful campaigns across various industries. Check out our Case Studies to see how we've helped businesses like yours achieve their social media goals.",
  },
  {
    question: "Do you offer customized social media strategies?",
    answer:
      "Absolutely. Our team specializes in creating customized strategies tailored to your brand, industry, and target audience. We believe in the power of uniqueness, and our strategies reflect your specific goals and aspirations.",
  },
  {
    question: "How do you handle negative comments or reviews on social media?",
    answer:
      "We have a proactive approach to managing online reputation. Our social listening tools help us monitor brand mentions in real-time. In case of negative comments, we respond promptly with empathy and seek resolutions. We believe in turning challenges into opportunities for improvement.",
  },
  {
    question: "What social media platforms do you work with?",
    answer:
      "We work with a wide range of social media platforms, including but not limited to Facebook, Instagram, Twitter, LinkedIn, Pinterest, and TikTok. Our strategies are adaptable to the platforms most relevant to your target audience.",
  },
  {
    question:
      "How often will I receive reports on the performance of my social media campaigns?",
    answer:
      "We provide regular and detailed reports on the performance of your social media campaigns. The frequency of reporting can be customized based on your preferences, with options for weekly, bi-weekly, or monthly updates.",
  },
  {
    question:
      "Is there ongoing support if I have questions or need adjustments to my strategy?",
    answer:
      "Absolutely. We offer ongoing support to address any questions or concerns you may have. Our team is readily available to assist you and can make adjustments to your strategy as needed to ensure it aligns with your evolving business goals.",
  },
  {
    question:
      "Can I see a demo or get a consultation before deciding to work with your agency?",
    answer:
      "Certainly! We offer free consultations and personalized demos to showcase our approach, discuss your needs, and determine how we can best support your business. Contact us to schedule a consultation.",
  },
];

export { services, solutions, faqs };
