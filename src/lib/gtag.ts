// lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.PUBLIC_GA_MEASUREMENT_ID;

export function sendGAEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag?.("event", name, params || {});
  }
}
