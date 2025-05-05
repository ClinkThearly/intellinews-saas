import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    console.error('Signature error', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object as Stripe.Checkout.Session;

    // find user by email
    const { data: user, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', s.customer_details?.email)
      .single();

    if (error) {
      console.error('User lookup failed', error);
    } else if (user) {
      await supabase.from('subscriptions').upsert({
        user_id: user.id,
        stripe_customer_id: s.customer as string,
        stripe_subscription_id: s.subscription as string,
        plan: 'pro',
        status: 'active',
        current_period_end: new Date(Number(s.expires_at) * 1000).toISOString()
      });
      console.log('✅ Subscriptions row saved for', user.id);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
