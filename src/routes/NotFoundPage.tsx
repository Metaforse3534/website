import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Layout, SmartLink } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { pages } from '../data/siteData'

export default function NotFoundPage() {
  const [query, setQuery] = useState('')
  const results = query.length > 1 ? pages.filter(p => `${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : []
  const submit = (e: FormEvent) => e.preventDefault()
  return <Layout><Meta title="Trajectory not found." description="The requested Orbit AI page could not be found." path="/404" /><section className="not-found"><div className="lost-orbit" aria-hidden="true"><i /><b /></div><p className="eyebrow">404 / NAVIGATION ERROR</p><h1>Trajectory<br />not found.</h1><p>The route may have moved, or the address may be incomplete.</p><form onSubmit={submit}><Search size={18} /><label className="sr-only" htmlFor="site-search">Search Orbit</label><input id="site-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Orbit" /></form>{results.length > 0 && <div className="search-results">{results.map(result => <SmartLink href={result.path} key={result.path}><b>{result.title}</b><span>{result.description}</span></SmartLink>)}</div>}<div className="actions"><SmartLink className="button primary" href="/">Return home</SmartLink><SmartLink className="button ghost" href="https://app.orbitdev.org/">Open Orbit</SmartLink><SmartLink className="button ghost" href="/Routes/doc">Documentation</SmartLink></div></section></Layout>
}
