import createClient from 'openapi-fetch';

import { logger } from '../utils/logger';
import type { paths } from './types';

// Base API configuration
const API_BASE_URL = 'https://monitoring-center-api.loger.ar';

// Create the typed API client
export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    apiClient.use({
      onRequest({ request }) {
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    });
  }
};

export const getAuthToken = () => authToken;

// Simple error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown,
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

// Generic API call wrapper with simple logging
export const handleApiResponse = async <T>(
  apiCall: () => Promise<{ data?: T; error?: unknown; response: Response }>,
) => {
  try {
    const { data, error, response } = await apiCall();

    // Simple API logging - extract method from URL or default to GET
    const method = response.url.includes('POST')
      ? 'POST'
      : response.url.includes('PUT')
        ? 'PUT'
        : response.url.includes('DELETE')
          ? 'DELETE'
          : response.url.includes('PATCH')
            ? 'PATCH'
            : 'GET';

    logger.api(method, response.url, response.status, data);

    if (error) {
      logger.error('API Error:', error);
      throw new ApiError(response.status, response.statusText, error);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    logger.error('Network Error:', error);
    throw new Error('Network error occurred');
  }
};
