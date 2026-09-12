/**
 * Safe Environment Variable Accessor
 * Validates critical environment variables and provides sensible fallbacks for development.
 */

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  MONGODB_URI: process.env.MONGODB_URI || '',
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  /**
   * Diagnostic helper to check database configuration
   */
  hasValidMongoUri(): boolean {
    return Boolean(this.MONGODB_URI && this.MONGODB_URI.startsWith('mongodb'));
  },
} as const;
