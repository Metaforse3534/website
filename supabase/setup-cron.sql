-- Run after deploying purge-applications and creating these Vault secrets:
-- project_url = https://<project-ref>.supabase.co
-- publishable_key = the project's publishable key
-- cron_secret = the same CRON_SECRET configured for the function
select cron.schedule(
  'purge-expired-orbit-applications',
  '17 2 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/purge-applications',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', (select decrypted_secret from vault.decrypted_secrets where name = 'publishable_key'),
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
