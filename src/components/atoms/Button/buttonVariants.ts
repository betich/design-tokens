import { tv } from '@/lib/utils'

/**
 * Every class here resolves to a component token from
 * `src/styles/component/button.css`. Nothing reaches for a primitive or a raw
 * Tailwind colour, which is what lets the theme, the brand and the type scale
 * change underneath the component without touching this file.
 */
export const button = tv({
  slots: {
    base: [
      'inline-flex shrink-0 items-center justify-center whitespace-nowrap',
      'rounded-button-shared-radius',
      'cursor-pointer transition-colors',
      'focus-visible:outline-line-accent focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:cursor-not-allowed',
    ],
    icon: 'shrink-0',
  },
  variants: {
    variant: {
      primary: {
        base: [
          'bg-button-primary-bg-default text-button-primary-label-default',
          'hover:bg-button-primary-bg-hovered active:bg-button-primary-bg-pressed',
          'disabled:bg-button-primary-bg-disabled disabled:text-button-primary-label-disabled',
        ],
      },
      secondary: {
        base: [
          'bg-button-secondary-bg-default text-button-secondary-label-default',
          'border-button-secondary-border-default border-(length:--button-shared-border-width)',
          'hover:bg-button-secondary-bg-hovered active:bg-button-secondary-bg-pressed',
          'disabled:bg-button-secondary-bg-disabled disabled:text-button-secondary-label-disabled disabled:border-button-secondary-border-disabled',
        ],
      },
      ghost: {
        base: [
          'text-button-ghost-label-default bg-transparent',
          'hover:bg-button-ghost-bg-hovered active:bg-button-ghost-bg-pressed',
          'disabled:text-button-ghost-label-disabled disabled:bg-transparent',
        ],
      },
      // The hover and pressed fills here are flattened at build time from an
      // alpha overlay. See `.sd/formats/components/blended.ts`.
      danger: {
        base: [
          'bg-button-danger-bg-default text-button-danger-label-default',
          'hover:bg-button-danger-bg-hovered active:bg-button-danger-bg-pressed',
          'disabled:bg-button-danger-bg-disabled disabled:text-button-danger-label-disabled',
        ],
      },
    },
    size: {
      sm: {
        base: 'h-button-size-sm-height px-button-size-sm-p-x gap-button-size-sm-gap text-label-sm leading-label-sm',
        icon: 'size-4',
      },
      md: {
        base: 'h-button-size-md-height px-button-size-md-p-x gap-button-size-md-gap text-label-md leading-label-md',
        icon: 'size-4',
      },
      lg: {
        base: 'h-button-size-lg-height px-button-size-lg-p-x gap-button-size-lg-gap text-label-lg leading-label-lg',
        icon: 'size-5',
      },
    },
    fullWidth: {
      true: { base: 'w-full' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
