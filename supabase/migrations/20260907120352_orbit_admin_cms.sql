-- Orbit Admin CMS schema, policies, storage, and seed content.
create extension if not exists pgcrypto;
create extension if not exists pg_cron;
create extension if not exists pg_net;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.editorial_posts (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('blog', 'research', 'product_update')),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 180),
  excerpt text not null check (char_length(excerpt) between 10 and 500),
  body jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  cover_image_path text,
  seo_title text,
  seo_description text,
  author_name text not null default 'Orbit AI',
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'expired', 'archived')),
  publish_at timestamptz,
  unpublish_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, slug),
  check (status not in ('scheduled','published') or publish_at is not null),
  check (unpublish_at is null or publish_at is null or unpublish_at > publish_at)
);

create table public.homepage_notices (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('announcement', 'service', 'discount')),
  title text not null check (char_length(title) between 2 and 120),
  message text not null check (char_length(message) between 2 and 280),
  cta_label text,
  cta_url text,
  discount_code text,
  priority integer not null default 0 check (priority between 0 and 100),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'expired', 'archived')),
  publish_at timestamptz,
  unpublish_at timestamptz,
  countdown_end timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((cta_label is null and cta_url is null) or (cta_label is not null and cta_url is not null)),
  check (status not in ('scheduled','published') or publish_at is not null),
  check (unpublish_at is null or publish_at is null or unpublish_at > publish_at),
  check (kind <> 'discount' or countdown_end is not null)
);

create table public.service_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 160),
  message text not null check (char_length(message) between 3 and 1000),
  service_name text not null default 'Orbit AI',
  incident_status text not null check (incident_status in ('investigating', 'identified', 'monitoring', 'resolved', 'maintenance')),
  severity text not null default 'minor' check (severity in ('info', 'minor', 'major', 'critical')),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'expired', 'archived')),
  publish_at timestamptz,
  resolved_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status not in ('scheduled','published') or publish_at is not null)
);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 160),
  department text not null,
  location text not null,
  employment_type text not null check (employment_type in ('full_time', 'part_time', 'contract', 'internship', 'temporary')),
  workplace_type text not null check (workplace_type in ('onsite', 'hybrid', 'remote')),
  summary text not null check (char_length(summary) between 10 and 500),
  description jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'expired', 'archived')),
  publish_at timestamptz,
  close_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status not in ('scheduled','published') or publish_at is not null),
  check (close_at is null or publish_at is null or close_at > publish_at)
);

create table public.job_questions (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  prompt text not null check (char_length(prompt) between 2 and 300),
  input_type text not null check (input_type in ('short_text', 'long_text', 'select', 'boolean')),
  options jsonb not null default '[]'::jsonb,
  required boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  check (jsonb_typeof(options) = 'array')
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete restrict,
  full_name text not null check (char_length(full_name) between 2 and 160),
  email text not null,
  email_normalized text not null,
  location text not null,
  linkedin_url text,
  portfolio_url text,
  cover_note text,
  cv_path text not null,
  consent_at timestamptz not null,
  workflow_status text not null default 'new' check (workflow_status in ('new', 'reviewing', 'interview', 'rejected', 'hired', 'withdrawn')),
  internal_notes text,
  submitted_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  retention_delete_at timestamptz not null default (now() + interval '6 months'),
  unique(job_id, email_normalized)
);

create table public.application_answers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  question_id uuid not null references public.job_questions(id) on delete restrict,
  answer jsonb not null,
  unique(application_id, question_id)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  alt_text text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  record_type text not null,
  record_id uuid,
  before_summary jsonb,
  after_summary jsonb,
  created_at timestamptz not null default now()
);

create table public.application_rate_limits (
  key_hash text primary key,
  attempts integer not null default 1,
  window_started_at timestamptz not null default now()
);

create index editorial_publication_idx on public.editorial_posts(kind, status, publish_at desc);
create index notices_publication_idx on public.homepage_notices(status, priority desc, publish_at desc);
create index service_updates_publication_idx on public.service_updates(status, publish_at desc);
create index jobs_publication_idx on public.jobs(status, publish_at desc);
create index applications_retention_idx on public.applications(retention_delete_at) where workflow_status <> 'hired';
create index application_answers_application_idx on public.application_answers(application_id);

create or replace function private.is_admin_aal2()
returns boolean language sql stable security invoker set search_path = '' as $$
  select coalesce((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
    and coalesce((select auth.jwt() ->> 'aal') = 'aal2', false);
$$;
revoke all on function private.is_admin_aal2() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin_aal2() to authenticated;

create or replace function private.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;
revoke all on function private.set_updated_at() from public;

create or replace function private.record_audit_event()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  old_value jsonb;
  new_value jsonb;
  target_id uuid;
begin
  old_value := case when tg_op = 'INSERT' then null else to_jsonb(old) - array['body','description','internal_notes','email','email_normalized','cover_note','cv_path'] end;
  new_value := case when tg_op = 'DELETE' then null else to_jsonb(new) - array['body','description','internal_notes','email','email_normalized','cover_note','cv_path'] end;
  target_id := case when tg_op = 'DELETE' then old.id else new.id end;
  insert into public.audit_events(actor_id, action, record_type, record_id, before_summary, after_summary)
  values (auth.uid(), tg_op, tg_table_name, target_id, old_value, new_value);
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
revoke all on function private.record_audit_event() from public, anon, authenticated;

create trigger editorial_updated before update on public.editorial_posts for each row execute function private.set_updated_at();
create trigger notices_updated before update on public.homepage_notices for each row execute function private.set_updated_at();
create trigger service_updated before update on public.service_updates for each row execute function private.set_updated_at();
create trigger jobs_updated before update on public.jobs for each row execute function private.set_updated_at();
create trigger editorial_audit after insert or update or delete on public.editorial_posts for each row execute function private.record_audit_event();
create trigger notices_audit after insert or update or delete on public.homepage_notices for each row execute function private.record_audit_event();
create trigger service_audit after insert or update or delete on public.service_updates for each row execute function private.record_audit_event();
create trigger jobs_audit after insert or update or delete on public.jobs for each row execute function private.record_audit_event();
create trigger questions_audit after insert or update or delete on public.job_questions for each row execute function private.record_audit_event();
create trigger applications_audit after update or delete on public.applications for each row execute function private.record_audit_event();
create trigger media_audit after insert or delete on public.media_assets for each row execute function private.record_audit_event();

alter table public.editorial_posts enable row level security;
alter table public.homepage_notices enable row level security;
alter table public.service_updates enable row level security;
alter table public.jobs enable row level security;
alter table public.job_questions enable row level security;
alter table public.applications enable row level security;
alter table public.application_answers enable row level security;
alter table public.media_assets enable row level security;
alter table public.audit_events enable row level security;
alter table public.application_rate_limits enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select on public.editorial_posts, public.homepage_notices, public.service_updates, public.jobs, public.job_questions to anon, authenticated;
grant select, insert, update, delete on public.editorial_posts, public.homepage_notices, public.service_updates, public.jobs, public.job_questions, public.applications, public.application_answers, public.media_assets to authenticated;
grant select on public.audit_events to authenticated;
grant usage, select on sequence public.audit_events_id_seq to authenticated;

create policy editorial_public_read on public.editorial_posts for select to anon, authenticated
using (status in ('published','scheduled') and publish_at <= now() and (unpublish_at is null or unpublish_at > now()));
create policy notices_public_read on public.homepage_notices for select to anon, authenticated
using (status in ('published','scheduled') and publish_at <= now() and (unpublish_at is null or unpublish_at > now()));
create policy service_public_read on public.service_updates for select to anon, authenticated
using (status in ('published','scheduled') and publish_at <= now());
create policy jobs_public_read on public.jobs for select to anon, authenticated
using (status in ('published','scheduled') and publish_at <= now() and (close_at is null or close_at > now()));
create policy questions_public_read on public.job_questions for select to anon, authenticated
using (exists (select 1 from public.jobs j where j.id = job_id and j.status in ('published','scheduled') and j.publish_at <= now() and (j.close_at is null or j.close_at > now())));

create policy editorial_admin_select on public.editorial_posts for select to authenticated using (private.is_admin_aal2());
create policy editorial_admin_insert on public.editorial_posts for insert to authenticated with check (private.is_admin_aal2());
create policy editorial_admin_update on public.editorial_posts for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy editorial_admin_delete on public.editorial_posts for delete to authenticated using (private.is_admin_aal2());
create policy notices_admin_select on public.homepage_notices for select to authenticated using (private.is_admin_aal2());
create policy notices_admin_insert on public.homepage_notices for insert to authenticated with check (private.is_admin_aal2());
create policy notices_admin_update on public.homepage_notices for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy notices_admin_delete on public.homepage_notices for delete to authenticated using (private.is_admin_aal2());
create policy service_admin_select on public.service_updates for select to authenticated using (private.is_admin_aal2());
create policy service_admin_insert on public.service_updates for insert to authenticated with check (private.is_admin_aal2());
create policy service_admin_update on public.service_updates for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy service_admin_delete on public.service_updates for delete to authenticated using (private.is_admin_aal2());
create policy jobs_admin_select on public.jobs for select to authenticated using (private.is_admin_aal2());
create policy jobs_admin_insert on public.jobs for insert to authenticated with check (private.is_admin_aal2());
create policy jobs_admin_update on public.jobs for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy jobs_admin_delete on public.jobs for delete to authenticated using (private.is_admin_aal2());
create policy questions_admin_select on public.job_questions for select to authenticated using (private.is_admin_aal2());
create policy questions_admin_insert on public.job_questions for insert to authenticated with check (private.is_admin_aal2());
create policy questions_admin_update on public.job_questions for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy questions_admin_delete on public.job_questions for delete to authenticated using (private.is_admin_aal2());
create policy applications_admin_select on public.applications for select to authenticated using (private.is_admin_aal2());
create policy applications_admin_update on public.applications for update to authenticated using (private.is_admin_aal2()) with check (private.is_admin_aal2());
create policy applications_admin_delete on public.applications for delete to authenticated using (private.is_admin_aal2());
create policy answers_admin_select on public.application_answers for select to authenticated using (private.is_admin_aal2());
create policy answers_admin_delete on public.application_answers for delete to authenticated using (private.is_admin_aal2());
create policy media_admin_select on public.media_assets for select to authenticated using (private.is_admin_aal2());
create policy media_admin_insert on public.media_assets for insert to authenticated with check (private.is_admin_aal2());
create policy media_admin_delete on public.media_assets for delete to authenticated using (private.is_admin_aal2());
create policy audit_admin_select on public.audit_events for select to authenticated using (private.is_admin_aal2());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('content-media', 'content-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif']),
  ('candidate-cvs', 'candidate-cvs', false, 10485760, array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy content_media_admin_insert on storage.objects for insert to authenticated
with check (bucket_id = 'content-media' and private.is_admin_aal2());
create policy content_media_admin_update on storage.objects for update to authenticated
using (bucket_id = 'content-media' and private.is_admin_aal2()) with check (bucket_id = 'content-media' and private.is_admin_aal2());
create policy content_media_admin_select on storage.objects for select to authenticated
using (bucket_id in ('content-media','candidate-cvs') and private.is_admin_aal2());
create policy content_media_admin_delete on storage.objects for delete to authenticated
using (bucket_id in ('content-media','candidate-cvs') and private.is_admin_aal2());

insert into public.editorial_posts (kind, slug, title, excerpt, body, status, publish_at)
values
('blog','why-we-are-building-pulsar','Why We Are Building Pulsar','Ambition needs honest labels. Pulsar connects long-term model research to the Orbit workspace without pretending research is a released product.', '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ambition with honest labels"}]},{"type":"paragraph","content":[{"type":"text","text":"Pulsar exists because model capability, infrastructure, and access deserve deeper work. That ambition only means something when Research, Prototype, Planned, and Available are kept distinct."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Connection to the workspace"}]},{"type":"paragraph","content":[{"type":"text","text":"The workspace gives research a practical question: does this help someone understand, create, verify, or execute work more effectively?"}]}]}'::jsonb,'published',now()),
('blog','how-we-think-about-trust-in-ai','How We Think About Trust in AI','Trust grows from transparent limits, careful access, and systems that keep people responsible for consequential decisions.', '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Transparency"}]},{"type":"paragraph","content":[{"type":"text","text":"Capabilities and status labels should tell a person what is available, what depends on another service, and what remains research."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Privacy and security"}]},{"type":"paragraph","content":[{"type":"text","text":"Access should follow the work, credentials should remain private, and deletion or revocation controls should be understandable."}]}]}'::jsonb,'published',now()),
('blog','building-ai-systems-that-work-with-people','Building AI Systems That Work With People','The useful question is not whether AI can act alone, but where people need context, review, and control.', '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Human oversight"}]},{"type":"paragraph","content":[{"type":"text","text":"People define the goal, grant permissions, and remain responsible for decisions that affect others."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Review by default"}]},{"type":"paragraph","content":[{"type":"text","text":"Agent steps, sources, tool actions, and final outputs should be available for inspection when the stakes warrant it."}]}]}'::jsonb,'published',now()),
('blog','inside-orbit-ais-ai-architecture','Inside Orbit AI’s AI Architecture','A composable architecture separates workspace context, model access, agents, tools, and execution environments.', '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Composable tools"}]},{"type":"paragraph","content":[{"type":"text","text":"Focused components make it easier to constrain, observe, and replace a capability without obscuring the whole system."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Reliability"}]},{"type":"paragraph","content":[{"type":"text","text":"Useful failures are explicit: authentication, quota, validation, permissions, provider access, and execution errors need different responses."}]}]}'::jsonb,'published',now()),
('blog','the-future-of-ai-and-robotics','The Future of AI and Robotics','Moving from generated intelligence to physical action raises the standard for supervision, testing, and truthful product status.', '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"From intelligence to action"}]},{"type":"paragraph","content":[{"type":"text","text":"Physical systems turn a model suggestion into motion, energy, and real-world consequences. Interfaces must account for that difference."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Safety and supervision"}]},{"type":"paragraph","content":[{"type":"text","text":"Bounded tests, clear overrides, observable state, and conservative failure behavior belong at the center of robotics research."}]}]}'::jsonb,'published',now()),
('research','trajectory-reasoning','Trajectory reasoning','How agents form, revise, and explain plans across long, uncertain tasks.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Orbit studies how agents form, revise, and explain plans across long, uncertain tasks."}]}]}'::jsonb,'published',now()),
('research','multi-agent-coordination','Multi-agent coordination','Delegation, shared context, conflict resolution, and review across specialized agents.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This research explores delegation, shared context, conflict resolution, and review across specialized agents."}]}]}'::jsonb,'published',now()),
('research','human-oversight','Human oversight','Interfaces and policies that keep responsibility and consequential decisions with people.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Orbit designs interfaces and policies that keep responsibility, approvals, and consequential decisions with people."}]}]}'::jsonb,'published',now()),
('research','verifiable-tool-execution','Verifiable tool execution','Permissions, observable steps, sandboxed actions, and evidence for tool execution.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This work explores permissions, observable steps, sandboxed actions, and evidence that a tool did what was requested."}]}]}'::jsonb,'published',now()),
('research','language-model-architecture','Language-model architecture','Model structure, training, inference, evaluation, and future multimodal systems.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Orbit researches model structure, training, inference, evaluation, and future multimodal systems."}]}]}'::jsonb,'published',now()),
('research','robotics-and-responsible-automation','Robotics and responsible automation','Connecting intelligent software to physical systems through bounded tests and supervision.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This research connects intelligent software to physical systems through bounded tests, supervision, and honest development labels."}]}]}'::jsonb,'published',now())
on conflict (kind, slug) do nothing;

insert into public.jobs (slug, title, department, location, employment_type, workplace_type, summary, description, status, publish_at)
values
('recruiter-netherlands','Recruiter','People','Netherlands','full_time','hybrid','Help Orbit find exceptional people while building a careful, candidate-respectful hiring process.','{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Work with Orbit teams to source, assess, and support candidates across technical and business roles."}]}]}'::jsonb,'published',now()),
('llm-trainer-netherlands','LLM Trainer','Research','Netherlands','full_time','hybrid','Improve training data, evaluations, and feedback for dependable AI systems.','{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Create and review high-quality training and evaluation material for Orbit model systems."}]}]}'::jsonb,'published',now()),
('recruitment-manager-international','Recruitment Manager','People','International','full_time','remote','Lead international recruiting operations with clear standards and humane candidate experiences.','{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Own recruiting operations, hiring quality, and candidate experience across international searches."}]}]}'::jsonb,'published',now()),
('social-media-manager-international','Social Media Manager','Marketing','International','full_time','remote','Build Orbit’s international social presence with accurate, useful communication.','{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Plan and publish social communication without overstating product availability or research status."}]}]}'::jsonb,'published',now()),
('social-media-manager-netherlands','Social Media Manager','Marketing','Netherlands','full_time','hybrid','Lead social publishing for Orbit in the Netherlands.','{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Create precise, useful social content for Orbit’s Dutch and international audiences."}]}]}'::jsonb,'published',now())
on conflict (slug) do nothing;
