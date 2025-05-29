// src/services/group/Group.types.ts

export interface GroupDto {
  id: string; // Or number
  name: string;
  // description?: string; // If API supports/returns it
  // deviceCount?: number; // If API returns count of devices in group
  createdAt?: string;
  updatedAt?: string;
}

// For paginated responses
export interface PaginatedGroupsResponseDto {
  data: GroupDto[];
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreGroupRequest
export interface StoreGroupRequestDto {
  name: string;
  // description?: string;
}

// From Swagger: #/components/schemas/UpdateGroupRequest
export interface UpdateGroupRequestDto {
  name?: string;
  // description?: string;
}

// Query parameters for GET /group (from Swagger)
export interface GetGroupsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
