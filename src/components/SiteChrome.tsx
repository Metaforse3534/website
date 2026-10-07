import { ExternalLink, Github } from 'lucide-react'
import { Fragment, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { external } from '../data/siteData'
import { CookieConsent } from './CookieConsent'
import { OrbitMarkLoader, useDelayedPending } from './loading'
import { OrbitPageTransition } from './motion/OrbitPageTransition'

export const navGroups = [
  { label: 'Product', links: [['Orbit AI Workspace', '/Routes/orbit-ai'], ['Orbit Agents', '/Routes/agents'], ['Orbit Ecosystem', '/Routes/Eco'], ['Extension Pro', '/Routes/extension'], ['Pricing', '/shop']] },
  { label: 'Research', links: [['Pro Pulsar', '/Routes/pro-pulsar'], ['Pulsar Research', '/Routes/pulsar'], ['Pulsar V1 Robotics', '/Routes/pulsar-v1'], ['Research', '/Routes/research']] },
  { label: 'Developers', links: [['Developer Platform', '/Routes/developers'], ['Developer API', '/Routes/DEV'], ['Documentation', '/Routes/doc'], ['GitHub', external.github]] },
  { label: 'Company', links: [['About', '/Routes/about'], ['Architects', '/Routes/architects'], ['Updates', '/Routes/updates'], ['Security', '/Routes/security'], ['Network Status', '/Routes/network'], ['Blog', '/Routes/blog'], ['Careers', '/Routes/careers'], ['Press', '/Routes/press'], ['Contact', '/Routes/contact']] },
] as const

export function OrbitMark() {
  return <span className="orbit-brand" aria-hidden="true">
    <span className="orbit-brand-icon"><img src="/media/orbit-brand-icon.png" alt="" /></span>
    <span className="orbit-brand-name">orbit//ai</span>
  </span>
}

function SmartLink({ href, children, className, onClick, 'aria-label': ariaLabel }: { href: string; children: ReactNode; className?: string; onClick?: () => void; 'aria-label'?: string }) {
  const externalLink = /^https?:|^mailto:/.test(href)
  return externalLink
    ? <a href={href} className={className} onClick={onClick} aria-label={ariaLabel} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>
    : <Link to={href} className={className} onClick={onClick} aria-label={ariaLabel}>{children}</Link>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 851px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('menu-open')
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
    return () => { document.removeEventListener('keydown', handle); document.body.classList.remove('menu-open'); previous?.focus() }
  }, [open])

  return <header className={`site-header${scrolled ? ' scrolled' : ''}${isHome ? ' site-header--hero' : ''}`}>
    <Link className="brand" to="/" aria-label="Orbit AI home"><OrbitMark /></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navGroups.map(group => <details className="nav-group" key={group.label}>
        <summary>{group.label}</summary>
        <div className="nav-dropdown">{group.links.map(([label, href]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}</div>
      </details>)}
      <Link to="/shop">Pricing</Link>
    </nav>
    <div className="header-actions">
      <SmartLink className="header-cta" href={external.app}>Launch Orbit <ExternalLink aria-hidden="true" size={14} /></SmartLink>
      <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(current => !current)}><span /><span /></button>
    </div>
    {open && createPortal(<div className="mobile-menu is-open" id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Navigation">
      <nav aria-label="Mobile navigation">
        {navGroups.map(group => <div key={group.label}><span>{group.label}</span>{group.links.map(([label, href]) => <SmartLink key={href} href={href} onClick={() => setOpen(false)}>{label}</SmartLink>)}</div>)}
        <SmartLink href="/shop" onClick={() => setOpen(false)}>Pricing</SmartLink>
      </nav>
      <div className="mobile-menu-actions"><SmartLink href={external.app} className="button" onClick={() => setOpen(false)}>Launch Orbit <ExternalLink aria-hidden="true" /></SmartLink></div>
    </div>, document.body)}
  </header>
}

const footerColumns = [
  ['Product', [['Orbit AI', '/Routes/orbit-ai'], ['Agents', '/Routes/agents'], ['Ecosystem', '/Routes/Eco'], ['Extension Pro', '/Routes/extension'], ['Pricing', '/shop'], ['Launch Orbit', external.app]]],
  ['Research', [['Pro Pulsar', '/Routes/pro-pulsar'], ['Pulsar', '/Routes/pulsar'], ['Pulsar V1', '/Routes/pulsar-v1'], ['Research', '/Routes/research']]],
  ['Developers', [['Documentation', '/Routes/doc'], ['Developer API', '/Routes/DEV'], ['Developer Dashboard', external.developer], ['GitHub', external.github]]],
  ['Company', [['About', '/Routes/about'], ['Architects', '/Routes/architects'], ['Updates', '/Routes/updates'], ['Blog', '/Routes/blog'], ['Reviews', '/Routes/reviews'], ['Careers', '/Routes/careers'], ['Press', '/Routes/press'], ['Contact', '/Routes/contact']]],
  ['Support', [['Support', '/Routes/support'], ['Network Status', '/Routes/network'], ['Security', '/Routes/security']]],
  ['Legal', [['Terms', '/Routes/terms'], ['Privacy', '/Routes/privacy'], ['Cookies', '/Routes/cookies'], ['Acceptable Use', '/Routes/acceptable'], ['AI Usage', '/Routes/ai-usage'], ['AI Transparency', '/Routes/ai-transparency'], ['Payments & Refunds', '/Routes/refund'], ['DPA', '/Routes/dpa'], ['Subprocessors', '/Routes/subprocessors'], ['Legal Notice', '/Routes/legal-notice'], ['Copyright', '/Routes/copyright'], ['Trademarks', '/Routes/trademark'], ['Open Source', '/Routes/open-source'], ['Accessibility', '/Routes/accessibility'], ['Security Disclosure', '/Routes/security-policy'], ['Orbit Rules', '/Routes/rules']]],
] as const

export function Footer() {
  return <footer className="footer">
    <div className="footer-cta">
      <p className="eyebrow">ORBIT LABS / INTELLIGENCE, ENGINEERED</p>
      <h2>AI THAT GETS THINGS DONE.</h2>
      <SmartLink className="button button--inverse" href={external.app}>Explore Orbit <ExternalLink aria-hidden="true" /></SmartLink>
    </div>
    <div className="footer-main">
      <Link className="brand brand--footer" to="/" aria-label="Orbit Labs home"><OrbitMark /></Link>
      <nav className="footer-links" aria-label="Footer navigation">{footerColumns.map(([title, links]) => <section key={title} aria-labelledby={`footer-${title.toLowerCase()}`}>
        <h3 id={`footer-${title.toLowerCase()}`} className="footer-column-title">{title}</h3>
        {links.map(([label, href]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}
      </section>)}</nav>
    </div>
    <div className="footer-base">
      <div className="footer-meta"><span>Orbit AI is a pre-launch project operated under the Orbit Labs name in the Netherlands.</span><span>© {new Date().getFullYear()} Orbit Labs.</span></div>
      <nav className="footer-tools" aria-label="Footer utilities">
        <a href={external.github} target="_blank" rel="noopener noreferrer">GitHub <ExternalLink aria-hidden="true" size={12} /></a>
        <a href={external.discord} target="_blank" rel="noopener noreferrer">Discord <ExternalLink aria-hidden="true" size={12} /></a>
        <Link to="/Routes/network">Network status</Link>
        <button type="button" onClick={() => window.dispatchEvent(new Event('orbit:open-cookie-settings'))}>Cookie settings</button>
      </nav>
    </div>
  </footer>
}

function DelayedRouteLoader() {
  const visible = useDelayedPending(true)
  return visible ? <div className="route-loader" role="status" aria-live="polite"><OrbitMarkLoader label="Loading page" /><span>Loading Orbit</span></div> : null
}

export function PublicShell() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main"><Suspense fallback={<DelayedRouteLoader />}><OrbitPageTransition><Outlet /></OrbitPageTransition></Suspense></main>
    <Footer />
    <CookieConsent />
  </>
}

export function Layout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}

export { SmartLink }
