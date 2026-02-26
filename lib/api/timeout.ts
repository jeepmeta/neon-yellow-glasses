// lib/api/timeout.ts
/**
 * Wraps a promise with a timeout
 * Rejects if the promise takes longer than the specified timeout
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 10000,
  timeoutMessage: string = "Request timeout",
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs),
    ),
  ]);
}

/**
 * Wraps an async function with automatic timeout
 */
export function createTimeoutFn<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  timeoutMs: number = 10000,
  timeoutMessage?: string,
) {
  return async (...args: T): Promise<R> => {
    return withTimeout(
      fn(...args),
      timeoutMs,
      timeoutMessage || "Request timeout",
    );
  };
}
