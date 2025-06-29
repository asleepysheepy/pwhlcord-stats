import { config as epicConfig } from '@epic-web/config/eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import storybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    extends: [epicConfig],
  },
  ...storybook.configs['flat/recommended'],
  globalIgnores(['.react-router/', '.vscode']),
  {
    rules: {
      'import/consistent-type-specifier-style': 'off',
    },
  },
])
