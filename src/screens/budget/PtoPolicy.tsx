import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

const Background = require('assets/policy_modal_background.png')

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const PtoPolicy = () => {
  const { height } = useDimensions()
  const { goBack } = useNavigation()
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

  const closeModal = () => {
    // closeModal is fired twice on BaseOpacity press
    if (!isCloseTriggered.current) {
      isCloseTriggered.current = true
      translateY.value = withTiming(height)
      goBack()
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onEnded={() => {
          if (translateY.value > 140) {
            closeModal()
          } else translateY.value = withTiming(0)
        }}>
        <AnimatedBox
          flex={1}
          backgroundColor="white"
          overflow="hidden"
          style={[animatedTranslation]}>
          <PolicyHeader closeModal={closeModal} />
          <Policies />
          <FastImage style={[styles.background]} source={Background} />
        </AnimatedBox>
      </PanGestureHandler>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
