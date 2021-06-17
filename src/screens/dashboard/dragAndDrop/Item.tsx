import React, { ReactNode } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { COL, getPosition, Positions, SIZE, getOrder, animationConfig } from './Config'

interface ItemProps {
  children: ReactNode
  positions: Animated.SharedValue<Positions>
  id: number
}

export const Item = ({ children, positions, id }: ItemProps) => {
  const inset = useSafeAreaInsets()
  const containerHeight = Dimensions.get('window').height - inset.top - inset.bottom
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE
  const p1 = getPosition(positions.value[id])
  const position = getPosition(getOrder(p1.x, p1.y))
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value
      ctx.y = translateY.value
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX
      translateY.value = ctx.y + translationY
    },
    onEnd:()=>{
        const destination = getPosition(positions.value[id])
        translateX.value = withTiming(destination.x, animationConfig)
        translateY.value = withTiming(destination.y, animationConfig)
    }
  })
  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }))
  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}
