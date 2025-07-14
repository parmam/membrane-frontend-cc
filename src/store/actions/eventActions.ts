// src/store/actions/eventActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { EventService } from '../../api/services';
import type {
  CreateEventRequest,
  Event,
  EventQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateEventRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// =======================
// GET EVENTS (PAGINATED)
// =======================

export const getEventsThunk = createAsyncThunk<
  PaginatedResponse<Event>,
  EventQueryParams | undefined,
  ThunkApiConfig
>('events/getEventsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await EventService.getEvents(params);
    return response as unknown as PaginatedResponse<Event>;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET EVENT BY ID
// =======================

export const getEventByIdThunk = createAsyncThunk<Event, string, ThunkApiConfig>(
  'events/getEventByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await EventService.getEventById(id);
      return response as unknown as Event;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// CREATE EVENT
// =======================

export const createEventThunk = createAsyncThunk<Event, CreateEventRequest, ThunkApiConfig>(
  'events/createEventThunk',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await EventService.createEvent(eventData);
      return response as unknown as Event;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// UPDATE EVENT
// =======================

export const updateEventThunk = createAsyncThunk<
  Event,
  { id: string; eventData: UpdateEventRequest },
  ThunkApiConfig
>('events/updateEventThunk', async ({ id, eventData }, { rejectWithValue }) => {
  try {
    const response = await EventService.updateEvent(id, eventData);
    return response as unknown as Event;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// DELETE EVENT
// =======================

export const deleteEventThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'events/deleteEventThunk',
  async (id, { rejectWithValue }) => {
    try {
      await EventService.deleteEvent(id);
      return id;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// RESTORE EVENT
// =======================

export const restoreEventThunk = createAsyncThunk<Event, string, ThunkApiConfig>(
  'events/restoreEventThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await EventService.restoreEvent(id);
      return response as unknown as Event;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);
