import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);   // ✅ no apiVersion

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig     = req.headers.get('stripe-signature')!;

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

  if (event.type === 'checkout.session.completed') {
    console.log('✅ Checkout complete');
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
