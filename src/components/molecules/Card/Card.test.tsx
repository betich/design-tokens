import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '@tests/test-utils'
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from './Card'

describe('Card', () => {
  it('renders its parts', () => {
    renderWithTheme(
      <Card>
        <CardHeader>
          <CardTitle>Weekly report</CardTitle>
        </CardHeader>
        <CardBody>No anomalies.</CardBody>
        <CardFooter>footer</CardFooter>
      </Card>,
    )

    expect(
      screen.getByRole('heading', { name: 'Weekly report' }),
    ).toBeInTheDocument()
    expect(screen.getByText('No anomalies.')).toBeInTheDocument()
    expect(screen.getByText('footer')).toBeInTheDocument()
  })

  it('carries no shadow at the default elevation', () => {
    const { container } = renderWithTheme(<Card>content</Card>)

    expect(container.firstElementChild).not.toHaveClass('shadow-sm')
  })

  it('applies the shadow token for the chosen elevation', () => {
    const { container } = renderWithTheme(
      <Card elevation="floating">content</Card>,
    )

    expect(container.firstElementChild).toHaveClass('shadow-md')
  })

  it('styles the title from the card title token', () => {
    renderWithTheme(<CardTitle>Weekly report</CardTitle>)

    expect(screen.getByRole('heading')).toHaveClass('text-card-title-default')
  })
})
