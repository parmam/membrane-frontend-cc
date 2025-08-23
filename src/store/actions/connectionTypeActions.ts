// src/store/actions/connectionTypeActions.ts
import { ConnectionTypeService } from '../../api/services/connectionTypeService';
import { ConnectionType, ConnectionTypeQueryParams } from '../types/ApiTypes';
import {
  CONNECTION_TYPE_CLEAR_ERROR,
  CONNECTION_TYPE_GET_CONNECTION_TYPES_FAILED,
  CONNECTION_TYPE_GET_CONNECTION_TYPES_START,
  CONNECTION_TYPE_GET_CONNECTION_TYPES_SUCCESS,
  ConnectionTypeAction,
  ConnectionTypeThunk,
} from '../types/ConnectionTypeTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';

// Action Creators
export const getConnectionTypesStart = (): ConnectionTypeAction => ({
  type: CONNECTION_TYPE_GET_CONNECTION_TYPES_START,
});
export const getConnectionTypesSuccess = (
  connectionTypes: ConnectionType[],
): ConnectionTypeAction => ({
  type: CONNECTION_TYPE_GET_CONNECTION_TYPES_SUCCESS,
  payload: { connectionTypes },
});
export const getConnectionTypesFailed = (error: AppErrorDto): ConnectionTypeAction => ({
  type: CONNECTION_TYPE_GET_CONNECTION_TYPES_FAILED,
  payload: { error },
});

export const clearConnectionTypeError = (): ConnectionTypeAction => ({
  type: CONNECTION_TYPE_CLEAR_ERROR,
});

// Thunks
export const getConnectionTypesThunk =
  (params?: ConnectionTypeQueryParams): ConnectionTypeThunk =>
  async (dispatch) => {
    dispatch(getConnectionTypesStart());
    try {
      const connectionTypes = (await ConnectionTypeService.getConnectionTypes(params)) ?? [];
      dispatch(getConnectionTypesSuccess(connectionTypes));
    } catch (error) {
      dispatch(getConnectionTypesFailed(parseError(error)));
    }
  };
