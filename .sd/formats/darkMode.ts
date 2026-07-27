import StyleDictionary from 'style-dictionary'
import { fileHeader } from 'style-dictionary/utils'
import { resolveReference } from '../utils'

/**
 * Split a `$extensions.mode` token into a light and a dark declaration.
 *
 * A semantic colour carries both of its values on the one token:
 *
 *   theme.color.surface.page
 *     mode.light -> {base.color.neutral.0}
 *     mode.dark  -> {base.color.neutral.950}
 *
 * which becomes one name pointing at two different primitives:
 *
 *   @theme                 { --color-surface-page: var(--color-neutral-0); }
 *   [data-theme="dark"]    { --color-surface-page: var(--color-neutral-950); }
 *
 * Components only ever name `--color-surface-page`, so nothing in the
 * component layer knows the theme exists.
 */
export function registerDarkModeFormat() {
  StyleDictionary.registerFormat({
    name: 'css/variables-dark-mode',
    format: async ({ dictionary, file }) => {
      const header = await fileHeader({ file })
      const lightVars: string[] = []
      const darkVars: string[] = []

      dictionary.allTokens.forEach((token) => {
        const mode = token.original?.$extensions?.mode ?? {}
        const fallback = token.original?.$value

        lightVars.push(
          `  --${token.name}: ${resolveReference(mode.light ?? fallback)};`,
        )
        darkVars.push(
          `  --${token.name}: ${resolveReference(mode.dark ?? fallback)};`,
        )
      })

      return (
        `${header}@theme {\n${lightVars.join('\n')}\n}\n\n` +
        `[data-theme='dark'] {\n${darkVars.join('\n')}\n}\n`
      )
    },
  })
}
