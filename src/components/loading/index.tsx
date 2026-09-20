import ClipLoader from 'react-spinners/ClipLoader'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

export type OrbitAsyncState = 'idle' | 'loading' | 'success' | 'error'

export interface OrbitProgressState {
  status: OrbitAsyncState
  progress?: number
  message?: string
}

export function useDelayedPending(pending: boolean, delay = 180) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!pending) { setVisible(false); return }
    const timer = window.setTimeout(() => setVisible(true), delay)
    return () => window.clearTimeout(timer)
  }, [pending, delay])
  return pending && visible
}

type StatusProps = { label?: string; className?: string }

export function OrbitSpinner({ label = 'Loading', className = '' }: StatusProps) {
  return <span className={`orbit-spinner ${className}`.trim()} role="status" aria-live="polite"><ClipLoader size={16} color="currentColor" speedMultiplier={0.75} aria-hidden="true" /><span className="sr-only">{label}</span></span>
}

export function OrbitInlineLoader({ label = 'Loading' }: StatusProps) {
  return <span className="orbit-inline-loader" role="status" aria-live="polite"><OrbitSpinner label={label} /><span aria-hidden="true">{label}</span></span>
}

export function OrbitButtonLoader({ label = 'Working' }: StatusProps) {
  return <span className="orbit-button-loader"><OrbitSpinner label={label} /><span>{label}</span></span>
}

export function OrbitMarkLoader({ size = 'md', label = 'Loading Orbit' }: StatusProps & { size?: 'sm' | 'md' | 'lg' }) {
  return <span className={`orbit-mark-loader orbit-mark-loader-${size}`} role="status" aria-live="polite" aria-label={label}>
    <span className="orbit-loader-core" aria-hidden="true" />
    <span className="orbit-loader-ring" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} style={{ '--orbit-index': index } as CSSProperties} />)}</span>
  </span>
}

export function OrbitProgress({ value, label = 'Progress' }: { value?: number; label?: string }) {
  const measurable = typeof value === 'number' && Number.isFinite(value)
  const normalized = measurable ? Math.min(100, Math.max(0, value)) : undefined
  return <div className="orbit-progress" role="progressbar" aria-label={label} aria-valuemin={measurable ? 0 : undefined} aria-valuemax={measurable ? 100 : undefined} aria-valuenow={normalized}>
    <span style={normalized === undefined ? undefined : { transform: `scaleX(${normalized / 100})` }} />
  </div>
}

export function OrbitSkeleton({ className = '', lines = 1 }: { className?: string; lines?: number }) {
  return <div className={`orbit-skeleton ${className}`.trim()} aria-hidden="true">{Array.from({ length: lines }, (_, index) => <span key={index} />)}</div>
}

export function OrbitMediaSkeleton({ className = '' }: { className?: string }) {
  return <div className={`orbit-media-skeleton ${className}`.trim()} aria-hidden="true"><OrbitMarkLoader size="sm" /></div>
}

export function OrbitDemoLoader({ label = 'Pulsar is working' }: StatusProps) {
  return <div className="orbit-demo-loader" role="status" aria-live="polite">
    <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="demo-track" cx="60" cy="60" r="38" /><circle className="demo-arc" cx="60" cy="60" r="38" /><circle className="demo-core" cx="60" cy="60" r="6" /></svg>
    <span>{label}</span>
  </div>
}

export function OrbitAsyncRegion({ loading, error, onRetry, children, label = 'Loading content', loadingFallback }: { loading: boolean; error?: unknown; onRetry?: () => void; children?: ReactNode; label?: string; loadingFallback?: ReactNode }) {
  const showLoading = useDelayedPending(loading)
  return <div className="orbit-async-region" aria-busy={loading}>
    {showLoading && <div className="orbit-content-loader" role="status" aria-live="polite">{loadingFallback ?? <OrbitSkeleton lines={3} />}<span className="sr-only">{label}</span></div>}
    {!loading && Boolean(error) && <div className="orbit-error-state" role="alert"><p>Couldn’t load this content.</p>{onRetry && <button type="button" className="button ghost" onClick={onRetry}>Retry</button>}</div>}
    {!loading && !Boolean(error) && children}
  </div>
}
