import { apiClient as client } from '../client';
import { operations } from '../types';

export const ConnectionTypeService = {
  async getConnectionTypes(
    params?: operations['ConnectionTypeController_index']['parameters']['query'],
  ) {
    const response = await client.GET('/connection-type', { params: { query: params } });
    return response.data;
  },
};
