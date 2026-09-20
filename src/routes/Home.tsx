import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowRight, Check, ExternalLink, FileCode2, Mic, Orbit, Search, ShieldCheck, Waypoints } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Meta } from '../components/Meta'
import { HomepageNoticeBar } from '../components/HomepageNotice'
import { Layout, SmartLink } from '../components/SiteChrome'
import { OrbitMediaSkeleton } from '../components/loading'
import { OrbitImage, OrbitVideo } from '../components/media'
import { OrbitReveal, OrbitTextReveal } from '../components/motion'
import { external } from '../data/siteData'

const PulsarCore = lazy(() => import('../components/PulsarCore').then(module => ({ default: module.PulsarCore })))

const capabilities = [
  ['Research', 'Explore technical literature, compare sources, extract structured facts, and produce clear findings.', '/Routes/doc#research'],
  ['Synthesis', 'Turn unstructured ideas into specifications, reports, presentations, documents, and decision-ready outputs.', '/Routes/orbit-ai'],
  ['Code', 'Understand codebases, draft changes, explain systems, and help verify implementation work.', '/Routes/developers'],
  ['Analysis', 'Compare options, evaluate trade-offs, inspect data, and organize complex decisions.', '/Routes/orbit-ai'],
  ['Automation', 'Build repeatable workflows from triggers, agents, conditions, delays, and saved results.', '/Routes/doc#agents-and-workflows'],
  ['Execution', 'Coordinate specialized agents to move a task from request to reviewed output.', '/Routes/agents'],
] as const
const deepDives = [
  [Search, 'Research', 'Find source material, compare it, and return a usable synthesis.'],
  [Orbit, 'Browser assistance', 'Bring readable page context and selected text into the work.'],
  [FileCode2, 'Code', 'Understand a codebase, draft changes, and help verify the result.'],
  [Waypoints, 'Artifact creation', 'Move from conversation to structured documents, slides, sheets, and code.'],
  [Waypoints, 'Automations', 'Connect triggers, agents, conditions, delays, and saved results.'],
  [ShieldCheck, 'Context and memory', 'Keep permitted project material connected without hiding what informed the work.'],
  [Mic, 'Voice', 'Use voice as another way to work with the current conversation.'],
  [FileCode2, 'Desktop actions', 'Create artifacts and perform selected actions through the Windows desktop bridge.'],
] as const

const demoSteps = [
  ['ASK', 'Analyze this repository and identify the highest-impact architecture risks.'],
  ['UNDERSTAND', 'Pulsar separates the goal, constraints, files, and required evidence.'],
  ['ACT', 'Specialized tools inspect the permitted repository context.'],
  ['RESULT', 'Three prioritized findings are prepared for review.'],
] as const

function WorkspaceDemo() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => setStep(current => {
      if (current === demoSteps.length - 1) { window.clearInterval(timer); setRunning(false); return current }
      return current + 1
    }), 760)
    return () => window.clearInterval(timer)
  }, [running])
  return <div className="workspace-preview compact orbit-workspace-demo" aria-live="polite">
    <div className="workspace-top"><span><i /> ORBIT</span><span>Deterministic illustration</span></div>
    <aside>{demoSteps.map(([label], index) => <button type="button" className={step === index ? 'active' : ''} key={label} onClick={() => { setRunning(false); setStep(index) }}><small>0{index + 1}</small>{label}</button>)}</aside>
    <div className="workspace-main"><div className="model-pill">PULSAR / ILLUSTRATION</div><p className="demo-state">{demoSteps[step][0]}</p><h3>{demoSteps[step][1]}</h3><p>This sequence is a product demonstration and does not send a live AI request.</p><button type="button" className="button ghost" disabled={running} onClick={() => { setStep(0); setRunning(true) }}>{running ? 'Illustration running' : 'Run sequence'}</button></div>
  </div>
}

export default function Home() {
  const [seenEntrance] = useState(() => typeof window !== 'undefined' && window.sessionStorage.getItem('orbit:entrance-seen') === 'true')
  useEffect(() => { window.sessionStorage.setItem('orbit:entrance-seen', 'true') }, [])
  return <Layout><HomepageNoticeBar />
    <Meta title="Intelligence, Built for What’s Next." description="Orbit AI is an intelligent workspace for research, creation, automation, coding, and coordinated agents." path="/" />
    <Helmet><script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Orbit AI', applicationCategory: 'ProductivityApplication', operatingSystem: 'Web, Windows', url: external.app, description: 'Research, create, automate and execute from one intelligent workspace.' })}</script></Helmet>
    <section className={`hero${seenEntrance ? ' entrance-seen' : ''}`}>
      <OrbitVideo className="hero-video" autoPlay muted loop playsInline poster="/media/orbit-hero-poster.webp" label="Abstract Orbit product film"><source src="/media/orbit-hero.mp4" type="video/mp4" media="(min-width: 701px)" /></OrbitVideo>
      <div className="hero-shade" />
      <div className="hero-content"><OrbitTextReveal delay={seenEntrance ? 0 : .08}><p className="eyebrow">ORBIT AI / INTELLIGENT WORKSPACE</p></OrbitTextReveal><OrbitTextReveal delay={seenEntrance ? 0 : .14}><h1>AI THAT GETS<br />THINGS DONE.</h1></OrbitTextReveal><OrbitTextReveal delay={seenEntrance ? 0 : .22}><p className="lede">Research, create, automate and execute from one intelligent workspace.</p></OrbitTextReveal><OrbitTextReveal delay={seenEntrance ? 0 : .3}><div className="actions"><a className="button primary" href={external.app} target="_blank" rel="noopener noreferrer">Launch Orbit <ExternalLink size={17} /></a><a className="button ghost" href="#platform">Explore the platform <ArrowRight size={17} /></a></div></OrbitTextReveal></div>
      <div className="hero-status"><span><i /> WORKSPACE AVAILABLE</span><span>ORBIT AI v0.0.20</span></div>
    </section>
    <section className="section platform" id="platform"><div className="section-label">01 / PLATFORM</div><div className="section-intro"><h2>ONE AI.<br />MANY WAYS TO WORK.</h2><p>Orbit adapts across disciplines—from web research and document analysis to code synthesis, artifacts, agents, and automated workflows.</p></div><div className="capability-grid">{capabilities.map(([title, copy, href], index) => <SmartLink className="capability" href={href} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><ArrowRight size={18} /></SmartLink>)}</div></section>
    <section className="model-routing"><OrbitReveal className="model-copy"><p className="section-label">MODEL ROUTING</p><h2>Choose the right intelligence for the work.</h2><p>Orbit can expose different models and access modes according to the user’s plan, selected mode, and current availability.</p><p className="fine-print">Model availability and third-party provider access may change. Orbit does not guarantee a specific external model or version.</p></OrbitReveal><div className="routing-panel">{['Normal', 'Orbit', 'Pulsar', 'Pro', 'Automatic routing', 'Supported external providers when available'].map((name, index) => <div className={index === 4 ? 'active' : ''} key={name}><span>0{index + 1}</span><b>{name}</b><i>{index === 4 ? 'ROUTING' : 'MODE'}</i></div>)}</div></section>
    <section className="section context-section"><p className="section-label">02 / CONTEXT</p><div className="section-intro"><h2>UNDERSTAND<br />THE WORK.</h2><p>Workspace context, intent decomposition, and adaptive planning turn a broad request into a sequence a person can inspect.</p></div><div className="principles">{[['Workspace context', 'Use permitted conversations, files, projects, and results.'], ['Intent decomposition', 'Separate goals, constraints, evidence, and deliverables.'], ['Adaptive planning', 'Revise the path when sources, tools, or review change the work.']].map(([t, p], i) => <OrbitReveal key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{p}</p></OrbitReveal>)}</div><div className="workflow"><blockquote>“Research the best way to launch this product, analyze competitors, and generate a practical launch plan.”</blockquote><div>{['User request', 'Research', 'Comparison', 'Planning', 'Creation', 'Review', 'Final artifact'].map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, '0')}</i>{step}</span>)}</div></div></section>
    <section className="workspace-section"><div className="workspace-copy"><p className="section-label">03 / WORKSPACE</p><h2>A WORKSPACE BUILT FOR EXECUTION.</h2><p>Conversations, files, models, tools, agents, workflows, and results stay together in one focused workspace.</p><SmartLink href="/Routes/orbit-ai" className="text-link">Explore Orbit AI <ArrowRight size={16} /></SmartLink></div><WorkspaceDemo /></section>
    <section className="deep-dives">{deepDives.map(([Icon, title, copy], index) => <OrbitReveal className="deep-row" key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></OrbitReveal>)}</section>
    <section className="agents-section"><div><p className="section-label">04 / AGENTS</p><h2>DON’T JUST ASK.<br />LET IT ACT.</h2><p>Give specialized agents a clear role, keep their steps visible, and review consequential outputs and actions.</p><SmartLink href="/Routes/agents" className="button primary">Explore Orbit Agents <ArrowRight size={16} /></SmartLink></div><div className="agent-stack">{[['LEAD', 'Breaks goals into steps and coordinates the result.'], ['BUILDER', 'Produces code, structures, copy, configuration, and deliverables.'], ['RESEARCHER', 'Finds relevant information and sources.'], ['REVIEWER', 'Checks gaps, risks, security, and weak assumptions.']].map(([name, copy], index) => <article key={name}><span>AGENT 0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
    <section className="system-section"><p className="section-label">05 / SYSTEM</p><div className="section-intro"><h2>YOUR WORK. ONE INTELLIGENT LAYER.</h2><p>Orbit connects the AI core to models, agents, applications, files, projects, browser context, voice, automations, the developer API, and the desktop bridge.</p></div><div className="system-map"><strong>ORBIT AI CORE</strong>{['Models', 'Agents', 'Applications', 'Files', 'Projects', 'Browser', 'Voice', 'Automations', 'Developer API', 'Desktop bridge'].map((item, i) => <span style={{ '--i': i } as React.CSSProperties} key={item}>{item}</span>)}</div><SmartLink href="/Routes/Eco" className="text-link">Explore the ecosystem <ArrowRight size={16} /></SmartLink></section>
    <Suspense fallback={<div className="pulsar-loading"><OrbitMediaSkeleton /></div>}><PulsarCore /></Suspense>
    <section className="trust-section"><div><p className="section-label">06 / TRUST</p><h2>BUILT FOR CONTROL.</h2><SmartLink href="/Routes/security" className="button ghost">Read about security <ArrowRight size={16} /></SmartLink></div><div className="trust-list">{['Private by default', 'Human review', 'Clear product-status labels', 'Visible actions', 'Account security', 'Revocable API keys', 'Responsible automation', 'Data-deletion controls'].map(item => <span key={item}><Check size={17} />{item}</span>)}</div></section>
    <section className="frontier-section"><OrbitImage src="/media/pulsar-research.webp" alt="Satellite prototype displayed in a controlled research room" aspectRatio="16 / 9" /><div className="frontier-overlay"><p className="section-label">RESEARCH / ROBOTICS</p><div className="frontier-grid"><article><span className="status research">Research / Prototype / Planned</span><h2>PRO PULSAR</h2><p>Orbit’s language-model and AI-infrastructure initiative spanning model research, inference, training systems, and developer access.</p><SmartLink href="/Routes/pro-pulsar" className="text-link">Explore Pro Pulsar <ArrowRight size={16} /></SmartLink></article><article><span className="status in-development">In development — concept targets only</span><h2>PULSAR V1</h2><p>An agile reconnaissance and support robotics concept designed to explore how intelligent software may work with physical systems.</p><SmartLink href="/Routes/pulsar-v1" className="text-link">Explore Pulsar V1 <ArrowRight size={16} /></SmartLink></article></div></div></section>
    <section className="pricing-preview"><p className="section-label">PLANS / ACCESS</p><h2>SIMPLE PLANS.<br />SERIOUS CAPABILITY.</h2><div>{[['Developer', '€0', 'Free for individuals'], ['Orbit Pro', '€10 / month', 'Parallel agents and Pro Pulsar access'], ['Orbit Team', '€25 / user / month', 'Team capabilities include planned items'], ['Enterprise', 'Custom', 'Terms and readiness confirmed with sales']].map(([name, price, copy]) => <article key={name}><h3>{name}</h3><b>{price}</b><p>{copy}</p></article>)}</div><SmartLink href="/shop" className="button primary">View full pricing <ArrowRight size={16} /></SmartLink></section>
    <section className="final-cta"><p className="section-label">READY / 01</p><h2>ENTER ORBIT.</h2><p>Intelligence that moves with you.</p><div className="actions"><SmartLink href={external.app} className="button primary">Launch Orbit <ExternalLink size={16} /></SmartLink><SmartLink href="/Routes/doc" className="button ghost">Read documentation</SmartLink><SmartLink href="/shop" className="button ghost">View pricing</SmartLink></div></section>
  </Layout>
}
