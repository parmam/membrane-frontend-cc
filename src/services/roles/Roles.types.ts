// src/services/roles/Roles.types.ts

// Represents a permission, often used within a Role
export interface PermissionDto {
  id: string; // Or number, depending on API
  name: string; // e.g., 'users.create', 'devices.view'
  description?: string;
}

// For Role details (e.g., GET /role/{id} or when creating/updating)
export interface RoleDetailsDto {
  id: string; // Or number
  name: string;
  permissions?: PermissionDto[]; // Based on StoreRoleRequest/UpdateRoleRequest structure
  // Add other fields if returned by API (e.g., createdAt, updatedAt)
  createdAt?: string;
  updatedAt?: string;
}

// For lists of roles (e.g., GET /role)
export interface RoleListItemDto {
  id: string; // Or number
  name: string;
  // Potentially a count of permissions or users, if API provides
  permissionCount?: number;
  userCount?: number;
  createdAt?: string;
}

// For paginated role responses (e.g., GET /role)
export interface PaginatedRolesResponseDto {
  data: RoleListItemDto[]; // Or RoleDetailsDto if list returns full details
  total: number;
  limit: number;
  offset: number;
  // Add any other pagination fields the API returns
}

// From Swagger: #/components/schemas/StoreRoleRequest
export interface StoreRoleRequestDto {
  name: string;
  permissions?: string[]; // Array of permission IDs or names, clarify from API (Swagger says string[])
}

// From Swagger: #/components/schemas/UpdateRoleRequest
export interface UpdateRoleRequestDto {
  name?: string;
  permissions?: string[]; // Array of permission IDs or names
}

// Query parameters for GET /role
export interface GetRolesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string; // Swagger example is "1" (string)
  name?: string;
}
