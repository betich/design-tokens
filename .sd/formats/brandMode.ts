import StyleDictionary from 'style-dictionary'
import { fileHeader } from 'style-dictionary/utils'
import { resolveReference } from '../utils'

/**
 * Emit one `[data-brand="..."]` block per brand found in the tokens.
 *
 * The brand ramp carries every brand's value on a single token:
 *
 *   brand.color.primary.500
 *     mode.acme   -> #4f46e5
 *     mode.aurora -> #0d9488
 *     mode.ember  -> #ea580c
 *
 * The brand list is discovered from the tokens rather than hard-coded, so
 * adding a brand in the design tool is the whole change — nothing in this
 * repository needs to learn its name.
 */
export function registerBrandModeFormat() {
  StyleDictionary.registerFormat({
    name: 'css/variables-brand-mode',
    format: async ({ dictionary, file }) => {
      const header = await fileHeader({ file })

      const brands = new Set<string>()
      dictionary.allTokens.forEach((token) => {
        Object.keys(token.original?.$extensions?.mode ?? {}).forEach((brand) =>
          brands.add(brand),
        )
      })

      const blocks = Array.from(brands).map((brand) => {
        const vars = dictionary.allTokens.flatMap((token) => {
          const value = token.original?.$extensions?.mode?.[brand]
          return value ? [`  --${token.name}: ${resolveReference(value)};`] : []
        })

        const selector = brand.toLowerCase().replace(/\s+/g, '-')
        return `[data-brand='${selector}'] {\n${vars.join('\n')}\n}\n`
      })

      return header + blocks.join('\n')
    },
  })
}
