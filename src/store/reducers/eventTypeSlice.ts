// src/store/reducers/eventTypeSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createEventTypeThunk,
  deleteEventTypeThunk,
  getEventTypeByIdThunk,
  getEventTypesThunk,
  restoreEventTypeThunk,
  updateEventTypeThunk,
} from '../actions/eventTypeActions';
import type { EventType, PaginatedResponse } from '../types/ApiTypes';
import type { EventTypeLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface EventTypeState {
  // Data
  eventTypes: EventType[];
  selectedEventType: EventType | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: EventTypeLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: EventTypeLoadingState = {
  getEventTypesThunk: false,
  getEventTypeByIdThunk: false,
  createEventTypeThunk: false,
  updateEventTypeThunk: false,
  deleteEventTypeThunk: false,
  restoreEventTypeThunk: false,
};

const initialState: EventTypeState = {
  eventTypes: [],
  selectedEventType: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const eventTypeSlice = createSlice({
  name: 'eventTypes',
  initialState,
  reducers: {
    clearSelectedEventType: (state) => {
      state.selectedEventType = null;
    },
    clearEventTypeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getEventTypesThunk.pending, (state) => {
        state.loading.getEventTypesThunk = true;
        state.error = null;
      })
      .addCase(
        getEventTypesThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<EventType>>) => {
          state.loading.getEventTypesThunk = false;
          state.eventTypes = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getEventTypesThunk.rejected, (state, action) => {
        state.loading.getEventTypesThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch event types.';
      });

    // GET BY ID
    builder
      .addCase(getEventTypeByIdThunk.pending, (state) => {
        state.loading.getEventTypeByIdThunk = true;
        state.error = null;
      })
      .addCase(getEventTypeByIdThunk.fulfilled, (state, action: PayloadAction<EventType>) => {
        state.loading.getEventTypeByIdThunk = false;
        state.selectedEventType = action.payload;
      })
      .addCase(getEventTypeByIdThunk.rejected, (state, action) => {
        state.loading.getEventTypeByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch event type.';
      });

    // CREATE
    builder
      .addCase(createEventTypeThunk.pending, (state) => {
        state.loading.createEventTypeThunk = true;
        state.error = null;
      })
      .addCase(createEventTypeThunk.fulfilled, (state, action: PayloadAction<EventType>) => {
        state.loading.createEventTypeThunk = false;
        state.eventTypes.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createEventTypeThunk.rejected, (state, action) => {
        state.loading.createEventTypeThunk = false;
        state.error = (action.payload as string) || 'Failed to create event type.';
      });

    // UPDATE
    builder
      .addCase(updateEventTypeThunk.pending, (state) => {
        state.loading.updateEventTypeThunk = true;
        state.error = null;
      })
      .addCase(updateEventTypeThunk.fulfilled, (state, action: PayloadAction<EventType>) => {
        state.loading.updateEventTypeThunk = false;
        const index = state.eventTypes.findIndex((et) => et.id === action.payload.id);
        if (index !== -1) {
          state.eventTypes[index] = action.payload;
        }
        if (state.selectedEventType?.id === action.payload.id) {
          state.selectedEventType = action.payload;
        }
      })
      .addCase(updateEventTypeThunk.rejected, (state, action) => {
        state.loading.updateEventTypeThunk = false;
        state.error = (action.payload as string) || 'Failed to update event type.';
      });

    // DELETE
    builder
      .addCase(deleteEventTypeThunk.pending, (state) => {
        state.loading.deleteEventTypeThunk = true;
        state.error = null;
      })
      .addCase(deleteEventTypeThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteEventTypeThunk = false;
        state.eventTypes = state.eventTypes.filter((et) => et.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteEventTypeThunk.rejected, (state, action) => {
        state.loading.deleteEventTypeThunk = false;
        state.error = (action.payload as string) || 'Failed to delete event type.';
      });

    // RESTORE
    builder
      .addCase(restoreEventTypeThunk.pending, (state) => {
        state.loading.restoreEventTypeThunk = true;
        state.error = null;
      })
      .addCase(restoreEventTypeThunk.fulfilled, (state, action: PayloadAction<EventType>) => {
        state.loading.restoreEventTypeThunk = false;
        const index = state.eventTypes.findIndex((et) => et.id === action.payload.id);
        if (index !== -1) {
          state.eventTypes[index] = action.payload;
        } else {
          state.eventTypes.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreEventTypeThunk.rejected, (state, action) => {
        state.loading.restoreEventTypeThunk = false;
        state.error = (action.payload as string) || 'Failed to restore event type.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedEventType, clearEventTypeError } = eventTypeSlice.actions;

// Selectors
export const selectEventTypes = (state: { eventTypes: EventTypeState }) =>
  state.eventTypes.eventTypes;
export const selectSelectedEventType = (state: { eventTypes: EventTypeState }) =>
  state.eventTypes.selectedEventType;
export const selectEventTypeLoading = (state: { eventTypes: EventTypeState }) =>
  state.eventTypes.loading;
export const selectEventTypeError = (state: { eventTypes: EventTypeState }) =>
  state.eventTypes.error;
export const selectEventTypePagination = (state: { eventTypes: EventTypeState }) => ({
  total: state.eventTypes.total,
  currentPage: state.eventTypes.currentPage,
  pageSize: state.eventTypes.pageSize,
});

// Reducer
export default eventTypeSlice.reducer;
