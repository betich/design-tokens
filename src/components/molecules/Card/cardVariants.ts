import { tv } from '@/lib/utils'

/**
 * A slot-based component: one `tv` call describes the whole part hierarchy, so
 * the parts cannot drift apart and a consumer can restyle any one of them
 * through `className` without forking the component.
 */
export const card = tv({
  slots: {
    root: [
      'flex flex-col',
      'rounded-card-shared-radius border-(length:--card-shared-border-width) border-card-border-default',
      'bg-card-bg-default',
      'p-card-shared-p gap-card-shared-gap',
    ],
    header: 'flex items-start justify-between gap-sm',
    title: 'text-heading-sm leading-heading-sm text-card-title-default',
    body: 'text-body-md leading-body-md text-card-body-default',
    footer: 'flex items-center gap-sm',
  },
  variants: {
    elevation: {
      flat: {},
      raised: { root: 'shadow-sm' },
      floating: { root: 'shadow-md' },
    },
  },
  defaultVariants: {
    elevation: 'flat',
  },
})
