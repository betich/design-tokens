import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '@tests/test-utils'
import { Input } from './Input'

describe('Input', () => {
  it('accepts typed text', async () => {
    renderWithTheme(<Input placeholder="Email" />)

    const field = screen.getByPlaceholderText('Email')
    await userEvent.type(field, 'a@b.com')

    expect(field).toHaveValue('a@b.com')
  })

  it('uses the resting border token by default', () => {
    renderWithTheme(<Input placeholder="Email" />)

    expect(screen.getByPlaceholderText('Email')).toHaveClass(
      'border-input-border-default',
    )
  })

  it('swaps to the error border and marks itself invalid', () => {
    renderWithTheme(<Input placeholder="Email" invalid />)

    const field = screen.getByPlaceholderText('Email')
    expect(field).toHaveClass('border-input-border-error')
    expect(field).toHaveAttribute('aria-invalid', 'true')
  })

  it('is not marked invalid when valid', () => {
    renderWithTheme(<Input placeholder="Email" />)

    expect(screen.getByPlaceholderText('Email')).not.toHaveAttribute(
      'aria-invalid',
    )
  })

  it('does not accept input when disabled', async () => {
    renderWithTheme(<Input placeholder="Email" disabled />)

    const field = screen.getByPlaceholderText('Email')
    await userEvent.type(field, 'nope')

    expect(field).toHaveValue('')
  })
})
