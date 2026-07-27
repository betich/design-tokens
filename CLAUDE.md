# Acme Design Tokens

A demonstration of a design token pipeline: DTCG token JSON compiled to
Tailwind CSS v4 by Style Dictionary, published through the shadcn CLI.

**The builder in `.sd/` is the subject of this repository.** The four
components (Button, Badge, Input, Card) exist to exercise the generated tokens
and to give the registry something to publish. Keep that balance — this is not
a component library that happens to have tokens.

## Commands

| Command                     | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `pnpm build:tokens`         | Compile `src/styles/tokens/**/*.json` into `src/styles/**/*.css`        |
| `pnpm storybook`            | Docs and component explorer                                             |
| `pnpm dev`                  | Demo app with brand and theme switches                                  |
| `pnpm test`                 | Unit tests (jsdom)                                                      |
| `pnpm test:stories`         | Stories as browser tests; needs `pnpm exec playwright install chromium` |
| `pnpm build:registry`       | Write `registry.json` and `public/r/*.json`                             |
| `pnpm lint` / `pnpm format` | ESLint / Prettier                                                       |

## Non-negotiables

**`src/styles/**/*.css` is generated.** Never edit it. Change the token JSON
and rerun `pnpm build:tokens`. CI rebuilds and fails on a diff.

**A component names component tokens only.** `bg-button-primary-bg-default`,
never `bg-primary-500` or `bg-neutral-100`. Reaching past the component layer
is the one thing that breaks theming, and it is the first thing to look for in
review.

**Each token layer references only the layer beneath it.**

```
component  →  theme / reusable-style / typescale / layout  →  base / brand
```

The single deliberate exception is a state colour authored as an alpha overlay,
which references `base.color.alpha.*` directly so the build can pre-blend it.

**No literal values in components.** No hex, no rem, no px. If a value is
missing, add a token.

## Architecture

```
.sd/
├── sd.config.ts            entry point; globs token JSON, registers everything
├── components.ts           COMPONENTS list -> one CSS file each
├── transforms/             name/cti/no-top, name/cti/tailwind-var-reference
├── formats/                the eight output formats
├── actions/                post-build side effects (component/index.css)
├── utils/                  alpha blending, shadow composition, reference parsing
└── platforms/tailwind/     which tokens land in which file

src/styles/tokens/base/     primitives (base) and the brand ramp (brand)
src/styles/tokens/semantic/ semantics and component namespaces
src/styles/                 GENERATED
src/components/{atoms,molecules}/<Name>/
src/docs/                   Storybook MDX
src/.registry/              shadcn registry schema and helpers
```

### How a token is named

`name/cti/no-top` drops the collection segment, which is what lands tokens on
the Tailwind v4 namespaces:

```
base.color.neutral.0      →  --color-neutral-0
reusable-style.radius.md  →  --radius-md
```

`name/cti/tailwind-var-reference` re-prefixes the `component` collection by
type, because a raw component name generates no utility:

| Token                                 | Variable                            | Utility                        |
| ------------------------------------- | ----------------------------------- | ------------------------------ |
| `component.button.primary.bg.default` | `--color-button-primary-bg-default` | `bg-button-primary-bg-default` |
| `component.button.size.md.height`     | `--spacing-button-size-md-height`   | `h-button-size-md-height`      |
| `component.button.shared.radius`      | `--radius-button-shared-radius`     | `rounded-button-shared-radius` |

Border widths keep their plain name — Tailwind has no namespace for them — and
are read as `border-(length:--button-shared-border-width)`.

### Modes

`$extensions.mode` carries variants of one token. The consuming format decides
what a mode becomes: `css/variables-dark-mode` makes a `[data-theme]` block,
`css/variables-brand-mode` a `[data-brand]` block, `css/layout-media-queries` a
media query. Brands are discovered from the tokens, never hard-coded.

### Filters

Platform filters match on `token.path` — position in the source JSON — not on
`token.name`. Keep it that way; a name-based filter silently drops tokens when
someone renames one.

## Workflow: adding a component

1. Add a namespace under `component` in
   `src/styles/tokens/semantic/component.tokens.json`, referencing semantic
   tokens.
2. Add the name to `COMPONENTS` in `.sd/components.ts`. That is the whole
   build wiring — the stylesheet and the `component/index.css` barrel are both
   derived from it. Add to `BLENDED_COMPONENTS` too if it needs build-time
   alpha blending.
3. `pnpm build:tokens`, then **read the generated CSS** before writing
   component code. A missing variable means the filter did not match — check
   the token's position in the JSON, not its name.
4. Create `src/components/<layer>/<Name>/`:
   - `<Name>.tsx` — the component
   - `<name>Variants.ts` — the `tv()` definition, where all styling lives
   - `index.ts` — barrel
   - `<Name>.stories.tsx` — stories
   - `<Name>.test.tsx` — unit tests
   - `<Name>.registry.ts` — registry entry
5. Add the name to `REGISTRY_COMPONENTS` in
   `src/.registry/shared/components.ts`, then `pnpm build:registry`.
   `registry.config.ts` globs `**/*.registry.ts`, so there is no list to
   update there.
6. Verify in **both themes and all three brands**. Most token mistakes are
   invisible in light mode with the default brand.

## Conventions

- TypeScript throughout; components are function components with `ref` as a
  prop (React 19), not `forwardRef`.
- Styling lives in the `tv()` variants file, never inline in the component.
- Use `cn` and `tv` from `@/lib/utils` — they carry the merge config that
  teaches tailwind-merge about the token namespaces.
- Paths: `@/*` for `src/`, `@tests/*` for `tests/`.
- Prettier: no semicolons, single quotes, trailing commas.
- Tests use `renderWithTheme` from `@tests/test-utils`, which sets
  `data-theme` and `data-brand` on `<html>`.

## Known behaviour

- Every build logs _filtered references_. Intended: each layer is filtered into
  its own file while referencing the layer below, and the files are imported
  together by `index.css`.
- Blended colours are frozen at build time and cannot follow a runtime theme or
  brand switch. Only use blending when the backdrop is genuinely static —
  `button.danger` qualifies, `button.primary` does not.
