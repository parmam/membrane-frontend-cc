import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const EventService = {
  async getEvents(params?: operations['EventController_index']['parameters']['query']) {
    const response = await client.GET('/event', { params: { query: params } });
    return response.data;
  },

  async getEventById(id: string) {
    const response = await client.GET('/event/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createEvent(eventData: components['schemas']['StoreEventRequest']) {
    const response = await client.POST('/event', { body: eventData });
    return response.data;
  },

  async updateEvent(id: string, eventData: components['schemas']['UpdateEventRequest']) {
    const response = await client.PUT('/event/{id}', { params: { path: { id } }, body: eventData });
    return response.data;
  },

  async deleteEvent(id: string) {
    const response = await client.DELETE('/event/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreEvent(id: string) {
    const response = await client.PUT('/event/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
