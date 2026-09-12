/**
 * Common Application Types
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatar: string;
  role?: string;
  rating: number;
}
