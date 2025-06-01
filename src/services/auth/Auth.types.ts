// src/services/auth/Auth.types.ts

export interface LoginRequestDto {
  email: string;
  password?: string;
}

export interface UserDto {
  // Based on Swagger User definition and typical auth responses
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  roles?: Array<{ id: string; name: string }>; // Simplified role for this context
  // Add other fields as per actual API response for /auth/user
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken?: string;
  user: UserDto;
}

export interface UpdateCurrentUserRequestDto {
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export type CurrentUserResponseDto = UserDto;
export type UpdateCurrentUserResponseDto = UserDto;
