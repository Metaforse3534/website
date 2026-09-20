import { useEffect, useState } from 'react'
import { OrbitDemoLoader } from './loading'

const nodes = ['Models', 'Tools', 'Context', 'Files', 'Web', 'Agents']

export function PulsarCore() {
  const [active, setActive] = useState(0)
  const [working, setWorking] = useState(false)

  useEffect(() => {
    if (!working) return
    const interval = window.setInterval(() => setActive(value => (value + 1) % nodes.length), 700)
    const complete = window.setTimeout(() => setWorking(false), 3200)
    return () => { window.clearInterval(interval); window.clearTimeout(complete) }
  }, [working])

  return <section className={`pulsar-core${working ? ' is-working' : ''}`} aria-label="Illustrative Pulsar capability map">
    <div className="pulsar-copy"><p className="section-label">PULSAR / CORE</p><h2>ONE INTELLIGENCE.<br />EVERY CAPABILITY.</h2><p>This deterministic visualization shows how Pulsar can coordinate models, tools, and permitted context. It is an illustration, not a live AI request.</p><button type="button" className="button ghost" onClick={() => { setActive(0); setWorking(true) }} disabled={working}>{working ? 'Pulsar working' : 'Run illustration'}</button></div>
    <div className="pulsar-visual" aria-live="polite">
      <svg viewBox="0 0 500 360" aria-hidden="true"><g className="pulsar-lines">{nodes.map((_, index) => { const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2; const x = 250 + Math.cos(angle) * 155; const y = 180 + Math.sin(angle) * 120; return <line key={index} x1="250" y1="180" x2={x} y2={y} /> })}</g><circle className="pulsar-orbit" cx="250" cy="180" rx="155" ry="120" /><circle className="pulsar-core-dot" cx="250" cy="180" r="13" /></svg>
      <strong>PULSAR</strong>
      {nodes.map((node, index) => { const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2; return <button type="button" key={node} className={active === index ? 'active' : ''} style={{ '--node-x': `${50 + Math.cos(angle) * 38}%`, '--node-y': `${50 + Math.sin(angle) * 34}%` } as React.CSSProperties} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>{node}</button> })}
      {working && <OrbitDemoLoader label={`Pulsar is coordinating ${nodes[active].toLowerCase()}`} />}
    </div>
  </section>
}
