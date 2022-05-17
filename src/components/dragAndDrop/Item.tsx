import React, { ReactElement, ReactNode, RefObject } from 'react'
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native'
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
import {
  State,
  LongPressGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import { Box, useTheme } from 'utils/theme'
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
  scrollView: RefObject<FlatList<SortableListItemType>>
  scrollY: Animated.SharedValue<number>
  draggedElement: number | null
  onLongPress: F0
  stopDragging: F0
}

export type SortableListItemType = ReactElement<{ id: number }>

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
  const theme = useTheme()
  const animatedMargins = useAnimatedStyle(() => {
    console.log(positions.value[id])
    const isEven = !(positions.value[id] % 2)
    if (isEven)
      return {
        marginLeft: theme.spacing.m,
        marginRight: theme.spacing.s,
      }
    return {
      marginLeft: theme.spacing.s,
      marginRight: theme.spacing.m,
    }
  })
  return (
    <LongPressGestureHandler minDurationMs={400} onHandlerStateChange={handleLongPressStateChange}>
      <Animated.View style={style}>
        <PanGestureHandler enabled={draggedElement === id} onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <AnimatedBox marginTop="s" marginBottom="s" style={animatedMargins}>
              {children}
            </AnimatedBox>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </LongPressGestureHandler>
  )
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
