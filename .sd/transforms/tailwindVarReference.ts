import StyleDictionary from 'style-dictionary'

/**
 * Move component tokens onto the Tailwind v4 theme namespaces.
 *
 * Tailwind derives utilities from the namespace a custom property sits in, so
 * a raw component name buys nothing: `--button-primary-bg-default` generates
 * no utility at all. Re-prefixing by token type does:
 *
 *   color      button-primary-bg-default -> --color-button-primary-bg-default
 *                                           (`bg-button-primary-bg-default`)
 *   dimension  button-size-md-height     -> --spacing-button-size-md-height
 *                                           (`h-button-size-md-height`)
 *   dimension  button-shared-radius      -> --radius-button-shared-radius
 *                                           (`rounded-button-shared-radius`)
 *
 * Border widths are the exception. Tailwind has no `--border-width-*`
 * namespace, so they keep their plain name and components read them directly:
 * `border-(length:--button-shared-border-width)`.
 *
 * Only the `component` collection is rewritten. Base and semantic tokens are
 * already named for the namespace they belong to.
 */
export function registerTailwindVarReferenceTransform() {
  StyleDictionary.registerTransform({
    name: 'name/cti/tailwind-var-reference',
    type: 'name',
    transform: (token) => {
      if (token.path[0] !== 'component') {
        return token.name
      }

      const path = token.path.slice(1)
      const leaf = path.at(-1) ?? ''

      if (token.$type === 'color') {
        return token.name.startsWith('color')
          ? token.name
          : ['color', ...path].join('-')
      }

      if (token.$type === 'dimension') {
        if (leaf === 'radius') return ['radius', ...path].join('-')
        if (leaf.includes('border')) return path.join('-')

        return ['spacing', ...path].join('-')
      }

      return token.name
    },
  })
}
