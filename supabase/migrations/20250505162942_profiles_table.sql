create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
