// src/store/types/ConnectionTypeTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { ConnectionType, ConnectionTypeQueryParams } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum ConnectionTypeStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface ConnectionTypeState {
  connectionTypes: ConnectionType[];
  status: ConnectionTypeStatus;
  error: AppErrorDto | null;
}

export const initialConnectionTypeState: ConnectionTypeState = {
  connectionTypes: [],
  status: ConnectionTypeStatus.Initial,
  error: null,
};

export const CONNECTION_TYPE_GET_CONNECTION_TYPES_START =
  'connectionTypes/getConnectionTypes/start';
export const CONNECTION_TYPE_GET_CONNECTION_TYPES_SUCCESS =
  'connectionTypes/getConnectionTypes/success';
export const CONNECTION_TYPE_GET_CONNECTION_TYPES_FAILED =
  'connectionTypes/getConnectionTypes/failed';

export const CONNECTION_TYPE_CLEAR_ERROR = 'connectionTypes/clearError';

export type ConnectionTypeAction =
  | Action<typeof CONNECTION_TYPE_GET_CONNECTION_TYPES_START>
  | {
      type: typeof CONNECTION_TYPE_GET_CONNECTION_TYPES_SUCCESS;
      payload: { connectionTypes: ConnectionType[] };
    }
  | { type: typeof CONNECTION_TYPE_GET_CONNECTION_TYPES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof CONNECTION_TYPE_CLEAR_ERROR>;

export type ConnectionTypeThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ConnectionTypeAction
>;
