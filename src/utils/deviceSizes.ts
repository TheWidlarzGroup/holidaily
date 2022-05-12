import { Dimensions } from 'react-native'

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
export const isSmallScreen = windowWidth < 400
export const isScreenHeightShort = windowHeight < 680
