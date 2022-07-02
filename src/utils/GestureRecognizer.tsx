import React, { ReactNode, useRef } from 'react'
import { View } from 'react-native'
import { isIos } from 'react-native-calendars/src/expandableCalendar/commons'
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

type GestureRecognizerProps = {
  children?: ReactNode
  scrollEnabled?: boolean
  onSwipeLeft?: F0
  onSwipeRight?: F0
  onSwipeUp?: F0
  onSwipeDown?: F0
}

export const GestureRecognizer = ({
  children,
  scrollEnabled = false,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: GestureRecognizerProps) => {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const AnimatedComponent = scrollEnabled
    ? Animated.createAnimatedComponent(ScrollView)
    : Animated.createAnimatedComponent(View)

  const onTouchStart = (e: HandlerStateChangeEvent<Record<string, any>>) => {
    if (onSwipeLeft || onSwipeRight) touchStartX.current = e.nativeEvent.x
    if (onSwipeUp || onSwipeDown) touchStartY.current = e.nativeEvent.y
  }

  const onTouchMove = (e: HandlerStateChangeEvent<Record<string, any>>) => {
    const minSwipeDistance = isIos ? 30 : 12
    const touchMoveX = e.nativeEvent.x
    const touchMoveY = e.nativeEvent.y

    if (onSwipeRight && touchMoveX - touchStartX.current > minSwipeDistance) onSwipeRight()
    if (onSwipeLeft && touchStartX.current - touchMoveX > minSwipeDistance) onSwipeLeft()
    if (onSwipeDown && touchMoveY - touchStartY.current > minSwipeDistance) onSwipeDown()
    if (onSwipeUp && touchStartY.current - touchMoveY > minSwipeDistance) onSwipeUp()
  }

  return (
    <PanGestureHandler onBegan={onTouchStart} onActivated={onTouchMove}>
      <AnimatedComponent scrollEnabled={scrollEnabled} style={{ flex: 1 }}>
        {children}
      </AnimatedComponent>
    </PanGestureHandler>
  )
}
