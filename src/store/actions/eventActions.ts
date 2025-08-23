// src/store/actions/eventActions.ts
import { EventService } from '../../api/services';
import {
  CreateEventRequest,
  Event,
  EventQueryParams,
  PaginatedResponse,
  UpdateEventRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
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
  EventThunk,
} from '../types/EventTypes';

// Action Creators
export const getEventsStart = (): EventAction => ({ type: EVENT_GET_EVENTS_START });
export const getEventsSuccess = (response: PaginatedResponse<Event>): EventAction => ({
  type: EVENT_GET_EVENTS_SUCCESS,
  payload: { response },
});
export const getEventsFailed = (error: AppErrorDto): EventAction => ({
  type: EVENT_GET_EVENTS_FAILED,
  payload: { error },
});

export const getByIdStart = (): EventAction => ({ type: EVENT_GET_BY_ID_START });
export const getByIdSuccess = (event: Event): EventAction => ({
  type: EVENT_GET_BY_ID_SUCCESS,
  payload: { event },
});
export const getByIdFailed = (error: AppErrorDto): EventAction => ({
  type: EVENT_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): EventAction => ({ type: EVENT_CREATE_START });
export const createSuccess = (event: Event): EventAction => ({
  type: EVENT_CREATE_SUCCESS,
  payload: { event },
});
export const createFailed = (error: AppErrorDto): EventAction => ({
  type: EVENT_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): EventAction => ({ type: EVENT_UPDATE_START });
export const updateSuccess = (event: Event): EventAction => ({
  type: EVENT_UPDATE_SUCCESS,
  payload: { event },
});
export const updateFailed = (error: AppErrorDto): EventAction => ({
  type: EVENT_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): EventAction => ({ type: EVENT_DELETE_START });
export const deleteSuccess = (id: string): EventAction => ({
  type: EVENT_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): EventAction => ({
  type: EVENT_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): EventAction => ({ type: EVENT_RESTORE_START });
export const restoreSuccess = (event: Event): EventAction => ({
  type: EVENT_RESTORE_SUCCESS,
  payload: { event },
});
export const restoreFailed = (error: AppErrorDto): EventAction => ({
  type: EVENT_RESTORE_FAILED,
  payload: { error },
});

export const clearEventError = (): EventAction => ({ type: EVENT_CLEAR_ERROR });

// Thunks
export const getEventsThunk =
  (params?: EventQueryParams): EventThunk =>
  async (dispatch) => {
    dispatch(getEventsStart());
    try {
      const response = (await EventService.getEvents(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getEventsSuccess(response));
    } catch (error) {
      dispatch(getEventsFailed(parseError(error)));
    }
  };

export const getEventByIdThunk =
  (id: string): EventThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const event = (await EventService.getEventById(id)) ?? {
        id: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(getByIdSuccess(event));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createEventThunk =
  (eventData: CreateEventRequest): EventThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const event = (await EventService.createEvent(eventData)) ?? {
        id: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(createSuccess(event));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateEventThunk =
  (id: string, eventData: UpdateEventRequest): EventThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const event = (await EventService.updateEvent(id, eventData)) ?? {
        id: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(updateSuccess(event));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteEventThunk =
  (id: string): EventThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await EventService.deleteEvent(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreEventThunk =
  (id: string): EventThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const event = (await EventService.restoreEvent(id)) ?? {
        id: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(restoreSuccess(event));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
