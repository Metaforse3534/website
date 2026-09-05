import { Check, Clipboard, Link as LinkIcon, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'

const sections = [
  { id: 'overview', title: 'Overview', copy: 'Orbit AI is an authenticated workspace for chat, coding assistance, text-file analysis, agent teamwork, automations, voice interaction, and artifact creation. Image generation depends on a connected backend; most document-creation commands require the desktop bridge.' },
  { id: 'getting-started', title: 'Getting started', copy: 'Create an account, sign in, start a conversation, select an available model mode, and describe the outcome you need. Add permitted files only when they improve the task.' },
  { id: 'chat-and-files', title: 'Chat and files', copy: 'Attach up to three supported text files per message. Each file must be under 250 KB. Supported extensions: txt, md, csv, json, js, jsx, ts, tsx, html, css, py, java, c, cpp, rs, go, xml, yml, yaml.' },
  { id: 'models-and-access', title: 'Models and access', copy: 'Normal, Orbit, Pulsar, Pro, and automatic routing can appear according to plan and availability. External provider access and model versions can change.' },
  { id: 'agents-and-workflows', title: 'Agents and workflows', copy: 'Lead, Builder, Researcher, and Reviewer agents can execute visible steps. Automations connect manual or scheduled triggers to agents, conditions, delays, and saved results. Review consequential output.' },
  { id: 'voice-engine', title: 'Voice engine', copy: 'Voice provides another input and interaction mode when it is enabled for the account and connected surface.' },
  { id: 'desktop-application', title: 'Desktop application', copy: 'The documented Windows application provides the desktop bridge used by selected creation workflows and desktop actions. A public macOS release is not claimed.' },
  { id: 'browser-extension', title: 'Browser extension', copy: 'Extension Pro can share readable page context and selected text, answer questions about a page, and suggest form content for direct user review.' },
  { id: 'account-and-billing', title: 'Account and billing', copy: 'Authentication is required. Use account settings for your own controls and billing for subscriptions. Product plans, API tiers, and credit packs are distinct.' },
  { id: 'application-routes', title: 'Application routes', copy: '/auth · / · /automations · /deployments · /history · /settings · /shop · /billing · /podcast · /extension · /Support · /portal · /admin · /privacy · /terms' },
  { id: 'developer-api', title: 'Developer API', copy: 'The API uses secure, key-authenticated requests at https://api.orbitdev.org/v1. Keep API keys on trusted servers and handle documented errors.' },
  { id: 'rules', title: 'Rules', copy: 'Protect credentials, use only authorized content and systems, check generated work, review actions, respect people, respect systems, and report problems without exposing secrets.' },
]
const commands = ['/image', '/pdf', '/powerpoint', '/excel', '/word', '/csv']

export default function DocsPage() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState('')
  const filtered = useMemo(() => sections.filter(s => `${s.title} ${s.copy}`.toLowerCase().includes(query.toLowerCase())), [query])
  const copyText = async (id: string, value: string) => { await navigator.clipboard.writeText(value); setCopied(id); setTimeout(() => setCopied(''), 1400) }
  return <Layout><Meta title="HOW ORBIT ACTUALLY WORKS." description="Orbit AI documentation for chat, files, models, agents, voice, desktop, browser, billing, routes, and API access." path="/Routes/doc" />
    <section className="docs-hero"><div><p className="eyebrow">DOCUMENTATION / CURRENT PRODUCT</p><h1>HOW ORBIT<br />ACTUALLY WORKS.</h1></div><div className="docs-status"><span><i /> Orbit AI v0.0.20</span><span>Web and Windows desktop</span><span>Authentication required</span></div></section>
    <div className="docs-layout"><aside className="docs-nav"><label><Search size={15} /><span className="sr-only">Search documentation</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search documentation" /></label><nav aria-label="Documentation sections">{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav></aside><article className="docs-content">{filtered.length ? filtered.map((section, index) => <section id={section.id} key={section.id}><span className="doc-index">{String(index + 1).padStart(2, '0')}</span><h2>{section.title}</h2><p>{section.copy}</p>{section.id === 'chat-and-files' && <div className="support-strip"><Check size={17} /> Three files maximum · each under 250 KB</div>}{section.id === 'desktop-application' && <div className="command-grid">{commands.map(command => <button key={command} onClick={() => copyText(command, command)}><code>{command}</code><Clipboard size={14} />{copied === command && <span>Copied</span>}</button>)}</div>}<button className="copy-link" onClick={() => copyText(section.id, `${location.origin}/Routes/doc#${section.id}`)}><LinkIcon size={14} />{copied === section.id ? 'Copied page link' : 'Copy section link'}</button></section>) : <div className="empty-docs"><Search /><h2>No matching section</h2><p>Try a broader term such as agents, files, billing, or API.</p></div>}</article><aside className="toc"><p>ON THIS PAGE</p>{filtered.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</aside></div>
  </Layout>
}
