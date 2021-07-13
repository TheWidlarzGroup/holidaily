/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@shopify/restyle'
import { themeBase } from './themeBase'
import { colors, palette } from './colors'

type stringTuple = [string, string]

function toObject(arr: stringTuple[]) {
  const obj: { [key: string]: string } = {}
  arr.forEach(([key, val]) => (obj[key] = val))
  return obj
}

export const darkThemeBase = createTheme({
  ...themeBase,
  colors: {
    ...colors,
    // TODO: Change colors to match darkMode (use palette)
    ...toObject(Object.keys(colors).map((key) => [key, palette.greyDark])),
  },
})
