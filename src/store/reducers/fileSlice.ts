// src/store/reducers/fileSlice.ts
import { Reducer } from 'redux';

import {
  FILE_CLEAR_ERROR,
  FILE_DELETE_FAILED,
  FILE_DELETE_START,
  FILE_DELETE_SUCCESS,
  FILE_GET_BY_ID_FAILED,
  FILE_GET_BY_ID_START,
  FILE_GET_BY_ID_SUCCESS,
  FILE_GET_FILES_FAILED,
  FILE_GET_FILES_START,
  FILE_GET_FILES_SUCCESS,
  FILE_RESTORE_FAILED,
  FILE_RESTORE_START,
  FILE_RESTORE_SUCCESS,
  FILE_UPLOAD_FAILED,
  FILE_UPLOAD_START,
  FILE_UPLOAD_SUCCESS,
  FileAction,
  FileState,
  FileStatus,
  initialFileState,
} from '../types/FileTypes';

export const fileReducer: Reducer<FileState, FileAction> = (state = initialFileState, action) => {
  switch (action.type) {
    case FILE_GET_FILES_START:
      return { ...state, status: FileStatus.Fetching, error: null };
    case FILE_GET_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: FileStatus.Success,
      };
    case FILE_GET_FILES_FAILED:
      return { ...state, status: FileStatus.Failed, error: action.payload.error };

    case FILE_GET_BY_ID_START:
      return { ...state, status: FileStatus.Fetching, error: null };
    case FILE_GET_BY_ID_SUCCESS:
      return { ...state, selectedFile: action.payload.file, status: FileStatus.Success };
    case FILE_GET_BY_ID_FAILED:
      return { ...state, status: FileStatus.Failed, error: action.payload.error };

    case FILE_UPLOAD_START:
      return { ...state, status: FileStatus.Uploading, error: null };
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        files: [...action.payload.files, ...state.files],
        total: state.total + action.payload.files.length,
        status: FileStatus.Success,
      };
    case FILE_UPLOAD_FAILED:
      return { ...state, status: FileStatus.Failed, error: action.payload.error };

    case FILE_DELETE_START:
      return { ...state, status: FileStatus.Deleting, error: null };
    case FILE_DELETE_SUCCESS: {
      const filteredFiles = state.files.filter((f) => f.id !== action.payload.id);
      return {
        ...state,
        files: filteredFiles,
        total: state.total - 1,
        status: FileStatus.Success,
      };
    }
    case FILE_DELETE_FAILED:
      return { ...state, status: FileStatus.Failed, error: action.payload.error };

    case FILE_RESTORE_START:
      return { ...state, status: FileStatus.Restoring, error: null };
    case FILE_RESTORE_SUCCESS:
      return {
        ...state,
        files: [action.payload.file, ...state.files],
        total: state.total + 1,
        status: FileStatus.Success,
      };
    case FILE_RESTORE_FAILED:
      return { ...state, status: FileStatus.Failed, error: action.payload.error };

    case FILE_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default fileReducer;
