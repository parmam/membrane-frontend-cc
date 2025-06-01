// src/services/roles/Roles.types.ts

export interface PermissionDto {
  // As defined in Swagger for StoreRoleRequest
  id: string;
  name: string;
  description?: string;
}

export interface RoleDetailsDto {
  id: string;
  name: string;
  permissions?: PermissionDto[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleListItemDto {
  id: string;
  name: string;
  permissionCount?: number;
  userCount?: number;
  createdAt?: string;
}

export interface PaginatedRolesResponseDto {
  data: RoleListItemDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface StoreRoleRequestDto {
  name: string;
  permissions?: string[]; // Array of permission IDs
}

export interface UpdateRoleRequestDto {
  name?: string;
  permissions?: string[]; // Array of permission IDs
}

export interface GetRolesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
