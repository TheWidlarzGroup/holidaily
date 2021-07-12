import React from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated'

export const Bubble = ({ color }: { color: string }) => {
  const { height, width } = useWindowDimensions()
  console.log(height, width)

  const initialX = Math.random() * (width - 100)
  const initialY = Math.random() * (height - 100)

  const translateX = useSharedValue(initialX)
  const translateY = useSharedValue(initialY)
  const handleSelection = () => {
    translateX.value = 160
    translateY.value = height / 2
  }

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number
      offsetX: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX
      translateY.value = ctx.offsetY + event.translationY
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({ velocity: velocityX, clamp: [0, width - 100] })
      translateY.value = withDecay({ velocity: velocityY, clamp: [50, height - 100] })
    },
  })
  // eslint-disable-next-line arrow-body-style
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={style}>
        <TouchableOpacity
          style={{ backgroundColor: color, width: 100, height: 100, borderRadius: 100 }}
          onPress={handleSelection}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}
