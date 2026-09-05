import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, Check, ExternalLink, FileCode2, Mic, Orbit, Search, ShieldCheck, Waypoints } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Meta } from '../components/Meta'
import { Layout, SmartLink } from '../components/SiteChrome'
import { external } from '../data/siteData'

const OrbitalScene = lazy(() => import('../components/OrbitalScene'))
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

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55 }}>{children}</motion.div>
}

function OrbitMissionMap({ animate }: { animate: boolean }) {
  const nodes = [
    { id: 'mission-orbit-a', label: 'EDGE 01', duration: '15s', begin: '-4s', resting: 'translate(670 196)' },
    { id: 'mission-orbit-b', label: 'RELAY 02', duration: '19s', begin: '-11s', resting: 'translate(280 430)' },
    { id: 'mission-orbit-c', label: 'COMPUTE 03', duration: '23s', begin: '-17s', resting: 'translate(726 388)' },
  ]
  return <div className="orbit-map-shell">
    <div className="orbit-map-header"><span>ORBITAL COMPUTE MAP</span><small><i /> PATHS / SIMULATED</small></div>
    <div className="orbit-map-canvas">
      <svg viewBox="0 0 920 600" role="img" aria-labelledby="orbit-map-title orbit-map-description">
        <title id="orbit-map-title">Concept map of Orbit AI orbital computing paths</title>
        <desc id="orbit-map-description">Three illustrative orbital paths connect conceptual edge, relay, and compute nodes around Earth.</desc>
        <defs>
          <radialGradient id="mission-earth" cx="35%" cy="28%">
            <stop offset="0" stopColor="#38434a" />
            <stop offset=".62" stopColor="#13181b" />
            <stop offset="1" stopColor="#080a0b" />
          </radialGradient>
          <filter id="mission-glow" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <g className="mission-map-grid" aria-hidden="true">
          {[100, 220, 340, 460, 580, 700, 820].map(x => <line x1={x} y1="35" x2={x} y2="565" key={`x-${x}`} />)}
          {[75, 165, 255, 345, 435, 525].map(y => <line x1="40" y1={y} x2="880" y2={y} key={`y-${y}`} />)}
        </g>
        <path id="mission-orbit-a" className="mission-orbit orbit-a" d="M 88 302 C 170 92 690 58 832 266 C 716 478 194 492 88 302 Z" />
        <path id="mission-orbit-b" className="mission-orbit orbit-b" d="M 120 430 C 264 116 728 118 808 350 C 650 506 258 538 120 430 Z" />
        <path id="mission-orbit-c" className="mission-orbit orbit-c" d="M 216 102 C 480 94 694 242 752 520 C 440 462 246 318 216 102 Z" />
        <g className="mission-earth" aria-hidden="true">
          <circle cx="460" cy="306" r="115" />
          <ellipse cx="460" cy="306" rx="115" ry="42" />
          <ellipse cx="460" cy="306" rx="45" ry="115" />
          <path d="M352 270 Q460 220 568 270 M352 342 Q460 392 568 342" />
          <circle className="earth-core" cx="460" cy="306" r="18" />
          <text x="460" y="311">EARTH / AI CORE</text>
        </g>
        <g className="mission-ground-link" aria-hidden="true"><path d="M460 424 L460 505 L590 505" /><circle cx="460" cy="424" r="4" /><text x="606" y="511">GROUND RELAY</text></g>
        {nodes.map(node => <g className="mission-node" key={node.id} transform={animate ? undefined : node.resting} aria-hidden="true">
          <circle className="node-pulse" r="18" />
          <circle className="node-core" r="7" />
          <path d="M-15 0 H-7 M7 0 H15 M0 -15 V-7 M0 7 V15" />
          <text x="25" y="5">{node.label}</text>
          {animate && <animateMotion dur={node.duration} begin={node.begin} repeatCount="indefinite" rotate="auto"><mpath href={`#${node.id}`} /></animateMotion>}
        </g>)}
      </svg>
      <div className="map-axis axis-y">POLAR / +90°</div><div className="map-axis axis-x">EQUATORIAL / 0°</div>
    </div>
    <div className="orbit-map-readout">
      <article><span>EDGE 01</span><b>On-orbit inference</b><small>CONCEPT</small></article>
      <article><span>RELAY 02</span><b>Ground-to-space routing</b><small>RESEARCH</small></article>
      <article><span>COMPUTE 03</span><b>Floating data centers</b><small>PLANNED</small></article>
    </div>
  </div>
}

export default function Home() {
  const [heavyMotion, setHeavyMotion] = useState(false)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8
    setHeavyMotion(!reduced && memory >= 4 && window.innerWidth > 700)
  }, [])
  return <Layout>
    <Meta title="Intelligence, Built for What’s Next." description="Orbit AI is an intelligent workspace for research, creation, automation, coding, and coordinated agents." path="/" />
    <Helmet><script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Orbit AI', applicationCategory: 'ProductivityApplication', operatingSystem: 'Web, Windows', url: external.app, description: 'Research, create, automate and execute from one intelligent workspace.' })}</script></Helmet>
    <section className="hero">
      <video className="hero-video" autoPlay muted loop playsInline poster="/media/orbit-hero-poster.png"><source src="/media/orbit-hero.mp4" type="video/mp4" media="(min-width: 701px)" /></video>
      <div className="hero-shade" />
      {heavyMotion ? <Suspense fallback={<div className="orbital-fallback" />}><OrbitalScene /></Suspense> : <div className="orbital-fallback" />}
      <div className="hero-content"><p className="eyebrow">ORBIT AI / INTELLIGENT WORKSPACE</p><h1>AI THAT GETS<br />THINGS DONE.</h1><p className="lede">Research, create, automate and execute from one intelligent workspace.</p><div className="actions"><a className="button primary" href={external.app} target="_blank" rel="noopener noreferrer">Launch Orbit <ExternalLink size={17} /></a><a className="button ghost" href="#platform">Explore the platform <ArrowRight size={17} /></a></div></div>
      <div className="hero-status"><span><i /> WORKSPACE AVAILABLE</span><span>ORBIT AI v0.0.20</span></div>
    </section>
    <section className="section platform" id="platform"><div className="section-label">01 / PLATFORM</div><div className="section-intro"><h2>ONE AI.<br />MANY WAYS TO WORK.</h2><p>Orbit adapts across disciplines—from web research and document analysis to code synthesis, artifacts, agents, and automated workflows.</p></div><div className="capability-grid">{capabilities.map(([title, copy, href], index) => <SmartLink className="capability" href={href} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><ArrowRight size={18} /></SmartLink>)}</div></section>
    <section className="model-routing"><Reveal className="model-copy"><p className="section-label">MODEL ROUTING</p><h2>Choose the right intelligence for the work.</h2><p>Orbit can expose different models and access modes according to the user’s plan, selected mode, and current availability.</p><p className="fine-print">Model availability and third-party provider access may change. Orbit does not guarantee a specific external model or version.</p></Reveal><div className="routing-panel">{['Normal', 'Orbit', 'Pulsar', 'Pro', 'Automatic routing', 'Supported external providers when available'].map((name, index) => <div className={index === 4 ? 'active' : ''} key={name}><span>0{index + 1}</span><b>{name}</b><i>{index === 4 ? 'ROUTING' : 'MODE'}</i></div>)}</div></section>
    <section className="section context-section"><p className="section-label">02 / CONTEXT</p><div className="section-intro"><h2>UNDERSTAND<br />THE WORK.</h2><p>Workspace context, intent decomposition, and adaptive planning turn a broad request into a sequence a person can inspect.</p></div><div className="principles">{[['Workspace context', 'Use permitted conversations, files, projects, and results.'], ['Intent decomposition', 'Separate goals, constraints, evidence, and deliverables.'], ['Adaptive planning', 'Revise the path when sources, tools, or review change the work.']].map(([t, p], i) => <Reveal key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{p}</p></Reveal>)}</div><div className="workflow"><blockquote>“Research the best way to launch this product, analyze competitors, and generate a practical launch plan.”</blockquote><div>{['User request', 'Research', 'Comparison', 'Planning', 'Creation', 'Review', 'Final artifact'].map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, '0')}</i>{step}</span>)}</div></div></section>
    <section className="workspace-section"><div className="workspace-copy"><p className="section-label">03 / WORKSPACE</p><h2>A WORKSPACE BUILT FOR EXECUTION.</h2><p>Conversations, files, models, tools, agents, workflows, and results stay together in one focused workspace.</p><SmartLink href="/Routes/orbit-ai" className="text-link">Explore Orbit AI <ArrowRight size={16} /></SmartLink></div><div className="workspace-preview compact"><div className="workspace-top"><span><i /> ORBIT</span><span>Illustrative interface</span></div><aside><button>+ New conversation</button>{['Chat', 'Files', 'Agents', 'Automations'].map(item => <span key={item}>{item}</span>)}<small>RECENT WORK</small><span>Market entry plan</span><span>Repository review</span></aside><div className="workspace-main"><div className="model-pill">MODEL / AUTOMATIC</div><h3>What are we working on?</h3><p>Research the launch, compare competitors, and create a practical plan with sources.</p><div className="message-box"><span>Add a message…</span><div><button>+ Add files</button><button>Tools</button><button>↑</button></div></div></div></div></section>
    <section className="deep-dives">{deepDives.map(([Icon, title, copy], index) => <Reveal className="deep-row" key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></Reveal>)}</section>
    <section className="agents-section"><div><p className="section-label">04 / AGENTS</p><h2>DON’T JUST ASK.<br />LET IT ACT.</h2><p>Give specialized agents a clear role, keep their steps visible, and review consequential outputs and actions.</p><SmartLink href="/Routes/agents" className="button primary">Explore Orbit Agents <ArrowRight size={16} /></SmartLink></div><div className="agent-stack">{[['LEAD', 'Breaks goals into steps and coordinates the result.'], ['BUILDER', 'Produces code, structures, copy, configuration, and deliverables.'], ['RESEARCHER', 'Finds relevant information and sources.'], ['REVIEWER', 'Checks gaps, risks, security, and weak assumptions.']].map(([name, copy], index) => <article key={name}><span>AGENT 0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
    <section className="system-section"><p className="section-label">05 / SYSTEM</p><div className="section-intro"><h2>YOUR WORK. ONE INTELLIGENT LAYER.</h2><p>Orbit connects the AI core to models, agents, applications, files, projects, browser context, voice, automations, the developer API, and the desktop bridge.</p></div><div className="system-map"><strong>ORBIT AI CORE</strong>{['Models', 'Agents', 'Applications', 'Files', 'Projects', 'Browser', 'Voice', 'Automations', 'Developer API', 'Desktop bridge'].map((item, i) => <span style={{ '--i': i } as React.CSSProperties} key={item}>{item}</span>)}</div><SmartLink href="/Routes/Eco" className="text-link">Explore the ecosystem <ArrowRight size={16} /></SmartLink></section>
    <section className="trust-section"><div><p className="section-label">06 / TRUST</p><h2>BUILT FOR CONTROL.</h2><SmartLink href="/Routes/security" className="button ghost">Read about security <ArrowRight size={16} /></SmartLink></div><div className="trust-list">{['Private by default', 'Human review', 'Clear product-status labels', 'Visible actions', 'Account security', 'Revocable API keys', 'Responsible automation', 'Data-deletion controls'].map(item => <span key={item}><Check size={17} />{item}</span>)}</div></section>
    <section className="orbit-mission-section">
      <div className="orbit-mission-grid">
        <Reveal className="mission-copy"><p className="section-label">07 / OUR MISSION</p><h2>MAKE AI SMARTER.<br />BRING IT INTO SPACE.</h2><p>Orbit AI is exploring how intelligent systems can move beyond the ground—processing selected data closer to its source and connecting modular compute platforms in orbit.</p><div className="mission-state"><i /> CONCEPT NETWORK / NOT YET DEPLOYED</div><div className="mission-steps">{[['01', 'Earth intelligence', 'Develop, test, and verify capable AI systems.'], ['02', 'Orbital inference', 'Move selected workloads closer to space-based data.'], ['03', 'Floating data centers', 'Explore a resilient network of modular compute platforms.']].map(([number, title, copy]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div><SmartLink href="/Routes/research" className="text-link">Explore the research mission <ArrowRight size={16} /></SmartLink></Reveal>
        <OrbitMissionMap animate={heavyMotion} />
      </div>
      <p className="mission-disclaimer">Concept visualization. Orbit AI does not currently claim an operational satellite constellation; paths, positions, and node labels are illustrative research targets.</p>
    </section>
    <section className="frontier-section"><img src="/media/pulsar-research.webp" alt="Satellite prototype displayed in a controlled research room" loading="lazy" /><div className="frontier-overlay"><p className="section-label">RESEARCH / ROBOTICS</p><div className="frontier-grid"><article><span className="status research">Research / Prototype / Planned</span><h2>PRO PULSAR</h2><p>Orbit’s language-model and AI-infrastructure initiative spanning model research, inference, training systems, and developer access.</p><SmartLink href="/Routes/pro-pulsar" className="text-link">Explore Pro Pulsar <ArrowRight size={16} /></SmartLink></article><article><span className="status in-development">In development — concept targets only</span><h2>PULSAR V1</h2><p>An agile reconnaissance and support robotics concept designed to explore how intelligent software may work with physical systems.</p><SmartLink href="/Routes/pulsar-v1" className="text-link">Explore Pulsar V1 <ArrowRight size={16} /></SmartLink></article></div></div></section>
    <section className="pricing-preview"><p className="section-label">PLANS / ACCESS</p><h2>SIMPLE PLANS.<br />SERIOUS CAPABILITY.</h2><div>{[['Developer', '€0', 'Free for individuals'], ['Orbit Pro', '€10 / month', 'Parallel agents and Pro Pulsar access'], ['Orbit Team', '€25 / user / month', 'Team capabilities include planned items'], ['Enterprise', 'Custom', 'Terms and readiness confirmed with sales']].map(([name, price, copy]) => <article key={name}><h3>{name}</h3><b>{price}</b><p>{copy}</p></article>)}</div><SmartLink href="/shop" className="button primary">View full pricing <ArrowRight size={16} /></SmartLink></section>
    <section className="final-cta"><p className="section-label">READY / 01</p><h2>ENTER ORBIT.</h2><p>Intelligence that moves with you.</p><div className="actions"><SmartLink href={external.app} className="button primary">Launch Orbit <ExternalLink size={16} /></SmartLink><SmartLink href="/Routes/doc" className="button ghost">Read documentation</SmartLink><SmartLink href="/shop" className="button ghost">View pricing</SmartLink></div></section>
  </Layout>
}
