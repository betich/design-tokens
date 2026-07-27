import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The border is the only thing that changes across states, and each state is one token: `component.input.border.{default,hovered,focused,error,disabled}`.',
      },
    },
  },
  args: { placeholder: 'you@example.com', invalid: false, disabled: false },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: (args) => (
    <div className="gap-md flex max-w-sm flex-col">
      <Input {...args} placeholder="Default" />
      <Input {...args} placeholder="Invalid" invalid />
      <Input {...args} placeholder="Disabled" disabled />
      <Input {...args} defaultValue="Filled in" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="gap-xs flex max-w-sm flex-col">
      <label
        htmlFor="email"
        className="text-label-md leading-label-md text-content-primary"
      >
        Email address
      </label>
      <Input {...args} id="email" type="email" />
      <p className="text-body-sm leading-body-sm text-content-secondary">
        We only use this to send the report.
      </p>
    </div>
  ),
}
