begin;
select plan(12);

select ok(has_table_privilege('anon', 'public.editorial_posts', 'select'), 'anonymous visitors can read public editorial rows');
select ok(not has_table_privilege('anon', 'public.editorial_posts', 'insert,update,delete'), 'anonymous visitors cannot write editorial rows');
select ok(not has_table_privilege('anon', 'public.applications', 'select,insert,update,delete'), 'anonymous visitors cannot access application records');
select ok(has_table_privilege('authenticated', 'public.applications', 'select,update,delete'), 'authenticated role has grants gated by RLS');

set local role authenticated;
select set_config('request.jwt.claims', '{"aal":"aal1","app_metadata":{"role":"admin"}}', true);
select is_empty($$select id from public.applications$$, 'admin at AAL1 cannot read applications');
select throws_ok($$insert into public.editorial_posts(kind,slug,title,excerpt,status) values ('blog','aal1-denied','AAL1 denied','This insert must be rejected.','draft')$$, '42501', null, 'admin at AAL1 cannot insert');

select set_config('request.jwt.claims', '{"aal":"aal2","app_metadata":{"role":"member"}}', true);
select throws_ok($$insert into public.editorial_posts(kind,slug,title,excerpt,status) values ('blog','member-denied','Member denied','This insert must be rejected.','draft')$$, '42501', null, 'ordinary AAL2 user cannot insert');

select set_config('request.jwt.claims', '{"aal":"aal2","app_metadata":{"role":"admin"}}', true);
select lives_ok($$insert into public.editorial_posts(kind,slug,title,excerpt,status) values ('blog','admin-allowed','Admin allowed','This insert should be accepted.','draft')$$, 'admin at AAL2 can insert');
select results_eq($$select count(*)::int from public.editorial_posts where slug = 'admin-allowed'$$, array[1], 'admin at AAL2 can read drafts');
select lives_ok($$update public.editorial_posts set title = 'Updated title' where slug = 'admin-allowed'$$, 'admin at AAL2 can update');
select lives_ok($$delete from public.editorial_posts where slug = 'admin-allowed'$$, 'admin at AAL2 can delete');
select ok(not has_table_privilege('authenticated', 'public.audit_events', 'insert,update,delete'), 'audit events are immutable to browser clients');

select * from finish();
rollback;
