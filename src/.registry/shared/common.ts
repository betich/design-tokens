import { defineRegistryFiles } from '../build'

/**
 * The token stylesheets and helpers every component needs.
 *
 * A component is only styled if the whole token chain travels with it, so each
 * registry item ships all three layers. `shadcn add` writes them into the
 * consuming project, where `styles/index.css` imports them.
 */
export const commonFiles = defineRegistryFiles([
  // Layer 1 — primitives.
  {
    path: 'src/styles/color/base.css',
    type: 'registry:style',
    target: 'styles/color/base.css',
  },
  {
    path: 'src/styles/border/base.css',
    type: 'registry:style',
    target: 'styles/border/base.css',
  },
  {
    path: 'src/styles/effect/base.css',
    type: 'registry:style',
    target: 'styles/effect/base.css',
  },
  {
    path: 'src/styles/layout/base.css',
    type: 'registry:style',
    target: 'styles/layout/base.css',
  },
  {
    path: 'src/styles/spacing/base.css',
    type: 'registry:style',
    target: 'styles/spacing/base.css',
  },
  {
    path: 'src/styles/typography/base.css',
    type: 'registry:style',
    target: 'styles/typography/base.css',
  },

  // Layer 2 — semantics, including the theme and brand overrides.
  {
    path: 'src/styles/color/tokens.css',
    type: 'registry:style',
    target: 'styles/color/tokens.css',
  },
  {
    path: 'src/styles/color/brand.css',
    type: 'registry:style',
    target: 'styles/color/brand.css',
  },
  {
    path: 'src/styles/border/tokens.css',
    type: 'registry:style',
    target: 'styles/border/tokens.css',
  },
  {
    path: 'src/styles/effect/tokens.css',
    type: 'registry:style',
    target: 'styles/effect/tokens.css',
  },
  {
    path: 'src/styles/layout/tokens.css',
    type: 'registry:style',
    target: 'styles/layout/tokens.css',
  },
  {
    path: 'src/styles/spacing/tokens.css',
    type: 'registry:style',
    target: 'styles/spacing/tokens.css',
  },
  {
    path: 'src/styles/typography/tokens.css',
    type: 'registry:style',
    target: 'styles/typography/tokens.css',
  },

  // The `cn` / `tv` helpers, which carry the token-aware merge config.
  { path: 'src/lib/utils.ts', type: 'registry:lib', target: 'lib/utils.ts' },
])

export const commonDependencies = [
  'clsx',
  'tailwind-merge',
  'tailwind-variants',
]
