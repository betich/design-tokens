/* eslint-disable react-refresh/only-export-components -- test helper, never part of the component graph */
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

export type Theme = 'light' | 'dark'
export type Brand = 'acme' | 'aurora' | 'ember'

interface ThemedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: Theme
  brand?: Brand
}

/**
 * Render with the attributes the tokens key off.
 *
 * Both go on `<html>` rather than on a wrapper element, because that is where
 * `[data-theme]` and `[data-brand]` are scoped in the generated CSS and where
 * a portalled component would still see them.
 */
export function renderWithTheme(
  ui: ReactElement,
  { theme = 'light', brand = 'acme', ...options }: ThemedRenderOptions = {},
) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-brand', brand)

  return render(ui, options)
}

export * from '@testing-library/react'
