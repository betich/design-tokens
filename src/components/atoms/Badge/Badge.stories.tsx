import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The five tones map one-to-one onto the `theme.color.surface.*` and `theme.color.content.*` pairs, so each one inverts correctly in dark mode without a second set of classes.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'danger'],
    },
  },
  args: { children: 'Badge', tone: 'neutral' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

const TONES = ['neutral', 'accent', 'success', 'warning', 'danger'] as const

export const Tones: Story = {
  render: () => (
    <div className="gap-sm flex flex-wrap items-center">
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
}
