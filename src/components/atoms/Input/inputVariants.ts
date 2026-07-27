import { tv } from '@/lib/utils'

export const input = tv({
  base: [
    'w-full',
    'h-input-shared-height px-input-shared-p-x',
    'rounded-input-shared-radius border-(length:--input-shared-border-width)',
    'bg-input-bg-default text-input-label-default',
    'text-body-md leading-body-md',
    'placeholder:text-input-placeholder-default',
    'transition-colors outline-none',
    'disabled:bg-input-bg-disabled disabled:text-input-label-disabled disabled:border-input-border-disabled disabled:cursor-not-allowed',
  ],
  variants: {
    invalid: {
      true: 'border-input-border-error',
      false: [
        'border-input-border-default',
        'hover:border-input-border-hovered',
        'focus:border-input-border-focused',
      ],
    },
  },
  defaultVariants: {
    invalid: false,
  },
})
