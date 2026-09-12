/**
 * Booking Domain Types
 */

export type ArtisanTier = 'Senior Stylist' | 'Master Stylist' | 'Creative Director';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingPayload {
  studio: string;
  service: string;
  tier?: ArtisanTier;
  date: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  specialRequests?: string;
}

export interface BookingDetails {
  bookingId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  studio: string;
  service: string;
  tier: ArtisanTier;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  details?: BookingDetails;
  error?: string;
}
