import React, { ReactNode, useRef } from 'react'
import { isIos } from 'react-native-calendars/src/expandableCalendar/commons'
import { HandlerStateChangeEvent, PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

type GestureRecognizerProps = {
  children?: ReactNode
  onSwipeLeft?: F0
  onSwipeRight?: F0
  onSwipeUp?: F0
  onSwipeDown?: F0
}

export const GestureRecognizer = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: GestureRecognizerProps) => {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

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
      <Animated.View style={{ flex: 1 }}>{children}</Animated.View>
    </PanGestureHandler>
  )
}
