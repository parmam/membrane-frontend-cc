// src/services/connectiontype/ConnectionType.types.ts

export interface ConnectionTypeDto {
  id: string;
  name: string;
}

export type ListConnectionTypesResponseDto = ConnectionTypeDto[];

export interface GetConnectionTypesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
