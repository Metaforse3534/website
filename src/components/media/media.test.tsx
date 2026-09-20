import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { OrbitImage, OrbitVideo } from '.'

describe('Orbit media', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() }))
  })

  it('reveals decoded images and replaces failures with an accessible fallback', () => {
    const view = render(<OrbitImage src="/image.webp" alt="Product preview" />)
    const image = screen.getByRole('img', { name: 'Product preview' })
    fireEvent.load(image)
    expect(image.parentElement).toHaveClass('is-ready')
    view.rerender(<OrbitImage key="failed" src="/missing.webp" alt="Missing preview" />)
    fireEvent.error(screen.getByRole('img', { name: 'Missing preview' }))
    expect(screen.getByRole('img', { name: 'Missing preview' })).toHaveTextContent('Image unavailable')
  })

  it('keeps the poster available when motion is reduced', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() }))
    const { container } = render(<OrbitVideo poster="/poster.png"><source src="/film.mp4" /></OrbitVideo>)
    expect(container.querySelector('.orbit-video-poster')).toHaveAttribute('src', '/poster.png')
    expect(container.querySelector('video')).not.toBeInTheDocument()
  })
})
