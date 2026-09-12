import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { validators } from '@/lib/validators';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const rawEmail = typeof data.email === 'string' ? data.email : '';

    if (!rawEmail || !validators.isValidEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const email = rawEmail.toLowerCase().trim();

    const db = await connectToDatabase();
    if (db) {
      try {
        await Subscriber.findOneAndUpdate(
          { email },
          { active: true, subscribedAt: new Date() },
          { upsert: true, new: true }
        );
      } catch (err: unknown) {
        console.warn('MongoDB subscriber write notice:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome to the inner circle of Spark International.',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
