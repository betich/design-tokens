import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A molecule composing the atoms. The `elevation` variants use the `--shadow-*` properties the build recombines from the five parts of each `reusable-style.drop-shadow.*` token.',
      },
    },
  },
  argTypes: {
    elevation: { control: 'select', options: ['flat', 'raised', 'floating'] },
  },
  args: { elevation: 'flat' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Weekly report</CardTitle>
        <Badge tone="success">Ready</Badge>
      </CardHeader>
      <CardBody>
        Delivery finished at 04:12. No anomalies were detected in this run.
      </CardBody>
      <CardFooter>
        <Button size="sm">Download</Button>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Elevations: Story = {
  render: () => (
    <div className="gap-lg flex flex-wrap items-start">
      {(['flat', 'raised', 'floating'] as const).map((elevation) => (
        <Card key={elevation} elevation={elevation} className="w-56">
          <CardTitle>{elevation}</CardTitle>
          <CardBody>shadow from the {elevation} elevation token.</CardBody>
        </Card>
      ))}
    </div>
  ),
}

/** Every atom in this repository, composed into one surface. */
export const Composed: Story = {
  render: () => (
    <Card elevation="raised" className="max-w-sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <Badge tone="accent">Pro</Badge>
      </CardHeader>
      <CardBody>They will get access to every report in this project.</CardBody>
      <Input placeholder="teammate@example.com" type="email" />
      <CardFooter>
        <Button size="sm">Send invite</Button>
        <Button size="sm" variant="secondary">
          Copy link
        </Button>
      </CardFooter>
    </Card>
  ),
}
