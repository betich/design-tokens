import StyleDictionary from 'style-dictionary'
import { propertyFormatNames } from 'style-dictionary/enums'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'

/**
 * Raw primitives into a Tailwind `@theme` block.
 *
 * `@theme` (rather than `@theme inline`) is correct here because these are
 * literal values with nothing to dereference, and it is what lets Tailwind
 * generate utilities from the namespace.
 */
export function registerPrimitivesFormat() {
  StyleDictionary.registerFormat({
    name: 'tailwindcss/primitives',
    format: async ({ dictionary, file, options }) => {
      const header = await fileHeader({ file })

      const variables = formattedVariables({
        format: propertyFormatNames.css,
        dictionary,
        outputReferences: options.outputReferences,
        usesDtcg: true,
      })

      return `${header}@theme {\n${variables}\n}\n`
    },
  })
}
