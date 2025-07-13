import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const ShiftService = {
  async getShifts(params?: operations['ShiftController_index']['parameters']['query']) {
    const response = await client.GET('/shift', { params: { query: params } });
    return response.data;
  },

  async getShiftById(id: string) {
    const response = await client.GET('/shift/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createShift(shiftData: components['schemas']['StoreShiftRequest']) {
    const response = await client.POST('/shift', { body: shiftData });
    return response.data;
  },

  async updateShift(id: string, shiftData: components['schemas']['UpdateShiftRequest']) {
    const response = await client.PUT('/shift/{id}', { params: { path: { id } }, body: shiftData });
    return response.data;
  },

  async deleteShift(id: string) {
    const response = await client.DELETE('/shift/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreShift(id: string) {
    const response = await client.PUT('/shift/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
