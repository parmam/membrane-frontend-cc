import { apiClient, handleApiResponse, setAuthToken } from '../client';

// Define clean types based on actual API structure
interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await handleApiResponse<LoginResponse>(() =>
      apiClient.POST('/auth/login', {
        body: credentials,
      }),
    );

    // Store token if login successful
    if (response?.token) {
      setAuthToken(response.token);
    }

    return response;
  }

  static async getCurrentUser(): Promise<User> {
    return handleApiResponse<User>(() => apiClient.GET('/auth/user'));
  }

  static async logout(): Promise<void> {
    setAuthToken(null);
    await handleApiResponse(() => apiClient.POST('/auth/logout'));
  }
}

// Export types for use in components
export type { LoginRequest, LoginResponse, User };
