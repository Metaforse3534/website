import { useQuery } from '@tanstack/react-query'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import type { Job } from '../lib/cms'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export default function CareersPage() {
  const query = useQuery({ queryKey: ['public-jobs'], enabled: isSupabaseConfigured, queryFn: async () => { const { data, error } = await supabase!.from('jobs').select('*').order('publish_at', { ascending: false }); if (error) throw error; return data as Job[] } })
  return <Layout><Meta title="HELP ORBIT FIND ITS PEOPLE." description="Current open roles at Orbit Systems B.V." path="/Routes/careers" /><section className="careers-hero"><p className="eyebrow">ACTIVE ROLES / ORBIT SYSTEMS B.V.</p><h1>HELP ORBIT<br />FIND ITS PEOPLE.</h1><p>Build trusted intelligence across software, agents, research, operations, and communication.</p></section><section className="role-list">{query.data?.map((job, index) => <article key={job.id}><span>{String(index + 1).padStart(2,'0')}</span><div><h2>{job.title}</h2><p><MapPin />{job.location} · {job.workplace_type} · {job.department}</p></div><Link className="button ghost" to={`/careers/${job.slug}`}>View role <ArrowRight /></Link></article>)}{query.isLoading && <p>Loading open roles…</p>}{!query.isLoading && !query.data?.length && <p className="content-empty">There are no published roles at the moment.</p>}</section><aside className="career-notice"><p>Applications are reviewed by people. Submit only information relevant to the role; do not include passwords, identity documents, financial details, or unnecessary sensitive data.</p></aside></Layout>
}
