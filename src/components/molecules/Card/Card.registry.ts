import { defineRegistryItem } from '@/.registry/build'
import { commonDependencies, commonFiles } from '@/.registry/shared/common'

export default defineRegistryItem({
  name: 'card',
  type: 'registry:component',
  title: 'Card',
  description:
    'A slot-based surface with header, title, body and footer parts, and three elevations.',
  docs: 'Import from `@/components/molecules/Card`. Elevations map to the composed `--shadow-*` properties.',
  categories: ['molecules'],
  files: [
    {
      path: 'src/components/molecules/Card/Card.tsx',
      type: 'registry:component',
      target: 'components/molecules/Card/Card.tsx',
    },
    {
      path: 'src/components/molecules/Card/cardVariants.ts',
      type: 'registry:file',
      target: 'components/molecules/Card/cardVariants.ts',
    },
    {
      path: 'src/components/molecules/Card/index.ts',
      type: 'registry:file',
      target: 'components/molecules/Card/index.ts',
    },
    {
      path: 'src/styles/component/card.css',
      type: 'registry:style',
      target: 'styles/component/card.css',
    },
    ...commonFiles,
  ],
  dependencies: [...commonDependencies],
  // Resolved to this registry's URL by `defineRegistryItem`, because these
  // names appear in REGISTRY_COMPONENTS.
  registryDependencies: ['badge', 'button', 'input'],
})
