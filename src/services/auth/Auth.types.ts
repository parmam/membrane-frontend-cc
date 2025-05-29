// src/services/auth/Auth.types.ts

// From Swagger: #/components/schemas/LoginRequest
export interface LoginRequestDto {
  email: string;
  password?: string; // Password might be optional if using other login methods in future
}

// Assuming a typical login response structure
export interface LoginResponseDto {
  accessToken: string;
  refreshToken?: string; // Optional
  user: UserDto; // Or a simplified user object
}

// From Swagger: #/components/schemas/User (or inferring from typical user objects)
// This can be expanded based on actual /auth/user response
export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  roles?: Array<{ id: string; name: string }>; // Simplified role
  // Add other fields as returned by /auth/user
}

// From Swagger: #/components/schemas/UpdateUserRequest (used for PATCH /auth/user)
// We can reuse this or create a specific UpdateCurrentUserRequestDto
export interface UpdateCurrentUserRequestDto {
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  email?: string; // Usually email is not updated via /auth/user, but included if API supports
  password?: string; // For password changes
  passwordConfirmation?: string;
}

// Response for GET /auth/user would typically be UserDto
export type CurrentUserResponseDto = UserDto;

// Response for PATCH /auth/user would typically be the updated UserDto
export type UpdateCurrentUserResponseDto = UserDto;

// For logout, usually no specific request body or response data is needed,
// but we can define types if the API expects something.
// export interface LogoutRequestDto {}
// export interface LogoutResponseDto {}
