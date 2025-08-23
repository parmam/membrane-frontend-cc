// src/store/actions/fileActions.ts
import { FileService } from '../../api/services';
import { FileEntity, FileQueryParams, PaginatedResponse } from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
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
  FileThunk,
} from '../types/FileTypes';

// Action Creators
export const getFilesStart = (): FileAction => ({ type: FILE_GET_FILES_START });
export const getFilesSuccess = (response: PaginatedResponse<FileEntity>): FileAction => ({
  type: FILE_GET_FILES_SUCCESS,
  payload: { response },
});
export const getFilesFailed = (error: AppErrorDto): FileAction => ({
  type: FILE_GET_FILES_FAILED,
  payload: { error },
});

export const getByIdStart = (): FileAction => ({ type: FILE_GET_BY_ID_START });
export const getByIdSuccess = (file: FileEntity): FileAction => ({
  type: FILE_GET_BY_ID_SUCCESS,
  payload: { file },
});
export const getByIdFailed = (error: AppErrorDto): FileAction => ({
  type: FILE_GET_BY_ID_FAILED,
  payload: { error },
});

export const uploadStart = (): FileAction => ({ type: FILE_UPLOAD_START });
export const uploadSuccess = (files: FileEntity[]): FileAction => ({
  type: FILE_UPLOAD_SUCCESS,
  payload: { files },
});
export const uploadFailed = (error: AppErrorDto): FileAction => ({
  type: FILE_UPLOAD_FAILED,
  payload: { error },
});

export const deleteStart = (): FileAction => ({ type: FILE_DELETE_START });
export const deleteSuccess = (id: string): FileAction => ({
  type: FILE_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): FileAction => ({
  type: FILE_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): FileAction => ({ type: FILE_RESTORE_START });
export const restoreSuccess = (file: FileEntity): FileAction => ({
  type: FILE_RESTORE_SUCCESS,
  payload: { file },
});
export const restoreFailed = (error: AppErrorDto): FileAction => ({
  type: FILE_RESTORE_FAILED,
  payload: { error },
});

export const clearFileError = (): FileAction => ({ type: FILE_CLEAR_ERROR });

// Thunks
export const getFilesThunk =
  (params?: FileQueryParams): FileThunk =>
  async (dispatch) => {
    dispatch(getFilesStart());
    try {
      const response = (await FileService.getFiles(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getFilesSuccess(response));
    } catch (error) {
      dispatch(getFilesFailed(parseError(error)));
    }
  };

export const getFileByIdThunk =
  (id: string): FileThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const file = (await FileService.getFileById(id)) ?? {
        id: '',
        fileName: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(getByIdSuccess(file));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const uploadFileThunk =
  (files: File[]): FileThunk =>
  async (dispatch) => {
    dispatch(uploadStart());
    try {
      const uploadedFiles = (await FileService.uploadFile(files)) ?? [];
      dispatch(uploadSuccess(uploadedFiles));
    } catch (error) {
      dispatch(uploadFailed(parseError(error)));
    }
  };

export const deleteFileThunk =
  (id: string): FileThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await FileService.deleteFile(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreFileThunk =
  (id: string): FileThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const file = (await FileService.restoreFile(id)) ?? {
        id: '',
        fileName: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(restoreSuccess(file));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
