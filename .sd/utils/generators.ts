import { type Dictionary, type TransformedToken } from 'style-dictionary'
import { alphaBlend, parseRgb, parseRgba } from './color'

/**
 * Flatten alpha-overlay state colours into opaque ones.
 *
 * A component can author its hover and pressed states as a translucent black
 * or white laid over the resting fill:
 *
 *   component.button.danger.bg.default -> {base.color.red.600}
 *   component.button.danger.bg.hovered -> {base.color.alpha.black.12}
 *
 * Emitting that overlay directly would require an extra stacking element in
 * the component. Instead we composite it against the sibling `default` token
 * here and emit a single flat colour.
 *
 * Only tokens that (a) resolve to an `rgba()` value and (b) have a sibling
 * `default` that resolves to an opaque `rgb()` are blended. Everything else is
 * returned untouched, so a state that references a theme-aware semantic token
 * keeps working as a live `var()` reference.
 */
export function generateBlendedVars(dictionary: Dictionary): {
  blendedVars: string[]
  remainingTokens: TransformedToken[]
} {
  const blendedVars: string[] = []
  const remainingTokens: TransformedToken[] = []

  dictionary.allTokens.forEach((token) => {
    const overlay = parseRgba(String(token.$value))

    if (!overlay || token.path.at(-1) === 'default') {
      remainingTokens.push(token)
      return
    }

    // Sibling `default` of the same property, e.g. for
    // component.button.danger.bg.hovered -> {component.button.danger.bg.default}
    const siblingDefault = [...token.path.slice(0, -1), 'default'].join('.')
    const backdrop = dictionary.tokenMap.get(`{${siblingDefault}}`)

    const background = backdrop && parseRgb(String(backdrop.$value))

    if (!background) {
      remainingTokens.push(token)
      return
    }

    blendedVars.push(`  --${token.name}: ${alphaBlend(overlay, background)};`)
  })

  return { blendedVars, remainingTokens }
}

const SHADOW_PARTS = ['position-x', 'position-y', 'blur', 'spread', 'color']

/**
 * Recombine the five parts of a shadow into one custom property.
 *
 * Design tools export a shadow as separate offset / blur / spread / colour
 * values, which is what `reusable-style.drop-shadow.md.*` holds. CSS wants
 * them as a single space-separated list, and Tailwind wants that list under
 * `--shadow-*` so `shadow-md` becomes a real utility:
 *
 *   --shadow-md: var(--drop-shadow-md-position-x) var(--drop-shadow-md-position-y) ...
 *
 * The parts themselves are still emitted, so a component can reach for an
 * individual value when it needs to.
 */
export function generateShadowVars(dictionary: Dictionary): {
  shadowVars: string[]
} {
  const groups = new Map<string, Map<string, TransformedToken>>()

  dictionary.allTokens.forEach((token) => {
    const [, collection, size, part] = token.path
    if (collection !== 'drop-shadow' || !SHADOW_PARTS.includes(part)) return

    if (!groups.has(size)) groups.set(size, new Map())
    groups.get(size)?.set(part, token)
  })

  const shadowVars = Array.from(groups.entries()).map(([size, parts]) => {
    const layers = SHADOW_PARTS.filter((part) => parts.has(part))
      .map((part) => `var(--${parts.get(part)?.name})`)
      .join(' ')

    return `  --shadow-${size}: ${layers};`
  })

  return { shadowVars }
}
