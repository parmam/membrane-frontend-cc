// src/store/reducers/eventSlice.ts
import { Reducer } from 'redux';

import {
  EVENT_CLEAR_ERROR,
  EVENT_CREATE_FAILED,
  EVENT_CREATE_START,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAILED,
  EVENT_DELETE_START,
  EVENT_DELETE_SUCCESS,
  EVENT_GET_BY_ID_FAILED,
  EVENT_GET_BY_ID_START,
  EVENT_GET_BY_ID_SUCCESS,
  EVENT_GET_EVENTS_FAILED,
  EVENT_GET_EVENTS_START,
  EVENT_GET_EVENTS_SUCCESS,
  EVENT_RESTORE_FAILED,
  EVENT_RESTORE_START,
  EVENT_RESTORE_SUCCESS,
  EVENT_UPDATE_FAILED,
  EVENT_UPDATE_START,
  EVENT_UPDATE_SUCCESS,
  EventAction,
  EventState,
  EventStatus,
  initialEventState,
} from '../types/EventTypes';

export const eventReducer: Reducer<EventState, EventAction> = (
  state = initialEventState,
  action,
) => {
  switch (action.type) {
    case EVENT_GET_EVENTS_START:
      return { ...state, status: EventStatus.Fetching, error: null };
    case EVENT_GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: EventStatus.Success,
      };
    case EVENT_GET_EVENTS_FAILED:
      return { ...state, status: EventStatus.Failed, error: action.payload.error };

    case EVENT_GET_BY_ID_START:
      return { ...state, status: EventStatus.Fetching, error: null };
    case EVENT_GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedEvent: action.payload.event,
        status: EventStatus.Success,
      };
    case EVENT_GET_BY_ID_FAILED:
      return { ...state, status: EventStatus.Failed, error: action.payload.error };

    case EVENT_CREATE_START:
      return { ...state, status: EventStatus.Creating, error: null };
    case EVENT_CREATE_SUCCESS:
      return {
        ...state,
        events: [action.payload.event, ...state.events],
        total: state.total + 1,
        status: EventStatus.Success,
      };
    case EVENT_CREATE_FAILED:
      return { ...state, status: EventStatus.Failed, error: action.payload.error };

    case EVENT_UPDATE_START:
      return { ...state, status: EventStatus.Updating, error: null };
    case EVENT_UPDATE_SUCCESS: {
      const updatedEvents = state.events.map((et) =>
        et.id === action.payload.event.id ? action.payload.event : et,
      );
      return {
        ...state,
        events: updatedEvents,
        selectedEvent: action.payload.event,
        status: EventStatus.Success,
      };
    }
    case EVENT_UPDATE_FAILED:
      return { ...state, status: EventStatus.Failed, error: action.payload.error };

    case EVENT_DELETE_START:
      return { ...state, status: EventStatus.Deleting, error: null };
    case EVENT_DELETE_SUCCESS: {
      const filteredEvents = state.events.filter((et) => et.id !== action.payload.id);
      return {
        ...state,
        events: filteredEvents,
        total: state.total - 1,
        status: EventStatus.Success,
      };
    }
    case EVENT_DELETE_FAILED:
      return { ...state, status: EventStatus.Failed, error: action.payload.error };

    case EVENT_RESTORE_START:
      return { ...state, status: EventStatus.Restoring, error: null };
    case EVENT_RESTORE_SUCCESS:
      return {
        ...state,
        events: [action.payload.event, ...state.events],
        total: state.total + 1,
        status: EventStatus.Success,
      };
    case EVENT_RESTORE_FAILED:
      return { ...state, status: EventStatus.Failed, error: action.payload.error };

    case EVENT_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default eventReducer;
