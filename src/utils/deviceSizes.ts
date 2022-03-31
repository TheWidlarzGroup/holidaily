import { Dimensions } from 'react-native'

export const { width: windowWidth } = Dimensions.get('window')
export const isSmallScreen = windowWidth < 400
