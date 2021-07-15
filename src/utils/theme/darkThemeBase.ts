/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@shopify/restyle'
import { themeBase } from './themeBase'
import { colors, palette } from './colors'

export const darkThemeBase = createTheme({
  ...themeBase,
  colors: {
    ...colors,
    mainBackground: palette.greyDark,
    white: palette.greyNeutral,
    black: palette.white,
  },
})
