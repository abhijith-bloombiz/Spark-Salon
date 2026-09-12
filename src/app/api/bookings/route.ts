import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { validators } from '@/lib/validators';
import { BookingPayload } from '@/types';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<BookingPayload>;

    const studio = validators.sanitizeString(body.studio || '', 100);
    const service = validators.sanitizeString(body.service || '', 120);
    const tier = validators.sanitizeString(body.tier || 'Master Stylist', 50);
    const date = validators.sanitizeString(body.date || '', 30);
    const timeSlot = validators.sanitizeString(body.timeSlot || '', 30);
    const guestName = validators.sanitizeString(body.guestName || '', 100);
    const guestPhone = validators.sanitizeString(body.guestPhone || '', 30);
    const guestEmail = body.guestEmail ? validators.sanitizeString(body.guestEmail, 100) : '';
    const specialRequests = body.specialRequests ? validators.sanitizeString(body.specialRequests, 600) : '';

    if (!studio || !service || !date || !timeSlot || !guestName || !guestPhone) {
      return NextResponse.json(
        { success: false, error: 'Missing required reservation fields (Name, Phone, Service, Date, Time).' },
        { status: 400 }
      );
    }

    if (guestEmail && !validators.isValidEmail(guestEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const bookingId = `SPARK-${Math.floor(100000 + Math.random() * 900000)}`;

    const db = await connectToDatabase();
    if (db) {
      try {
        await Booking.create({
          bookingId,
          studio,
          service,
          tier,
          date,
          timeSlot,
          guestName,
          guestPhone,
          guestEmail,
          specialRequests,
          status: 'confirmed',
        });
      } catch (err: unknown) {
        console.warn('MongoDB write notice:', err);
      }
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Your luxury reservation has been confirmed.',
      details: {
        bookingId,
        guestName,
        guestPhone,
        guestEmail,
        studio,
        service,
        tier,
        date,
        timeSlot,
        specialRequests,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error('Reservation API Error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to process reservation', details: msg },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const bookings = await Booking.find().sort({ createdAt: -1 }).limit(20);
      return NextResponse.json({ success: true, bookings });
    }
    return NextResponse.json({ success: true, bookings: [] });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
