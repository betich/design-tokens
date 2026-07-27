# Acme Design Tokens

A worked example of a design token pipeline: **DTCG token JSON in, Tailwind CSS
v4 out**, with the resulting components published through the shadcn CLI.

The subject of this repository is the builder in `.sd/` — not the components.
Four small components (Button, Badge, Input, Card) exist so the generated
tokens have something to prove themselves against, and so the registry has
something to publish.

`Acme` is a placeholder. Every name here — the brand ramps, the semantic
vocabulary, the component namespaces — is meant to be replaced.

## Quick start

```bash
pnpm install
pnpm build:tokens     # token JSON -> src/styles/**/*.css
pnpm storybook        # docs + component explorer
```

| Command                     | What it does                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------- |
| `pnpm build:tokens`         | Compile `src/styles/tokens/**/*.json` into CSS                                      |
| `pnpm storybook`            | Documentation and component explorer                                                |
| `pnpm dev`                  | Small demo app with brand and theme switches                                        |
| `pnpm test`                 | Unit tests (jsdom)                                                                  |
| `pnpm test:stories`         | Every story as a browser smoke test — needs `pnpm exec playwright install chromium` |
| `pnpm build:registry`       | Write `registry.json` and `public/r/*.json` for the shadcn CLI                      |
| `pnpm lint` / `pnpm format` | ESLint / Prettier                                                                   |

## The token model

Three layers, each allowed to reference only the one directly beneath it.

| Layer         | Collection                                       | Answers                | Example                                                                |
| ------------- | ------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------- |
| **Primitive** | `base`, `brand`                                  | _What values exist?_   | `--color-neutral-900: #0f172a`                                         |
| **Semantic**  | `theme`, `reusable-style`, `typescale`, `layout` | _What do they mean?_   | `--color-content-primary: var(--color-neutral-900)`                    |
| **Component** | `component`                                      | _Where are they used?_ | `--color-button-secondary-label-default: var(--color-content-primary)` |

A component names only the third layer. That indirection is what lets the
theme, the brand and the type scale change underneath it.

The rule that makes the whole thing hold: **a component names component tokens
only.** Reaching for `bg-primary-500` or `bg-neutral-100` inside a component is
the one thing that breaks theming.

### Variants live on the token

`$extensions.mode` carries variants of the same token on one node:

```jsonc
"page": {
  "$type": "color",
  "$value": "{base.color.neutral.0}",
  "$extensions": {
    "mode": {
      "light": "{base.color.neutral.0}",
      "dark":  "{base.color.neutral.950}"
    }
  }
}
```

One token, one name, two values. The same mechanism carries brands
(`mode.acme`, `mode.aurora`) and breakpoints (`mode.mobile-376`). What a mode
_becomes_ is decided by the format that consumes it — a theme selector, a brand
selector, or a media query:

```css
@theme {
  --color-surface-page: var(--color-neutral-0);
}
[data-theme='dark'] {
  --color-surface-page: var(--color-neutral-950);
}
[data-brand='aurora'] {
  --color-primary-500: #0d9488;
}

@media screen and (max-width: 767px) {
  :root {
    --page-max-width: var(--layout-container-640);
  }
}
```

`data-theme` and `data-brand` are separate attributes, so the two switch
independently.

## Repository layout

```
.sd/                        the builder
├── sd.config.ts            entry point
├── components.ts           component list -> one CSS file each
├── transforms/             token naming
├── formats/                the shape of the emitted CSS
├── actions/                post-build side effects
├── utils/                  alpha blending, shadow composition
└── platforms/tailwind/     which tokens go in which file

src/styles/tokens/          token source, hand-authored or design-tool export
├── base/                   primitives + the brand ramp
└── semantic/               semantics + component namespaces

src/styles/                 generated CSS — never edit by hand
src/components/             sample components, atomic-design folders
src/docs/                   Storybook MDX
src/.registry/              shadcn registry schema and helpers
```

## What the builder does

Eight custom Style Dictionary formats, each handling a shape of CSS that
Style Dictionary does not produce out of the box:

| Format                           | Output                                                             |
| -------------------------------- | ------------------------------------------------------------------ |
| `tailwindcss/primitives`         | Literal values in `@theme`                                         |
| `tailwindcss/semantic`           | References in `@theme inline`, plus shadow composition             |
| `css/variables-dark-mode`        | `@theme` + `[data-theme='dark']`                                   |
| `css/variables-brand-mode`       | One `[data-brand='…']` block per brand, discovered from the tokens |
| `tailwindcss/spacing-utilities`  | `@utility p-md { padding: … }` alongside the variables             |
| `css/layout-media-queries`       | `:root` blocks inside `@media`                                     |
| `tailwindcss/components/common`  | One `@theme inline` block per component                            |
| `tailwindcss/components/blended` | The same, with alpha overlays flattened at build time              |

Two custom transforms rename tokens onto the Tailwind v4 theme namespaces, so
`--color-*`, `--spacing-*`, `--text-*` and `--radius-*` generate real
utilities:

```
component.button.primary.bg.default  →  --color-button-primary-bg-default
                                     →  bg-button-primary-bg-default
component.button.size.md.height      →  --spacing-button-size-md-height
                                     →  h-button-size-md-height
```

Two techniques are worth calling out.

**Shadow composition.** Design tools export a shadow as five separate values;
CSS wants one list, and Tailwind wants it under `--shadow-*` for `shadow-md` to
be a real utility. The build recombines them and still emits the parts.

**Build-time alpha blending.** A state authored as translucent black over a
solid fill is composited against its sibling `default` and emitted flat, which
saves the component an extra stacking element:

```css
--color-button-danger-bg-default: var(--color-red-600);
--color-button-danger-bg-hovered: rgb(194, 33, 33);
```

The tradeoff is real: a blended value is frozen at build time and cannot follow
a runtime theme or brand switch. That is why only `button.danger` uses it —
its base is a fixed red. `button.primary` sits on the brand ramp, so its states
stay as references. Reach for blending only when the backdrop is static.

## Adding a component

1. Add a namespace under `component` in `semantic/component.tokens.json`,
   referencing semantic tokens.
2. Add its name to `COMPONENTS` in `.sd/components.ts`. That is the whole
   wiring — the per-component stylesheet and the `component/index.css` barrel
   are both derived from that list.
3. `pnpm build:tokens`, and read the generated CSS before writing any component
   code.
4. Build the component in `src/components/<layer>/<Name>/` with a
   `tv()` variants file, stories, tests and a `*.registry.ts`.
5. `pnpm build:registry`. `registry.config.ts` globs `**/*.registry.ts`, so
   there is no list to update — but do add the name to `REGISTRY_COMPONENTS` so
   dependent items resolve to this registry.

Check the result in both themes and all three brands. Most token mistakes are
invisible in light mode with the default brand.

There is a longer version of this in Storybook under
**Design Tokens → Adding a Component**.

## Consuming it

`pnpm build:registry` produces a shadcn-compatible registry. With
`REGISTRY_URL` pointing at the published site:

```bash
npx shadcn@latest add https://your-registry.example.com/r/button.json
```

Each item ships the component, its variants file, its component stylesheet and
the full token chain, so it is styled on arrival.

## Notes

- `src/styles/**/*.css` is generated and committed. CI rebuilds and fails on a
  diff, which catches hand edits.
- Every build logs _filtered references_. That is the intended architecture —
  each layer is filtered into its own file while referencing the layer below,
  and the files are imported together by `index.css`.
- Tokens are meant to be exported from a design tool. The ones here were
  authored by hand to keep the example readable.
