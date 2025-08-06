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
  const pageUrl = window.location.pathname;

  if (typeof window.va?.track === "function") {
    try {
      window.va.track(eventName, {
        ...data,
        page_url: pageUrl,
        session_id: sessionId,
      });
    } catch (err) {
      console.warn("Błąd podczas wysyłania zdarzenia do Vercel Analytics:", err);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const buttonTarget = e.target.closest("[data-track-button]");
    if (buttonTarget) {
      const buttonText = buttonTarget.textContent?.trim() || "";
      const targetUrl = buttonTarget.getAttribute("href") || "";
      const clickedIn = buttonTarget.getAttribute("data-clicked-in") || "unknown";

      logEvent({
        eventName: "button_click",
        data: {
          button_text: buttonText,
          target_url: targetUrl,
          clicked_in: clickedIn,
        },
      });
    }

    const galleryTarget = e.target.closest("[data-track-gallery-click]");
    if (galleryTarget) {
      const index = galleryTarget.getAttribute("data-image-index");
      const src = galleryTarget.getAttribute("data-image-src");
      const alt = galleryTarget.getAttribute("data-image-alt");

      logEvent({
        eventName: "gallery_image_click",
        data: {
          image_index: index,
          image_alt: alt,
        },
      });
    }
  });

  const footer = document.getElementById("site-footer");
  if (footer) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !window.__footerTracked) {
          window.__footerTracked = true;

          logEvent({
            eventName: "page_engagement_complete",
            data: {
              visible_ratio: entry.intersectionRatio,
            },
          });
        }
      },
      { threshold: [0.5] }
    );
    observer.observe(footer);
  }
});
