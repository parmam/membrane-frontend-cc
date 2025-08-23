// src/store/actions/eventTypeActions.ts
import { EventTypeService } from '../../api/services';
import {
  CreateEventTypeRequest,
  EventType,
  EventTypeQueryParams,
  PaginatedResponse,
  UpdateEventTypeRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
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
  EventTypeThunk,
} from '../types/EventTypeTypes';

// Action Creators
export const getEventTypesStart = (): EventTypeAction => ({
  type: EVENT_TYPE_GET_EVENT_TYPES_START,
});
export const getEventTypesSuccess = (response: PaginatedResponse<EventType>): EventTypeAction => ({
  type: EVENT_TYPE_GET_EVENT_TYPES_SUCCESS,
  payload: { response },
});
export const getEventTypesFailed = (error: AppErrorDto): EventTypeAction => ({
  type: EVENT_TYPE_GET_EVENT_TYPES_FAILED,
  payload: { error },
});

export const getByIdStart = (): EventTypeAction => ({
  type: EVENT_TYPE_GET_BY_ID_START,
});
export const getByIdSuccess = (eventType: EventType): EventTypeAction => ({
  type: EVENT_TYPE_GET_BY_ID_SUCCESS,
  payload: { eventType },
});
export const getByIdFailed = (error: AppErrorDto): EventTypeAction => ({
  type: EVENT_TYPE_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): EventTypeAction => ({
  type: EVENT_TYPE_CREATE_START,
});
export const createSuccess = (eventType: EventType): EventTypeAction => ({
  type: EVENT_TYPE_CREATE_SUCCESS,
  payload: { eventType },
});
export const createFailed = (error: AppErrorDto): EventTypeAction => ({
  type: EVENT_TYPE_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): EventTypeAction => ({
  type: EVENT_TYPE_UPDATE_START,
});
export const updateSuccess = (eventType: EventType): EventTypeAction => ({
  type: EVENT_TYPE_UPDATE_SUCCESS,
  payload: { eventType },
});
export const updateFailed = (error: AppErrorDto): EventTypeAction => ({
  type: EVENT_TYPE_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): EventTypeAction => ({
  type: EVENT_TYPE_DELETE_START,
});
export const deleteSuccess = (id: string): EventTypeAction => ({
  type: EVENT_TYPE_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): EventTypeAction => ({
  type: EVENT_TYPE_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): EventTypeAction => ({
  type: EVENT_TYPE_RESTORE_START,
});
export const restoreSuccess = (eventType: EventType): EventTypeAction => ({
  type: EVENT_TYPE_RESTORE_SUCCESS,
  payload: { eventType },
});
export const restoreFailed = (error: AppErrorDto): EventTypeAction => ({
  type: EVENT_TYPE_RESTORE_FAILED,
  payload: { error },
});

export const clearEventTypeError = (): EventTypeAction => ({
  type: EVENT_TYPE_CLEAR_ERROR,
});

// Thunks
export const getEventTypesThunk =
  (params?: EventTypeQueryParams): EventTypeThunk =>
  async (dispatch) => {
    dispatch(getEventTypesStart());
    try {
      const response = (await EventTypeService.getEventTypes(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getEventTypesSuccess(response));
    } catch (error) {
      dispatch(getEventTypesFailed(parseError(error)));
    }
  };

export const getEventTypeByIdThunk =
  (id: string): EventTypeThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const eventType = (await EventTypeService.getEventTypeById(id)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(getByIdSuccess(eventType));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createEventTypeThunk =
  (eventTypeData: CreateEventTypeRequest): EventTypeThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const eventType = (await EventTypeService.createEventType(eventTypeData)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(createSuccess(eventType));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateEventTypeThunk =
  (id: string, eventTypeData: UpdateEventTypeRequest): EventTypeThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const eventType = (await EventTypeService.updateEventType(id, eventTypeData)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(updateSuccess(eventType));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteEventTypeThunk =
  (id: string): EventTypeThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await EventTypeService.deleteEventType(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreEventTypeThunk =
  (id: string): EventTypeThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const eventType = (await EventTypeService.restoreEventType(id)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(restoreSuccess(eventType));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
