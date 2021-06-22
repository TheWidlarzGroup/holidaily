import React, { ReactNode, RefObject } from 'react'
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  scrollTo,
  runOnJS,
  withTiming,
} from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import {
  COL,
  getPosition,
  Positions,
  SIZE,
  getOrder,
  animationConfig,
  SIZE_H,
  MARGIN,
} from './Config'

interface ItemProps {
  children: ReactNode
  positions: Animated.SharedValue<Positions>
  id: number
  scrollView: RefObject<Animated.ScrollView>
  scrollY: Animated.SharedValue<number>
  editing: boolean
  onDragEnd: () => void
}

export const Item = ({
  children,
  positions,
  id,
  scrollView,
  scrollY,
  editing,
  onDragEnd,
}: ItemProps) => {
  const inset = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  // 120 wysokość headera, 75 bottom navigator
  const containerHeight = height - inset.top - inset.bottom
  const contentHeight = Math.ceil(Object.keys(positions.value).length / COL) * SIZE_H
  const p1 = getPosition(positions.value[id])
  const position = getPosition(getOrder(p1.x, p1.y))
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder)
      translateX.value = withTiming(newPosition.x, animationConfig)
      translateY.value = withTiming(newPosition.y, animationConfig)
    }
  )
  const isGestureActive = useSharedValue(false)

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      isGestureActive.value = true
      ctx.x = translateX.value
      ctx.y = translateY.value
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX
      translateY.value = ctx.y + translationY
      const oldOrder = positions.value[id]
      const newOrder = getOrder(translateX.value, translateY.value)
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder
        )
        if (idToSwap) {
          const newPositions = { ...positions.value }
          newPositions[id] = newOrder
          newPositions[idToSwap] = oldOrder
          positions.value = newPositions
        }
      }
      const offset = scrollY.value < 200 ? 200 - scrollY.value : 0
      const upBound = scrollY.value
      // offset wysokośc karuzeli - 200
      const downBound = upBound + containerHeight - SIZE_H - 90 - 90 - offset
      const maxScroll = contentHeight
      const leftToScrollDown = maxScroll - scrollY.value
      console.log(translateY.value, upBound, downBound, maxScroll)
      if (translateY.value > upBound) {
        const diff = Math.min(upBound - translateY.value, upBound)
        scrollY.value -= diff
        scrollTo(scrollView, 0, scrollY.value, false)
        ctx.y -= diff
        translateY.value = ctx.y + translationY
      }
      if (translateY.value < downBound) {
        const diff = Math.min(translateY.value - downBound, leftToScrollDown)
        scrollY.value += diff
        ctx.y += diff
        scrollTo(scrollView, 0, scrollY.value, false)
        translateY.value = ctx.y + translationY
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id])
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false
      })
      translateY.value = withTiming(destination.y, animationConfig)
      // save order of teams
      runOnJS(onDragEnd)()
    },
  })

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0

    return {
      position: 'absolute',
      top: 200,
      left: 0,
      width: SIZE,
      height: SIZE_H,
      zIndex,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <Animated.View style={style}>
      <PanGestureHandler enabled={editing} onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}
