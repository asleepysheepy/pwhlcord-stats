import { fileURLToPath } from 'url'
import { includeIgnoreFile } from '@eslint/compat'
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
