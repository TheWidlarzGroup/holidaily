import React, { useMemo } from 'react'
import { createText, createBox, useTheme as useReTheme, RNStyle } from '@shopify/restyle'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { textVariants } from './textVariants'
import { ThemeBase, themeBase } from './themeBase'

export const theme = {
  ...themeBase,
  textVariants,
}

export type Theme = typeof theme
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
  },
}

export const TextPlus = ({
  fontSize,
  letterSpacing,
  children,
  weight,
  ...p
}: Omit<React.ComponentProps<typeof Text>, 'fontSize' | 'letterSpacing'> & {
  letterSpacing?: `${number}%`
  fontSize?: keyof Theme['fontSize']
  weight?: 'regular' | 'bold'
}) => {
  const textProps: typeof p & {
    fontSize?: number
    letterSpacing?: number
    weight?: 'regular' | 'bold'
  } = p
  textProps.fontSize = themeBase.fontSize[fontSize ?? 'base']
  if (letterSpacing)
    textProps.letterSpacing = (textProps.fontSize * +letterSpacing.slice(0, -1)) / 100
  if (weight === 'regular') textProps.fontFamily = 'Nunito-Regular'
  if (weight === 'bold') textProps.fontFamily = 'Nunito-Bold'
  return <Text {...textProps}>{children}</Text>
}

export const useTheme = () => useReTheme<Theme>()
export const Box = createBox<Theme>()
export const Text = createText<Theme>()
export const BaseOpacity = createBox<
  ThemeBase,
  TouchableOpacityProps & {
    children?: React.ReactNode
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
