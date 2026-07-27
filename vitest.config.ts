import path from 'node:path'
import { defineConfig, mergeConfig } from 'vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import viteConfig from './vite.config'

const dirname = import.meta.dirname

/**
 * Two projects:
 *
 *   unit       jsdom, the co-located `*.test.tsx` files. Runs anywhere.
 *   storybook  real Chromium via Playwright, running every story as a smoke
 *              test. Needs `pnpm exec playwright install chromium` first,
 *              so it is opt-in rather than part of `pnpm test`.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./tests/setup.ts'],
            include: ['src/**/*.{test,spec}.{ts,tsx}'],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
              storybookScript: 'pnpm storybook --ci',
            }),
          ],
          test: {
            name: 'storybook',
            setupFiles: ['./.storybook/vitest.setup.ts'],
            browser: {
              enabled: true,
              provider: 'playwright',
              headless: true,
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  }),
)
