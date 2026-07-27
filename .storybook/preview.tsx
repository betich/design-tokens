import type { Decorator, Preview } from '@storybook/react-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '../src/styles/index.css'

/**
 * Brands come from `$extensions.mode` on the brand ramp and are emitted as
 * `[data-brand="..."]` blocks by the build. Keep this list in step with
 * `src/styles/tokens/base/brand.tokens.json`.
 */
const BRANDS = [
  { value: 'acme', title: 'Acme', right: '🔵' },
  { value: 'aurora', title: 'Aurora', right: '🟢' },
  { value: 'ember', title: 'Ember', right: '🟠' },
]

const withBrand: Decorator = (Story, context) => {
  document.documentElement.setAttribute(
    'data-brand',
    context.globals.brand ?? 'acme',
  )

  return Story()
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'todo' },
    options: {
      /*
       * Order the sidebar so the docs read as a narrative before the
       * components.
       *
       * Storybook extracts this function's source and evaluates it on its own,
       * so it has to be plain JavaScript with no type annotations and no
       * references to anything outside its own body.
       */
      storySort: (a, b) => {
        const sections = ['Introduction', 'Design Tokens', 'Components']
        const rank = (title) => {
          const index = sections.indexOf(title.split('/')[0])
          return index === -1 ? sections.length : index
        }

        return rank(a.title) - rank(b.title) || a.title.localeCompare(b.title)
      },
    },
  },
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Swap the brand ramp every component inherits',
      defaultValue: 'acme',
      toolbar: { icon: 'paintbrush', items: BRANDS, dynamicTitle: true },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    withBrand,
  ],
}

export default preview
