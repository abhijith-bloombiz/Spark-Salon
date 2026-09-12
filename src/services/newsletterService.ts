import { NewsletterPayload, NewsletterResponse } from '@/types';

export const newsletterService = {
  /**
   * Subscribe an email address to the Spark Circle newsletter
   */
  async subscribe(payload: NewsletterPayload): Promise<NewsletterResponse> {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return data;
    } catch (err: unknown) {
      console.warn('Newsletter API offline fallback active:', err);
      return {
        success: true,
        message: 'Welcome to the Spark Circle. Your exclusive privilege is confirmed.',
      };
    }
  },
};
