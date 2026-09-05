import { Check, Clipboard, ExternalLink, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { Layout, SmartLink } from '../components/SiteChrome'
import { Meta } from '../components/Meta'
import { external } from '../data/siteData'

const examples = {
  cURL: `curl https://api.orbitdev.org/v1/chat/completions \\\n+  -H "Authorization: Bearer orb_your_api_key" \\\n+  -H "Content-Type: application/json" \\\n+  -d '{"model":"orbit","messages":[{"role":"user","content":"Draft a launch plan"}]}'`,
  JavaScript: `// Generated equivalent of the documented cURL request
const response = await fetch("https://api.orbitdev.org/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer orb_your_api_key",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "orbit",
    messages: [{ role: "user", content: "Draft a launch plan" }]
  })
});
const result = await response.json();`,
  Python: `# Generated equivalent of the documented cURL request
import requests

response = requests.post(
    "https://api.orbitdev.org/v1/chat/completions",
    headers={"Authorization": "Bearer orb_your_api_key"},
    json={
        "model": "orbit",
        "messages": [{"role": "user", "content": "Draft a launch plan"}]
    },
)
result = response.json()`,
}

export default function ApiPage() {
  const [language, setLanguage] = useState<keyof typeof examples>('cURL')
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard.writeText(examples[language]); setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return <Layout><Meta title="BUILD WITH ORBIT AI." description="Orbit completions and agents through a secure, key-authenticated developer API." path="/Routes/DEV" />
    <section className="page-hero api-hero"><div className="page-hero-grid" /><div className="page-hero-content"><p className="eyebrow">DEVELOPER API / v1</p><h1>BUILD WITH ORBIT AI.</h1><p className="lede">Use Orbit completions and your Orbit agents from external applications through a secure, key-authenticated API.</p><div className="actions"><SmartLink href={external.developer} className="button primary">Developer Dashboard <ExternalLink size={16} /></SmartLink><SmartLink href={external.auth} className="button ghost">Create Account <ExternalLink size={16} /></SmartLink></div></div></section>
    <section className="api-shell"><aside><p className="section-label">BASE URL</p><code>https://api.orbitdev.org/v1</code><p className="section-label">AUTHENTICATION</p><code>Authorization: Bearer orb_your_api_key</code><div className="security-note"><ShieldAlert size={20} /><p>Keep keys server-side. Never place API keys in public browser code, mobile bundles, repositories, or logs. Revoke exposed keys immediately.</p></div></aside><div><p className="section-label">FIRST REQUEST</p><div className="code-window"><div className="code-tabs" role="tablist" aria-label="Code language">{Object.keys(examples).map(item => <button role="tab" aria-selected={language === item} onClick={() => setLanguage(item as keyof typeof examples)} key={item}>{item}</button>)}<button className="copy-code" onClick={copy}><Clipboard size={14} />{copied ? 'Copied' : 'Copy'}</button></div><pre><code>{examples[language]}</code></pre></div></div></section>
    <section className="api-details"><div><p className="section-label">CURRENT API TIERS</p><article><h2>Free</h2><b>5 requests / minute</b><span>100 requests / month</span></article><article><h2>Paid</h2><b>30 requests / minute</b><span>10,000 requests / month · current published access price €10 one-time</span></article><p>Cost-bearing AI and agent requests consume one Orbit credit. Usage reads and agent-result reads do not consume credits.</p></div><div><p className="section-label">ENDPOINTS</p>{['POST /chat/completions', 'POST /agents/{agentId}/runs', 'GET /agent-runs/{runId}', 'GET /usage'].map(endpoint => <code className="endpoint" key={endpoint}>{endpoint}</code>)}</div></section>
    <section className="status-codes"><p className="section-label">COMMON STATUSES</p>{[['401', 'Invalid key'], ['402', 'Insufficient credits'], ['422', 'Validation error'], ['429', 'Quota exceeded'], ['500', 'Unexpected server error']].map(([code, label]) => <div key={code}><b>{code}</b><span>{label}</span><Check size={16} /></div>)}</section>
  </Layout>
}
