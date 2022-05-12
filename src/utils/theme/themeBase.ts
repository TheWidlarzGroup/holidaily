import { createTheme } from '@shopify/restyle'
import { colors } from './colors'

export const themeBase = createTheme({
  spacing: {
    '-l2plus': -36,
    '-l': -24,
    '-ml': -20,
    '-m': -16,
    '-xm': -12,
    '-xxm': -10,
    '-s': -8,
    '-xs': -4,
    none: 0,
    xs: 4,
    s: 8,
    xxm: 10,
    xm: 12,
    m: 16,
    ml: 20,
    l: 24,
    lplus: 30,
    l2plus: 36,
    xl: 40,
    xlplus: 45,
    xxl: 50,
    xxlplus: 60,
    xxl2plus: 70,
    xxxl: 75,
    xxxxl: 100,
  },
  colors,
  breakpoints: {},
  borderRadii: {
    s: 4,
    xm: 8,
    m: 10,
    mplus: 12,
    lmin: 16,
    l2min: 22,
    l: 25,
    lplus: 31,
    xl: 75,
    xxl: 100,
    full: 9999,
  },
  zIndices: {
    '-1': -1,
    '0': 0,
    '2': 2,
    '5': 5,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 34,
    '5xl': 48,
    '6xl': 64,
  },
  fontFamily: {
    sans: 'Arial',
    serif: 'Georgia',
    mono: 'Courier New',
    nunitoRegular: 'Nunito-Regular',
  },
  fontWeight: {
    hairline: '100',
    thin: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  lineHeight: {
    none: '1rem',
    tight: '1.25rem',
    snug: '1.375rem',
    normal: '1.5rem',
    relaxed: '1.625rem',
    loose: '2rem',
  },
})

export type ThemeBase = typeof themeBase
