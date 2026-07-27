import type { ComponentProps, Ref } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { card } from './cardVariants'

export interface CardProps
  extends Omit<ComponentProps<'div'>, 'ref'>, VariantProps<typeof card> {
  ref?: Ref<HTMLDivElement>
}

export function Card({ className, elevation, ref, ...props }: CardProps) {
  const { root } = card({ elevation })

  return <div ref={ref} className={root({ className })} {...props} />
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  const { header } = card()

  return <div className={header({ className })} {...props} />
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  const { title } = card()

  return <h3 className={title({ className })} {...props} />
}

export function CardBody({ className, ...props }: ComponentProps<'div'>) {
  const { body } = card()

  return <div className={body({ className })} {...props} />
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  const { footer } = card()

  return <div className={footer({ className })} {...props} />
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'
