import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
    {
      text: "Świetna buda dla mojego psa! Solidnie wykonana i bardzo wygodna. Mój labrador od razu ją pokochał.",
      userName: "Andrzej W.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Jestem pod wrażeniem jakości wykonania. Buda jest ocieplona i idealnie sprawdza się w chłodniejsze dni.",
      userName: "Anna N.", 
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Profesjonalna obsługa i szybka realizacja zamówienia. Buda jest dokładnie taka jak na zdjęciach.",
      userName: "Piotr W.",
      product: "Mała Buda 50 cm x 60 cm"
    },
    {
      text: "Doskonała jakość za rozsądną cenę. Buda jest przestronna i świetnie wykonana.",
      userName: "Marek K.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Bardzo dobry kontakt ze sprzedawcą. Buda została dostarczona zgodnie z ustaleniami.",
      userName: "Karolina S.",
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Mój Bruno jest zachwycony. Buda jest przytulna i idealnie dopasowana do jego rozmiaru.",
      userName: "Magdalena P.",
      product: "Mała Buda (50x60 cm)"
    },
    {
      text: "Solidne wykonanie i staranne wykończenie. Widać, że producent dba o detale.",
      userName: "Tomasz R.",
      product: "Bardzo Duża Buda (90x120 cm)"
    },
    {
      text: "Świetna obsługa klienta i szybka dostawa. Buda spełnia wszystkie nasze oczekiwania.",
      userName: "Agnieszka W.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Buda jest ocieplona i świetnie sprawdza się zimą. Nasz pies jest bardzo zadowolony.",
      userName: "Krzysztof M.",
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Profesjonalne podejście i wysoka jakość produktu. Polecam wszystkim właścicielom psów.",
      userName: "Barbara L.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Zamówiliśmy budę z dodatkowym ociepleniem i jest rewelacyjna. Warto dopłacić.",
      userName: "Robert N.",
      product: "Bardzo Duża Buda (90x120 cm)"
    },
    {
      text: "Szybka realizacja i profesjonalna dostawa. Buda wygląda dokładnie jak na zdjęciach.",
      userName: "Monika D.",
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Świetna jakość materiałów. Buda jest odporna na warunki atmosferyczne.",
      userName: "Jacek K.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Idealne wymiary dla naszego golden retrievera. Bardzo zadowoleni z zakupu.",
      userName: "Ewa P.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Buda została wykonana zgodnie z naszymi oczekiwaniami. Świetny kontakt z producentem.",
      userName: "Michał S.",
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Doskonała jakość wykonania. Nasz pies od razu zaakceptował nowe lokum.",
      userName: "Katarzyna B.",
      product: "Mała Buda (50x60 cm)"
    },
    {
      text: "Bardzo solidna konstrukcja i estetyczne wykończenie. Warta swojej ceny.",
      userName: "Adam W.",
      product: "Bardzo Duża Buda (90x120 cm)"
    },
    {
      text: "Świetna obsługa i terminowa realizacja. Buda jest dokładnie taka jak chcieliśmy.",
      userName: "Joanna M.",
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Profesjonalne doradztwo przy wyborze rozmiaru. Buda idealnie pasuje do naszego psa.",
      userName: "Paweł R.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Zamówiliśmy z kurtynką do wejścia i sprawdza się świetnie. Dobra inwestycja.",
      userName: "Alicja T.",
      product: "Średnia Buda (60x80 cm)"
    },
    {
      text: "Bardzo dobra relacja jakości do ceny. Polecam tego producenta.",
      userName: "Marcin K.",
      product: "Duża Buda (70x100 cm)"
    },
    {
      text: "Szybka dostawa i profesjonalny montaż. Buda wygląda świetnie w naszym ogrodzie.",
      userName: "Dorota L.",
      product: "Bardzo Duża Buda (90x120 cm)"
    },
    {
      text: "Świetna komunikacja i realizacja zamówienia. Buda spełnia wszystkie nasze wymagania.",
      userName: "Grzegorz W.",
      product: "Średnia Buda (60x80 cm)"
    }
  
  ];

const TestimonialsCarousel = () => {
    console.log(1)
  return (
    <div className="w-full mx-auto px-4 py-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={100}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}

      >
        {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.text}>
            <div className="min-w-[300px] md:min-w-[400px] snap-start ">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg h-full">
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-heading-2">{testimonial.userName}</h4>
                  <p className="text-primary dark:text-primary/90 text-sm">
                    Zakupiony produkt: {testimonial.product}
                  </p>
                </div>
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsCarousel;
