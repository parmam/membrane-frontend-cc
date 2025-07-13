// src/store/reducers/eventSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createEventThunk,
  deleteEventThunk,
  getEventByIdThunk,
  getEventsThunk,
  restoreEventThunk,
  updateEventThunk,
} from '../actions/eventActions';
import type { Event, PaginatedResponse } from '../types/ApiTypes';
import type { EventLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface EventState {
  // Data
  events: Event[];
  selectedEvent: Event | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: EventLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: EventLoadingState = {
  getEventsThunk: false,
  getEventByIdThunk: false,
  createEventThunk: false,
  updateEventThunk: false,
  deleteEventThunk: false,
  restoreEventThunk: false,
};

const initialState: EventState = {
  events: [],
  selectedEvent: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    clearEventError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getEventsThunk.pending, (state) => {
        state.loading.getEventsThunk = true;
        state.error = null;
      })
      .addCase(
        getEventsThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Event>>) => {
          state.loading.getEventsThunk = false;
          state.events = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getEventsThunk.rejected, (state, action) => {
        state.loading.getEventsThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch events.';
      });

    // GET BY ID
    builder
      .addCase(getEventByIdThunk.pending, (state) => {
        state.loading.getEventByIdThunk = true;
        state.error = null;
      })
      .addCase(getEventByIdThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading.getEventByIdThunk = false;
        state.selectedEvent = action.payload;
      })
      .addCase(getEventByIdThunk.rejected, (state, action) => {
        state.loading.getEventByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch event.';
      });

    // CREATE
    builder
      .addCase(createEventThunk.pending, (state) => {
        state.loading.createEventThunk = true;
        state.error = null;
      })
      .addCase(createEventThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading.createEventThunk = false;
        state.events.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.loading.createEventThunk = false;
        state.error = (action.payload as string) || 'Failed to create event.';
      });

    // UPDATE
    builder
      .addCase(updateEventThunk.pending, (state) => {
        state.loading.updateEventThunk = true;
        state.error = null;
      })
      .addCase(updateEventThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading.updateEventThunk = false;
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.selectedEvent?.id === action.payload.id) {
          state.selectedEvent = action.payload;
        }
      })
      .addCase(updateEventThunk.rejected, (state, action) => {
        state.loading.updateEventThunk = false;
        state.error = (action.payload as string) || 'Failed to update event.';
      });

    // DELETE
    builder
      .addCase(deleteEventThunk.pending, (state) => {
        state.loading.deleteEventThunk = true;
        state.error = null;
      })
      .addCase(deleteEventThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteEventThunk = false;
        state.events = state.events.filter((e) => e.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteEventThunk.rejected, (state, action) => {
        state.loading.deleteEventThunk = false;
        state.error = (action.payload as string) || 'Failed to delete event.';
      });

    // RESTORE
    builder
      .addCase(restoreEventThunk.pending, (state) => {
        state.loading.restoreEventThunk = true;
        state.error = null;
      })
      .addCase(restoreEventThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading.restoreEventThunk = false;
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        } else {
          state.events.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreEventThunk.rejected, (state, action) => {
        state.loading.restoreEventThunk = false;
        state.error = (action.payload as string) || 'Failed to restore event.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedEvent, clearEventError } = eventSlice.actions;

// Selectors
export const selectEvents = (state: { events: EventState }) => state.events.events;
export const selectSelectedEvent = (state: { events: EventState }) => state.events.selectedEvent;
export const selectEventLoading = (state: { events: EventState }) => state.events.loading;
export const selectEventError = (state: { events: EventState }) => state.events.error;
export const selectEventPagination = (state: { events: EventState }) => ({
  total: state.events.total,
  currentPage: state.events.currentPage,
  pageSize: state.events.pageSize,
});

// Reducer
export default eventSlice.reducer;
