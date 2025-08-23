// src/store/reducers/eventTypeSlice.ts
import { Reducer } from 'redux';

import { EventType, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import {
  EVENT_TYPE_CLEAR_ERROR,
  EVENT_TYPE_CREATE_FAILED,
  EVENT_TYPE_CREATE_START,
  EVENT_TYPE_CREATE_SUCCESS,
  EVENT_TYPE_DELETE_FAILED,
  EVENT_TYPE_DELETE_START,
  EVENT_TYPE_DELETE_SUCCESS,
  EVENT_TYPE_GET_BY_ID_FAILED,
  EVENT_TYPE_GET_BY_ID_START,
  EVENT_TYPE_GET_BY_ID_SUCCESS,
  EVENT_TYPE_GET_EVENT_TYPES_FAILED,
  EVENT_TYPE_GET_EVENT_TYPES_START,
  EVENT_TYPE_GET_EVENT_TYPES_SUCCESS,
  EVENT_TYPE_RESTORE_FAILED,
  EVENT_TYPE_RESTORE_START,
  EVENT_TYPE_RESTORE_SUCCESS,
  EVENT_TYPE_UPDATE_FAILED,
  EVENT_TYPE_UPDATE_START,
  EVENT_TYPE_UPDATE_SUCCESS,
  EventTypeAction,
  EventTypeState,
  EventTypeStatus,
  initialEventTypeState,
} from '../types/EventTypeTypes';

export const eventTypeReducer: Reducer<EventTypeState, EventTypeAction> = (
  state = initialEventTypeState,
  action,
) => {
  switch (action.type) {
    case EVENT_TYPE_GET_EVENT_TYPES_START:
      return { ...state, status: EventTypeStatus.Fetching, error: null };
    case EVENT_TYPE_GET_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        eventTypes: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: EventTypeStatus.Success,
      };
    case EVENT_TYPE_GET_EVENT_TYPES_FAILED:
      return { ...state, status: EventTypeStatus.Failed, error: action.payload.error };

    case EVENT_TYPE_GET_BY_ID_START:
      return { ...state, status: EventTypeStatus.Fetching, error: null };
    case EVENT_TYPE_GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedEventType: action.payload.eventType,
        status: EventTypeStatus.Success,
      };
    case EVENT_TYPE_GET_BY_ID_FAILED:
      return { ...state, status: EventTypeStatus.Failed, error: action.payload.error };

    case EVENT_TYPE_CREATE_START:
      return { ...state, status: EventTypeStatus.Creating, error: null };
    case EVENT_TYPE_CREATE_SUCCESS:
      return {
        ...state,
        eventTypes: [action.payload.eventType, ...state.eventTypes],
        total: state.total + 1,
        status: EventTypeStatus.Success,
      };
    case EVENT_TYPE_CREATE_FAILED:
      return { ...state, status: EventTypeStatus.Failed, error: action.payload.error };

    case EVENT_TYPE_UPDATE_START:
      return { ...state, status: EventTypeStatus.Updating, error: null };
    case EVENT_TYPE_UPDATE_SUCCESS: {
      const updatedEventTypes = state.eventTypes.map((et) =>
        et.id === action.payload.eventType.id ? action.payload.eventType : et,
      );
      return {
        ...state,
        eventTypes: updatedEventTypes,
        selectedEventType: action.payload.eventType,
        status: EventTypeStatus.Success,
      };
    }
    case EVENT_TYPE_UPDATE_FAILED:
      return { ...state, status: EventTypeStatus.Failed, error: action.payload.error };

    case EVENT_TYPE_DELETE_START:
      return { ...state, status: EventTypeStatus.Deleting, error: null };
    case EVENT_TYPE_DELETE_SUCCESS: {
      const filteredEventTypes = state.eventTypes.filter((et) => et.id !== action.payload.id);
      return {
        ...state,
        eventTypes: filteredEventTypes,
        total: state.total - 1,
        status: EventTypeStatus.Success,
      };
    }
    case EVENT_TYPE_DELETE_FAILED:
      return { ...state, status: EventTypeStatus.Failed, error: action.payload.error };

    case EVENT_TYPE_RESTORE_START:
      return { ...state, status: EventTypeStatus.Restoring, error: null };
    case EVENT_TYPE_RESTORE_SUCCESS:
      return {
        ...state,
        eventTypes: [action.payload.eventType, ...state.eventTypes],
        total: state.total + 1,
        status: EventTypeStatus.Success,
      };
    case EVENT_TYPE_RESTORE_FAILED:
      return { ...state, status: EventTypeStatus.Failed, error: action.payload.error };

    case EVENT_TYPE_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default eventTypeReducer;
