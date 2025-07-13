// src/store/actions/newEventTypeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { EventTypeService } from '../../api/services';
import type {
  CreateEventTypeRequest,
  EventType,
  EventTypeQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateEventTypeRequest,
} from '../types/ApiTypes';

// =======================
// GET EVENT TYPES (PAGINATED)
// =======================

export const getEventTypesThunk = createAsyncThunk<
  PaginatedResponse<EventType>,
  EventTypeQueryParams | undefined,
  ThunkApiConfig
>('eventTypes/getEventTypesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await EventTypeService.getEventTypes(params);
    return response as unknown as PaginatedResponse<EventType>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event types';
    return rejectWithValue(message);
  }
});

// =======================
// GET EVENT TYPE BY ID
// =======================

export const getEventTypeByIdThunk = createAsyncThunk<EventType, string, ThunkApiConfig>(
  'eventTypes/getEventTypeByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await EventTypeService.getEventTypeById(id);
      return response as unknown as EventType;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch event type';
      return rejectWithValue(message);
    }
  },
);

// =======================
// CREATE EVENT TYPE
// =======================

export const createEventTypeThunk = createAsyncThunk<
  EventType,
  CreateEventTypeRequest,
  ThunkApiConfig
>('eventTypes/createEventTypeThunk', async (eventTypeData, { rejectWithValue }) => {
  try {
    const response = await EventTypeService.createEventType(eventTypeData);
    return response as unknown as EventType;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create event type';
    return rejectWithValue(message);
  }
});

// =======================
// UPDATE EVENT TYPE
// =======================

export const updateEventTypeThunk = createAsyncThunk<
  EventType,
  { id: string; eventTypeData: UpdateEventTypeRequest },
  ThunkApiConfig
>('eventTypes/updateEventTypeThunk', async ({ id, eventTypeData }, { rejectWithValue }) => {
  try {
    const response = await EventTypeService.updateEventType(id, eventTypeData);
    return response as unknown as EventType;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update event type';
    return rejectWithValue(message);
  }
});

// =======================
// DELETE EVENT TYPE
// =======================

export const deleteEventTypeThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'eventTypes/deleteEventTypeThunk',
  async (id, { rejectWithValue }) => {
    try {
      await EventTypeService.deleteEventType(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete event type';
      return rejectWithValue(message);
    }
  },
);

// =======================
// RESTORE EVENT TYPE
// =======================

export const restoreEventTypeThunk = createAsyncThunk<EventType, string, ThunkApiConfig>(
  'eventTypes/restoreEventTypeThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await EventTypeService.restoreEventType(id);
      return response as unknown as EventType;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore event type';
      return rejectWithValue(message);
    }
  },
);
