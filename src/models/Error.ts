export interface Error {
  message: string;
  code: string;
}

export interface HttpError extends Error {
  status: number;
}

export interface FieldError extends Error {
  name: string;
}
