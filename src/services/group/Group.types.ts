// src/services/group/Group.types.ts

export interface GroupDto {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedGroupsResponseDto {
  data: GroupDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface StoreGroupRequestDto {
  name: string;
}

export interface UpdateGroupRequestDto {
  name?: string;
}

export interface GetGroupsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
