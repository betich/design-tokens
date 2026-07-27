export interface Rgb {
  r: number
  g: number
  b: number
}

export interface Rgba extends Rgb {
  a: number
}

const CHANNELS = String.raw`\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*`
const RGB_PATTERN = new RegExp(`^rgb\\(${CHANNELS}\\)$`)
const RGBA_PATTERN = new RegExp(
  `^rgba\\(${CHANNELS},\\s*([01]|0?\\.\\d+)\\s*\\)$`,
)

const inRange = (n: number) => Number.isFinite(n) && n >= 0 && n <= 255

/** Parse `rgb(r, g, b)` as produced by Style Dictionary's `color/rgb`. */
export function parseRgb(value: string): Rgb | undefined {
  const match = RGB_PATTERN.exec(value)
  if (!match) return undefined

  const [r, g, b] = match.slice(1, 4).map(Number)
  return inRange(r) && inRange(g) && inRange(b) ? { r, g, b } : undefined
}

/** Parse `rgba(r, g, b, a)` as produced by Style Dictionary's `color/rgb`. */
export function parseRgba(value: string): Rgba | undefined {
  const match = RGBA_PATTERN.exec(value)
  if (!match) return undefined

  const [r, g, b, a] = match.slice(1, 5).map(Number)
  return inRange(r) && inRange(g) && inRange(b) ? { r, g, b, a } : undefined
}

/**
 * Composite a translucent foreground over an opaque background, producing a
 * flat colour. This is the `source-over` formula browsers use, evaluated once
 * at build time so the result can be a plain `rgb()` value.
 */
export function alphaBlend(foreground: Rgba, background: Rgb): string {
  const blend = (fg: number, bg: number) =>
    Math.round(fg * foreground.a + bg * (1 - foreground.a))

  const r = blend(foreground.r, background.r)
  const g = blend(foreground.g, background.g)
  const b = blend(foreground.b, background.b)

  return `rgb(${r}, ${g}, ${b})`
}
