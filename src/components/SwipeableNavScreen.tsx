import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaView } from 'react-native-safe-area-context'

type SwipeableNavScreenProps = {
  onHide: F0
  children: React.ReactElement[]
}

export type SwipeableNavScreenRef = { hide: F0 }

export const SwipeableNavScreen = forwardRef<SwipeableNavScreenRef, SwipeableNavScreenProps>(
  ({ children, onHide }, ref) => {
    const { height } = useDimensions()
    const styles = useStyles()
    const translateY = useSharedValue(height)
    const isCloseTriggered = useRef(false)
    useImperativeHandle(ref, () => ({
      hide: closeModal,
    }))

    useEffect(() => {
      translateY.value = withTiming(0)
    }, [translateY])

    const AnimatedBox = Animated.createAnimatedComponent(Box)

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
      if (!isCloseTriggered.current) {
        isCloseTriggered.current = true
        translateY.value = withTiming(height)
        onHide()
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
            borderTopLeftRadius="m"
            borderTopRightRadius="m"
            backgroundColor="white"
            overflow="hidden"
            style={[animatedTranslation]}>
            {children}
          </AnimatedBox>
        </PanGestureHandler>
      </SafeAreaView>
    )
  }
)
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
