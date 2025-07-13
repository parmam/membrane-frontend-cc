import { apiClient as client, getAuthToken } from '../client';
import { operations } from '../types';

export const FileService = {
  async getFiles(params?: operations['FileController_index']['parameters']['query']) {
    const response = await client.GET('/file', { params: { query: params } });
    return response.data;
  },

  async getFileById(id: string) {
    const response = await client.GET('/file/{id}', { params: { path: { id } } });
    return response.data;
  },

  async uploadFile(files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    // Using fetch directly for multipart/form-data as openapi-fetch might not handle it directly
    const baseUrl = 'https://monitoring-center-api.loger.ar';
    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${baseUrl}/file`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },

  async deleteFile(id: string) {
    const response = await client.DELETE('/file/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreFile(id: string) {
    const response = await client.PUT('/file/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
