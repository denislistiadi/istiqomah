// Production-safe logger utility (SEC-05)
// Suppresses detailed error output in production builds to prevent
// stack trace and sensitive API error message exposure.

const isDev = import.meta.env.DEV;

export function logError(message: string, ...args: unknown[]): void {
  if (isDev) {
    console.error(`[Istiqomah] ${message}`, ...args);
  }
}

export function logWarn(message: string, ...args: unknown[]): void {
  if (isDev) {
    console.warn(`[Istiqomah] ${message}`, ...args);
  }
}
