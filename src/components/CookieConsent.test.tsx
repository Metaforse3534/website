import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CookieConsent } from './CookieConsent'

const storageKey = 'orbit-cookie-consent-v1'

describe('cookie consent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stores a reject-optional choice and hides the banner', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><CookieConsent /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Reject optional' }))

    expect(screen.queryByRole('region', { name: 'Cookie consent' })).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}')).toMatchObject({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    })
  })

  it('saves settings and can reopen the dialog from the shared settings event', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><CookieConsent /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Settings' }))
    await user.click(screen.getByRole('checkbox', { name: 'Allow analytics storage' }))
    await user.click(screen.getByRole('button', { name: 'Save choices' }))

    expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}')).toMatchObject({
      necessary: true,
      preferences: false,
      analytics: true,
      marketing: false,
    })
    expect(screen.queryByRole('dialog', { name: 'Cookie settings' })).not.toBeInTheDocument()

    window.dispatchEvent(new Event('orbit:open-cookie-settings'))
    expect(await screen.findByRole('dialog', { name: 'Cookie settings' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Allow analytics storage' })).toBeChecked()
  })

  it('surfaces storage errors without claiming the choice was saved', async () => {
    const user = userEvent.setup()
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError')
    })
    render(<MemoryRouter><CookieConsent /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Reject optional' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Your browser blocked the save.')
    expect(screen.getByRole('region', { name: 'Cookie consent' })).toBeInTheDocument()
    consoleError.mockRestore()
  })
})
