/** @type {import("prettier").Options} */
const prettierConfig = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  printWidth: 120,
  proseWrap: 'always',
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.mdx'],
      options: {
        // This stinks, if you don't do this, then an inline component on the
        // end of the line will end up wrapping, then the next save Prettier
        // will add an extra line break. Super annoying and probably a bug in
        // Prettier, but until it's fixed, this is the best we can do.
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
  ],
}

export default prettierConfig
