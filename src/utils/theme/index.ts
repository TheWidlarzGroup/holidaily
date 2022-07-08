import { ReactNode, useMemo } from 'react'
import { createText, createBox, useTheme as useReTheme, RNStyle } from '@shopify/restyle'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { textVariants } from './textVariants'
import { ThemeBase, themeBase } from './themeBase'
import { darkThemeColors } from './colors'

export const theme = {
  ...themeBase,
  textVariants,
}

export type Theme = typeof theme
export type Colors = keyof Theme['colors']
export type Spacing = keyof Theme['spacing']
export type TextVariant = keyof Omit<typeof textVariants, 'defaults'>

export const darkTheme: Theme = {
  ...theme,
  colors: darkThemeColors,
}

export const useTheme = () => useReTheme<Theme>()
export const Box = createBox<Theme>()
export const Text = createText<Theme>()
export const BaseOpacity = createBox<
  ThemeBase,
  TouchableOpacityProps & {
    children?: ReactNode
  }
>(TouchableOpacity)

export const useColors = () => useTheme().colors

type NamedStyles<T> = { [P in keyof T]: RNStyle }
export const mkUseStyles =
  <T extends NamedStyles<T>>(styles: (globalTheme: Theme) => T) =>
  () => {
    const currentTheme = useTheme()
    return useMemo(() => ({ ...styles(currentTheme) }), [currentTheme])
  }
