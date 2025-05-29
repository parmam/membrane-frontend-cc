import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base URL for the API
// Replace with your actual API base URL, e.g., from an environment variable
const API_BASE_URL = 'https://monitoring-center-api.loger.ar'; // Inferred from Swagger

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: Implement token retrieval logic here
    // For example, get the token from localStorage or a state management store
    const token = localStorage.getItem('authToken'); // Placeholder

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error - Status:', error.response.status);
      console.error('Response error - Data:', error.response.data);
      console.error('Response error - Headers:', error.response.headers);

      // Handle specific error codes globally if needed
      if (error.response.status === 401) {
        // TODO: Handle unauthorized errors, e.g., redirect to login
        console.error('Unauthorized access - 401. Redirecting to login might be needed.');
        // Example: window.location.href = '/auth/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error or no response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
