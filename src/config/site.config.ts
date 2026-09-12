/**
 * Site Configuration & Business Metadata
 * Central single source of truth for salon business coordinates,
 * opening hours, contact details, social media, and SEO defaults.
 */

export const SITE_CONFIG = {
  name: 'BYJU SPARK INTERNATIONAL SALON & SPA',
  shortName: 'Spark Salon',
  tagline: 'Beauty Creates Confidence',
  description:
    'Experience haute-couture hair, clinical skin therapies, regal bridal couture, Russian dry apex manicures, and holistic balinese spa wellness in Kozhikode, Kerala.',
  url: 'https://sparksalon.com',
  ogImage: '/images/og-spark-luxury.jpg',
  establishedYear: 1976,

  // Direct Coordinates & Contact
  contact: {
    phone: '+91 8543097899',
    phoneSecondary: '+91 98765 43210',
    email: 'byjuspark@gmail.com',
    address: {
      street: 'Mavoor Rd, Kottooli',
      city: 'Kozhikode',
      state: 'Kerala',
      postalCode: '673016',
      country: 'India',
      full: 'Mavoor Rd, Kottooli, Kozhikode, Kerala 673016',
    },
    hours: 'Mon - Sun, 09am - 09 pm',
    whatsapp: '918543097899',
  },

  // Social Media Links
  socials: {
    instagram: 'https://instagram.com/byjuspark',
    facebook: 'https://facebook.com/byjuspark',
    whatsapp: 'https://wa.me/918543097899',
    youtube: 'https://youtube.com/@byjuspark',
  },

  // SEO & Keywords
  keywords: [
    'Spark Salon Kozhikode',
    'Byju Spark International Salon',
    'Luxury Salon Calicut',
    'Haute Couture Hair Salon Kerala',
    'Bridal Makeover Kozhikode',
    'Russian Dry Manicure Calicut',
    'Balinese Spa Kerala',
    'Best Hair Stylist Kozhikode',
    'Dermalogica Skin Clinic Kerala',
    'Tattoo Art Studio Calicut',
  ],
} as const;

export type SiteConfig = typeof SITE_CONFIG;
