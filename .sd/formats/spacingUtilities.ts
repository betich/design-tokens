import StyleDictionary from 'style-dictionary'
import { propertyFormatNames } from 'style-dictionary/enums'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'

/** CSS property each spacing group maps onto. */
const UTILITIES = {
  p: 'padding',
  m: 'margin',
  gap: 'gap',
} as const

/**
 * Semantic spacing into theme variables *and* the utilities that use them.
 *
 * `--spacing-p-md` on its own gives Tailwind no way to know it means padding,
 * so this format also emits an explicit utility per token:
 *
 *   @utility p-md { padding: var(--spacing-p-md); }
 *
 * The result is that `p-md` and `gap-sm` read like first-class Tailwind, and a
 * designer renaming a step in the token file renames the class with it.
 */
export function registerSpacingUtilitiesFormat() {
  StyleDictionary.registerFormat({
    name: 'tailwindcss/spacing-utilities',
    format: async ({ dictionary, file, options }) => {
      const header = await fileHeader({ file })

      const variables = formattedVariables({
        format: propertyFormatNames.css,
        dictionary,
        outputReferences: options.outputReferences,
        usesDtcg: true,
      })

      // reusable-style.spacing.<group>.<step>
      const utilities = Object.entries(UTILITIES).map(([group, property]) => {
        const rules = dictionary.allTokens
          .filter((token) => token.path[2] === group)
          .map((token) => {
            const step = token.path.slice(3).join('-')
            return `@utility ${group}-${step} { ${property}: var(--${token.name}); }`
          })

        return rules.join('\n')
      })

      return (
        `${header}@theme inline {\n${variables}\n}\n\n` +
        `${utilities.filter(Boolean).join('\n\n')}\n`
      )
    },
  })
}
