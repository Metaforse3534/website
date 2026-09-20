import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import JobPage from './JobPage'
import NetworkStatusPage from './NetworkStatusPage'

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }))

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }))
vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: true,
  supabase: { functions: { invoke } },
}))

const mockedUseQuery = vi.mocked(useQuery)

describe('public async route states', () => {
  beforeEach(() => { vi.clearAllMocks(); vi.stubGlobal('scrollTo', vi.fn()) })

  it('does not claim systems are healthy while status is loading', () => {
    mockedUseQuery.mockReturnValue({ isLoading: true, isError: false, error: null, data: undefined, refetch: vi.fn() } as never)
    render(<HelmetProvider><MemoryRouter><NetworkStatusPage /></MemoryRouter></HelmetProvider>)
    expect(screen.getByRole('heading', { name: 'CHECKING PUBLISHED SYSTEMS.' })).toBeInTheDocument()
    expect(screen.queryByText('ALL PUBLISHED SYSTEMS NORMAL.')).not.toBeInTheDocument()
  })

  it('preserves application values after a failed submission', async () => {
    mockedUseQuery.mockReturnValue({ isLoading: false, isError: false, error: null, data: { id: 'job-1', slug: 'engineer', title: 'Engineer', summary: 'Build Orbit.', department: 'Engineering', location: 'Remote', workplace_type: 'remote', employment_type: 'full_time', description: null, job_questions: [] }, refetch: vi.fn() } as never)
    invoke.mockResolvedValue({ error: { message: 'Submission failed' } })
    const { container } = render(<HelmetProvider><MemoryRouter initialEntries={['/careers/engineer']}><Routes><Route path="/careers/:slug" element={<JobPage />} /></Routes></MemoryRouter></HelmetProvider>)
    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Taylor Orbit' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'taylor@example.com' } })
    fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Berlin' } })
    fireEvent.change(screen.getByLabelText(/^CV/), { target: { files: [new File(['cv'], 'cv.pdf', { type: 'application/pdf' })] } })
    fireEvent.click(screen.getByLabelText(/I consent/))
    fireEvent.submit(container.querySelector('.application-form')!)
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Submission failed'))
    expect(screen.getByLabelText('Full name')).toHaveValue('Taylor Orbit')
    expect(screen.getByLabelText('Email')).toHaveValue('taylor@example.com')
  })
})
