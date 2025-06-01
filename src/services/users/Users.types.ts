// src/services/users/Users.types.ts

export interface UserRoleDto {
  // From UserDetailsDto
  id: string;
  name: string;
}

export interface UserPlaceDto {
  // From UserDetailsDto
  id: string;
  name: string;
}

export interface UserListItemDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
}

export interface UserDetailsDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  roles?: UserRoleDto[];
  places?: UserPlaceDto[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  createdBy?: string;
  deletedBy?: string;
}

export interface PaginatedUsersResponseDto {
  data: UserListItemDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface StoreUserRequestDto {
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  roles: string[];
  places: string[];
}

export interface UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  roles?: string[];
  places?: string[];
}

export interface HasPermissionToRequestDto {
  permission: string;
}

export interface HasPermissionToResponseDto {
  hasPermission: boolean;
}

export interface SearchUserByCredentialsRequestDto {
  email: string;
  password?: string;
}

export type SearchUserByCredentialsResponseDto = UserDetailsDto;

export interface GetUsersQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  createdBy?: string;
  deletedBy?: string;
  deletedAt?: string;
}
