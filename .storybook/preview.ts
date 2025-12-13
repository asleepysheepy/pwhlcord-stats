import type { Preview } from '@storybook/nextjs'
// import { withThemeByClassName } from '@storybook/addon-themes'
import '@/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // decorators: [
  //   withThemeByClassName({
  //     themes: {
  //       // nameOfTheme: 'classNameForTheme',
  //       light: '',
  //       dark: 'dark',
  //     },
  //     defaultTheme: 'light',
  //   }),
  // ],
}

export default preview
