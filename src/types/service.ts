/**
 * Salon Service & Studio Types
 */

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  benefits: string[];
}

export interface SalonCategory {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  iconName: string;
  coverImage: string;
  items: ServiceItem[];
}

export interface StudioBadgeItem {
  id: string;
  name: string;
  iconSvg?: React.ReactNode;
  anchorId: string;
}
