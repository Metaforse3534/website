import { lazy } from 'react'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PublicShell } from './SiteChrome'

describe('public site shell', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('scrollTo', vi.fn())
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() }))
  })

  it('keeps navigation mounted while a route chunk is pending', async () => {
    let resolvePage!: (module: { default: () => JSX.Element }) => void
    const SlowPage = lazy(() => new Promise<{ default: () => JSX.Element }>(resolve => { resolvePage = resolve }))
    render(<MemoryRouter initialEntries={['/slow']}><Routes><Route element={<PublicShell />}><Route path="/slow" element={<SlowPage />} /></Route></Routes></MemoryRouter>)
    expect(screen.getByRole('link', { name: 'Orbit AI home' })).toBeInTheDocument()
    expect(screen.queryByRole('status', { name: 'Loading page' })).not.toBeInTheDocument()
    await act(async () => vi.advanceTimersByTime(180))
    expect(screen.getByRole('status', { name: 'Loading page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Orbit AI home' })).toBeInTheDocument()
    await act(async () => { resolvePage({ default: () => <h1>Ready</h1> }); await Promise.resolve() })
    expect(screen.getByRole('heading', { name: 'Ready' })).toBeInTheDocument()
  })
})
