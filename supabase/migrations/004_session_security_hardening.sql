-- Session MVP security hardening.
-- The current MVP writes through n8n with the Supabase service role.
-- Browser clients should not read clients, cases or credit data directly.

alter table clients enable row level security;
alter table cases enable row level security;
alter table client_preferences enable row level security;
alter table credit_purchases enable row level security;
alter table credit_ledger enable row level security;

drop view if exists client_credit_balances;

create view client_credit_balances
with (security_invoker = true) as
select
  c.id as client_id,
  c.email,
  c.name,
  coalesce(sum(l.credits_delta), 0)::integer as credits_balance,
  max(l.created_at) as last_credit_activity_at
from clients c
left join credit_ledger l on l.client_id = c.id
group by c.id, c.email, c.name;
