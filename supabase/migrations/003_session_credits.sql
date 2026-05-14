-- Session credits MVP.
-- Stores Stripe purchases, credit movements and client preferences for internal use.

create table if not exists client_preferences (
  client_id uuid primary key references clients(id) on delete cascade,
  communication_preferences jsonb not null default '{}'::jsonb,
  usage_preferences jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists credit_purchases (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  provider text not null default 'stripe',
  provider_customer_id text,
  provider_checkout_session_id text unique,
  provider_payment_intent_id text,
  product_family text not null default 'executive_sparring',
  product text not null default 'session',
  package_key text not null,
  credits_purchased integer not null check (credits_purchased > 0),
  amount_total integer not null check (amount_total >= 0),
  currency text not null default 'eur',
  status text not null default 'completed',
  purchased_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists credit_ledger (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  purchase_id uuid references credit_purchases(id) on delete set null,
  case_id uuid references cases(case_id) on delete set null,
  entry_type text not null check (entry_type in ('purchase', 'redeem', 'adjustment', 'transfer')),
  credits_delta integer not null check (credits_delta <> 0),
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists credit_purchases_client_idx
  on credit_purchases(client_id);

create index if not exists credit_purchases_provider_checkout_idx
  on credit_purchases(provider_checkout_session_id);

create index if not exists credit_ledger_client_idx
  on credit_ledger(client_id);

create index if not exists credit_ledger_case_idx
  on credit_ledger(case_id);

create or replace view client_credit_balances as
select
  c.id as client_id,
  c.email,
  c.name,
  coalesce(sum(l.credits_delta), 0)::integer as credits_balance,
  max(l.created_at) as last_credit_activity_at
from clients c
left join credit_ledger l on l.client_id = c.id
group by c.id, c.email, c.name;

create trigger client_preferences_updated_at
  before update on client_preferences
  for each row execute function set_updated_at();

create trigger credit_purchases_updated_at
  before update on credit_purchases
  for each row execute function set_updated_at();
