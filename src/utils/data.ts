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
      "Niestandardowy kolor 50zł",
      "kurtyna do wejścia 50zł",
      "Natychmiastowa Wysyłka kurierem 200zł",
      "Dowóz przez nas 50zł za każde 100km ",
    ],
  },
  {
    title: "Płatność",
    features: [
      "Gotówką przy odbiorze",
      "Przelew na konto",
      "Blik",
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
    question: "Jak długo trwa realizacja zamówienia?",
    answer: "Standardowy czas realizacji zamówienia to 3-5 dni roboczych. W przypadku dodatkowych personalizacji może się on wydłużyć do 7-10 dni."
  },
  {
    question: "Czy budy są odporne na deszcz i inne warunki atmosferyczne?",
    answer: "Tak, wszystkie nasze budy są impregnowane specjalnymi środkami, które chronią drewno przed wilgocią, deszczem i innymi warunkami atmosferycznymi. Dodatkowo, konstrukcja dachu zapewnia odpowiednie odprowadzanie wody."
  },
  {
    question: "Jak dobrać odpowiedni rozmiar budy dla mojego psa?",
    answer: "Rozmiar budy powinien być dostosowany do wielkości psa. Pies powinien móc swobodnie wstać, obrócić się i położyć w budzie. W razie wątpliwości, zawsze lepiej wybrać nieco większy rozmiar."
  },
  {
    question: "Czy mogę zamówić budę w niestandardowym kolorze?",
    answer: "Tak, oferujemy możliwość malowania budy w wybranym przez klienta kolorze za dodatkową opłatą 50 zł. Prosimy o kontakt w celu ustalenia szczegółów."
  },
  {
    question: "Jak często należy konserwować budę?",
    answer: "Zalecamy przeprowadzanie podstawowej konserwacji raz w roku, obejmującej odświeżenie impregnacji i sprawdzenie stanu technicznego. W przypadku intensywnego użytkowania, konserwację można przeprowadzać częściej."
  },
  {
    question: "Czy buda posiada podłogę?",
    answer: "Tak, wszystkie nasze budy posiadają solidną, izolowaną podłogę, która chroni przed zimnem i wilgocią od podłoża."
  },
  {
    question: "Czy mogę zamontować ogrzewanie w budzie?",
    answer: "Tak, nasze budy są przystosowane do montażu mat grzewczych lub innych systemów ogrzewania. Służymy doradztwem w tym zakresie."
  },
  {
    question: "Jakie drewno jest używane do produkcji bud?",
    answer: "Używamy wyselekcjonowanego drewna sosnowego lub świerkowego, które jest odpowiednio suszone i impregnowane, co zapewnia trwałość i bezpieczeństwo konstrukcji."
  },
  {
    question: "Czy buda wymaga montażu po dostarczeniu?",
    answer: "Nie, dostarczamy budy w całości zmontowane, gotowe do użytkowania. Wystarczy tylko ustawić ją w wybranym miejscu."
  },
  {
    question: "Czy oferujecie gwarancję na swoje produkty?",
    answer: "Tak, udzielamy 24-miesięcznej gwarancji na nasze budy. Gwarancja obejmuje wady konstrukcyjne i materiałowe."
  },
  {
    question: "Czy można zwrócić budę jeśli nie będzie odpowiadała naszym oczekiwaniom?",
    answer: "Tak, oferujemy 14-dniowy okres na zwrot towaru bez podania przyczyny, pod warunkiem że buda nie została uszkodzona lub zmodyfikowana."
  },
  {
    question: "Jak należy przygotować miejsce pod budę?",
    answer: "Zalecamy ustawienie budy na równym, stabilnym podłożu, najlepiej lekko podniesionym nad poziom gruntu. Może to być betonowa wylewka, kostka brukowa lub specjalne podesty."
  },
  {
    question: "Czy ocieplenie budy jest konieczne?",
    answer: "Ocieplenie nie jest konieczne, ale zdecydowanie zalecane, szczególnie jeśli pies przebywa w budzie w okresie zimowym. Znacząco poprawia komfort termiczny zarówno zimą jak i latem."
  },
  {
    question: "Jak często należy czyścić budę?",
    answer: "Zalecamy regularne czyszczenie budy co 2-3 tygodnie, obejmujące wymianę posłania i przemycie wnętrza łagodnym środkiem czyszczącym. Dokładniejsze czyszczenie warto przeprowadzać co 3-4 miesiące."
  },
  {
    question: "Czy buda posiada wyjmowane dno do czyszczenia?",
    answer: "Tak, nasze budy są wyposażone w wyjmowane dno, co znacznie ułatwia utrzymanie czystości i przeprowadzanie regularnej konserwacji."
  },
  {
    question: "Jak chronić budę przed insektami?",
    answer: "Wszystkie nasze budy są zabezpieczane środkami odstraszającymi insekty. Dodatkowo, regularna konserwacja i czyszczenie znacząco zmniejszają ryzyko pojawienia się niepożądanych gości."
  },
  {
    question: "Jakie są metody płatności?",
    answer: "Akceptujemy płatności gotówką przy odbiorze osobistym, przelewy bankowe, oraz płatności BLIK. W przypadku wysyłki kurierskiej możliwa jest również płatność za pobraniem."
  },
  {
    question: "Czy oferujecie montaż budy na miejscu?",
    answer: "W przypadku większych bud lub zamówień specjalnych oferujemy usługę montażu na miejscu. Koszt takiej usługi jest ustalany indywidualnie w zależności od lokalizacji."
  },
  {
    question: "Czy można dostosować wysokość nóżek w budzie?",
    answer: "Tak, wysokość nóżek może być dostosowana do indywidualnych potrzeb. Standardowo oferujemy nóżki o wysokości 10 cm, ale na życzenie możemy je wykonać w innym rozmiarze."
  }
];

export const contact = {
  email: "kontakt@budapies.pl",
  phone: "+48 503 919 318",
  address: "ul. Budowa 123, 00-000 Warszawa",
};
export { services, solutions, faqs };
