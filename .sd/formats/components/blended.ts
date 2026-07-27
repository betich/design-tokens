import StyleDictionary from 'style-dictionary'
import { propertyFormatNames } from 'style-dictionary/enums'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'
import { generateBlendedVars } from '../../utils'

/**
 * Component format for namespaces that use alpha-overlay state colours.
 *
 * Identical to `tailwindcss/components/common`, except tokens whose value is a
 * translucent overlay are composited against their sibling `default` and
 * emitted as flat colours. Tokens that cannot be blended fall through to the
 * normal reference output, so the two styles coexist in one file.
 */
export function registerComponentBlendedFormat() {
  StyleDictionary.registerFormat({
    name: 'tailwindcss/components/blended',
    format: async ({ dictionary, file, options }) => {
      const header = await fileHeader({ file })

      const { blendedVars, remainingTokens } = generateBlendedVars(dictionary)

      const variables = formattedVariables({
        format: propertyFormatNames.css,
        dictionary: { ...dictionary, allTokens: remainingTokens },
        outputReferences: options.outputReferences,
        usesDtcg: true,
      })

      const body = [...blendedVars, variables].filter(Boolean).join('\n')

      return `${header}@theme inline {\n${body}\n}\n`
    },
  })
}
