import { defineRegistryItem } from '@/.registry/build'
import { commonDependencies, commonFiles } from '@/.registry/shared/common'

export default defineRegistryItem({
  name: 'button',
  type: 'registry:component',
  title: 'Button',
  description:
    'A button with four variants and three sizes, styled entirely from component tokens.',
  docs: 'Import from `@/components/atoms/Button`. Use `asChild` to render a link with button styling.',
  categories: ['atoms'],
  files: [
    {
      path: 'src/components/atoms/Button/Button.tsx',
      type: 'registry:component',
      target: 'components/atoms/Button/Button.tsx',
    },
    {
      path: 'src/components/atoms/Button/buttonVariants.ts',
      type: 'registry:file',
      target: 'components/atoms/Button/buttonVariants.ts',
    },
    {
      path: 'src/components/atoms/Button/index.ts',
      type: 'registry:file',
      target: 'components/atoms/Button/index.ts',
    },
    {
      path: 'src/styles/component/button.css',
      type: 'registry:style',
      target: 'styles/component/button.css',
    },
    ...commonFiles,
  ],
  dependencies: [...commonDependencies, '@radix-ui/react-slot'],
})
