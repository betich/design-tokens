import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '@tests/test-utils'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its content', () => {
    renderWithTheme(<Badge>Active</Badge>)

    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('defaults to the neutral tone', () => {
    renderWithTheme(<Badge>Active</Badge>)

    expect(screen.getByText('Active')).toHaveClass('bg-badge-neutral-bg')
  })

  it('applies the token classes for the chosen tone', () => {
    renderWithTheme(<Badge tone="danger">Failed</Badge>)

    const badge = screen.getByText('Failed')
    expect(badge).toHaveClass('bg-badge-danger-bg')
    expect(badge).toHaveClass('text-badge-danger-label')
  })

  it('keeps the shared shape classes across tones', () => {
    renderWithTheme(<Badge tone="accent">New</Badge>)

    expect(screen.getByText('New')).toHaveClass('rounded-badge-shared-radius')
  })
})
