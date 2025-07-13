import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const EventTypeService = {
  async getEventTypes(params?: operations['EventTypeController_index']['parameters']['query']) {
    const response = await client.GET('/event-type', { params: { query: params } });
    return response.data;
  },

  async getEventTypeById(id: string) {
    const response = await client.GET('/event-type/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createEventType(eventTypeData: components['schemas']['StoreEventTypeRequest']) {
    const response = await client.POST('/event-type', { body: eventTypeData });
    return response.data;
  },

  async updateEventType(
    id: string,
    eventTypeData: components['schemas']['UpdateEventTypeRequest'],
  ) {
    const response = await client.PUT('/event-type/{id}', {
      params: { path: { id } },
      body: eventTypeData,
    });
    return response.data;
  },

  async deleteEventType(id: string) {
    const response = await client.DELETE('/event-type/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreEventType(id: string) {
    const response = await client.PUT('/event-type/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
