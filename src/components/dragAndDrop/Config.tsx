import { Dimensions } from 'react-native'
import { Easing } from 'react-native-reanimated'
// import { Theme } from 'utils/theme/index'
import { themeBase } from 'utils/theme/themeBase'

const { width } = Dimensions.get('window')
// export const MARGIN: Theme['spacing'] = themeBase.spacing.xs
export const SIZE_W = width / 2
export const COL = 2
export const SIZE_H = 130
// height of dashboard header, height of bottom padding, height of carousel nested in scrollView
export const HEADER_OFFSET = 90
export const BOTTOM_OFFSET = themeBase.spacing.xxxl
export const NESTED_ELEM_OFFSET = 180

type Order = number
export type Positions = {
  [id: number]: Order
}
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 500,
}
export const getPosition = (order: number) => {
  'worklet'

  // when demo user removes a team from his subscriptions, and than adds it back the getOrder is called with undefined as first argument.
  // TODO: The hack in following line works for now, but the bug needs further investigation
  if (Number.isNaN(order) || order === undefined) order = 0
  return {
    x: (order % COL) * SIZE_W,
    y: Math.floor(order / COL) * SIZE_H,
  }
}

export const getOrder = (x: number, y: number) => {
  'worklet'

  const row = Math.round(y / SIZE_H)
  const col = Math.round(x / SIZE_W)
  return row * COL + col
}
