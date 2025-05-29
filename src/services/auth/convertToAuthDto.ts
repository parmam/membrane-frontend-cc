// src/services/auth/convertToAuthDto.ts
import { UpdateCurrentUserRequestDto } from './Auth.types';

// Example: If you have a frontend form model for updating user profile
export interface UpdateProfileFormModel {
  firstName?: string;
  lastName?: string;
  email?: string; // Assuming email cannot be changed or handled differently
  newPassword?: string; // For password change
  confirmPassword?: string;
  profilePictureUrl?: string;
}

export function convertProfileFormToUpdateDto(form: UpdateProfileFormModel): UpdateCurrentUserRequestDto {
  const dto: UpdateCurrentUserRequestDto = {};
  if (form.firstName) dto.firstName = form.firstName;
  if (form.lastName) dto.lastName = form.lastName;
  if (form.profilePictureUrl) dto.profilePictureUrl = form.profilePictureUrl;
  // Email updates might be restricted or require special handling
  // if (form.email) dto.email = form.email; 
  if (form.newPassword && form.newPassword === form.confirmPassword) {
    dto.password = form.newPassword;
    dto.passwordConfirmation = form.confirmPassword;
  }
  // Add other necessary transformations from your frontend model to the DTO
  return dto;
}

// Add other Model to DTO converters if needed for the Auth entity
