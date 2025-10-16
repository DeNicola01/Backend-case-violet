/**
 * Formats a Date object to YYYY-MM-DD string without timezone issues
 * @param date - The Date object to format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a date string from API (YYYY-MM-DD) to a Date object without timezone issues
 * @param dateString - The date string in YYYY-MM-DD format
 * @returns Date object with local timezone
 */
export function parseDateFromAPI(dateString: string): Date {
  if (!dateString) {
    return new Date();
  }
  
  // Handle different date formats that might come from the API
  let cleanDateString = dateString;
  
  // If it contains 'T' (ISO format), extract just the date part
  if (dateString.includes('T')) {
    cleanDateString = dateString.split('T')[0];
  }
  
  const parts = cleanDateString.split('-');
  if (parts.length !== 3) {
    console.warn('Invalid date format:', dateString);
    return new Date();
  }
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  // Validate the parsed values
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    console.warn('Invalid date values:', { year, month, day });
    return new Date();
  }
  
  const date = new Date(year, month - 1, day);
  
  // Validate the created date
  if (isNaN(date.getTime())) {
    console.warn('Created invalid date from:', { year, month, day });
    return new Date();
  }
  
  return date;
}
