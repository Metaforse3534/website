import { Mail, MapPin } from 'lucide-react'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { roleCategories } from '../data/siteData'

export default function CareersPage() {
  return <Layout><Meta title="HELP ORBIT FIND ITS PEOPLE." description="Current Orbit role categories in the Netherlands and internationally." path="/Routes/Career" />
    <section className="careers-hero"><p className="eyebrow">ACTIVE ROLES / ORBIT SYSTEMS B.V.</p><h1>HELP ORBIT<br />FIND ITS PEOPLE.</h1><p>Current role categories only. Compensation, contracts, hours, benefits, and exact requirements are confirmed through the application process.</p></section>
    <section className="role-list">{roleCategories.map((role, index) => { const [name, location] = role.split(' — '); const href = `mailto:apply@orbitdev.org?subject=${encodeURIComponent(`Application — ${role}`)}`; return <article key={role}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{name}</h2><p><MapPin size={15} />{location}</p></div><a className="button ghost" href={href}>Apply by email <Mail size={15} /></a></article> })}</section>
    <aside className="career-notice"><p>Send a concise introduction and relevant experience to <a href="mailto:apply@orbitdev.org">apply@orbitdev.org</a>. Do not send passwords, identity documents, financial details, or unnecessary sensitive data.</p></aside>
  </Layout>
}
