import { defineRegistryItem } from '@/.registry/build'
import { commonDependencies, commonFiles } from '@/.registry/shared/common'

export default defineRegistryItem({
  name: 'badge',
  type: 'registry:component',
  title: 'Badge',
  description:
    'A status pill in five tones, each mapped to a semantic surface and content pair.',
  docs: 'Import from `@/components/atoms/Badge`.',
  categories: ['atoms'],
  files: [
    {
      path: 'src/components/atoms/Badge/Badge.tsx',
      type: 'registry:component',
      target: 'components/atoms/Badge/Badge.tsx',
    },
    {
      path: 'src/components/atoms/Badge/badgeVariants.ts',
      type: 'registry:file',
      target: 'components/atoms/Badge/badgeVariants.ts',
    },
    {
      path: 'src/components/atoms/Badge/index.ts',
      type: 'registry:file',
      target: 'components/atoms/Badge/index.ts',
    },
    {
      path: 'src/styles/component/badge.css',
      type: 'registry:style',
      target: 'styles/component/badge.css',
    },
    ...commonFiles,
  ],
  dependencies: [...commonDependencies],
})
