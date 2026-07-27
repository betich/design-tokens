import { globSync } from 'glob'
import StyleDictionary from 'style-dictionary'
import {
  logBrokenReferenceLevels,
  logVerbosityLevels,
  logWarningLevels,
} from 'style-dictionary/enums'
import * as action from './actions'
import * as format from './formats'
import * as transform from './transforms'
import {
  cssBorder,
  cssBrandModeColor,
  cssColor,
  cssComponent,
  cssEffect,
  cssLayout,
  cssSemanticColor,
  cssSpacing,
  cssTypography,
} from './platforms/tailwind'

/**
 * Build entry point: DTCG token JSON in, Tailwind v4 CSS out.
 *
 * Run with `pnpm build:tokens`. Sources are globbed rather than listed, so a
 * new token file is picked up as soon as it exists; what a token becomes is
 * decided entirely by the platform filters in `./platforms/tailwind`.
 */

// Custom name transforms. Order matters — `no-top` runs first and the
// Tailwind namespacing builds on the name it produces.
transform.registerRemoveTopLevelTransform()
transform.registerTailwindVarReferenceTransform()

// Output formats, one per shape of CSS we need to emit.
format.registerPrimitivesFormat()
format.registerSemanticFormat()
format.registerDarkModeFormat()
format.registerBrandModeFormat()
format.registerSpacingUtilitiesFormat()
format.registerLayoutMediaQueriesFormat()
format.registerComponentCommonFormat()
format.registerComponentBlendedFormat()

// Post-build side effects.
action.registerComponentIndexAction()

const sd = new StyleDictionary({
  source: globSync('src/styles/tokens/**/*.json'),
  log: {
    // Each layer is filtered into its own file while still referencing the
    // layer below it, so Style Dictionary reports "filtered references" on
    // every build. That is the intended architecture — the files are imported
    // together — so the warning is informational rather than actionable.
    warnings: logWarningLevels.warn,
    verbosity: logVerbosityLevels.default,
    errors: {
      // A dangling reference is a broken design system, not a warning.
      brokenReferences: logBrokenReferenceLevels.throw,
    },
  },
  platforms: {
    css_color: cssColor,
    css_semantic_color: cssSemanticColor,
    css_brand_mode_color: cssBrandModeColor,
    css_typography: cssTypography,
    css_spacing: cssSpacing,
    css_border: cssBorder,
    css_effect: cssEffect,
    css_layout: cssLayout,
    css_component: { ...cssComponent, actions: ['component-index'] },
  },
})

await sd.buildAllPlatforms()

export default sd
