-- Session Operating System — persist optional marketing opt-in.
-- Safe to run after 001_init.sql, even if the columns already exist.

alter table clients
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists marketing_consent_at timestamptz;
