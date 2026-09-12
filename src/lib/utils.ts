/**
 * Utility functions for formatting, classNames, and string manipulation
 */

export function formatPhone(phone: string): string {
  // Strip non-digits except leading +
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned;
}

export function formatDateDisplay(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
