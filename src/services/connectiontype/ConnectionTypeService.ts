// src/services/connectiontype/ConnectionTypeService.ts
import apiClient from '../apiClient';
import {
  GetConnectionTypesQueryParams,
  ListConnectionTypesResponseDto,
} from './ConnectionType.types';

const CONNECTION_TYPE_BASE_URL = '/connection-type'; // From Swagger

export const ConnectionTypeService = {
  listConnectionTypes: async (
    params?: GetConnectionTypesQueryParams,
  ): Promise<ListConnectionTypesResponseDto> => {
    const response = await apiClient.get<ListConnectionTypesResponseDto>(CONNECTION_TYPE_BASE_URL, {
      params,
    });
    return response.data;
  },
};
