import { Clipboard, ExternalLink, Printer } from 'lucide-react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Layout } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { legalDocuments } from '../data/legalData'

export default function LegalPage({ path }: { path: string }) {
  const document = legalDocuments.find(item => item.path === path)
  const [copied, setCopied] = useState(false)
  if (!document) return <Navigate to="/404" replace />
  const copy = async () => { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1400) }
  return <Layout><Meta title={document.title} description={document.description} path={document.path} />
    <article className="legal-page"><header><p className="eyebrow">ORBIT SYSTEMS B.V. / LEGAL</p><h1>{document.title}</h1><p>{document.description}</p><div><span>Last updated: {document.updated}</span><button onClick={() => window.print()}><Printer size={15} />Print</button><button onClick={copy}><Clipboard size={15} />{copied ? 'Copied' : 'Copy link'}</button><a href="/Routes/contact">Contact <ExternalLink size={13} /></a></div></header><div className="legal-layout"><aside><p>CONTENTS</p>{document.sections.map((section, index) => <a key={section.title} href={`#legal-${index + 1}`}>{index + 1}. {section.title}</a>)}</aside><div className="legal-content">{document.sections.map((section, index) => <section id={`legal-${index + 1}`} key={section.title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></div>
    </article>
  </Layout>
}
