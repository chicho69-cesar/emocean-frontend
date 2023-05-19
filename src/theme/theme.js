import { extendTheme } from 'native-base'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark'
  },
  colors: {
    tahiti: {
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63'
    },
    cards: {
      100: '#C2FFEC99',
      200: '#DDFFC299',
      300: '#CBC2FF99',
      400: '#C2FFD399',
      500: '#FFC2D899'
    },
    facebook: {
      100: '#3b5998'
    }
  }
})
