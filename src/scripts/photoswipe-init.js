import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

function getSessionId() {
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }
  return sessionId;
}

function logEvent({ eventName, data }) {
  const sessionId = getSessionId();

  // Wysyłka do własnego API
  fetch("/api/log-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      session_id: sessionId,
      page_url: window.location.pathname,
      data,
    }),
  }).catch((err) => console.error(`Błąd logowania ${eventName}:`, err));

  // Vercel Analytics
  if (window.va && typeof window.va.track === "function") {
    window.va.track(eventName, {
      ...data,
      page: window.location.pathname,
    });
  }
}

const lightbox = new PhotoSwipeLightbox({
  gallery: "#gallery",
  children: "a",
  pswpModule: () => import("photoswipe"),
});

lightbox.init();

// 🔽 Dodaj logowanie przy zmianie zdjęcia
lightbox.on("change", () => {
  const pswp = lightbox.pswp;
  if (!pswp) return;

  const currentSlide = pswp.currSlide;
  const index = pswp.currIndex;

  const imageIndex = currentSlide.element?.getAttribute("data-image-index") || index;
  const imageSrc = currentSlide.element?.getAttribute("data-image-src") || "";
  const imageAlt = currentSlide.element?.getAttribute("data-image-alt") || "";

  logEvent({
    eventName: "gallery_image_view",
    data: {
      image_index: imageIndex,
    },
  });
});
