// src/services/users/convertToUserDto.ts
import { StoreUserRequestDto, UpdateUserRequestDto } from './Users.types';

export interface CreateUserFormModel {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  profilePictureUrl?: string;
  roleIds: string[];
  placeIds: string[];
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
  return dto;
}

export interface UpdateUserFormModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  profilePictureUrl?: string;
  roleIds?: string[];
  placeIds?: string[];
}

export function convertUpdateUserFormToUpdateDto(form: UpdateUserFormModel): UpdateUserRequestDto {
  const dto: UpdateUserRequestDto = {};
  if (form.firstName) dto.firstName = form.firstName;
  if (form.lastName) dto.lastName = form.lastName;
  if (form.email) dto.email = form.email;
  if (form.profilePictureUrl) dto.profilePictureUrl = form.profilePictureUrl;
  if (form.roleIds) dto.roles = form.roleIds;
  if (form.placeIds) dto.places = form.placeIds;

  if (form.password && form.password === form.confirmPassword) {
    dto.password = form.password;
    dto.passwordConfirmation = form.confirmPassword;
  }
  return dto;
}
