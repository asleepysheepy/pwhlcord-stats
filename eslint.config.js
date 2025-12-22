import { fileURLToPath } from 'url'
import { includeIgnoreFile } from '@eslint/compat'
import vitest from '@vitest/eslint-plugin'
import nextConfig from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import storybook from 'eslint-plugin-storybook'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const eslintConfig = [
  ...nextConfig,
  ...nextTypescript,
  ...storybook.configs['flat/recommended'],
  includeIgnoreFile(gitignorePath),
  {
    files: ['src/**/*.test.tsx?'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
      'vitest/consistent-vitest-vi': ['error', { fn: 'vi' }],
      'vitest/hoisted-apis-on-top': ['error'],
      'vitest/no-alias-methods': ['error'],
      'vitest/no-unneeded-async-expect-function': ['error'],
      'vitest/prefer-comparison-matcher': ['error'],
      'vitest/prefer-hooks-in-order': ['error'],
      'vitest/prefer-importing-vitest-globals': ['error'],
      'vitest/prefer-vi-mocked': ['error'],
      'vitest/require-import-vi-mock': ['error'],
    },
  },
  {
    rules: {
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: '#*/**', group: 'internal' }],
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
      ],
    },
  },
]

export default eslintConfig
