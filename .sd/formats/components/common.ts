import StyleDictionary from 'style-dictionary'
import { propertyFormatNames } from 'style-dictionary/enums'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'

/**
 * The default component format: every token stays a live reference.
 *
 * `@theme inline` keeps the `var()` chain intact, so a component variable
 * points at a semantic variable which points at a primitive. Switching theme
 * or brand at the root re-resolves the whole chain without rebuilding.
 */
export function registerComponentCommonFormat() {
  StyleDictionary.registerFormat({
    name: 'tailwindcss/components/common',
    format: async ({ dictionary, file, options }) => {
      const header = await fileHeader({ file })

      const variables = formattedVariables({
        format: propertyFormatNames.css,
        dictionary,
        outputReferences: options.outputReferences,
        usesDtcg: true,
      })

      return `${header}@theme inline {\n${variables}\n}\n`
    },
  })
}
