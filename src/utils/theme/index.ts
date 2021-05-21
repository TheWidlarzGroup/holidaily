import { createText, createBox, useTheme as useReTheme } from '@shopify/restyle'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { textVariants } from './textVariants'
import { colors, palette } from './colors'

export const theme = {
  colors,
  spacing: {
    xs: 4,
    s: 8,
    xm: 12,
    m: 16,
    l: 24,
    lplus: 30,
    xl: 40,
    xxl: 50,
    xxxl: 75,
  },
  // must be sth here
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    s: 4,
    xm: 8,
    m: 10,
    mplus: 12,
    l: 25,
    xl: 75,
    xxl: 100,
  },
  textVariants,
}

export type Theme = typeof theme
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
  },
}

export const useTheme = () => useReTheme<Theme>()
export const Box = createBox<Theme>()
export const Text = createText<Theme>()

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }
export const makeStyles = <T extends NamedStyles<T>>(styles: (globalTheme: Theme) => T) => () => {
  const currentTheme = useTheme()
  return styles(currentTheme)
}
