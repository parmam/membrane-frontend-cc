// src/store/types/EventTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateEventRequest,
  Event,
  EventQueryParams,
  PaginatedResponse,
  UpdateEventRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum EventStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: EventStatus;
  error: AppErrorDto | null;
}

export const initialEventState: EventState = {
  events: [],
  selectedEvent: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: EventStatus.Initial,
  error: null,
};

export const EVENT_GET_EVENTS_START = 'events/getEvents/start';
export const EVENT_GET_EVENTS_SUCCESS = 'events/getEvents/success';
export const EVENT_GET_EVENTS_FAILED = 'events/getEvents/failed';

export const EVENT_GET_BY_ID_START = 'events/getById/start';
export const EVENT_GET_BY_ID_SUCCESS = 'events/getById/success';
export const EVENT_GET_BY_ID_FAILED = 'events/getById/failed';

export const EVENT_CREATE_START = 'events/create/start';
export const EVENT_CREATE_SUCCESS = 'events/create/success';
export const EVENT_CREATE_FAILED = 'events/create/failed';

export const EVENT_UPDATE_START = 'events/update/start';
export const EVENT_UPDATE_SUCCESS = 'events/update/success';
export const EVENT_UPDATE_FAILED = 'events/update/failed';

export const EVENT_DELETE_START = 'events/delete/start';
export const EVENT_DELETE_SUCCESS = 'events/delete/success';
export const EVENT_DELETE_FAILED = 'events/delete/failed';

export const EVENT_RESTORE_START = 'events/restore/start';
export const EVENT_RESTORE_SUCCESS = 'events/restore/success';
export const EVENT_RESTORE_FAILED = 'events/restore/failed';

export const EVENT_CLEAR_ERROR = 'events/clearError';

export type EventAction =
  | Action<typeof EVENT_GET_EVENTS_START>
  | { type: typeof EVENT_GET_EVENTS_SUCCESS; payload: { response: PaginatedResponse<Event> } }
  | { type: typeof EVENT_GET_EVENTS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_GET_BY_ID_START>
  | { type: typeof EVENT_GET_BY_ID_SUCCESS; payload: { event: Event } }
  | { type: typeof EVENT_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_CREATE_START>
  | { type: typeof EVENT_CREATE_SUCCESS; payload: { event: Event } }
  | { type: typeof EVENT_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_UPDATE_START>
  | { type: typeof EVENT_UPDATE_SUCCESS; payload: { event: Event } }
  | { type: typeof EVENT_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_DELETE_START>
  | { type: typeof EVENT_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof EVENT_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_RESTORE_START>
  | { type: typeof EVENT_RESTORE_SUCCESS; payload: { event: Event } }
  | { type: typeof EVENT_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof EVENT_CLEAR_ERROR>;

export type EventThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  EventAction
>;
