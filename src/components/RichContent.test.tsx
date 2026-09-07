import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RichContent } from './RichContent'

describe('RichContent', () => {
  it('renders allowlisted rich nodes', () => {
    render(<RichContent document={{ type: 'doc', content: [{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Safe heading' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Safe copy' }] }] }} />)
    expect(screen.getByRole('heading', { name: 'Safe heading' })).toBeInTheDocument()
    expect(screen.getByText('Safe copy')).toBeInTheDocument()
  })
  it('does not render unknown nodes or javascript links', () => {
    const { container } = render(<RichContent document={{ type: 'doc', content: [{ type: 'script', content: [{ type: 'text', text: 'bad' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'link', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] }] }] }} />)
    expect(container.querySelector('script')).toBeNull()
    expect(container.querySelector('a')).toBeNull()
  })
})
