/**
 * Newsletter Types
 */

export interface NewsletterPayload {
  email: string;
}

export interface NewsletterResponse {
  success: boolean;
  message?: string;
  error?: string;
}
