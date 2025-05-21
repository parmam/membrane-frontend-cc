/**
 * Validates an email address
 * @param email Email to validate
 * @returns true if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  return Boolean(email && /\S+@\S+\.\S+/.test(email));
};

/**
 * Validates a password meets minimum requirements
 * @param password Password to validate
 * @param minLength Minimum required length (default: 1)
 * @returns true if password is valid, false otherwise
 */
export const validatePassword = (password: string, minLength = 1): boolean => {
  return Boolean(password && password.length >= minLength);
};

/**
 * Validates password confirmation matches the original password
 * @param password Original password
 * @param confirmPassword Confirmation password
 * @returns true if passwords match, false otherwise
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Validates business name
 * @param businessName Business name to validate
 * @returns true if business name is valid, false otherwise
 */
export const validateBusinessName = (businessName: string): boolean => {
  return Boolean(businessName && businessName.trim().length > 0);
};

/**
 * Validates phone number
 * @param phoneNumber Phone number to validate
 * @returns true if phone number is valid, false otherwise
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return Boolean(phoneNumber && /^\+?[0-9\s\-()]+$/.test(phoneNumber));
};

/**
 * Type for form validation errors
 */
export type ValidationErrors = {
  [key: string]: boolean;
};
