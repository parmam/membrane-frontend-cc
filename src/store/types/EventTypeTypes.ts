// src/store/types/EventTypeTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateEventTypeRequest,
  EventType,
  EventTypeQueryParams,
  PaginatedResponse,
  UpdateEventTypeRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum EventTypeStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface EventTypeState {
  eventTypes: EventType[];
  selectedEventType: EventType | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: EventTypeStatus;
  error: AppErrorDto | null;
}

export const initialEventTypeState: EventTypeState = {
  eventTypes: [],
  selectedEventType: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: EventTypeStatus.Initial,
  error: null,
};

export const EVENT_TYPE_GET_EVENT_TYPES_START = 'eventTypes/getEventTypes/start';
export const EVENT_TYPE_GET_EVENT_TYPES_SUCCESS = 'eventTypes/getEventTypes/success';
export const EVENT_TYPE_GET_EVENT_TYPES_FAILED = 'eventTypes/getEventTypes/failed';

export const EVENT_TYPE_GET_BY_ID_START = 'eventTypes/getById/start';
export const EVENT_TYPE_GET_BY_ID_SUCCESS = 'eventTypes/getById/success';
export const EVENT_TYPE_GET_BY_ID_FAILED = 'eventTypes/getById/failed';

export const EVENT_TYPE_CREATE_START = 'eventTypes/create/start';
export const EVENT_TYPE_CREATE_SUCCESS = 'eventTypes/create/success';
export const EVENT_TYPE_CREATE_FAILED = 'eventTypes/create/failed';

export const EVENT_TYPE_UPDATE_START = 'eventTypes/update/start';
export const EVENT_TYPE_UPDATE_SUCCESS = 'eventTypes/update/success';
export const EVENT_TYPE_UPDATE_FAILED = 'eventTypes/update/failed';

export const EVENT_TYPE_DELETE_START = 'eventTypes/delete/start';
export const EVENT_TYPE_DELETE_SUCCESS = 'eventTypes/delete/success';
export const EVENT_TYPE_DELETE_FAILED = 'eventTypes/delete/failed';

export const EVENT_TYPE_RESTORE_START = 'eventTypes/restore/start';
export const EVENT_TYPE_RESTORE_SUCCESS = 'eventTypes/restore/success';
export const EVENT_TYPE_RESTORE_FAILED = 'eventTypes/restore/failed';

export const EVENT_TYPE_CLEAR_ERROR = 'eventTypes/clearError';

export type EventTypeAction =
  | Action<typeof EVENT_TYPE_GET_EVENT_TYPES_START>
  | {
      type: typeof EVENT_TYPE_GET_EVENT_TYPES_SUCCESS;
      payload: { response: PaginatedResponse<EventType> };
    }
  | { type: typeof EVENT_TYPE_GET_EVENT_TYPES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_TYPE_GET_BY_ID_START>
  | { type: typeof EVENT_TYPE_GET_BY_ID_SUCCESS; payload: { eventType: EventType } }
  | { type: typeof EVENT_TYPE_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_TYPE_CREATE_START>
  | { type: typeof EVENT_TYPE_CREATE_SUCCESS; payload: { eventType: EventType } }
  | { type: typeof EVENT_TYPE_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_TYPE_UPDATE_START>
  | { type: typeof EVENT_TYPE_UPDATE_SUCCESS; payload: { eventType: EventType } }
  | { type: typeof EVENT_TYPE_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_TYPE_DELETE_START>
  | { type: typeof EVENT_TYPE_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof EVENT_TYPE_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_TYPE_RESTORE_START>
  | { type: typeof EVENT_TYPE_RESTORE_SUCCESS; payload: { eventType: EventType } }
  | { type: typeof EVENT_TYPE_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_TYPE_CLEAR_ERROR>;

export type EventTypeThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  EventTypeAction
>;
