import { writeFileSync } from 'node:fs'
import { glob } from 'glob'
import { defineRegistry } from './src/.registry/build.ts'

/**
 * Assemble `registry.json` from every `*.registry.ts` in the repository.
 *
 * Discovery is a glob rather than a list, so adding a component never means
 * remembering to register it here. `shadcn build` then expands the result into
 * `public/r/*.json`, which is what the CLI fetches.
 */
const paths = (await glob('src/**/*.registry.ts')).sort()

const items = await Promise.all(
  paths.map(async (path) => {
    const module = await import(`${process.cwd()}/${path}`)
    return module.default
  }),
)

const registry = defineRegistry(
  {
    name: 'acme',
    homepage: process.env.REGISTRY_URL ?? 'https://example.com',
  },
  items,
)

writeFileSync('registry.json', `${JSON.stringify(registry, null, 2)}\n`)

console.log(`Wrote registry.json with ${items.length} items:`)
paths.forEach((path) => console.log(`  ${path}`))
