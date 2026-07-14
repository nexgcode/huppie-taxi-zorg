create extension if not exists pgcrypto;

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'handled')),
  name text not null,
  email text not null,
  phone text not null default '',
  message text not null,
  telegram_notified_at timestamptz,
  telegram_notification_error text
);

create table public.ride_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'handled')),
  first_name text not null,
  last_name text not null,
  birth_date date not null,
  email text not null,
  phone text not null,
  insurer text not null,
  has_transport_authorisation boolean not null,
  authorisation_number text,
  contact_consent boolean not null default false,
  telegram_notified_at timestamptz,
  telegram_notification_error text,
  constraint ride_requests_authorisation_check check (
    (has_transport_authorisation and nullif(authorisation_number, '') is not null and not contact_consent)
    or (not has_transport_authorisation and authorisation_number is null)
  )
);

create table public.partner_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'handled')),
  email text not null,
  appointment_date date not null,
  appointment_time time not null,
  telegram_notified_at timestamptz,
  telegram_notification_error text
);

create table public.driver_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'handled')),
  name text not null,
  company text not null,
  phone text not null,
  email text not null,
  kvk_number text not null,
  tx_certificate boolean not null,
  license_plate text not null,
  vehicle text not null,
  terms_accepted_at timestamptz not null default now(),
  telegram_notified_at timestamptz,
  telegram_notification_error text
);

create table public.driver_application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.driver_applications(id) on delete cascade,
  created_at timestamptz not null default now(),
  document_type text not null check (document_type in ('driver_license', 'driver_card')),
  object_path text not null unique,
  original_filename text not null,
  content_type text not null,
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760)
);

create index contact_submissions_status_created_at_idx on public.contact_submissions (status, created_at desc);
create index ride_requests_status_created_at_idx on public.ride_requests (status, created_at desc);
create index partner_requests_status_created_at_idx on public.partner_requests (status, created_at desc);
create index driver_applications_status_created_at_idx on public.driver_applications (status, created_at desc);
create index driver_application_documents_application_id_idx on public.driver_application_documents (application_id);

alter table public.contact_submissions enable row level security;
alter table public.ride_requests enable row level security;
alter table public.partner_requests enable row level security;
alter table public.driver_applications enable row level security;
alter table public.driver_application_documents enable row level security;

revoke all on table public.contact_submissions, public.ride_requests, public.partner_requests, public.driver_applications, public.driver_application_documents from anon, authenticated;

grant select on table public.contact_submissions to authenticated;
grant select on table public.ride_requests to authenticated;
grant select on table public.partner_requests to authenticated;
grant select on table public.driver_applications to authenticated;
grant select on table public.driver_application_documents to authenticated;

create policy "Authenticated users can read contact submissions"
on public.contact_submissions for select to authenticated
using (true);

create policy "Authenticated users can read ride requests"
on public.ride_requests for select to authenticated
using (true);

create policy "Authenticated users can read partner requests"
on public.partner_requests for select to authenticated
using (true);

create policy "Authenticated users can read driver applications"
on public.driver_applications for select to authenticated
using (true);

create policy "Authenticated users can read driver documents"
on public.driver_application_documents for select to authenticated
using (true);

create policy "Authenticated users can update contact submissions"
on public.contact_submissions for update to authenticated
using (true)
with check (true);

create policy "Authenticated users can update ride requests"
on public.ride_requests for update to authenticated
using (true)
with check (true);

create policy "Authenticated users can update partner requests"
on public.partner_requests for update to authenticated
using (true)
with check (true);

create policy "Authenticated users can update driver applications"
on public.driver_applications for update to authenticated
using (true)
with check (true);
