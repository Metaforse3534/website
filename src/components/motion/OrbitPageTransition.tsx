import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export function OrbitPageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  return <div className="orbit-page" key={location.pathname}>{children}</div>
}
