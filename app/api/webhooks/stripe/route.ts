import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  /* 1. grab the raw text body (Edge runtime safe) */
  const payload = await req.text();
  const sig     = req.headers.get('stripe-signature')!;

  /* 2. verify signature */
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('⚠️  Signature or payload error', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  /* 3. handle the event(s) you care about */
  if (event.type === 'checkout.session.completed') {
    console.log('✅ Checkout complete');
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
