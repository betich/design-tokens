import path from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'

// This file is bundled to CJS by Storybook, so `import.meta` is unavailable
// here and `__dirname` is the portable choice.

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@tests': path.resolve(__dirname, '../tests'),
    }

    return config
  },
}

export default config
