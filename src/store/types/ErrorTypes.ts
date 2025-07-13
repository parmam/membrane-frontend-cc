// src/store/types/ErrorTypes.ts

// Base error interface
export interface BaseErrorDto {
  message: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
}

// API Error Response structure
export interface ApiErrorResponseDto extends BaseErrorDto {
  error: string;
  details?: string[];
  validationErrors?: ValidationErrorDto[];
}

// Validation Error structure
export interface ValidationErrorDto {
  field: string;
  message: string;
  value?: string | number | boolean;
  constraint?: string;
}

// Network Error structure
export interface NetworkErrorDto extends BaseErrorDto {
  type: 'network' | 'timeout' | 'connection' | 'dns';
  url?: string;
  method?: string;
}

// Authentication Error structure
export interface AuthErrorDto extends BaseErrorDto {
  type: 'unauthorized' | 'forbidden' | 'token_expired' | 'invalid_credentials';
  redirectTo?: string;
}

// Business Logic Error structure
export interface BusinessErrorDto extends BaseErrorDto {
  type: 'not_found' | 'conflict' | 'validation' | 'business_rule';
  entity?: string;
  entityId?: string;
  code?: string;
}

// Generic Application Error
export interface ApplicationErrorDto extends BaseErrorDto {
  type: 'application' | 'system' | 'configuration' | 'unknown';
  stack?: string;
  component?: string;
  action?: string;
}

// Union type for all possible errors
export type AppErrorDto =
  | ApiErrorResponseDto
  | NetworkErrorDto
  | AuthErrorDto
  | BusinessErrorDto
  | ApplicationErrorDto;

// Error type guards
export function isApiError(error: AppErrorDto): error is ApiErrorResponseDto {
  return 'error' in error && typeof error.error === 'string';
}

export function isNetworkError(error: AppErrorDto): error is NetworkErrorDto {
  return 'type' in error && ['network', 'timeout', 'connection', 'dns'].includes(error.type);
}

export function isAuthError(error: AppErrorDto): error is AuthErrorDto {
  return (
    'type' in error &&
    ['unauthorized', 'forbidden', 'token_expired', 'invalid_credentials'].includes(error.type)
  );
}

export function isBusinessError(error: AppErrorDto): error is BusinessErrorDto {
  return (
    'type' in error && ['not_found', 'conflict', 'validation', 'business_rule'].includes(error.type)
  );
}

export function isApplicationError(error: AppErrorDto): error is ApplicationErrorDto {
  return (
    'type' in error && ['application', 'system', 'configuration', 'unknown'].includes(error.type)
  );
}

// Error parsing utility
export function parseError(error: unknown): AppErrorDto {
  // Handle Axios errors
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: any;
        statusText?: string;
      };
      request?: any;
      message?: string;
      code?: string;
    };

    if (axiosError.response) {
      const status = axiosError.response.status || 500;
      const data = axiosError.response.data || {};

      // Handle authentication errors
      if (status === 401) {
        return {
          message: data.message || 'Unauthorized access',
          statusCode: 401,
          type: 'unauthorized',
        } as AuthErrorDto;
      }

      // Handle forbidden errors
      if (status === 403) {
        return {
          message: data.message || 'Access forbidden',
          statusCode: 403,
          type: 'forbidden',
        } as AuthErrorDto;
      }

      // Handle not found errors
      if (status === 404) {
        return {
          message: data.message || 'Resource not found',
          statusCode: 404,
          type: 'not_found',
          entity: data.entity,
        } as BusinessErrorDto;
      }

      // Handle validation errors
      if (status === 422) {
        return {
          message: data.message || 'Validation failed',
          statusCode: 422,
          error: data.error || 'Validation Error',
          validationErrors: data.validationErrors || [],
        } as ApiErrorResponseDto;
      }

      // Handle conflict errors
      if (status === 409) {
        return {
          message: data.message || 'Conflict occurred',
          statusCode: 409,
          type: 'conflict',
        } as BusinessErrorDto;
      }

      // Handle server errors
      if (status >= 500) {
        return {
          message: data.message || 'Internal server error',
          statusCode: status,
          error: data.error || 'Server Error',
        } as ApiErrorResponseDto;
      }

      // Generic API error
      return {
        message: data.message || axiosError.response.statusText || 'Request failed',
        statusCode: status,
        error: data.error || 'API Error',
      } as ApiErrorResponseDto;
    }

    // Handle network errors
    if (axiosError.request) {
      return {
        message: 'Network error or no response received',
        type: 'network',
        url: axiosError.request.responseURL,
      } as NetworkErrorDto;
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      type: 'application',
      stack: error.stack,
    } as ApplicationErrorDto;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      type: 'application',
    } as ApplicationErrorDto;
  }

  // Handle unknown error types
  return {
    message: 'An unknown error occurred',
    type: 'unknown',
  } as ApplicationErrorDto;
}

// Error message extraction utility
export function getErrorMessage(error: AppErrorDto): string {
  if (isApiError(error) && error.validationErrors?.length) {
    return error.validationErrors.map((ve) => ve.message).join(', ');
  }
  return error.message;
}

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export function getErrorSeverity(error: AppErrorDto): ErrorSeverity {
  if (isAuthError(error)) {
    return error.type === 'unauthorized' ? 'high' : 'medium';
  }

  if (isNetworkError(error)) {
    return 'high';
  }

  if (isBusinessError(error)) {
    return error.type === 'not_found' ? 'medium' : 'high';
  }

  if (isApiError(error)) {
    const status = error.statusCode || 500;
    if (status >= 500) return 'critical';
    if (status >= 400) return 'high';
    return 'medium';
  }

  return 'medium';
}
