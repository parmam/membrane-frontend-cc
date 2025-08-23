// src/store/types/FileTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { FileEntity, FileQueryParams, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum FileStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Uploading = 'UPLOADING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface FileState {
  files: FileEntity[];
  selectedFile: FileEntity | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: FileStatus;
  error: AppErrorDto | null;
}

export const initialFileState: FileState = {
  files: [],
  selectedFile: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: FileStatus.Initial,
  error: null,
};

export const FILE_GET_FILES_START = 'files/getFiles/start';
export const FILE_GET_FILES_SUCCESS = 'files/getFiles/success';
export const FILE_GET_FILES_FAILED = 'files/getFiles/failed';

export const FILE_GET_BY_ID_START = 'files/getById/start';
export const FILE_GET_BY_ID_SUCCESS = 'files/getById/success';
export const FILE_GET_BY_ID_FAILED = 'files/getById/failed';

export const FILE_UPLOAD_START = 'files/upload/start';
export const FILE_UPLOAD_SUCCESS = 'files/upload/success';
export const FILE_UPLOAD_FAILED = 'files/upload/failed';

export const FILE_DELETE_START = 'files/delete/start';
export const FILE_DELETE_SUCCESS = 'files/delete/success';
export const FILE_DELETE_FAILED = 'files/delete/failed';

export const FILE_RESTORE_START = 'files/restore/start';
export const FILE_RESTORE_SUCCESS = 'files/restore/success';
export const FILE_RESTORE_FAILED = 'files/restore/failed';

export const FILE_CLEAR_ERROR = 'files/clearError';

export type FileAction =
  | Action<typeof FILE_GET_FILES_START>
  | { type: typeof FILE_GET_FILES_SUCCESS; payload: { response: PaginatedResponse<FileEntity> } }
  | { type: typeof FILE_GET_FILES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof FILE_GET_BY_ID_START>
  | { type: typeof FILE_GET_BY_ID_SUCCESS; payload: { file: FileEntity } }
  | { type: typeof FILE_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof FILE_UPLOAD_START>
  | { type: typeof FILE_UPLOAD_SUCCESS; payload: { files: FileEntity[] } }
  | { type: typeof FILE_UPLOAD_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof FILE_DELETE_START>
  | { type: typeof FILE_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof FILE_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof FILE_RESTORE_START>
  | { type: typeof FILE_RESTORE_SUCCESS; payload: { file: FileEntity } }
  | { type: typeof FILE_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof FILE_CLEAR_ERROR>;

export type FileThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, FileAction>;
