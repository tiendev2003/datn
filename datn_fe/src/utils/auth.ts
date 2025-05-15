/**
 * Authentication and validation utility functions
 */

/**
 * Validates an email address
 * @param email Email address to validate
 * @returns True if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password according to strength requirements
 * @param password Password to validate
 * @returns Object containing validation result and any error messages
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 8 ký tự.' };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa.' };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ cái viết thường.' };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ số.' };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!, @, #, $, %, v.v...).' };
  }
  
  return { isValid: true, message: 'Mật khẩu hợp lệ.' };
};

/**
 * Validates a Vietnamese phone number
 * @param phone Phone number to validate
 * @returns True if phone number is valid, false otherwise
 */
export const isValidVietnamesePhone = (phone: string): boolean => {
  // Vietnamese phone number format: 10 digits starting with 0
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
  return phoneRegex.test(phone);
};

/**
 * Calculates password strength as a percentage
 * @param password Password to evaluate
 * @returns Strength as a number from 0-100
 */
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution (up to 25%)
  strength += Math.min(25, Math.floor(password.length * 2.5));
  
  // Complexity contribution (up to 75%)
  if (/[A-Z]/.test(password)) strength += 15; // uppercase
  if (/[a-z]/.test(password)) strength += 15; // lowercase
  if (/[0-9]/.test(password)) strength += 15; // numbers
  if (/[^A-Za-z0-9]/.test(password)) strength += 15; // special chars
  
  // Variety of characters (up to 15%)
  const uniqueChars = new Set(password).size;
  strength += Math.min(15, uniqueChars * 2);
  
  // Cap at 100%
  return Math.min(100, strength);
};

/**
 * Gets a color indicator based on password strength
 * @param strength Password strength (0-100)
 * @returns Color code for UI
 */
export const getPasswordStrengthColor = (strength: number): string => {
  if (strength < 30) return 'red';
  if (strength < 60) return 'orange';
  if (strength < 80) return 'yellow';
  return 'green';
};

/**
 * Safely stores an authentication token in localStorage
 * @param token JWT token to store
 */
export const storeAuthToken = (token: string): void => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

/**
 * Retrieves the stored authentication token
 * @returns The stored token or null if not found
 */
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

/**
 * Removes the stored authentication token
 */
export const removeAuthToken = (): void => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

/**
 * Parses a JWT token to get the expiration time
 * @param token JWT token to parse
 * @returns Expiration timestamp in seconds, or null if invalid
 */
export const getTokenExpiration = (token: string): number | null => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.exp;
  } catch {
    return null;
  }
}

/**
 * Checks if a token is expired
 * @param token JWT token to check
 * @returns True if token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  
  const now = Math.floor(Date.now() / 1000);
  return expiration < now;
};
