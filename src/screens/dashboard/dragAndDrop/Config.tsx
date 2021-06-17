import { Dimensions } from 'react-native'
import { Easing } from 'react-native-reanimated'

const { width } = Dimensions.get('window')
export const MARGIN = 4
export const SIZE = width / 2 - MARGIN
export const COL = 2
export const SIZE_H = 130

type Order = number
export type Positions = {
  [id: number]: Order
}
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
}
export const getPosition = (order: number) => {
  'worklet'

  return {
    x: (order % COL) * SIZE,
    y: Math.floor(order / COL) * SIZE_H,
  }
}

export const getOrder = (x: number, y: number) => {
  'worklet'

  const row = Math.round(y / SIZE_H)
  const col = Math.round(x / SIZE)
  return row * COL + col
}
