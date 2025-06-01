import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define the base URL for the API
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
    // Placeholder for token retrieval logic
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response error - Status:', error.response.status);
      console.error('Response error - Data:', error.response.data);
      if (error.response.status === 401) {
        console.error('Unauthorized access - 401. Consider redirecting to login.');
      }
    } else if (error.request) {
      console.error('Network error or no response received:', error.request);
    } else {
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
