/**
 * Date utilities for formatting and manipulating dates
 */

/**
 * Format a date to a specified format
 * @param date Date to format
 * @param format Format string (default: DD/MM/YYYY)
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  format: string = 'DD/MM/YYYY'
): string => {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return '';
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(2))
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Get relative time (e.g., "5 minutes ago", "2 days ago")
 * @param date The date to compare
 * @param baseDate The base date to compare with (default: now)
 * @returns Relative time string
 */
export const getRelativeTime = (
  date: Date | string | number,
  baseDate: Date | string | number = new Date()
): string => {
  const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
  const d = new Date(date);
  const baseDateObj = new Date(baseDate);
  
  const diffInSeconds = Math.floor((d.getTime() - baseDateObj.getTime()) / 1000);
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour');
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, 'day');
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, 'month');
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(diffInYears, 'year');
};

/**
 * Add time to a date
 * @param date The base date
 * @param amount The amount to add
 * @param unit The unit (day, month, year, hour, minute, second)
 * @returns New date
 */
export const addTime = (
  date: Date | string | number,
  amount: number,
  unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second'
): Date => {
  const d = new Date(date);
  
  switch (unit) {
    case 'day':
      d.setDate(d.getDate() + amount);
      break;
    case 'month':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'year':
      d.setFullYear(d.getFullYear() + amount);
      break;
    case 'hour':
      d.setHours(d.getHours() + amount);
      break;
    case 'minute':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'second':
      d.setSeconds(d.getSeconds() + amount);
      break;
  }
  
  return d;
};

/**
 * Check if a date is today
 * @param date The date to check
 * @returns Boolean indicating if date is today
 */
export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Get start of day (00:00:00)
 * @param date Input date
 * @returns Date object set to start of day
 */
export const startOfDay = (date: Date | string | number): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get end of day (23:59:59.999)
 * @param date Input date
 * @returns Date object set to end of day
 */
export const endOfDay = (date: Date | string | number): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};
