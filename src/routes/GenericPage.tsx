import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { Layout, OrbitMark, SmartLink } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { OrbitReveal } from '../components/motion'
import { OrbitImage } from '../components/media'
import { pages } from '../data/siteData'

export default function GenericPage({ pagePath }: { pagePath?: string }) {
  const params = useParams()
  const path = pagePath || `/Routes/${params.page}`
  const page = pages.find(item => item.path.toLowerCase() === path.toLowerCase())
  if (!page) return <Navigate to="/404" replace />
  const isRobotics = page.path === '/Routes/pulsar-v1'
  const isAgents = page.path === '/Routes/agents'
  const isWorkspace = page.path === '/Routes/orbit-ai'

  return <Layout>
    <Meta title={page.title} description={page.description} path={page.path} />
    <section className={`page-hero${isRobotics ? ' page-hero--dark' : ''}`}>
      <div className="page-hero-grid" aria-hidden="true"><span /><span /><span /></div>
      <p className="eyebrow">{page.eyebrow}</p>
      <h1>{page.title}</h1>
      <div className="page-hero-intro">
        <span>ORBIT SYSTEMS / {String(pages.indexOf(page) + 1).padStart(2, '0')}</span>
        <p>{page.intro}</p>
      </div>
      {page.actions && <div className="page-hero-actions">{page.actions.map(action => <SmartLink key={action.label} href={action.href} className={`button ${action.primary ? 'primary' : 'ghost'}`}>{action.label}{action.href.startsWith('http') ? <ExternalLink size={16} /> : <ArrowRight size={16} />}</SmartLink>)}</div>}
    </section>
    {isRobotics && <section className="page-media" aria-label="Pulsar robotics research visual"><OrbitImage src="/media/pulsar-research.webp" alt="Satellite prototype displayed in a controlled research room" aspectRatio="16 / 9" /></section>}
    {page.notice && <aside className="page-notice"><span>IMPORTANT</span><p>{page.notice}</p></aside>}
    {isAgents && <section className="page-section page-execution" aria-label="Agent execution path"><div className="page-rule"><span>01</span><span>AGENT EXECUTION PATH</span></div><div className="page-execution-steps">{['Understanding', 'Researching', 'Comparing', 'Building', 'Reviewing', 'Complete'].map((step, index) => <div key={step}><span>0{index + 1}</span><b>{step}</b></div>)}</div></section>}
    {isWorkspace && <WorkspacePreview />}
    <section className="page-section">
      <div className="page-rule"><span>01</span><span>ORBIT / {page.eyebrow}</span></div>
      <div className="product-page-list">
        {page.sections.map((section, index) => <OrbitReveal as="article" key={section.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h2>{section.title}</h2>
          <div><p>{section.body}</p>{section.items && <ul>{section.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>}</div>
          {section.status && <small>{section.status}</small>}
        </OrbitReveal>)}
      </div>
    </section>
    {page.actions && <section className="page-cta"><p className="eyebrow">NEXT TRAJECTORY</p><h2>Move from context to action.</h2><div>{page.actions.slice(0, 3).map(action => <SmartLink key={action.label} href={action.href} className={`button ${action.primary ? 'primary' : 'ghost'}`}>{action.label}<ArrowRight size={16} /></SmartLink>)}</div></section>}
  </Layout>
}

function WorkspacePreview() {
  return <section className="interface-preview page-workspace-preview" aria-label="Illustrative Orbit workspace preview">
    <div className="interface-bar"><span><OrbitMark /></span><span>Illustrative interface</span><span>WORKSPACE</span></div>
    <div className="interface-body">
      <aside><span>WORKSPACE</span>{['New conversation', 'Files', 'Agents', 'Automations'].map((item, index) => <button type="button" className={index === 0 ? 'active' : ''} key={item}>{item}</button>)}</aside>
      <div className="interface-canvas"><span>MODEL / AUTOMATIC</span><h3>What are we working on?</h3><p>Ask Orbit to research, compare, build, or review. Add permitted files and keep the result with the conversation.</p><div className="page-workspace-message">Describe the outcome you need…</div></div>
    </div>
  </section>
}
