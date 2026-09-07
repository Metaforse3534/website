-- Restrict the retention Edge Function secret to service-role calls.
create or replace function public.get_retention_cron_secret()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = 'orbit_retention_cron_secret'
  order by created_at desc
  limit 1;
$$;

revoke all on function public.get_retention_cron_secret() from public, anon, authenticated;
grant execute on function public.get_retention_cron_secret() to service_role;
