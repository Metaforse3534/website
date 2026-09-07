import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && publishableKey)
export const supabase = isSupabaseConfigured ? createClient(url!, publishableKey!, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null

export const contentMediaUrl = (path?: string | null) => {
  if (!path || !supabase) return null
  return supabase.storage.from('content-media').getPublicUrl(path).data.publicUrl
}
