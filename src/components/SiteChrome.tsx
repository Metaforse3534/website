import { ExternalLink, Github, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { external } from '../data/siteData'

export const navGroups = [
  { label: 'Product', links: [['Orbit AI Workspace', '/Routes/orbit-ai'], ['Orbit Agents', '/Routes/agents'], ['Orbit Ecosystem', '/Routes/Eco'], ['Extension Pro', '/Routes/extension'], ['Pricing', '/shop']] },
  { label: 'Research', links: [['Pro Pulsar', '/Routes/pro-pulsar'], ['Pulsar Research', '/Routes/pulsar'], ['Pulsar V1 Robotics', '/Routes/pulsar-v1'], ['Research', '/Routes/research']] },
  { label: 'Developers', links: [['Developer Platform', '/Routes/developers'], ['Developer API', '/Routes/DEV'], ['Documentation', '/Routes/doc'], ['GitHub', external.github]] },
  { label: 'Company', links: [['About', '/Routes/about'], ['Architects', '/Routes/architects'], ['Security', '/Routes/security'], ['Network Status', '/Routes/network'], ['Blog', '/Routes/blog'], ['Careers', '/Routes/careers'], ['Press', '/Routes/press'], ['Contact', '/Routes/contact']] },
] as const

export function OrbitMark() {
  return <span className="mark" aria-hidden="true"><i /><i /><b /></span>
}

function SmartLink({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const externalLink = /^https?:|^mailto:/.test(href)
  return externalLink
    ? <a href={href} className={className} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>
    : <Link to={href} className={className} onClick={onClick}>{children}</Link>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('menu-active')
    const focusables = panel.current?.querySelectorAll<HTMLElement>('a,button,summary')
    focusables?.[0]?.focus()
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'Tab' && focusables?.length) {
        const first = focusables[0], last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handle)
    return () => { document.removeEventListener('keydown', handle); document.body.classList.remove('menu-active'); previous?.focus() }
  }, [open])

  return <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
    <Link className="brand" to="/" aria-label="Orbit AI home"><OrbitMark /><span>ORBIT AI</span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navGroups.map(group => <details className="nav-group" key={group.label}>
        <summary>{group.label}</summary>
        <div className="nav-dropdown">{group.links.map(([label, href]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}</div>
      </details>)}
      <Link to="/shop">Pricing</Link>
    </nav>
    <a className="nav-cta" href={external.app} target="_blank" rel="noopener noreferrer">Launch Orbit <ExternalLink aria-hidden="true" size={14} /></a>
    <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <div className="mobile-panel" id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Navigation">
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navGroups.map(group => <details key={group.label}><summary>{group.label}</summary>{group.links.map(([label, href]) => <SmartLink key={href} href={href} onClick={() => setOpen(false)}>{label}</SmartLink>)}</details>)}
        <SmartLink href="/shop" onClick={() => setOpen(false)}>Pricing</SmartLink>
        <SmartLink href={external.app} className="button primary" onClick={() => setOpen(false)}>Launch Orbit</SmartLink>
      </nav>
    </div>}
  </header>
}

const footerColumns = [
  ['Product', [['Orbit AI', '/Routes/orbit-ai'], ['Agents', '/Routes/agents'], ['Ecosystem', '/Routes/Eco'], ['Extension Pro', '/Routes/extension'], ['Pricing', '/shop'], ['Launch Orbit', external.app]]],
  ['Research', [['Pro Pulsar', '/Routes/pro-pulsar'], ['Pulsar', '/Routes/pulsar'], ['Pulsar V1', '/Routes/pulsar-v1'], ['Research', '/Routes/research']]],
  ['Developers', [['Documentation', '/Routes/doc'], ['Developer API', '/Routes/DEV'], ['Developer Dashboard', external.developer], ['GitHub', external.github]]],
  ['Company', [['About', '/Routes/about'], ['Architects', '/Routes/architects'], ['Blog', '/Routes/blog'], ['Reviews', '/Routes/reviews'], ['Careers', '/Routes/careers'], ['Press', '/Routes/press'], ['Contact', '/Routes/contact']]],
  ['Support', [['Support', '/Routes/support'], ['Network Status', '/Routes/network'], ['Security', '/Routes/security']]],
  ['Legal', [['Terms', '/Routes/terms'], ['Privacy', '/Routes/privacy'], ['Cookie Policy', '/Routes/cookies'], ['Acceptable Use', '/Routes/acceptable'], ['AI Usage Policy', '/Routes/ai-usage'], ['Refund Policy', '/Routes/refund'], ['Data Processing Agreement', '/Routes/dpa'], ['Orbit Rules', '/Routes/rules']]],
] as const

export function Footer() {
  return <footer className="footer">
    <div className="footer-columns">{footerColumns.map(([title, links]) => <div key={title}><h2>{title}</h2>{links.map(([label, href]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}</div>)}</div>
    <div className="footer-wordmark">ORBIT SYSTEMS</div>
    <div className="footer-bottom"><p>Orbit AI is developed by Orbit Systems B.V. in the Netherlands.</p><p>© {new Date().getFullYear()} Orbit Systems B.V.</p><p>Intelligence, Built for What’s Next.</p><div className="footer-social"><a href={external.github} target="_blank" rel="noopener noreferrer" aria-label="Orbit AI on GitHub"><Github size={17} /></a><a href={external.discord} target="_blank" rel="noopener noreferrer">Discord <ExternalLink size={12} /></a><Link to="/Routes/network"><i /> View network status</Link></div></div>
  </footer>
}

export function Layout({ children }: { children: ReactNode }) {
  return <><a className="skip" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /></>
}

export { SmartLink }
