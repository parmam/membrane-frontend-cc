// src/services/devicetype/DeviceType.types.ts

export interface DeviceTypeDto {
  id: string;
  name: string;
}

export type ListDeviceTypesResponseDto = DeviceTypeDto[];

export interface GetDeviceTypesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  name?: string;
  // id?: string; // id is in Swagger params for /device-type, but not typical for a list. Omitting for now unless confirmed.
}
