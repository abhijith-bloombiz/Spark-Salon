import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  studio: string;
  service: string;
  tier: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, required: true, unique: true },
    studio: { type: String, required: true },
    service: { type: String, required: true },
    tier: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    guestName: { type: String, required: true },
    guestPhone: { type: String, required: true },
    guestEmail: { type: String, required: true },
    specialRequests: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
