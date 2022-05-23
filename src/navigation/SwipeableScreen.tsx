import React, { ReactNode, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box, mkUseStyles } from 'utils/theme'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaView } from 'react-native-safe-area-context'

const AnimatedBox = Animated.createAnimatedComponent(Box)

type SwipeableScreenProps = {
  children: ReactNode
}

export const SwipeableScreen = ({ children }: SwipeableScreenProps) => {
  const { height } = useDimensions()
  const { goBack, ...navigation } = useNavigation()
  const styles = useStyles()
  const translateY = useSharedValue(height)
  const isCloseTriggered = useRef(false)
  useEffect(() => {
    translateY.value = withTiming(0)
  }, [translateY])

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number
      offsetX: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      if (ctx.offsetY + event.translationY < 0) return
      translateY.value = ctx.offsetY + event.translationY
    },
  })

  const animatedTranslation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  useEffect(() => {
    const subscription = navigation.addListener('beforeRemove', () => {
      if (!isCloseTriggered.current) {
        isCloseTriggered.current = true
        translateY.value = withTiming(height)
      }
    })
    return subscription
  })
  return (
    <SafeAreaView style={[styles.safeArea]}>
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
          if (translateY.value > 140) {
            goBack()
          } else translateY.value = withTiming(0)
        }}>
        <AnimatedBox
          flex={1}
          backgroundColor="white"
          overflow="hidden"
          marginTop="xxl"
          borderTopLeftRadius="l2min"
          borderTopRightRadius="l2min"
          style={[animatedTranslation]}>
          {children}
        </AnimatedBox>
      </PanGestureHandler>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles(() => ({
  safeArea: {
    flex: 1,
  },
}))
