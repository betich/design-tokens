import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge, validators } from 'tailwind-merge'
import { createTV } from 'tailwind-variants'
import type { TWMConfig } from 'tailwind-variants/dist/config.js'

/**
 * tailwind-merge only knows Tailwind's stock class names, so it cannot tell
 * that `text-body-md` is a font size while `text-content-primary` is a colour
 * — it would treat them as conflicting and drop one. Teaching it the token
 * namespaces keeps both.
 */
const twMergeConfig: TWMConfig['twMergeConfig'] = {
  extend: {
    classGroups: {
      'font-size': [
        {
          'text-display': [validators.isAny],
          'text-heading': [validators.isAny],
          'text-body': [validators.isAny],
          'text-label': [validators.isAny],
        },
      ],
      'border-w': [{ 'border-width': [validators.isAny] }],
    },
  },
}

const twMerge = extendTailwindMerge(twMergeConfig)

/** Merge class names, resolving Tailwind conflicts last-wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** `tailwind-variants`, bound to the same merge config as `cn`. */
export const tv = createTV({ twMergeConfig })
