create extension if not exists pgcrypto;

create table if not exists public.wedding_guests (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  name text not null,
  photo_path text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references public.wedding_guests(id) on delete set null,
  guest_token text not null,
  guest_name text not null,
  attendance text not null check (attendance in ('yes', 'no', 'unsure')),
  drinks text[] not null default '{}',
  allergens text not null default '',
  menu_notes text not null default '',
  song text not null default '',
  message text not null default '',
  user_agent text not null default '',
  submitted_at timestamptz not null default now()
);

create index if not exists wedding_rsvps_guest_token_idx on public.wedding_rsvps (guest_token);
create index if not exists wedding_rsvps_guest_id_idx on public.wedding_rsvps (guest_id);
create index if not exists wedding_rsvps_submitted_at_idx on public.wedding_rsvps (submitted_at desc);

alter table public.wedding_guests enable row level security;
alter table public.wedding_rsvps enable row level security;

create policy "Service role can manage wedding guests"
  on public.wedding_guests
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage wedding rsvps"
  on public.wedding_rsvps
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values ('guest-photos', 'guest-photos', true)
on conflict (id) do nothing;

create policy "Public can read guest photos"
  on storage.objects
  for select
  using (bucket_id = 'guest-photos');

create policy "Service role can manage guest photos"
  on storage.objects
  for all
  using (bucket_id = 'guest-photos' and auth.role() = 'service_role')
  with check (bucket_id = 'guest-photos' and auth.role() = 'service_role');

insert into public.wedding_guests (token, name)
values ('demo-aigul-evgeniy', 'дорогой гость')
on conflict (token) do update
set name = excluded.name,
    updated_at = now();
