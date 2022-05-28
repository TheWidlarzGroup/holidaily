import React, { ReactNode, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box, Theme } from 'utils/theme'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { BoxProps } from '@shopify/restyle'
import { ConfirmationModalProps } from 'types/confirmationModalProps'
import { useOnGoback, useSwipeGestureHandler } from './service/swipeableScreenUtils'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export type SwipeableScreenProps = {
  children: ReactNode
} & Omit<BoxProps<Theme>, 'style'> &
  (
    | { confirmLeave?: never; confirmLeaveOptions?: never }
    | {
        confirmLeave: boolean
        confirmLeaveOptions?: Omit<
          ConfirmationModalProps,
          'onAccept' | 'hideModal' | 'isVisible' | 'onDecline'
        >
      }
  )

export const SwipeableScreen = ({
  children,
  confirmLeave,
  confirmLeaveOptions,
  ...containerProps
}: SwipeableScreenProps) => {
  const { height } = useDimensions()
  const { goBack, ...navigation } = useNavigation()
  const translateY = useSharedValue(height)
  const dismissedModalWithSwipe = translateY.value > 140
  const isCloseTriggered = useRef(false)
  useEffect(() => {
    translateY.value = withTiming(0)
  }, [translateY])
  const gestureHandler = useSwipeGestureHandler(translateY)
  const animatedTranslation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))
  const slideOut = () => {
    if (!isCloseTriggered.current) {
      isCloseTriggered.current = true
      translateY.value = withTiming(height)
    }
  }
  const slideBackIn = () => (translateY.value = withTiming(0))
  const onGoback = useOnGoback({
    onSuccess: slideOut,
    onFailure: slideBackIn,
    confirmLeave,
    confirmLeaveOptions,
  })
  useEffect(() => {
    const subscription = navigation.addListener('beforeRemove', (e) => onGoback(e))
    return subscription
  })
  return (
    <SafeAreaWrapper edges={['top']} isDefaultBgColor>
      <BaseOpacity
        position="absolute"
        style={{ width: '100%', height: '100%' }}
        zIndex="-1"
        onPress={goBack}
      />
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onEnded={() => {
          if (isCloseTriggered.current) return
          if (dismissedModalWithSwipe) {
            goBack()
          } else slideBackIn()
        }}>
        <AnimatedBox
          flex={1}
          backgroundColor="white"
          overflow="hidden"
          marginTop="xxl"
          borderTopLeftRadius="l2min"
          borderTopRightRadius="l2min"
          {...containerProps}
          style={[animatedTranslation]}>
          {children}
        </AnimatedBox>
      </PanGestureHandler>
    </SafeAreaWrapper>
  )
}
