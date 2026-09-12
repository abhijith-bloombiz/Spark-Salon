/**
 * Input Validators and Payload Sanitizers
 */

export const validators = {
  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  },

  isValidPhone(phone: string): boolean {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
  },

  sanitizeString(str: string, maxLength = 500): string {
    return str
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, ''); // Basic XSS mitigation
  },
};
