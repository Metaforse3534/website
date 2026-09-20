import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { OrbitMarkLoader, OrbitProgress, useDelayedPending } from '.'

function PendingProbe({ pending }: { pending: boolean }) {
  return <span>{useDelayedPending(pending) ? 'visible' : 'hidden'}</span>
}

describe('Orbit loading primitives', () => {
  beforeEach(() => vi.useFakeTimers())

  it('delays short pending indicators to avoid flicker', () => {
    const view = render(<PendingProbe pending />)
    expect(screen.getByText('hidden')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(179))
    expect(screen.getByText('hidden')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByText('visible')).toBeInTheDocument()
    view.rerender(<PendingProbe pending={false} />)
    expect(screen.getByText('hidden')).toBeInTheDocument()
  })

  it('announces branded loading state and reports only real progress', () => {
    render(<><OrbitMarkLoader label="Loading publication" /><OrbitProgress label="Upload" /></>)
    expect(screen.getByRole('status', { name: 'Loading publication' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Upload' })).not.toHaveAttribute('aria-valuenow')
  })
})
