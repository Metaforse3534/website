-- Harden internal helpers and add foreign-key indexes.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

create policy application_rate_limits_deny_client_access
on public.application_rate_limits
for all
to anon, authenticated
using (false)
with check (false);

create index application_answers_question_idx on public.application_answers(question_id);
create index audit_events_actor_idx on public.audit_events(actor_id);
create index editorial_posts_created_by_idx on public.editorial_posts(created_by);
create index editorial_posts_updated_by_idx on public.editorial_posts(updated_by);
create index homepage_notices_created_by_idx on public.homepage_notices(created_by);
create index homepage_notices_updated_by_idx on public.homepage_notices(updated_by);
create index job_questions_job_idx on public.job_questions(job_id);
create index jobs_created_by_idx on public.jobs(created_by);
create index jobs_updated_by_idx on public.jobs(updated_by);
create index media_assets_uploaded_by_idx on public.media_assets(uploaded_by);
create index service_updates_created_by_idx on public.service_updates(created_by);
create index service_updates_updated_by_idx on public.service_updates(updated_by);
