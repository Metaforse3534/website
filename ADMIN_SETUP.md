# Orbit Admin setup

The application code, schema, policies, seed records, Storage buckets, Edge Functions, and tests are included in this repository. A Supabase organization owner must complete the one-time hosted-project setup because project creation and administrator invitations require account authorization.

## 1. Create and link the project

1. Create a hosted project in the Supabase Dashboard and retain its project reference and database password.
2. Authenticate the CLI with `npx supabase login`.
3. Link this checkout with `npx supabase link --project-ref <project-ref>`.
4. Review the pending schema with `npx supabase db push --dry-run`, then apply it with `npx supabase db push`.
5. In **Project Settings → API**, confirm the `public` schema is exposed to the Data API. The migration explicitly grants only the operations required by the application and enables RLS on every exposed table.

## 2. Configure the site

Copy `.env.example` to `.env.local` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Only these public values belong in the Vite build. Never add the secret or service-role key to a `VITE_` variable.

In Supabase Auth settings, disable public sign-up, add `https://www.orbitdev.org/admin` as an allowed redirect URL, and leave TOTP verification enabled.

## 3. Deploy protected functions

Set three function secrets using a private local environment file that is not committed:

- `ALLOWED_ORIGINS=https://www.orbitdev.org,http://localhost:5173`
- `RATE_LIMIT_SECRET=<long random value>`
- `CRON_SECRET=<different long random value>`

Deploy with:

```text
npx supabase secrets set --env-file <private-function-env-file>
npx supabase functions deploy submit-application purge-applications --use-api
```

The Supabase runtime supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the functions. Do not create browser-visible copies.

Create Vault secrets named `project_url`, `publishable_key`, and `cron_secret`, then run `supabase/setup-cron.sql` in the SQL Editor. The cleanup job runs daily at 02:17 UTC.

## 4. Invite the first administrator

1. Invite the user from **Authentication → Users**. There is no sign-up route in the site.
2. In the SQL Editor, replace the email and run:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where lower(email) = lower('admin@example.com');
```

3. Ask the administrator to sign in at `/admin`. The first login requires TOTP enrollment; subsequent protected operations require an `aal2` session. If a role changes, sign the user out so a refreshed JWT carries the new application metadata.

## 5. Verify

Run `npm test`, `npm run build`, and—when Docker Desktop or Podman is available—`npx supabase start` followed by `npx supabase test db`. Confirm a normal authenticated account is redirected from `/admin`, while an invited admin cannot read or write protected records until TOTP verification succeeds.
