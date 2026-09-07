import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  return difference === 0
}

Deno.serve(async request => {
  if (request.method !== 'POST') return new Response('Unauthorized', { status: 401 })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } })
  const { data: expectedSecret, error: secretError } = await admin.rpc('get_retention_cron_secret')
  const suppliedSecret = request.headers.get('x-cron-secret') ?? ''
  if (secretError || typeof expectedSecret !== 'string' || !safeEqual(suppliedSecret, expectedSecret)) return new Response('Unauthorized', { status: 401 })
  const { data, error } = await admin.from('applications').select('id,cv_path').neq('workflow_status', 'hired').lte('retention_delete_at', new Date().toISOString()).limit(500)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  const paths = (data ?? []).map(row => row.cv_path).filter(Boolean)
  if (paths.length) {
    const { error: storageError } = await admin.storage.from('candidate-cvs').remove(paths)
    if (storageError) return new Response(JSON.stringify({ error: storageError.message }), { status: 500 })
  }
  const ids = (data ?? []).map(row => row.id)
  if (ids.length) {
    const { error: deleteError } = await admin.from('applications').delete().in('id', ids)
    if (deleteError) return new Response(JSON.stringify({ error: deleteError.message }), { status: 500 })
  }
  return new Response(JSON.stringify({ deleted: ids.length }), { headers: { 'Content-Type': 'application/json' } })
})
