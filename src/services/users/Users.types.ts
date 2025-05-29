// src/services/users/Users.types.ts

// Re-using or referencing UserDto from Auth.types.ts might be an option,
// or defining a specific one for the Users service context if there are differences.
// For now, let's assume it's similar to what /auth/user returns.
export interface UserRoleDto {
  id: string; // Or number, depending on API
  name: string;
}

export interface UserPlaceDto {
  id: string; // Or number
  name: string;
}

export interface UserListItemDto { // For lists, often a summary
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string; // Assuming string from JSON
  // Add other fields typically shown in a user list
}

export interface UserDetailsDto { // For GET /user/{id}
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  roles?: UserRoleDto[];
  places?: UserPlaceDto[]; // As per StoreUserRequest
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  createdBy?: string; // Or a more complex object
  deletedBy?: string; // Or a more complex object
  // Include all fields returned by the GET /user/{id} endpoint
}

// For paginated responses (e.g., GET /user)
export interface PaginatedUsersResponseDto {
  data: UserListItemDto[]; // Or UserDetailsDto if the list returns full details
  total: number;
  limit: number;
  offset: number;
  // Add any other pagination fields the API returns (e.g., currentPage, totalPages)
}

// From Swagger: #/components/schemas/StoreUserRequest
export interface StoreUserRequestDto {
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  email: string;
  password?: string; // Changed from 'string' to 'string | undefined' to align with UpdateUserRequest
  passwordConfirmation?: string;
  roles: string[]; // Array of role IDs
  places: string[]; // Array of place IDs
}

// From Swagger: #/components/schemas/UpdateUserRequest
export interface UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  roles?: string[]; // Array of role IDs
  places?: string[]; // Array of place IDs
}

// From Swagger: #/components/schemas/HasPermissionToRequest
export interface HasPermissionToRequestDto {
  permission: string;
}

export interface HasPermissionToResponseDto {
  hasPermission: boolean; // Assuming a boolean response
  // Or whatever structure the API returns
}

// From Swagger: #/components/schemas/SearchUserByCredentialsRequest
export interface SearchUserByCredentialsRequestDto {
  email: string;
  password?: string; // Changed from 'string' to 'string | undefined'
}

// Response for searchByCredentials would likely be UserDetailsDto or UserListItemDto
export type SearchUserByCredentialsResponseDto = UserDetailsDto; // Or UserListItemDto

// Query parameters for GET /user
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
  createdAt?: string; // Format might be 'YYYY-MM-DD' or 'YYYY-MM-DD HH:MM:SS'
  createdBy?: string;
  deletedBy?: string;
  deletedAt?: string; // Format might be 'YYYY-MM-DD' or 'YYYY-MM-DD HH:MM:SS'
}
