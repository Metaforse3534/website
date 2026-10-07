import { useEffect, useState } from 'react'
import { ArrowRight, Check, ExternalLink, FileCode2, Mic, Orbit, Search, ShieldCheck, Waypoints } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Meta } from '../components/Meta'
import { HomepageNoticeBar } from '../components/HomepageNotice'
import { Layout, OrbitMark, SmartLink } from '../components/SiteChrome'
import { OrbitImage, OrbitVideo } from '../components/media'
import { OrbitReveal, OrbitTextReveal } from '../components/motion'
import { external } from '../data/siteData'

const CAPABILITIES = [
  ['Research', 'Explore technical literature, compare sources, extract structured facts, and produce clear findings.', '/Routes/doc#research'],
  ['Synthesis', 'Turn unstructured ideas into specifications, reports, presentations, documents, and decision-ready outputs.', '/Routes/orbit-ai'],
  ['Code', 'Understand codebases, draft changes, explain systems, and help verify implementation work.', '/Routes/developers'],
  ['Analysis', 'Compare options, evaluate trade-offs, inspect data, and organize complex decisions.', '/Routes/orbit-ai'],
  ['Automation', 'Build repeatable workflows from triggers, agents, conditions, delays, and saved results.', '/Routes/doc#agents-and-workflows'],
  ['Execution', 'Coordinate specialized agents to move a task from request to reviewed output.', '/Routes/agents'],
] as const

const WORKFLOW_STEPS = ['User request', 'Research', 'Comparison', 'Planning', 'Creation', 'Review', 'Final artifact'] as const

const AGENT_STACK = [
  ['LEAD', 'Breaks goals into steps and coordinates the result.'],
  ['BUILDER', 'Produces code, structures, copy, configuration, and deliverables.'],
  ['RESEARCHER', 'Finds relevant information and sources.'],
  ['REVIEWER', 'Checks gaps, risks, security, and weak assumptions.'],
] as const

const SYSTEM_ITEMS = ['MODELS', 'INFERENCE', 'NETWORKING', 'STORAGE', 'POWER', 'DISTRIBUTED SYSTEMS'] as const

const PLATFORM_SURFACES: readonly [LucideIcon, string][] = [
  [Search, 'Research'],
  [Orbit, 'Browser assistance'],
  [FileCode2, 'Code'],
  [Waypoints, 'Artifact creation'],
  [Waypoints, 'Automations'],
  [ShieldCheck, 'Context and memory'],
  [Mic, 'Voice'],
]

const TRUST_ITEMS = [
  'Private by default',
  'Human review',
  'Clear product-status labels',
  'Visible actions',
  'Account security',
  'Revocable API keys',
  'Responsible automation',
  'Data-deletion controls',
] as const

const DEMO_STEPS = [
  ['ASK', 'Analyze this repository and identify the highest-impact architecture risks.'],
  ['UNDERSTAND', 'Pulsar separates the goal, constraints, files, and required evidence.'],
  ['ACT', 'Specialized tools inspect the permitted repository context.'],
  ['RESULT', 'Three prioritized findings are prepared for review.'],
] as const

const MODEL_MODES = ['Normal', 'Orbit', 'Pulsar', 'Pro', 'Automatic routing'] as const

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>
}

function WorkspacePreview() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setStep(current => {
        if (current >= DEMO_STEPS.length - 1) {
          window.clearInterval(timer)
          setRunning(false)
          return current
        }
        return current + 1
      })
    }, 760)
    return () => window.clearInterval(timer)
  }, [running])

  return (
    <div className="interface-preview">
      <div className="interface-bar">
        <span><OrbitMark /></span>
        <span>Illustrative workspace</span>
        <span>AVAILABLE</span>
      </div>
      <div className="interface-body">
        <aside aria-label="Illustration sequence">
          <span>WORKFLOW</span>
          {DEMO_STEPS.map(([label], index) => (
            <button type="button" className={step === index ? 'active' : ''} key={label} onClick={() => { setRunning(false); setStep(index) }}>
              {label}
            </button>
          ))}
        </aside>
        <div className="interface-canvas" aria-live="polite">
          <span>{DEMO_STEPS[step][0]} / PULSAR ILLUSTRATION</span>
          <h3>{DEMO_STEPS[step][1]}</h3>
          <p>This sequence is a product demonstration and does not send a live AI request.</p>
          <div className="task-progress" aria-hidden="true">
            {DEMO_STEPS.map((_, index) => <i key={index} className={index <= step ? 'complete' : ''} />)}
          </div>
          <div className="interface-output">
            <span>WORKSPACE MODES</span>
            <strong>{MODEL_MODES.join(' · ')}</strong>
            <button className="button" type="button" disabled={running} onClick={() => { setStep(0); setRunning(true) }}>
              {running ? 'Illustration running' : 'Run illustration'} <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Layout>
      <HomepageNoticeBar />
      <Meta
        title="Intelligence, Built for What’s Next."
        description="Orbit AI is an intelligent workspace for research, creation, automation, coding, and coordinated agents."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Orbit AI',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web, Windows',
            url: external.app,
            description: 'Research, create, automate and execute from one intelligent workspace.',
          })}
        </script>
      </Helmet>

      <section className="hero" aria-label="Hero introduction">
        <div className="hero-background" aria-hidden="true">
          <OrbitVideo poster="/media/orbit-hero-poster.webp" playbackRate={0.72} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/media/orbit-hero.mp4" type="video/mp4" />
          </OrbitVideo>
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <OrbitTextReveal className="hero-copy" delay={0.08}>
          <p className="eyebrow">ORBIT LABS / INTELLIGENT WORKSPACE</p>
          <h1>AI THAT GETS<br />THINGS DONE.</h1>
          <div className="hero-intro">
            <p>Orbit builds intelligent systems designed to understand, reason, create and act across the digital world.</p>
            <div className="hero-actions">
              <SmartLink className="button" href={external.app}>Explore Orbit <ExternalLink aria-hidden="true" /></SmartLink>
              <a className="text-link text-link--inverse" href="#platform">The Orbit Platform <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </OrbitTextReveal>
        <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <section className="vision section-shell" aria-label="Orbit vision">
        <SectionLabel number="01">ORBIT / VISION</SectionLabel>
        <div className="vision-grid">
          <h2>INTELLIGENCE<br />BUILT TO MOVE.</h2>
          <p>Orbit is building a broader intelligence platform designed to connect models, agents, tools, software and infrastructure into a unified system.</p>
        </div>
        <div className="stage-line" aria-label="Orbit system sequence">
          {['UNDERSTAND', 'REASON', 'CREATE', 'ACT'].map((stage, index) => (
            <div key={stage}><span>0{index + 1} / SYSTEM</span><strong>{stage}</strong></div>
          ))}
        </div>
      </section>

      <section className="platform section-shell" id="platform" aria-label="Orbit platform">
        <SectionLabel number="02">THE ORBIT PLATFORM</SectionLabel>
        <div className="platform-intro">
          <h2>ONE INTELLIGENT<br />WORKSPACE.</h2>
          <p>Orbit adapts across disciplines—from web research and document analysis to code synthesis, artifacts, agents, and automated workflows.</p>
        </div>
        <div className="capability-list">
          {CAPABILITIES.map(([title, copy, href], index) => (
            <OrbitReveal as="article" key={title} delay={index * 0.055}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <SmartLink className="text-link" href={href}>Explore <ArrowRight aria-hidden="true" /></SmartLink>
            </OrbitReveal>
          ))}
        </div>
        <p className="accuracy-note">Model availability and access depend on plan, selection, and current service availability.</p>
      </section>

      <section className="pulsar section-shell" aria-label="Pulsar initiative">
        <SectionLabel number="03">PULSAR / INTELLIGENCE SYSTEMS</SectionLabel>
        <div className="pulsar-layout">
          <div className="pulsar-copy">
            <p className="eyebrow">RESEARCH / IN DEVELOPMENT</p>
            <h2>PRO PULSAR</h2>
            <p>Orbit’s language-model and AI-infrastructure initiative spans model research, inference, training systems, and developer access. Public benchmarks and training results are not claimed.</p>
            <SmartLink className="text-link" href="/Routes/pro-pulsar">Explore Pro Pulsar <ArrowRight aria-hidden="true" /></SmartLink>
          </div>
          <div className="orbit-diagram" aria-label="Model, context, reasoning, tools, and action system diagram">
            <div className="diagram-rings"><i /><i /><i /></div>
            {['MODEL', 'CONTEXT', 'REASONING', 'TOOLS', 'ACTION'].map((item, index) => (
              <div className={`diagram-node node-${index + 1}`} key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
            ))}
            <div className="diagram-center" aria-hidden="true"><Orbit /></div>
          </div>
        </div>
      </section>

      <section className="compute dark-section section-shell" aria-label="Orbit compute and infrastructure">
        <SectionLabel number="04">COMPUTE / INFRASTRUCTURE</SectionLabel>
        <div className="compute-head">
          <h2>COMPUTE FOR<br />INTELLIGENCE.</h2>
          <p>Orbit’s infrastructure work spans inference, training systems, GPUs, networking, storage, cooling, power, and distributed systems. Specific capacity and performance claims are not published.</p>
        </div>
        <div className="compute-image" role="img" aria-label="Illustrative diagram of connected compute infrastructure">
          <div className="network-grid" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <span key={index} />)}</div>
          <p>INFRASTRUCTURE / SYSTEM DIAGRAM</p>
        </div>
        <div className="systems-strip">
          {SYSTEM_ITEMS.map((item, index) => (
            <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="products section-shell" aria-label="Orbit products">
        <SectionLabel number="05">PRODUCTS / ECOSYSTEM</SectionLabel>
        <div className="products-head">
          <h2>BUILT AS<br />A SYSTEM.</h2>
          <p>Released tools and developing concepts are labeled separately. Availability, status, and access remain explicit.</p>
        </div>
        <div className="product-list">
          {[
            ['01', 'Orbit AI', 'Digital intelligence workspace for research, creation, automation, and coordinated agents.', 'AVAILABLE', '/Routes/orbit-ai'],
            ['02', 'Pro Pulsar', 'Language-model and AI-infrastructure initiative.', 'RESEARCH', '/Routes/pro-pulsar'],
            ['03', 'Orbit Extension', 'Browser context and review-first assistance.', 'AVAILABLE', '/Routes/extension'],
            ['04', 'Orbit Desktop', 'Windows app with selected desktop actions and artifact workflows.', 'AVAILABLE', '/Routes/orbit-ai'],
            ['05', 'Pulsar V1', 'Robotics concept exploring software working with physical systems.', 'IN DEVELOPMENT', '/Routes/pulsar-v1'],
          ].map(([number, title, copy, status, href]) => (
            <article key={title}>
              <span className="product-index">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="status-pill">{status}</span>
              <SmartLink className="text-link" href={href} aria-label={`Explore ${title}`}><ArrowRight aria-hidden="true" /></SmartLink>
            </article>
          ))}
        </div>
      </section>

      <section className="orbit-ai section-shell" aria-label="Orbit AI workspace">
        <SectionLabel number="06">ORBIT AI / WORKSPACE</SectionLabel>
        <div className="ai-layout">
          <div className="ai-copy">
            <p className="eyebrow">WEB / WINDOWS</p>
            <h2>FROM REQUEST<br />TO REVIEWED WORK.</h2>
            <p>Keep conversations, files, models, tools, agents, workflows, and results together in one focused workspace. Outputs remain available for human review.</p>
            <SmartLink className="button" href="/Routes/orbit-ai">Explore Orbit AI <ArrowRight aria-hidden="true" /></SmartLink>
          </div>
          <WorkspacePreview />
        </div>
        <div className="model-modes" aria-label="Orbit model modes">
          <span>MODEL MODES</span>
          <div className="model-mode-list">{MODEL_MODES.map(mode => <span key={mode}>{mode}</span>)}</div>
          <p>Mode and model availability depend on account, plan, and current service availability. External provider models are not presented as a fixed public catalog.</p>
        </div>
      </section>

      <section className="research dark-section section-shell" aria-label="Orbit research">
        <SectionLabel number="07">RESEARCH / FOUNDATIONS</SectionLabel>
        <div className="research-layout">
          <div>
            <p className="eyebrow">RESEARCH IN DEVELOPMENT</p>
            <h2>BUILDING TOWARD<br />MORE GENERAL<br />INTELLIGENCE.</h2>
            <p>Orbit’s research areas include models, reasoning, agents, multimodal systems, evaluation, and infrastructure. Public research claims are limited to published work.</p>
          </div>
          <div className="research-list">
            {['Models', 'Reasoning', 'Agents', 'Multimodal systems', 'Evaluation', 'Infrastructure'].map((item, index) => (
              <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
            ))}
          </div>
        </div>
        <p className="research-note">No unpublished papers, benchmarks, or research results are represented as public achievements.</p>
      </section>

      <section className="devices section-shell" aria-label="Orbit device concepts">
        <SectionLabel number="08">DEVICES / CONCEPTS</SectionLabel>
        <div className="devices-head">
          <h2>INTELLIGENCE,<br />PRESENT.</h2>
          <p>Future device concepts are shown as concepts—not released products, specifications, or launch commitments.</p>
        </div>
        <div className="device-composition">
          <div className="architecture-frame">
            <OrbitImage src="/media/robotics-actuator-concept.png" alt="Orbit robotics actuator concept shown in a monochrome engineering scene" aspectRatio="4 / 3" />
            <span>ROBOTICS / CONCEPT VISUAL</span>
          </div>
          <div className="concept-list">
            {[
              ['ORBIT GLASS', 'Future wearable intelligence interface.', null],
              ['ORBIT WATCH', 'Future personal interface concept.', null],
              ['ORBIT ROBOTICS', 'Research into intelligent software and physical systems.', '/Routes/pulsar-v1'],
            ].map(([title, copy, href], index) => (
              <article key={title}>
                <span>CONCEPT / 0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                {href && <SmartLink className="text-link" href={href}>Explore concept <ArrowRight aria-hidden="true" /></SmartLink>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-mission section-shell" aria-label="Orbit company and trust">
        <SectionLabel number="09">ORBIT LABS / PRINCIPLES</SectionLabel>
        <div>
          <h2>INTELLIGENCE<br />ENGINEERED WITH<br />HUMAN CONTROL.</h2>
          <p>Orbit is a pre-launch project operated under the Orbit Labs name in the Netherlands. Our public product story distinguishes available capabilities from research and planned work.</p>
        </div>
        <div className="company-principles">
          <div>
            {TRUST_ITEMS.map((item, index) => (
              <OrbitReveal as="article" key={item}>
                <span>0{index + 1}</span><h3>{item}</h3><Check aria-hidden="true" />
              </OrbitReveal>
            ))}
          </div>
        </div>
        <div className="workflow-strip">
          {WORKFLOW_STEPS.map((step, index) => <span key={step}><i>0{index + 1}</i>{step}</span>)}
        </div>
        <div className="platform-capabilities" aria-label="Ways to work with Orbit">
          {PLATFORM_SURFACES.map(([Icon, title]) => (
            <span key={title}><Icon aria-hidden="true" />{title}</span>
          ))}
        </div>
      </section>

      <section className="page-cta" aria-label="Explore Orbit">
        <p className="eyebrow">ORBIT LABS</p>
        <h2>AI THAT GETS THINGS DONE.</h2>
        <div className="hero-actions">
          <SmartLink className="button button--inverse" href={external.app}>Explore Orbit <ExternalLink aria-hidden="true" /></SmartLink>
          <SmartLink className="text-link text-link--inverse" href="/Routes/doc">Read documentation <ArrowRight aria-hidden="true" /></SmartLink>
          <SmartLink className="text-link text-link--inverse" href="/shop">View pricing <ArrowRight aria-hidden="true" /></SmartLink>
        </div>
      </section>
    </Layout>
  )
}
