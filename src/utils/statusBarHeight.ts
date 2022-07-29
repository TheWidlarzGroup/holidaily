import { Dimensions, Platform, StatusBar } from 'react-native'

const IP_X_WIDTH = 375
const IP_X_HEIGHT = 812

const IP_XSMAX_WIDTH = 414
const IP_XSMAX_HEIGHT = 896

const { height, width } = Dimensions.get('window')

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === IP_X_WIDTH && height === IP_X_HEIGHT) ||
      (width === IP_XSMAX_WIDTH && height === IP_XSMAX_HEIGHT)
    : false

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
})
