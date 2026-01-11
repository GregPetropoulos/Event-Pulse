// axios/fetch wrapper
// It’s purely infrastructure
import axios, { AxiosError } from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'https://event-pulse-api.gregpetropoulos0341.workers.dev';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Normalized API error
 */
export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(status: number, body?: unknown) {
    super(`API Error ${status}`);
    this.status = status;
    this.body = body;
  }
}

/**
 * Response interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new ApiError(error.response.status, error.response.data);
    }

    throw new ApiError(0, 'Network error');
  },
);
