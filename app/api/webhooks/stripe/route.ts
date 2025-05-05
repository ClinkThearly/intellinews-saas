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
    const s     = event.data.object as Stripe.Checkout.Session;
    const email = s.customer_details?.email;
    if (!email) return NextResponse.json({ received: true }, { status: 200 });

    /* 1. ensure an Auth user exists */
    let { data: user } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (!user) {
      // create auth user (no email invite)
      const { data: authUser, error: authErr } =
        await supabase.auth.admin.createUser({ email, email_confirm: true });
      if (authErr || !authUser) {
        console.error('Auth user create failed', authErr);
        return NextResponse.json({ received: true }, { status: 200 });
      }
      // add profile row with the same id
      await supabase.from('profiles').insert({ id: authUser.id, email });
      user = { id: authUser.id };
    }

    /* 2. upsert subscription */
    await supabase.from('subscriptions').upsert({
      user_id: user.id,
      stripe_customer_id: s.customer as string,
      stripe_subscription_id: s.subscription as string,
      plan: 'pro',
      status: 'active',
      current_period_end: new Date(Number(s.expires_at) * 1000).toISOString()
    });

    console.log('✅ Subscription saved for', user.id);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
