import { ExternalLink, Mail, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Layout, SmartLink } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { external } from '../data/siteData'

function encodeMail(to: string, subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join('\n\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function FormsPage({ type }: { type: 'contact' | 'reviews' }) {
  const isReview = type === 'reviews'
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setNotice('')
    const data = new FormData(event.currentTarget)
    if (data.get('website')) return
    const required = isReview ? ['name', 'email', 'rating', 'review', 'consent'] : ['full_name', 'email', 'topic', 'message', 'consent']
    const next: Record<string, string> = {}
    required.forEach(key => { if (!data.get(key)) next[key] = 'This field is required.' })
    const email = String(data.get('email') || '')
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) { setNotice('Check the highlighted fields.'); return }
    const values = Object.fromEntries([...data.entries()].filter(([key]) => key !== 'website' && key !== 'consent').map(([key, value]) => [key.replaceAll('_', ' '), String(value)]))
    const href = encodeMail(isReview ? 'support@orbitdev.org' : 'support@orbitdev.org', isReview ? 'Community review submission — moderation requested' : `Website contact — ${values.topic || 'General'}`, values)
    setNotice('Your email application is opening with a prepared message. Review it and send to complete your submission.')
    window.location.href = href
  }

  return <Layout><Meta title={isReview ? 'COMMUNITY FEEDBACK' : 'CONTACT ORBIT AI.'} description={isReview ? 'Submit community feedback to Orbit for moderation.' : 'Contact Orbit AI about product, support, billing, enterprise, security, press, partnerships, or careers.'} path={isReview ? '/Routes/reviews' : '/Routes/contact'} />
    <section className="form-hero"><div><p className="eyebrow">{isReview ? 'REVIEWS / MODERATED SUBMISSIONS' : 'CONTACT / STRAIGHT ANSWERS'}</p><h1>{isReview ? 'COMMUNITY FEEDBACK' : 'CONTACT ORBIT AI.'}</h1><p className="lede">{isReview ? 'Verified reviews are coming soon. Submitted reviews are sent for moderation and are never published automatically.' : 'Questions about the product, security, enterprise licensing, or company information—we will give you straight answers.'}</p></div><div className="form-note"><Mail /><p>No database connection is configured. Submitting this form opens a properly addressed draft in your email application. Nothing is presented as sent until you send that email.</p></div></section>
    <section className="form-layout"><form onSubmit={submit} noValidate>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {isReview ? <>
        <Field name="name" label="Name" error={errors.name} />
        <Field name="email" label="Email" type="email" error={errors.email} />
        <label className="field"><span>Rating</span><select name="rating" aria-invalid={!!errors.rating} defaultValue=""><option value="" disabled>Select a rating</option>{[5,4,3,2,1].map(n => <option key={n} value={n}>{n} / 5</option>)}</select>{errors.rating && <small>{errors.rating}</small>}</label>
        <label className="field full"><span>Review</span><textarea name="review" rows={7} maxLength={2000} aria-invalid={!!errors.review} />{errors.review && <small>{errors.review}</small>}</label>
      </> : <>
        <Field name="full_name" label="Full name" error={errors.full_name} />
        <Field name="email" label="Email address" type="email" error={errors.email} />
        <label className="field"><span>Topic</span><select name="topic" aria-invalid={!!errors.topic} defaultValue=""><option value="" disabled>Select a topic</option>{['Product', 'Account support', 'Billing', 'Enterprise', 'Security', 'Press', 'Partnership', 'Careers', 'Other'].map(item => <option key={item}>{item}</option>)}</select>{errors.topic && <small>{errors.topic}</small>}</label>
        <Field name="company" label="Company (optional)" />
        <label className="field full"><span>Message</span><textarea name="message" rows={7} maxLength={3000} aria-invalid={!!errors.message} />{errors.message && <small>{errors.message}</small>}</label>
      </>}
      <label className="consent full"><input type="checkbox" name="consent" aria-invalid={!!errors.consent} /><span>{isReview ? 'I consent to Orbit receiving and moderating this review. I understand it will not be published automatically.' : 'I consent to Orbit using these details to respond to my request.'}</span></label>{errors.consent && <small className="form-error full">{errors.consent}</small>}
      <div className="form-submit full"><button className="button primary" type="submit">Open email draft <ExternalLink size={15} /></button>{notice && <p role="status">{notice}</p>}</div>
    </form>
    <aside>{isReview ? <><ShieldCheck /><h2>Moderation first.</h2><p>Orbit does not create testimonials or publish submissions automatically. A review can be considered only after authenticity and consent are checked.</p></> : <><p className="section-label">DIRECT CHANNELS</p>{[['General support', 'mailto:support@orbitdev.org'], ['Security disclosure', 'mailto:security@orbitdev.org'], ['Press inquiries', 'mailto:press@orbitdev.org'], ['Careers', 'mailto:apply@orbitdev.org']].map(([label, href]) => <SmartLink href={href} key={label}>{label}<span>{href.replace('mailto:', '')}</span></SmartLink>)}<p className="section-label channel-heading">COMMUNITY</p><SmartLink href={external.github}>GitHub</SmartLink><SmartLink href={external.discord}>Discord</SmartLink></>}</aside></section>
  </Layout>
}

function Field({ name, label, type = 'text', error }: { name: string; label: string; type?: string; error?: string }) {
  return <label className="field"><span>{label}</span><input name={name} type={type} maxLength={180} aria-invalid={!!error} />{error && <small>{error}</small>}</label>
}
