import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { includeIgnoreFile } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import storybook from 'eslint-plugin-storybook'

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...storybook.configs['flat/recommended'],
  includeIgnoreFile(gitignorePath),
  {
    rules: {
      'import/order': [
          'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: '#*/**', group: 'internal' }],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ]
    }
  }
]

export default eslintConfig
