// src/services/auth/convertToAuth.ts
import { UserDto } from './Auth.types';

// Frontend model for a User
export interface UserModel {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  roles?: string[]; // Example: array of role names
  // Add other fields as needed by the UI
}

export function convertUserDtoToModel(dto: UserDto): UserModel {
  return {
    id: dto.id,
    fullName: `${dto.firstName} ${dto.lastName}`.trim(),
    email: dto.email,
    avatarUrl: dto.profilePictureUrl,
    roles: dto.roles?.map(role => role.name),
  };
}

// Add other DTO to Model converters if needed for the Auth entity
// For example, if LoginResponseDto needed transformation:
// import { LoginResponseDto } from './Auth.types';
// export interface AuthSessionModel { token: string; user: UserModel; }
// export function convertLoginResponseDtoToModel(dto: LoginResponseDto): AuthSessionModel { ... }
