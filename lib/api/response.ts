// lib/api/response.ts
/**
 * Standardized API Response wrapper
 * Usage: return apiResponse(data) or return apiError(message, status)
 */

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function apiResponse<T>(data: T, status = 200): Response {
  return Response.json({ success: true, data } as ApiResponse<T>, { status });
}

export function apiError(error: string | Error, status = 400): Response {
  const message = error instanceof Error ? error.message : error;
  return Response.json(
    { success: false, error: message } as ApiResponse<null>,
    { status },
  );
}

export function apiSuccess(status = 200): Response {
  return Response.json({ success: true }, { status });
}
