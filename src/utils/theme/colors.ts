export const palette = {
  grayscale900: 'rgba(0, 5, 21, 1)',
  grayscale800: 'rgba(19, 25, 46, 1)',
  grayscale700: 'rgba(51, 58, 85, 1)',
  grayscale500: 'rgba(106, 113, 141, 1)',
  grayscale400: 'rgba(153, 158, 178, 1)',
  grayscale300: 'rgba(192, 195, 205, 1)',
  grayscale200: 'rgba(236, 238, 242, 1)',
  grayscale100: 'rgba(243, 244, 246, 1)',
  grayscale50: 'rgba(252, 252, 252, 1)',
  primary700: 'rgba(220, 98, 10, 1)',
  primary500: 'rgba(255, 142, 60, 1)',
  primary300: 'rgba(252, 169, 93, 1)',
  primary100: 'rgba(255, 197, 131, 1)',
  primary50: 'rgba(255, 215, 170, 1)',
  primary25: 'rgba(255, 231, 204, 1)',
  primary500opaque: 'rgba(255, 142, 60, 0.2)',
  primary300opaque: 'rgba(252, 169, 93, 0.2)',
  primary100opaque: 'rgba(255, 197, 131, 0.2)',
  secondary700: 'rgba(20, 94, 231, 1)',
  secondary500: 'rgba(92, 149, 255, 1)',
  secondary300: 'rgba(164, 196, 255, 1)',
  secondary300opaque: 'rgba(164, 196, 255, 0.2)',
  secondary25: 'rgba(237, 243, 255, 1)',
  tertiary700: 'rgba(84, 102, 255, 1)',
  tertiary500: 'rgba(133, 153, 255, 1)',
  tertiary300: 'rgba(186, 198, 255, 1)',
  tertiary25: 'rgba(233, 237, 255, 1)',
  tertiary300opaque: 'rgba(174, 187, 255, 0.3)',
  quaternary700: 'rgba(59, 195, 164, 1)',
  quaternary500: 'rgba(104, 219, 192, 1)',
  quaternary300: 'rgba(181, 242, 227, 1)',
  quaternary25: 'rgba(222, 252, 245, 1)',
  quarternaryOpaque: 'rgba(126, 247, 218, 0.3)',
  error700: 'rgba(212, 17, 3, 1)',
  error500: 'rgba(253, 102, 91, 1)',
  error300: 'rgba(254, 159, 153, 1)',
  warning700: 'rgba(226, 176, 15, 1)',
  warning500: 'rgba(255, 208, 58, 1)',
  warning300: 'rgba(255, 226, 132, 1)',
  success700: 'rgba(102, 185, 37, 1)',
  success500: 'rgba(153, 228, 93, 1)',
  success300: 'rgba(204, 242, 174, 1)',
  success25: 'rgba(245, 252, 239, 1)',
  transparent: 'transparent',
  gradientHot500:
    'linear-gradient(134.7deg, rgba(255, 190, 112, 1) -3.95%, rgba(255, 139, 63, 1) 107.96%)',
  paginationDot:
    'linear-gradient(180deg, rgba(252, 252, 252, 0.8) 0%, rgba(252, 252, 252, 0.72) 100%)',
}

export const colors = {
  primary: palette.primary100,
  primaryOpaque: palette.primary100opaque,
  secondary: palette.primary300,
  secondaryOpaque: palette.primary300opaque,
  tertiary: palette.primary500,
  tertiaryOpaque: palette.primary500opaque,
  special: palette.secondary500,
  specialBrighter: palette.secondary300,
  specialBrighterOpaque: palette.secondary300opaque,
  black: palette.grayscale800,
  blackBrighter: palette.grayscale700,
  white: palette.grayscale50,
  whiteDarken: palette.grayscale50,
  alwaysWhite: palette.grayscale50,
  alwaysDarkenWhite: palette.grayscale100,
  lightGrey: palette.grayscale200,
  veryLightGrey: palette.grayscale100,
  grey: palette.grayscale300,
  darkGrey: palette.grayscale500,
  darkGreyBrighter: palette.grayscale500,
  darkGreyBrighterDouble: palette.grayscale500,
  errorRed: palette.error700,
  specialRed: palette.error300,
  disabled: palette.grayscale200,
  disabledText: palette.grayscale200,
  mainBackground: palette.primary100,
  bottomTabBgColor: palette.grayscale100,
  modalBackground: palette.grayscale800,
  blackBtnRippleColor: palette.grayscale700,
  bottomBarIcons: palette.grayscale300,
  labelLightGrey: palette.grayscale300,
  headerGrey: palette.grayscale400,
  rippleColor: palette.grayscale900,
  greyDark: palette.grayscale700,
  modalBackdrop: palette.grayscale800,
  titleActive: palette.grayscale800,
  transparent: palette.transparent,
  approvedGreen: palette.success500,
  textBlue: palette.tertiary500,
  input: palette.grayscale200,
  inputBorder: palette.secondary700,
  alwaysDarkBlue: palette.secondary700,
  alwaysBlack: palette.grayscale800,
  paginationDot: palette.paginationDot,
  bubble: palette.grayscale100,
  dashboardBackground: palette.grayscale100,
  dashboardBackgroundBrighter: palette.grayscale50,
  successToastBg: palette.success25,
  successToastBorder: palette.success300,
  lightBlue: palette.tertiary300opaque,
  quarternary: palette.quaternary500,
  quarternaryOpaque: palette.quarternaryOpaque,
}

export const darkThemeColors = {
  primary: palette.primary100,
  primaryOpaque: palette.primary100opaque,
  secondary: palette.primary300,
  secondaryOpaque: palette.primary300opaque,
  tertiary: palette.primary500,
  tertiaryOpaque: palette.primary500opaque,
  special: palette.secondary500,
  specialBrighter: palette.secondary300,
  specialBrighterOpaque: palette.secondary300opaque,
  black: palette.grayscale50,
  blackBrighter: palette.grayscale100,
  white: palette.grayscale800,
  whiteDarken: palette.grayscale900,
  alwaysWhite: palette.grayscale50,
  alwaysDarkenWhite: palette.grayscale100,
  lightGrey: palette.grayscale800,
  veryLightGrey: palette.grayscale800,
  grey: palette.grayscale300,
  darkGrey: palette.grayscale500,
  darkGreyBrighter: palette.grayscale400,
  darkGreyBrighterDouble: palette.grayscale300,
  errorRed: palette.error700,
  specialRed: palette.error300,
  disabled: palette.grayscale200,
  disabledText: palette.grayscale800,
  mainBackground: palette.primary100,
  bottomTabBgColor: palette.grayscale100,
  modalBackground: palette.grayscale800,
  blackBtnRippleColor: palette.grayscale700,
  bottomBarIcons: palette.grayscale400,
  labelLightGrey: palette.grayscale300,
  headerGrey: palette.grayscale400,
  rippleColor: palette.grayscale900,
  greyDark: palette.grayscale100,
  modalBackdrop: palette.grayscale800,
  titleActive: palette.grayscale100,
  transparent: palette.transparent,
  approvedGreen: palette.success500,
  textBlue: palette.tertiary500,
  input: palette.grayscale800,
  inputBorder: palette.secondary700,
  alwaysDarkBlue: palette.secondary700,
  alwaysBlack: palette.grayscale800,
  paginationDot: palette.paginationDot,
  bubble: palette.grayscale100,
  dashboardBackground: palette.grayscale900,
  dashboardBackgroundBrighter: palette.grayscale900,
  successToastBg: palette.grayscale800,
  successToastBorder: palette.success300,
  lightBlue: palette.tertiary300opaque,
  quarternary: palette.quaternary500,
  quarternaryOpaque: palette.quarternaryOpaque,
}

export const legacyPalette = {
  orangeLight: '#FFB051',
  orangeVeryLight: '#FFC583',
  orangeMedium: '#FF9F2D',
  orangeAlmostDark: '#FF8E3C',
  orangeDark: '#E86E1F',
  specialBlue: '#5C95FF',
  grey: '#6A718D',
  greyNeutral: '#B9B9B9',
  lightGrey: '#E1E1E1',
  mediumLightGrey: '#D4D4D4',
  red: '#FF3D30',
  ligthRed: '#FFBBB1',
  black: '#000',
  white: '#fff',
  gray: '#E1E1E1',
  grayLight: '#999EB2',
  grayVeryLight: '#ECEEF2',
  grayModal: '#C0C3CD',
  greyDark: '#333A55',
  greyVeryDark: '#13192E',
  mediumGrey: 'rgba(0,0,0,0.3)',
  veryLightGray: 'rgba(255, 255, 255, 0.15)',
  grayTabIcons: '#D5D5D5',
  rippleColor: '#00000008',
  transparent: 'transparent',
  greenLight: '#B4E33D',
}

export const legacyColors = {
  primary: legacyPalette.orangeLight,
  primaryDisabled: legacyPalette.orangeVeryLight,
  secondary: legacyPalette.orangeMedium,
  tertiary: legacyPalette.orangeAlmostDark,
  special: legacyPalette.specialBlue,
  black: legacyPalette.black,
  white: legacyPalette.white,
  lightGrey: legacyPalette.lightGrey,
  grey: legacyPalette.grey,
  errorRed: legacyPalette.red,
  specialRed: legacyPalette.ligthRed,
  disabled: legacyPalette.gray,
  disabledText: legacyPalette.grayLight,
  mainBackground: legacyPalette.orangeLight,
  bottomTabBgColor: legacyPalette.grayLight,
  modalBackground: legacyPalette.grayModal,
  blackBtnRippleColor: legacyPalette.veryLightGray,
  bottomBarIcons: legacyPalette.grayTabIcons,
  labelLightGrey: legacyPalette.mediumLightGrey,
  headerGrey: legacyPalette.greyNeutral,
  rippleColor: legacyPalette.rippleColor,
  greyDark: legacyPalette.greyDark,
  greyVeryDark: legacyPalette.greyVeryDark,
  grayVeryLight: legacyPalette.grayVeryLight,
  modalBackdrop: legacyPalette.mediumGrey,
  transparent: legacyPalette.transparent,
  approvedGreen: legacyPalette.greenLight,
}
