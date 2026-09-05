import { Cookie, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type ConsentChoice = {
  necessary: true
  preferences: boolean
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

const storageKey = 'orbit-cookie-consent-v1'
const optionalDefaults = { preferences: false, analytics: false, marketing: false }

function readChoice(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(storageKey)
    if (!value) return null
    const parsed = JSON.parse(value) as Partial<ConsentChoice>
    if (parsed.necessary !== true) return null
    return {
      necessary: true,
      preferences: parsed.preferences === true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => readChoice())
  const [draft, setDraft] = useState(optionalDefaults)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)

  const openSettings = () => {
    setDraft(choice ? { preferences: choice.preferences, analytics: choice.analytics, marketing: choice.marketing } : optionalDefaults)
    setSettingsOpen(true)
  }

  const save = (optional: typeof optionalDefaults) => {
    const next: ConsentChoice = { necessary: true, ...optional, updatedAt: new Date().toISOString() }
    localStorage.setItem(storageKey, JSON.stringify(next))
    setChoice(next)
    setSettingsOpen(false)
    window.dispatchEvent(new CustomEvent('orbit:consent-changed', { detail: next }))
  }

  useEffect(() => {
    window.addEventListener('orbit:open-cookie-settings', openSettings)
    return () => window.removeEventListener('orbit:open-cookie-settings', openSettings)
  })

  useEffect(() => {
    if (!settingsOpen) return
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('cookie-settings-open')
    const focusables = dialog.current?.querySelectorAll<HTMLElement>('button,input,a')
    focusables?.[0]?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSettingsOpen(false)
      if (event.key === 'Tab' && focusables?.length) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('cookie-settings-open')
      previous?.focus()
    }
  }, [settingsOpen])

  return <>
    {!choice && !settingsOpen && <section className="cookie-banner" aria-label="Cookie consent" role="region">
      <div className="cookie-banner-icon" aria-hidden="true"><Cookie /></div>
      <div className="cookie-banner-copy"><p className="eyebrow">PRIVACY / YOUR CONTROL</p><h2>Choose what enters your orbit.</h2><p>Essential storage keeps the site secure and remembers this choice. Optional categories stay off unless you allow them.</p><Link to="/Routes/cookies">Read the Cookie Policy</Link></div>
      <div className="cookie-banner-actions"><button className="button ghost" type="button" onClick={openSettings}><SlidersHorizontal size={16} />Settings</button><button className="button ghost" type="button" onClick={() => save(optionalDefaults)}>Reject optional</button><button className="button primary" type="button" onClick={() => save({ preferences: true, analytics: true, marketing: true })}>Accept all</button></div>
    </section>}

    {settingsOpen && <div className="cookie-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSettingsOpen(false) }}>
      <div className="cookie-modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-description">
        <header><div><p className="eyebrow">ORBIT CONSENT CONTROL</p><h2 id="cookie-settings-title">Cookie settings</h2></div><button className="cookie-modal-close" type="button" onClick={() => setSettingsOpen(false)} aria-label="Close cookie settings"><X /></button></header>
        <p id="cookie-settings-description" className="cookie-settings-intro">Choose which optional browser technologies Orbit may use. Essential storage is always active because it supports security and remembers your decision.</p>
        <div className="cookie-categories">
          <article><div><ShieldCheck aria-hidden="true" /><div><h3>Necessary</h3><p>Security, authentication, load balancing, and consent storage.</p></div></div><label><span>Always on</span><input type="checkbox" checked disabled aria-label="Necessary cookies always on" /></label></article>
          <article><div><SlidersHorizontal aria-hidden="true" /><div><h3>Preferences</h3><p>Remember optional interface and experience choices.</p></div></div><label><span>{draft.preferences ? 'On' : 'Off'}</span><input type="checkbox" checked={draft.preferences} onChange={event => setDraft(current => ({ ...current, preferences: event.target.checked }))} aria-label="Allow preference storage" /></label></article>
          <article><div><Cookie aria-hidden="true" /><div><h3>Analytics</h3><p>Measure aggregate use and site performance if analytics are connected.</p></div></div><label><span>{draft.analytics ? 'On' : 'Off'}</span><input type="checkbox" checked={draft.analytics} onChange={event => setDraft(current => ({ ...current, analytics: event.target.checked }))} aria-label="Allow analytics storage" /></label></article>
          <article><div><Cookie aria-hidden="true" /><div><h3>Marketing</h3><p>Support consent-controlled campaign measurement if it is introduced.</p></div></div><label><span>{draft.marketing ? 'On' : 'Off'}</span><input type="checkbox" checked={draft.marketing} onChange={event => setDraft(current => ({ ...current, marketing: event.target.checked }))} aria-label="Allow marketing storage" /></label></article>
        </div>
        <p className="cookie-current-state">Orbit currently loads no analytics or marketing tags on this website. Optional consent is stored for future integrations and can be changed at any time.</p>
        <footer><Link to="/Routes/cookies" onClick={() => setSettingsOpen(false)}>Cookie Policy</Link><div><button className="button ghost" type="button" onClick={() => save(optionalDefaults)}>Reject optional</button><button className="button primary" type="button" onClick={() => save(draft)}>Save choices</button></div></footer>
      </div>
    </div>}
  </>
}
