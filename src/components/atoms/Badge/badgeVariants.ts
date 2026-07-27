import { tv } from '@/lib/utils'

export const badge = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap',
    'rounded-badge-shared-radius',
    'px-badge-shared-p-x py-badge-shared-p-y gap-badge-shared-gap',
    'text-label-sm leading-label-sm',
  ],
  variants: {
    tone: {
      neutral: 'bg-badge-neutral-bg text-badge-neutral-label',
      accent: 'bg-badge-accent-bg text-badge-accent-label',
      success: 'bg-badge-success-bg text-badge-success-label',
      warning: 'bg-badge-warning-bg text-badge-warning-label',
      danger: 'bg-badge-danger-bg text-badge-danger-label',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
})
