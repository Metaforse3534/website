import { useQuery } from '@tanstack/react-query'
import type { Session } from '@supabase/supabase-js'
import { Activity, BriefcaseBusiness, CalendarDays, FileText, Image, LayoutDashboard, LogOut, Megaphone, Radio, ScrollText, Settings, ShieldCheck, Users } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Meta } from '../../components/Meta'
import { OrbitMark } from '../../components/SiteChrome'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import { ApplicationsManager, AuditManager, EditorialManager, JobsManager, MediaManager, NoticesManager, ServiceManager } from './AdminManagers'
import './admin.css'

type Section = 'overview' | 'content' | 'notices' | 'service' | 'jobs' | 'applications' | 'media' | 'audit' | 'account'

function ConfigRequired() {
  return <main className="admin-auth"><div className="admin-auth-card"><OrbitMark /><p className="eyebrow">ORBIT ADMIN / SETUP</p><h1>Connect Supabase</h1><p>Add the project URL and publishable key described in <code>.env.example</code>, then restart the site.</p><a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="admin-primary">Open Supabase</a></div></main>
}

function Login({ onSession }: { onSession: (session: Session) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setError('')
    const { data, error: authError } = await supabase!.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (authError || !data.session) setError(authError?.message ?? 'Sign-in failed.')
    else onSession(data.session)
  }
  const recover = async () => {
    setError(''); setNotice('')
    if (!email) { setError('Enter your administrator email first.'); return }
    setBusy(true)
    const { error: recoveryError } = await supabase!.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin` })
    setBusy(false)
    if (recoveryError) setError(recoveryError.message)
    else setNotice('Password setup link sent. Check your email.')
  }
  return <main className="admin-auth"><Meta title="Admin sign in" description="Authorized Orbit administrators only." path="/admin" /><form className="admin-auth-card" onSubmit={submit}>
    <OrbitMark /><p className="eyebrow">ORBIT ADMIN / RESTRICTED</p><h1>Publishing control</h1><p>Use an administrator account invited by Orbit. Public registration is disabled.</p>
    <label>Email<input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required /></label>
    <label>Password<input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required /></label>
    {error && <p className="admin-error" role="alert">{error}</p>}{notice && <p className="admin-success" role="status">{notice}</p>}<button className="admin-primary" disabled={busy}>{busy ? 'Please wait…' : 'Continue'}</button>
    <button className="admin-link-button" type="button" onClick={() => void recover()} disabled={busy}>Set or reset password</button>
    <a href="https://app.orbitdev.org">Return to Orbit</a>
  </form></main>
}

function PasswordRecovery({ onComplete }: { onComplete: () => void }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError('')
    if (password.length < 12) { setError('Use at least 12 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setBusy(true)
    const { error: updateError } = await supabase!.auth.updateUser({ password })
    setBusy(false)
    if (updateError) setError(updateError.message)
    else onComplete()
  }
  return <main className="admin-auth"><form className="admin-auth-card" onSubmit={submit}>
    <OrbitMark /><p className="eyebrow">ORBIT ADMIN / ACCOUNT SETUP</p><h1>Choose a password</h1><p>Use a unique password with at least 12 characters. Authenticator setup follows next.</p>
    <label>New password<input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="new-password" minLength={12} required /></label>
    <label>Confirm password<input type="password" value={confirm} onChange={event => setConfirm(event.target.value)} autoComplete="new-password" minLength={12} required /></label>
    {error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
  </form></main>
}

function MfaGate({ onVerified }: { onVerified: () => void }) {
  const started = useRef(false)
  const [factorId, setFactorId] = useState('')
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { if (started.current) return; started.current = true; void (async () => {
    const { data, error: listError } = await supabase!.auth.mfa.listFactors()
    if (listError) { setError(listError.message); setLoading(false); return }
    const verified = data.totp.find(factor => factor.status === 'verified')
    if (verified) setFactorId(verified.id)
    else {
      const { data: enrolled, error: enrollError } = await supabase!.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Orbit Admin' })
      if (enrollError) setError(enrollError.message)
      else { setFactorId(enrolled.id); setQr(enrolled.totp.qr_code); setSecret(enrolled.totp.secret) }
    }
    setLoading(false)
  })() }, [])

  const verify = async (event: FormEvent) => {
    event.preventDefault(); setError('')
    const { data: challenge, error: challengeError } = await supabase!.auth.mfa.challenge({ factorId })
    if (challengeError) { setError(challengeError.message); return }
    const { error: verifyError } = await supabase!.auth.mfa.verify({ factorId, challengeId: challenge.id, code })
    if (verifyError) setError(verifyError.message)
    else onVerified()
  }
  return <main className="admin-auth"><form className="admin-auth-card" onSubmit={verify}><ShieldCheck size={32} /><p className="eyebrow">SECOND FACTOR</p><h1>{qr ? 'Secure this account' : 'Enter your code'}</h1>
    {loading ? <p>Preparing authenticator verification…</p> : <>{qr && <><p>Scan this QR code with your authenticator app, then enter its six-digit code.</p><img className="mfa-qr" src={qr} alt="Authenticator enrollment QR code" /><details><summary>Can’t scan?</summary><code>{secret}</code></details></>}
    <label>Authenticator code<input inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={event => setCode(event.target.value.replace(/\D/g, ''))} autoComplete="one-time-code" required /></label>
    {error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-primary" disabled={code.length !== 6}>Verify and continue</button></>}
  </form></main>
}

function Overview({ setSection }: { setSection: (section: Section) => void }) {
  const query = useQuery({ queryKey: ['admin-overview'], queryFn: async () => {
    const tables = ['editorial_posts', 'homepage_notices', 'service_updates', 'jobs', 'applications'] as const
    const results = await Promise.all(tables.map(table => supabase!.from(table).select('*', { count: 'exact', head: true })))
    const counts = Object.fromEntries(tables.map((table, index) => [table, results[index].count ?? 0]))
    const [posts, jobs, notices] = await Promise.all([
      supabase!.from('editorial_posts').select('id,title,publish_at,status').not('publish_at', 'is', null).order('publish_at').limit(6),
      supabase!.from('jobs').select('id,title,publish_at,status').not('publish_at', 'is', null).order('publish_at').limit(6),
      supabase!.from('homepage_notices').select('id,title,publish_at,status').not('publish_at', 'is', null).order('publish_at').limit(6),
    ])
    return { counts, upcoming: [...(posts.data ?? []), ...(jobs.data ?? []), ...(notices.data ?? [])].sort((a, b) => new Date(a.publish_at!).getTime() - new Date(b.publish_at!).getTime()).slice(0, 8) }
  } })
  const cards = [
    ['Editorial', query.data?.counts.editorial_posts ?? '—', 'content', FileText], ['Jobs', query.data?.counts.jobs ?? '—', 'jobs', BriefcaseBusiness],
    ['Applications', query.data?.counts.applications ?? '—', 'applications', Users], ['Live notices', query.data?.counts.homepage_notices ?? '—', 'notices', Megaphone],
  ] as const
  return <section><div className="admin-page-title"><div><p className="eyebrow">CONTROL CENTER</p><h1>Overview</h1></div><span className="admin-live"><i /> Supabase connected</span></div>
    <div className="admin-stat-grid">{cards.map(([label, count, section, Icon]) => <button key={label} onClick={() => setSection(section)}><Icon /><span>{label}</span><strong>{count}</strong></button>)}</div>
    <div className="admin-panel"><div className="admin-panel-head"><h2><CalendarDays /> Publishing calendar</h2><span>Europe/Berlin</span></div>{query.isLoading ? <p>Loading calendar…</p> : query.data?.upcoming.length ? <div className="admin-calendar">{query.data.upcoming.map(item => <article key={item.id}><time>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(new Date(item.publish_at!))}</time><strong>{item.title}</strong><span className={`admin-status ${item.status}`}>{item.status}</span></article>)}</div> : <p className="admin-empty">Nothing scheduled yet.</p>}</div>
  </section>
}

const navigation: [Section, string, typeof LayoutDashboard][] = [
  ['overview', 'Overview', LayoutDashboard], ['content', 'Writing', FileText], ['notices', 'Homepage', Megaphone], ['service', 'Service status', Radio],
  ['jobs', 'Careers', BriefcaseBusiness], ['applications', 'Applications', Users], ['media', 'Media', Image], ['audit', 'Audit log', ScrollText], ['account', 'Account', Settings],
]

function Dashboard({ session }: { session: Session }) {
  const [section, setSection] = useState<Section>('overview')
  const content: Record<Section, ReactNode> = {
    overview: <Overview setSection={setSection} />, content: <EditorialManager />, notices: <NoticesManager />, service: <ServiceManager />,
    jobs: <JobsManager />, applications: <ApplicationsManager />, media: <MediaManager />, audit: <AuditManager />,
    account: <section><div className="admin-page-title"><div><p className="eyebrow">SECURITY</p><h1>Account</h1></div></div><div className="admin-panel account-panel"><ShieldCheck /><h2>MFA protected</h2><p>{session.user.email}</p><p>Your administrator role and AAL2 authenticator session are required by database policy for every protected operation.</p><button className="admin-danger" onClick={() => void supabase!.auth.signOut()}>Sign out everywhere</button></div></section>,
  }
  return <div className="admin-shell"><Meta title="Admin workspace" description="Orbit publishing and careers administration." path="/admin" /><aside className="admin-sidebar"><a href="/" className="admin-brand"><OrbitMark /><span>ORBIT<br /><b>CONTROL</b></span></a><nav>{navigation.map(([id, label, Icon]) => <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}><Icon />{label}</button>)}</nav><div className="admin-person"><span>{session.user.email}</span><button aria-label="Sign out" onClick={() => void supabase!.auth.signOut()}><LogOut /></button></div></aside><main className="admin-main"><div className="admin-mobile-nav">{navigation.map(([id, label]) => <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}>{label}</button>)}</div>{content[section]}</main></div>
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)
  const [verified, setVerified] = useState(false)
  const [recovering, setRecovering] = useState(false)
  useEffect(() => {
    if (!supabase) { setReady(true); return }
    void supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next)
      if (event === 'PASSWORD_RECOVERY') setRecovering(true)
    })
    return () => data.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!session) { setVerified(false); return }
    if (session.user.app_metadata.role !== 'admin') {
      void supabase!.auth.signOut().finally(() => window.location.replace('https://app.orbitdev.org'))
      return
    }
    void supabase!.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data }) => setVerified(data?.currentLevel === 'aal2'))
  }, [session])
  if (!isSupabaseConfigured) return <ConfigRequired />
  if (!ready) return <main className="admin-auth"><Activity className="admin-spinner" /></main>
  if (!session) return <Login onSession={setSession} />
  if (session.user.app_metadata.role !== 'admin') return <main className="admin-auth"><p>Redirecting…</p></main>
  if (recovering) return <PasswordRecovery onComplete={() => setRecovering(false)} />
  if (!verified) return <MfaGate onVerified={() => setVerified(true)} />
  return <Dashboard session={session} />
}
