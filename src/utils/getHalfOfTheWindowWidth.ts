import { Dimensions } from 'react-native'

export const getHalfOfTheWindowWidth = () => {
  const { width } = Dimensions.get('window')
  return width * 0.5
}
