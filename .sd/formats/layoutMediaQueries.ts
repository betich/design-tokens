import StyleDictionary from 'style-dictionary'
import { fileHeader } from 'style-dictionary/utils'
import { resolveReference } from '../utils'

/**
 * The breakpoint each layout mode compiles to. Declaration order is the
 * emission order, so these run widest to narrowest.
 */
const BREAKPOINTS: Record<string, string> = {
  'desktop-1440': 'screen and (min-width: 1440px)',
  'desktop-1280': 'screen and (min-width: 1280px) and (max-width: 1439px)',
  'tablet-768': 'screen and (min-width: 768px) and (max-width: 1279px)',
  'mobile-376': 'screen and (max-width: 767px)',
}

/**
 * Turn a token's modes into media queries instead of theme variants.
 *
 * Layout tokens use the same `$extensions.mode` mechanism as light/dark and
 * brand, but the mode names are breakpoints:
 *
 *   layout.page.max-width
 *     mode.desktop-1440 -> {base.layout.container.1280}
 *     mode.mobile-376   -> {base.layout.container.640}
 *
 * Each mode becomes a `:root` block inside its query, so `--page-max-width`
 * resolves to the right value at every viewport with no component involvement.
 *
 * These land in `:root` rather than `@theme` deliberately — they are values to
 * read, not a namespace Tailwind should generate utilities from.
 */
export function registerLayoutMediaQueriesFormat() {
  StyleDictionary.registerFormat({
    name: 'css/layout-media-queries',
    format: async ({ dictionary, file }) => {
      const header = await fileHeader({ file })

      const varsByMode: Record<string, string[]> = {}

      dictionary.allTokens.forEach((token) => {
        const modes = token.original?.$extensions?.mode ?? {}

        Object.entries(modes).forEach(([mode, value]) => {
          varsByMode[mode] ??= []
          varsByMode[mode].push(
            `    --${token.name}: ${resolveReference(value as string)};`,
          )
        })
      })

      const blocks = Object.entries(BREAKPOINTS).flatMap(([mode, query]) => {
        const vars = varsByMode[mode]
        if (!vars) return []

        return [`@media ${query} {\n  :root {\n${vars.join('\n')}\n  }\n}\n`]
      })

      return header + blocks.join('\n')
    },
  })
}
