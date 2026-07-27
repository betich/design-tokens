import { useState } from 'react'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/molecules/Card'

const BRANDS = ['acme', 'aurora', 'ember'] as const
const THEMES = ['light', 'dark'] as const

type Brand = (typeof BRANDS)[number]
type Theme = (typeof THEMES)[number]

/**
 * A small harness for the generated tokens.
 *
 * Switching brand or theme sets a single attribute on `<html>`; every value
 * below re-resolves through the token chain without a re-render of its own.
 */
export default function App() {
  const [brand, setBrand] = useState<Brand>('acme')
  const [theme, setTheme] = useState<Theme>('light')

  document.documentElement.setAttribute('data-brand', brand)
  document.documentElement.setAttribute('data-theme', theme)

  return (
    <main className="page-container gap-xl py-xl flex flex-col">
      <header className="gap-xs flex flex-col">
        <h1 className="text-display-md leading-display-md">
          Acme Design Tokens
        </h1>
        <p className="text-body-lg leading-body-lg text-content-secondary">
          DTCG token JSON, compiled to Tailwind v4 by Style Dictionary and
          published as a shadcn registry.
        </p>
      </header>

      <section className="gap-md flex flex-wrap items-center">
        <div className="gap-xs flex items-center">
          <span className="text-label-md leading-label-md text-content-secondary">
            Brand
          </span>
          {BRANDS.map((option) => (
            <Button
              key={option}
              size="sm"
              variant={brand === option ? 'primary' : 'secondary'}
              onClick={() => setBrand(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="gap-xs flex items-center">
          <span className="text-label-md leading-label-md text-content-secondary">
            Theme
          </span>
          {THEMES.map((option) => (
            <Button
              key={option}
              size="sm"
              variant={theme === option ? 'primary' : 'secondary'}
              onClick={() => setTheme(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </section>

      <section className="gap-lg flex flex-wrap items-start">
        <Card elevation="raised" className="w-80">
          <CardHeader>
            <CardTitle>Invite a teammate</CardTitle>
            <Badge tone="accent">Pro</Badge>
          </CardHeader>
          <CardBody>
            They will get access to every report in this project.
          </CardBody>
          <Input placeholder="teammate@example.com" type="email" />
          <CardFooter>
            <Button size="sm">Send invite</Button>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </CardFooter>
        </Card>

        <Card elevation="raised" className="w-80">
          <CardHeader>
            <CardTitle>Delete workspace</CardTitle>
            <Badge tone="danger">Irreversible</Badge>
          </CardHeader>
          <CardBody>
            The hover and pressed fills on this button are flattened at build
            time from an alpha overlay.
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="danger">
              Delete
            </Button>
            <Button size="sm" variant="secondary">
              Keep
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="gap-xs flex flex-wrap">
        {(['neutral', 'accent', 'success', 'warning', 'danger'] as const).map(
          (tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ),
        )}
      </section>
    </main>
  )
}
