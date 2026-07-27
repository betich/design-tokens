module.exports = {
  '**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{js,cjs,json,md,mdx,yml,html}': ['prettier --write'],
  'src/styles/index.css': ['prettier --write'],

  // The generated CSS is committed, so a token edit has to be compiled in the
  // same commit or CI's drift check will fail.
  'src/styles/tokens/**/*.json': () => [
    'pnpm build:tokens',
    'git add src/styles',
  ],

  // Likewise for registry entries.
  '**/*.registry.ts': () => ['pnpm build:registry', 'git add registry.json'],
}
