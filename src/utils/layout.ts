import { Platform, Dimensions } from 'react-native'

export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const getHalfWindowWidth = () => Dimensions.get('window').width / 2
