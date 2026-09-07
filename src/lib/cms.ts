import { z } from 'zod'

export type RichNode = {
  type?: string
  attrs?: Record<string, unknown>
  marks?: { type?: string; attrs?: Record<string, unknown> }[]
  text?: string
  content?: RichNode[]
}

export type EditorialPost = {
  id: string; kind: 'blog' | 'research' | 'product_update'; slug: string; title: string; excerpt: string
  body: RichNode; cover_image_path?: string | null; seo_title?: string | null; seo_description?: string | null
  author_name: string; status: string; publish_at?: string | null; unpublish_at?: string | null; created_at: string; updated_at: string
}
export type HomepageNotice = { id: string; kind: 'announcement' | 'service' | 'discount'; title: string; message: string; cta_label?: string | null; cta_url?: string | null; discount_code?: string | null; priority: number; countdown_end?: string | null; publish_at?: string | null }
export type ServiceUpdate = { id: string; title: string; message: string; service_name: string; incident_status: string; severity: string; publish_at?: string | null; resolved_at?: string | null }
export type Job = { id: string; slug: string; title: string; department: string; location: string; employment_type: string; workplace_type: string; summary: string; description: RichNode; status: string; publish_at?: string | null; close_at?: string | null }
export type JobQuestion = { id: string; job_id: string; prompt: string; input_type: 'short_text' | 'long_text' | 'select' | 'boolean'; options: string[]; required: boolean; position: number }

export const slugSchema = z.string().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.')
export const editorialSchema = z.object({
  kind: z.enum(['blog', 'research', 'product_update']), slug: slugSchema, title: z.string().min(3).max(180),
  excerpt: z.string().min(10).max(500), author_name: z.string().min(2).max(120),
  cover_image_path: z.string().max(500), seo_title: z.string().max(180), seo_description: z.string().max(500),
  status: z.enum(['draft', 'scheduled', 'published', 'expired', 'archived']), publish_at: z.string().nullable(), unpublish_at: z.string().nullable(),
}).refine(value => !value.unpublish_at || !value.publish_at || new Date(value.unpublish_at) > new Date(value.publish_at), { message: 'Expiry must be after publication.', path: ['unpublish_at'] })

export function berlinInputToUtc(value: string) {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

export function remainingTime(end: string, now = Date.now()) {
  const difference = Math.max(0, new Date(end).getTime() - now)
  return { total: difference, days: Math.floor(difference / 86400000), hours: Math.floor(difference / 3600000) % 24, minutes: Math.floor(difference / 60000) % 60, seconds: Math.floor(difference / 1000) % 60 }
}

export function selectHomepageNotice(items: HomepageNotice[], now = Date.now()) {
  return items.filter(item => !item.countdown_end || new Date(item.countdown_end).getTime() > now)
    .sort((a, b) => b.priority - a.priority || new Date(b.publish_at ?? 0).getTime() - new Date(a.publish_at ?? 0).getTime())[0] ?? null
}
