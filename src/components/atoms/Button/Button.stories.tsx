import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Every colour, size and radius on this component comes from the `component.button.*` token namespace. Switch the theme or the brand in the toolbar — the component has no knowledge of either.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const
const SIZES = ['sm', 'md', 'lg'] as const

export const Variants: Story = {
  render: (args) => (
    <div className="gap-md flex flex-wrap items-center">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="gap-md flex flex-wrap items-center">
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          Size {size}
        </Button>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="gap-md flex flex-wrap items-center">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    leftIcon: <Plus />,
    rightIcon: <ArrowRight />,
    children: 'Create report',
  },
}

/**
 * `danger` is the one variant whose hover and pressed fills are pre-blended at
 * build time: the tokens are authored as translucent black over a fixed red,
 * and the build composites them into flat `rgb()` values.
 */
export const BlendedStates: Story = {
  render: (args) => (
    <div className="gap-sm flex flex-col">
      <p className="text-body-sm leading-body-sm text-content-secondary">
        Hover and press to see the flattened overlay.
      </p>
      <div className="gap-md flex items-center">
        <Button {...args} variant="danger">
          Delete
        </Button>
        <Button {...args} variant="primary">
          Cancel
        </Button>
      </div>
    </div>
  ),
}

export const AsChild: Story = {
  args: { asChild: true },
  render: (args) => (
    <Button {...args}>
      <a href="#anchor">Rendered as a link</a>
    </Button>
  ),
}
