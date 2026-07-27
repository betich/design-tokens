import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '@tests/test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label', () => {
    renderWithTheme(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn()
    renderWithTheme(<Button onClick={onClick}>Save</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    )

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies the token classes for the chosen variant and size', () => {
    renderWithTheme(
      <Button variant="danger" size="lg">
        Delete
      </Button>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-button-danger-bg-default')
    expect(button).toHaveClass('h-button-size-lg-height')
  })

  it('defaults to the primary variant at medium size', () => {
    renderWithTheme(<Button>Save</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-button-primary-bg-default')
    expect(button).toHaveClass('h-button-size-md-height')
  })

  it('lets a caller-supplied class win over the variant class', () => {
    renderWithTheme(<Button className="bg-surface-sunken">Save</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-surface-sunken')
    expect(button).not.toHaveClass('bg-button-primary-bg-default')
  })

  it('renders the child element when asChild is set', () => {
    renderWithTheme(
      <Button asChild>
        <a href="/reports">Reports</a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Reports' })
    expect(link).toHaveClass('rounded-button-shared-radius')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('hides decorative icons from assistive technology', () => {
    renderWithTheme(<Button leftIcon={<svg data-testid="icon" />}>Add</Button>)

    expect(screen.getByTestId('icon').parentElement).toHaveAttribute(
      'aria-hidden',
    )
  })
})
