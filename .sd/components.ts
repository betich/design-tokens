/**
 * Every component that owns a namespace in `component.tokens.json`.
 *
 * Adding a name here is the only wiring a new component needs: the Tailwind
 * platform derives one `src/styles/component/<name>.css` output per entry, so
 * component token files never have to be registered by hand.
 */
export const COMPONENTS = ['button', 'badge', 'input', 'card'] as const

export type ComponentName = (typeof COMPONENTS)[number]

/**
 * Components whose state colours are authored as alpha overlays and flattened
 * at build time. See `generateBlendedVars` in `.sd/utils/generators.ts`.
 */
export const BLENDED_COMPONENTS: ComponentName[] = ['button']
