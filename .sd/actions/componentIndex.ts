import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import StyleDictionary from 'style-dictionary'
import { COMPONENTS } from '../components'

/**
 * Write the barrel that `src/styles/index.css` imports.
 *
 * Actions run after a platform's files are written, which makes this the right
 * place for output that is derived from the build rather than from tokens.
 * Generating it removes the one manual step a new component used to need —
 * remembering to add its stylesheet to the import list.
 */
export function registerComponentIndexAction() {
  StyleDictionary.registerAction({
    name: 'component-index',
    do: async (_dictionary, platform) => {
      const imports = COMPONENTS.map((name) => `@import './${name}.css';`)

      const contents = [
        '/**',
        ' * Do not edit directly, this file was auto-generated.',
        ' */',
        '',
        ...imports,
        '',
      ].join('\n')

      writeFileSync(join(platform.buildPath ?? '', 'index.css'), contents)
    },
    undo: async () => {},
  })
}
