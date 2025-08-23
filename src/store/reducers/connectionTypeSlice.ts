// src/store/reducers/connectionTypeReducer.ts
import { Reducer } from 'redux';

import { ConnectionType } from '../types/ApiTypes';
import {
  CONNECTION_TYPE_CLEAR_ERROR,
  CONNECTION_TYPE_GET_CONNECTION_TYPES_FAILED,
  CONNECTION_TYPE_GET_CONNECTION_TYPES_START,
  CONNECTION_TYPE_GET_CONNECTION_TYPES_SUCCESS,
  ConnectionTypeAction,
  ConnectionTypeState,
  ConnectionTypeStatus,
  initialConnectionTypeState,
} from '../types/ConnectionTypeTypes';

export const connectionTypeReducer: Reducer<ConnectionTypeState, ConnectionTypeAction> = (
  state = initialConnectionTypeState,
  action,
) => {
  switch (action.type) {
    case CONNECTION_TYPE_GET_CONNECTION_TYPES_START:
      return { ...state, status: ConnectionTypeStatus.Fetching, error: null };
    case CONNECTION_TYPE_GET_CONNECTION_TYPES_SUCCESS:
      return {
        ...state,
        connectionTypes: action.payload.connectionTypes,
        status: ConnectionTypeStatus.Success,
      };
    case CONNECTION_TYPE_GET_CONNECTION_TYPES_FAILED:
      return { ...state, status: ConnectionTypeStatus.Failed, error: action.payload.error };
    case CONNECTION_TYPE_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default connectionTypeReducer;
