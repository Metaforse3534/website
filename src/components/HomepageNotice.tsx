import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Copy, Timer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { remainingTime, selectHomepageNotice, type HomepageNotice } from '../lib/cms'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export function HomepageNoticeBar() {
  const [now, setNow] = useState(Date.now())
  const [copied, setCopied] = useState(false)
  const query = useQuery({ queryKey: ['homepage-notices'], enabled: isSupabaseConfigured, queryFn: async () => { const { data, error } = await supabase!.from('homepage_notices').select('*').order('priority', { ascending: false }); if (error) throw error; return data as HomepageNotice[] } })
  const notice = useMemo(() => selectHomepageNotice(query.data ?? [], now), [query.data, now])
  useEffect(() => { if (!notice?.countdown_end) return; const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [notice?.countdown_end])
  if (!notice) return null
  const remaining = notice.countdown_end ? remainingTime(notice.countdown_end, now) : null
  return <aside className={`homepage-notice ${notice.kind}`} aria-label={notice.kind === 'discount' ? 'Limited-time offer' : 'Announcement'}><div><span>{notice.kind === 'discount' ? 'LIMITED OFFER' : notice.kind.toUpperCase()}</span><strong>{notice.title}</strong><p>{notice.message}</p></div>
    {remaining && <div className="notice-countdown" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes remaining`}><Timer />{remaining.days > 0 && <b>{remaining.days}<small>D</small></b>}<b>{String(remaining.hours).padStart(2,'0')}<small>H</small></b><b>{String(remaining.minutes).padStart(2,'0')}<small>M</small></b><b>{String(remaining.seconds).padStart(2,'0')}<small>S</small></b></div>}
    {notice.discount_code && <button className="notice-code" onClick={async () => { await navigator.clipboard.writeText(notice.discount_code!); setCopied(true); setTimeout(() => setCopied(false), 1200) }}><Copy />{copied ? 'COPIED' : notice.discount_code}</button>}
    {notice.cta_url && notice.cta_label && <a href={notice.cta_url}>{notice.cta_label}<ArrowRight /></a>}
  </aside>
}
