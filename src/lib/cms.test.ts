import { describe, expect, it } from 'vitest'
import { berlinInputToUtc, editorialSchema, remainingTime, selectHomepageNotice, slugSchema, type HomepageNotice } from './cms'

describe('CMS publishing helpers', () => {
  it('accepts safe slugs and rejects path-like values', () => {
    expect(slugSchema.safeParse('orbit-product-update').success).toBe(true)
    expect(slugSchema.safeParse('../admin').success).toBe(false)
  })
  it('selects the highest priority unexpired homepage notice', () => {
    const notices: HomepageNotice[] = [
      { id: '1', kind: 'announcement', title: 'News', message: 'Message', priority: 4 },
      { id: '2', kind: 'discount', title: 'Offer', message: 'Message', priority: 10, countdown_end: '2026-09-07T12:00:00Z' },
    ]
    expect(selectHomepageNotice(notices, new Date('2026-09-07T10:00:00Z').getTime())?.id).toBe('2')
    expect(selectHomepageNotice(notices, new Date('2026-09-07T13:00:00Z').getTime())?.id).toBe('1')
  })
  it('never returns a negative countdown', () => {
    expect(remainingTime('2026-09-07T10:00:00Z', new Date('2026-09-07T11:00:00Z').getTime()).total).toBe(0)
  })
  it('requires expiry to follow publication', () => {
    const result = editorialSchema.safeParse({ kind: 'blog', slug: 'test-post', title: 'Test post', excerpt: 'A sufficiently long excerpt.', author_name: 'Orbit AI', status: 'scheduled', publish_at: '2026-09-08T12:00', unpublish_at: '2026-09-07T12:00' })
    expect(result.success).toBe(false)
  })
  it('converts a valid local date input into an ISO timestamp', () => {
    expect(berlinInputToUtc('2026-09-07T12:30')).toMatch(/^2026-09-07T\d{2}:30:00\.000Z$/)
  })
})
