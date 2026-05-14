-- Session Operating System — initial schema
-- Slice 1: cases + clients, no RLS yet (service-role only).
-- RLS policies land in 002_rls_policies.sql with Slice 3.

create extension if not exists "uuid-ossp";

create type session_status as enum (
  'Brief received',
  'Prepared',
  'Session complete',
  'Summary in review',
  'Update available',
  'Archived'
);

create type session_mode as enum ('offline', 'live', 'online');

create type capture_source as enum (
  'voice_memo',
  'google_meet_transcript',
  'manual_notes'
);

create table clients (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text not null,
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  created_at timestamptz not null default now()
);

create table cases (
  case_id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  case_title text not null,
  case_brief jsonb not null,
  session_date timestamptz,
  session_mode session_mode,
  capture_source capture_source,
  status session_status not null default 'Brief received',
  prep_doc_url text,
  summary_doc_url text,
  summary_pdf_url text,
  portal_update_url text,
  source_retention_until date,
  approved_by_raphael boolean not null default false,
  approved_at timestamptz,
  next_step text,
  open_risk text,
  needs_human_decision boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cases_client_idx on cases(client_id);
create index cases_status_idx on cases(status);

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger cases_updated_at
  before update on cases
  for each row execute function set_updated_at();
