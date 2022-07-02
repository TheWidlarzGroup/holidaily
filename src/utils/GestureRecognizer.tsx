import React, { ReactNode, useRef } from 'react'
import { isIos } from 'react-native-calendars/src/expandableCalendar/commons'
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { Box } from 'utils/theme'

type GestureRecognizerProps = {
  children: ReactNode
  component: 'Box' | 'ScrollView'
  onSwipeLeft?: F0
  onSwipeRight?: F0
  onSwipeTop?: F0
  onSwipeDown?: F0
}

export const GestureRecognizer = ({
  children,
  component,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
  onSwipeDown,
}: GestureRecognizerProps) => {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const AnimatedComponent =
    component === 'Box'
      ? Animated.createAnimatedComponent(Box)
      : Animated.createAnimatedComponent(ScrollView)

  const onTouchStart = (e: HandlerStateChangeEvent<Record<string, any>>) => {
    if (onSwipeLeft || onSwipeRight) touchStartX.current = e.nativeEvent.x
    if (onSwipeTop || onSwipeDown) touchStartY.current = e.nativeEvent.y
  }

  const onTouchMove = (e: HandlerStateChangeEvent<Record<string, any>>) => {
    const minSwipeDistance = isIos ? 30 : 12
    const touchMoveX = e.nativeEvent.x
    const touchMoveY = e.nativeEvent.y

    if (onSwipeRight && touchMoveX - touchStartX.current > minSwipeDistance) onSwipeRight()
    if (onSwipeLeft && touchStartX.current - touchMoveX > minSwipeDistance) onSwipeLeft()
    if (onSwipeDown && touchMoveY - touchStartY.current > minSwipeDistance) onSwipeDown()
    if (onSwipeTop && touchStartY.current - touchMoveY > minSwipeDistance) onSwipeTop()
  }

  return (
    <PanGestureHandler onBegan={onTouchStart} onActivated={onTouchMove}>
      <AnimatedComponent style={{ flex: 1 }}>{children}</AnimatedComponent>
    </PanGestureHandler>
  )
}
