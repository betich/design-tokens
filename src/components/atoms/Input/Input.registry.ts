import { defineRegistryItem } from '@/.registry/build'
import { commonDependencies, commonFiles } from '@/.registry/shared/common'

export default defineRegistryItem({
  name: 'input',
  type: 'registry:component',
  title: 'Input',
  description:
    'A single-line text field whose every state is one border token.',
  docs: 'Import from `@/components/atoms/Input`. Pass `invalid` to show the error border and set `aria-invalid`.',
  categories: ['atoms'],
  files: [
    {
      path: 'src/components/atoms/Input/Input.tsx',
      type: 'registry:component',
      target: 'components/atoms/Input/Input.tsx',
    },
    {
      path: 'src/components/atoms/Input/inputVariants.ts',
      type: 'registry:file',
      target: 'components/atoms/Input/inputVariants.ts',
    },
    {
      path: 'src/components/atoms/Input/index.ts',
      type: 'registry:file',
      target: 'components/atoms/Input/index.ts',
    },
    {
      path: 'src/styles/component/input.css',
      type: 'registry:style',
      target: 'styles/component/input.css',
    },
    ...commonFiles,
  ],
  dependencies: [...commonDependencies],
})
