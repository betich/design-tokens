import { type PlatformConfig, type TransformedToken } from 'style-dictionary'
import { BLENDED_COMPONENTS, COMPONENTS } from '../../components'

/**
 * Tailwind platforms.
 *
 * Every platform is one output directory under `src/styles/`, and every file
 * is one slice of the token graph selected by a filter. Filters match on
 * `token.path` — the position of a token in the source JSON — rather than on
 * its name, so renaming a token never silently drops it from a build.
 *
 * The shape is consistent across the layers:
 *
 *   base.css    literal primitives, `@theme`
 *   tokens.css  semantic references, `@theme inline`
 */

/** Tokens whose collection (the first path segment) is one of `collections`. */
const inCollection =
  (...collections: string[]) =>
  (token: TransformedToken) =>
    collections.includes(token.path[0])

/** Tokens in a specific group of a collection, e.g. `base` / `color`. */
const inGroup =
  (collection: string, ...groups: string[]) =>
  (token: TransformedToken) =>
    token.path[0] === collection && groups.includes(token.path[1])

/** Primitives are literal values; semantics are references and need `var()`. */
const withReferences = { outputReferences: true }

/** Base layer: hex, rem and px straight from the design tool. */
const PRIMITIVE_TRANSFORMS = ['attribute/cti', 'name/cti/no-top', 'color/css']

/** Semantic layer: references only, so no colour transform is needed. */
const SEMANTIC_TRANSFORMS = ['attribute/cti', 'name/cti/no-top']

/**
 * Component layer: additionally re-namespaced for Tailwind, and resolved to
 * `rgb()` / `rgba()` so state overlays can be alpha blended at build time.
 */
const COMPONENT_TRANSFORMS = [
  'attribute/cti',
  'name/cti/no-top',
  'name/cti/tailwind-var-reference',
  'color/rgb',
]

export const cssColor: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/color/',
  transforms: PRIMITIVE_TRANSFORMS,
  files: [
    {
      // The brand ramp ships its default brand here; brand.css overrides it.
      destination: 'base.css',
      format: 'tailwindcss/primitives',
      filter: (token) =>
        inGroup('base', 'color')(token) || inGroup('brand', 'color')(token),
    },
  ],
}

export const cssSemanticColor: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/color/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'tokens.css',
      format: 'css/variables-dark-mode',
      filter: inCollection('theme'),
    },
  ],
}

export const cssBrandModeColor: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/color/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'brand.css',
      format: 'css/variables-brand-mode',
      filter: inCollection('brand'),
    },
  ],
}

export const cssTypography: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/typography/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'base.css',
      format: 'tailwindcss/primitives',
      filter: inGroup('base', 'font'),
    },
    {
      destination: 'tokens.css',
      format: 'tailwindcss/semantic',
      filter: inCollection('typescale'),
      options: withReferences,
    },
  ],
}

export const cssSpacing: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/spacing/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'base.css',
      format: 'tailwindcss/primitives',
      filter: inGroup('base', 'size'),
    },
    {
      destination: 'tokens.css',
      format: 'tailwindcss/spacing-utilities',
      filter: inGroup('reusable-style', 'spacing'),
      options: withReferences,
    },
  ],
}

export const cssBorder: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/border/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'base.css',
      format: 'tailwindcss/primitives',
      filter: inGroup('base', 'border', 'radius'),
    },
    {
      destination: 'tokens.css',
      format: 'tailwindcss/semantic',
      filter: inGroup('reusable-style', 'border', 'radius'),
      options: withReferences,
    },
  ],
}

export const cssEffect: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/effect/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'base.css',
      format: 'tailwindcss/primitives',
      filter: inGroup('base', 'blur', 'effect'),
    },
    {
      // The semantic format recombines drop-shadow parts into --shadow-*.
      destination: 'tokens.css',
      format: 'tailwindcss/semantic',
      filter: inGroup('reusable-style', 'blur', 'drop-shadow'),
      options: withReferences,
    },
  ],
}

export const cssLayout: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/layout/',
  transforms: SEMANTIC_TRANSFORMS,
  files: [
    {
      destination: 'base.css',
      format: 'tailwindcss/primitives',
      filter: inGroup('base', 'layout'),
    },
    {
      destination: 'tokens.css',
      format: 'css/layout-media-queries',
      filter: inCollection('layout'),
    },
  ],
}

/**
 * One stylesheet per component, derived from `.sd/components.ts`.
 *
 * Registering a component's tokens is a single entry in that list — there is
 * no per-component boilerplate to copy, and no way for a filter to drift from
 * the namespace it is meant to select.
 */
export const cssComponent: PlatformConfig = {
  transformGroup: 'css',
  buildPath: 'src/styles/component/',
  transforms: COMPONENT_TRANSFORMS,
  files: COMPONENTS.map((component) => ({
    destination: `${component}.css`,
    format: BLENDED_COMPONENTS.includes(component)
      ? 'tailwindcss/components/blended'
      : 'tailwindcss/components/common',
    filter: (token: TransformedToken) =>
      token.path[0] === 'component' && token.path[1] === component,
    options: withReferences,
  })),
}
