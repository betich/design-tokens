import StyleDictionary from 'style-dictionary'

/**
 * Drop the collection segment from a token's name.
 *
 * Token files are namespaced by their collection (`base`, `brand`, `theme`,
 * `reusable-style`, `component`, ...) so that references read clearly in the
 * JSON. That prefix carries no meaning in CSS, so it is stripped here:
 *
 *   base.color.neutral.0     ->  --color-neutral-0
 *   reusable-style.radius.md ->  --radius-md
 *
 * The collection is what makes `--color-*`, `--spacing-*` and `--text-*` land
 * on the Tailwind v4 theme namespaces they need to land on.
 */
export function registerRemoveTopLevelTransform() {
  StyleDictionary.registerTransform({
    name: 'name/cti/no-top',
    type: 'name',
    transform: (token) => token.path.slice(1).join('-'),
  })
}
