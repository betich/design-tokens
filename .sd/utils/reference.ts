/**
 * Turn a DTCG reference into the CSS custom property it compiles to.
 *
 *   `{base.color.neutral.0}`  ->  `var(--color-neutral-0)`
 *
 * The first path segment is the collection name (`base`, `brand`, `theme`,
 * `component`, ...). The `name/cti/no-top` transform strips it when naming
 * tokens, so it is stripped here too and the two stay in sync.
 *
 * Values that are not references are returned untouched.
 */
export function resolveReference(value: string): string {
  if (typeof value !== 'string' || !value.startsWith('{')) {
    return value
  }

  const path = value.replace(/[{}]/g, '').split('.').slice(1)

  return `var(--${path.join('-')})`
}
