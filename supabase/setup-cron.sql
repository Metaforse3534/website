-- Run after deploying purge-applications. The secret is generated inside Vault and
-- can only be read by the service-role-only RPC used by the Edge Function.
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'orbit_project_url') then
    perform vault.create_secret('https://lnzftcoagcwigfedpryt.supabase.co', 'orbit_project_url');
  end if;
  if not exists (select 1 from vault.secrets where name = 'orbit_retention_cron_secret') then
    perform vault.create_secret(encode(gen_random_bytes(32), 'hex'), 'orbit_retention_cron_secret');
  end if;
end;
$$;

select cron.unschedule(jobid)
from cron.job
where jobname = 'purge-expired-orbit-applications';

select cron.schedule(
  'purge-expired-orbit-applications',
  '17 2 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'orbit_project_url') || '/functions/v1/purge-applications',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'orbit_retention_cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
