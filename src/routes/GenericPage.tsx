import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Navigate, useParams } from 'react-router-dom'
import { Layout, SmartLink } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
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
    <section className={`page-hero${isRobotics ? ' media-hero' : ''}`}>
      {isRobotics && <img src="/media/pulsar-research.webp" alt="Satellite prototype displayed in a controlled research room" />}
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="page-hero-content">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lede">{page.intro}</p>
        {page.actions && <div className="actions">{page.actions.map(action => <SmartLink key={action.label} href={action.href} className={`button ${action.primary ? 'primary' : 'ghost'}`}>{action.label}{action.href.startsWith('http') ? <ExternalLink size={16} /> : <ArrowRight size={16} />}</SmartLink>)}</div>}
      </div>
      <div className="page-index">ORBIT SYSTEMS / {String(pages.indexOf(page) + 1).padStart(2, '0')}</div>
    </section>
    {page.notice && <aside className="notice"><span>IMPORTANT</span><p>{page.notice}</p></aside>}
    {isAgents && <section className="execution-path" aria-label="Agent execution path">{['Understanding', 'Researching', 'Comparing', 'Building', 'Reviewing', 'Complete'].map((step, index) => <div key={step}><span>0{index + 1}</span><b>{step}</b></div>)}</section>}
    {isWorkspace && <WorkspacePreview />}
    <section className="content-rows">
      {page.sections.map((section, index) => <motion.article className="content-row" key={section.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .45 }}>
        <div className="row-number">{String(index + 1).padStart(2, '0')}</div>
        <div className="row-title"><h2>{section.title}</h2>{section.status && <span className={`status ${section.status.toLowerCase().replaceAll(' ', '-')}`}>{section.status}</span>}</div>
        <div className="row-copy"><p>{section.body}</p>{section.items && <ul>{section.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>}</div>
      </motion.article>)}
    </section>
    {page.actions && <section className="page-cta"><p className="eyebrow">NEXT TRAJECTORY</p><h2>Move from context to action.</h2><div className="actions">{page.actions.slice(0, 3).map(action => <SmartLink key={action.label} href={action.href} className={`button ${action.primary ? 'primary' : 'ghost'}`}>{action.label}<ArrowRight size={16} /></SmartLink>)}</div></section>}
  </Layout>
}

function WorkspacePreview() {
  return <section className="workspace-preview" aria-label="Illustrative Orbit workspace preview">
    <div className="workspace-top"><span><i /> ORBIT</span><span>Illustrative interface</span></div>
    <aside><button>+ New conversation</button>{['Chat', 'Files', 'Agents', 'Automations'].map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}<small>RECENT WORK</small><span>Launch research</span><span>Architecture review</span></aside>
    <div className="workspace-main"><div className="model-pill">MODEL / AUTOMATIC</div><h2>What are we working on?</h2><p>Ask Orbit to research, compare, build, or review. Add permitted files and keep the result with the conversation.</p><div className="message-box"><span>Describe the outcome you need…</span><div><button>+ Add files</button><button>Tools</button><button aria-label="Send message">↑</button></div></div></div>
  </section>
}
