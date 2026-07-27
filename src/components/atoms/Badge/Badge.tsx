import type { ComponentProps, Ref } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { badge } from './badgeVariants'

export interface BadgeProps
  extends Omit<ComponentProps<'span'>, 'ref'>, VariantProps<typeof badge> {
  ref?: Ref<HTMLSpanElement>
}

export function Badge({ className, tone, ref, ...props }: BadgeProps) {
  return <span ref={ref} className={badge({ tone, className })} {...props} />
}

Badge.displayName = 'Badge'
