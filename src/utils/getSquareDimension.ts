import { Dimensions } from 'react-native'

export const getSquareDimension = () => {
  const { width } = Dimensions.get('window')
  return width * 0.5
}
