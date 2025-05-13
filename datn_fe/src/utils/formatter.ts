/**
 * Formatter utilities for formatting various data types
 */

/**
 * Format a number as currency
 * @param value The number to format
 * @param currency The currency code (default: 'VND')
 * @param locale The locale (default: 'vi-VN')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  currency: string = 'VND',
  locale: string = 'vi-VN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a number with thousand separators
 * @param value The number to format
 * @param locale The locale (default: 'vi-VN')
 * @returns Formatted number string
 */
export const formatNumber = (
  value: number,
  locale: string = 'vi-VN'
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format a percentage
 * @param value The number to format as percentage
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Capitalize the first letter of a string
 * @param text The text to capitalize
 * @returns Capitalized text
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param text The text to truncate
 * @param maxLength Maximum allowed length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text || text.length <= maxLength) return text || '';
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Format a phone number to standard format (0xx) xxxx-xxx
 * @param phone The phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if not standard format
};
