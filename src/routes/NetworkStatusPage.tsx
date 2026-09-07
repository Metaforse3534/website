import { useQuery } from '@tanstack/react-query'
import { Activity } from 'lucide-react'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import type { ServiceUpdate } from '../lib/cms'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export default function NetworkStatusPage() {
  const query = useQuery({ queryKey: ['service-updates'], enabled: isSupabaseConfigured, queryFn: async () => { const { data, error } = await supabase!.from('service_updates').select('*').order('publish_at', { ascending: false }); if (error) throw error; return data as ServiceUpdate[] } })
  const active = (query.data ?? []).filter(item => item.incident_status !== 'resolved')
  return <Layout><Meta title="Orbit Network Status" description="Published Orbit service incidents, maintenance, monitoring, and resolutions." path="/Routes/network" /><section className="status-hero"><p className="eyebrow">ORBIT NETWORK / LIVE STATUS</p><h1>{active.length ? 'SERVICE UPDATES ACTIVE.' : 'ALL PUBLISHED SYSTEMS NORMAL.'}</h1><p>Operational information is published here by the Orbit team.</p></section><section className="status-feed"><div className="status-summary"><Activity /><strong>{active.length ? `${active.length} active update${active.length === 1 ? '' : 's'}` : 'No active incidents'}</strong></div>{query.data?.map(item => <article key={item.id}><div><span className={`service-dot ${item.severity}`} /><p>{item.service_name} / {item.incident_status}</p><time>{item.publish_at ? new Date(item.publish_at).toLocaleString('en-GB', { timeZone: 'Europe/Berlin' }) : ''}</time></div><h2>{item.title}</h2><p>{item.message}</p></article>)}{!query.isLoading && !query.data?.length && <p className="content-empty">No service updates have been published.</p>}</section></Layout>
}
