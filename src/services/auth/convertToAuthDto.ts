// src/services/auth/convertToAuthDto.ts
import { UpdateCurrentUserRequestDto } from './Auth.types';

export interface UpdateProfileFormModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
  profilePictureUrl?: string;
}

export function convertProfileFormToUpdateDto(
  form: UpdateProfileFormModel,
): UpdateCurrentUserRequestDto {
  const dto: UpdateCurrentUserRequestDto = {};
  if (form.firstName) dto.firstName = form.firstName;
  if (form.lastName) dto.lastName = form.lastName;
  if (form.profilePictureUrl) dto.profilePictureUrl = form.profilePictureUrl;
  if (form.email) dto.email = form.email; // Assuming API allows email update here

  if (form.newPassword && form.newPassword === form.confirmPassword) {
    dto.password = form.newPassword;
    dto.passwordConfirmation = form.confirmPassword;
  }
  return dto;
}
