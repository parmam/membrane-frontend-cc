// src/services/users/convertToUserDto.ts
import { StoreUserRequestDto, UpdateUserRequestDto } from './Users.types';

// Example: Frontend form model for creating a user
export interface CreateUserFormModel {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  profilePictureUrl?: string;
  roleIds: string[]; // Assuming UI provides IDs directly
  placeIds: string[]; // Assuming UI provides IDs directly
}

export function convertCreateUserFormToStoreDto(form: CreateUserFormModel): StoreUserRequestDto {
  const dto: StoreUserRequestDto = {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    roles: form.roleIds,
    places: form.placeIds,
  };
  if (form.profilePictureUrl) {
    dto.profilePictureUrl = form.profilePictureUrl;
  }
  if (form.password && form.password === form.confirmPassword) {
    dto.password = form.password;
    dto.passwordConfirmation = form.confirmPassword;
  }
  // Add any other transformations or validations
  return dto;
}

// Example: Frontend form model for updating a user
export interface UpdateUserFormModel {
  firstName?: string;
  lastName?: string;
  email?: string; // Email updates might have restrictions
  password?: string; // For password changes
  confirmPassword?: string;
  profilePictureUrl?: string;
  roleIds?: string[];
  placeIds?: string[];
}

export function convertUpdateUserFormToUpdateDto(form: UpdateUserFormModel): UpdateUserRequestDto {
  const dto: UpdateUserRequestDto = {};
  if (form.firstName) dto.firstName = form.firstName;
  if (form.lastName) dto.lastName = form.lastName;
  if (form.email) dto.email = form.email; // Check API rules for email update
  if (form.profilePictureUrl) dto.profilePictureUrl = form.profilePictureUrl;
  if (form.roleIds) dto.roles = form.roleIds;
  if (form.placeIds) dto.places = form.placeIds;

  if (form.password && form.password === form.confirmPassword) {
    dto.password = form.password;
    dto.passwordConfirmation = form.confirmPassword;
  }
  return dto;
}
