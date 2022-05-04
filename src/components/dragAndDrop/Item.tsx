import React, { ReactNode, RefObject } from 'react'
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { themeBase } from 'utils/theme/themeBase'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  scrollTo,
  runOnJS,
  withTiming,
} from 'react-native-reanimated'
import {
  State,
  LongPressGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import {
  COL,
  getPosition,
  Positions,
  SIZE_W,
  getOrder,
  animationConfig,
  SIZE_H,
  HEADER_OFFSET,
  BOTTOM_OFFSET,
  NESTED_ELEM_OFFSET,
} from './Config'

type ItemProps = {
  children: ReactNode
  positions: Animated.SharedValue<Positions>
  id: number
  scrollView: RefObject<FlatList<any>>
  scrollY: Animated.SharedValue<number>
  draggedElement: number | null
  onLongPress: F0
  stopDragging: F0
}

export const Item = (props: ItemProps) => {
  const {
    children,
    positions,
    id,
    scrollView,
    scrollY,
    draggedElement,
    onLongPress,
    stopDragging,
  } = props

  const isGestureActive = useSharedValue(false)
  const inset = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  const containerHeight = height - inset.top - inset.bottom - HEADER_OFFSET - BOTTOM_OFFSET
  const contentHeight =
    Math.ceil(Object.keys(positions.value).length / COL) * SIZE_H + NESTED_ELEM_OFFSET
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

  const handleLongPressStateChange = (event: LongPressGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLongPress()
    }
  }

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      isGestureActive.value = true
      ctx.x = translateX.value
      ctx.y = translateY.value
    },
    onActive: (foo, ctx) => {
      const { translationX, translationY } = foo
      translateX.value = ctx.x + translationX
      translateY.value = ctx.y + translationY
      const oldOrder = positions.value[id]
      const newOrder = getOrder(translateX.value, translateY.value)
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[Number(key)] === newOrder
        )
        if (idToSwap) {
          const newPositions = { ...positions.value }
          newPositions[id] = newOrder
          newPositions[Number(idToSwap)] = oldOrder
          positions.value = newPositions
        }
      }
      // scroll while dragging
      const lowerBound = scrollY.value < NESTED_ELEM_OFFSET ? 0 : scrollY.value - NESTED_ELEM_OFFSET
      const stackElementOffset =
        scrollY.value < NESTED_ELEM_OFFSET ? NESTED_ELEM_OFFSET - scrollY.value : 0
      const upperBound = containerHeight - SIZE_H - stackElementOffset
      const maxScroll = contentHeight - containerHeight
      const leftToScrollDown = maxScroll - scrollY.value

      if (translateY.value < lowerBound) {
        const diff = Math.min(lowerBound - translateY.value, lowerBound)
        scrollY.value -= diff
        scrollTo(scrollView, 0, scrollY.value, false)
        ctx.y -= diff
        translateY.value = ctx.y + translationY
      }

      if (translateY.value > upperBound) {
        const diff = Math.min(translateY.value - upperBound, leftToScrollDown)
        scrollY.value += diff
        scrollTo(scrollView, 0, scrollY.value, false)
        ctx.y += diff
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
      runOnJS(stopDragging)()
    },
  })
  console.log(id)
  const style = useAnimatedStyle(() => {
    const scale = draggedElement === id ? 1.1 : 1
    return {
      position: 'absolute',
      left: 0,
      width: SIZE_W,
      height: SIZE_H,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
    }
  })

  return (
    <LongPressGestureHandler minDurationMs={400} onHandlerStateChange={handleLongPressStateChange}>
      <Animated.View style={style}>
        <PanGestureHandler enabled={draggedElement === id} onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </LongPressGestureHandler>
  )
}
