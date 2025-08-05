import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const lightbox = new PhotoSwipeLightbox({
  gallery: "#gallery",
  children: "a",
  pswpModule: () => import("photoswipe"),
});

lightbox.init();

lightbox.on("change", () => {
  const pswp = lightbox.pswp;
  if (!pswp) return;

  const currentSlide = pswp.currSlide;
  const index = pswp.currIndex;

  const imageIndex = currentSlide.element?.getAttribute("data-image-index") || index;
  const imageAlt = currentSlide.element?.getAttribute("data-image-alt") || "";

  logEvent({
    eventName: "gallery_image_view",
    data: {
      image_index: imageIndex,
      image_alt: imageAlt,
    },
  });
});
