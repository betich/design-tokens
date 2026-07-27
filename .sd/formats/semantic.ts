import StyleDictionary from 'style-dictionary'
import { propertyFormatNames } from 'style-dictionary/enums'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'
import { generateShadowVars } from '../utils'

/**
 * Semantic tokens into a Tailwind `@theme inline` block.
 *
 * `inline` matters: these tokens are references, and it tells Tailwind to keep
 * the `var()` in the generated utility instead of resolving it at build time.
 * That is what allows a single `rounded-md` to follow a primitive change, and
 * what makes light/dark and brand switching work at runtime.
 *
 * Multi-part shadows are recombined into a single `--shadow-*` property first.
 */
export function registerSemanticFormat() {
  StyleDictionary.registerFormat({
    name: 'tailwindcss/semantic',
    format: async ({ dictionary, file, options }) => {
      const header = await fileHeader({ file })
      const { shadowVars } = generateShadowVars(dictionary)

      const variables = formattedVariables({
        format: propertyFormatNames.css,
        dictionary,
        outputReferences: options.outputReferences,
        usesDtcg: true,
      })

      const body = [...shadowVars, variables].filter(Boolean).join('\n')

      return `${header}@theme inline {\n${body}\n}\n`
    },
  })
}
