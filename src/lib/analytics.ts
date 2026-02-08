/**
 * Analytics hooks — placeholders for future integration.
 * No actual tracking backend; log in dev for now.
 */

export function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", event, data ?? {});
  }
  // Future: send to analytics provider
  // e.g. gtag('event', event, data);
}
