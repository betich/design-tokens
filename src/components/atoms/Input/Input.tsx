import type { ComponentProps, Ref } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { input } from './inputVariants'

export interface InputProps
  extends Omit<ComponentProps<'input'>, 'ref'>, VariantProps<typeof input> {
  ref?: Ref<HTMLInputElement>
}

export function Input({ className, invalid, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      // Keep the visual state and the accessible state from drifting apart.
      aria-invalid={invalid || undefined}
      className={input({ invalid, className })}
      {...props}
    />
  )
}

Input.displayName = 'Input'
