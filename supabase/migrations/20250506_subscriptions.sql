create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null,
  plan text not null,
  status text not null,
  current_period_end timestamptz not null,
  created_at timestamptz default now()
);
alter table subscriptions enable row level security;
