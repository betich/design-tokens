import type { ComponentProps, ReactNode, Ref } from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import type { VariantProps } from 'tailwind-variants'
import { button } from './buttonVariants'

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'ref'>, VariantProps<typeof button> {
  /** Render the child element instead of a `<button>`, keeping the styling. */
  asChild?: boolean
  /** Icon placed before the label. */
  leftIcon?: ReactNode
  /** Icon placed after the label. */
  rightIcon?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const { base, icon } = button({ variant, size, fullWidth })

  return (
    <Comp ref={ref} className={base({ className })} {...props}>
      {leftIcon && (
        <span aria-hidden className={icon()}>
          {leftIcon}
        </span>
      )}
      {/*
       * `Slottable` marks which child the slotted element replaces, so
       * `asChild` still works when icons sit alongside the label. Without it
       * Slot sees three children and refuses to merge.
       */}
      <Slottable>{children}</Slottable>
      {rightIcon && (
        <span aria-hidden className={icon()}>
          {rightIcon}
        </span>
      )}
    </Comp>
  )
}

Button.displayName = 'Button'
