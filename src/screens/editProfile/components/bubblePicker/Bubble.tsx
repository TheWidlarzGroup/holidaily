import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useUserDetailsContext } from 'screens/editProfile/helpers/UserDetailsContext'
import { useNavigation } from '@react-navigation/native'

type BubbleProps = {
  color: string
  diameter: number
  position: { x: number; y: number }
  dropArea: number
  setDropColor: F1<string>
  animateDropArea: F0
}

export const Bubble = ({
  color,
  diameter,
  position,
  dropArea,
  setDropColor,
  animateDropArea,
}: BubbleProps) => {
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()
  const { setUserColor } = useUserDetailsContext()

  const initialX = position.x
  const initialY = position.y
  const translateX = useSharedValue(initialX)
  const translateY = useSharedValue(initialY)
  const bubbleSize = useSharedValue(0)
  const draggedBubbleScale = useSharedValue(1)
  const BubbleOpacity = useSharedValue(1)

  const randomDelay = Math.floor(Math.random() * 600)

  const handleSelection = () => {
    setUserColor(color)
    setDropColor(color)
    BubbleOpacity.value = 0
    animateDropArea()
    setTimeout(() => navigation.goBack(), 1500)
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
      if (translateY.value > dropArea) {
        draggedBubbleScale.value = withTiming(1.2, { duration: 200 })
      } else {
        draggedBubbleScale.value = withTiming(1, { duration: 200 })
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({ velocity: velocityX, clamp: [0, width - diameter] })
      translateY.value = withDecay({ velocity: velocityY, clamp: [130, height - diameter] })
      if (translateY.value > dropArea && draggedBubbleScale.value > 1) {
        runOnJS(handleSelection)()
      }
    },
  })

  // eslint-disable-next-line arrow-body-style
  const ViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })
  // eslint-disable-next-line arrow-body-style
  const BubbleStyle = useAnimatedStyle(() => {
    return {
      width: withDelay(
        randomDelay,
        withTiming(bubbleSize.value, {
          duration: 600,
        })
      ),
      height: withDelay(
        randomDelay,
        withTiming(bubbleSize.value, {
          duration: 600,
        })
      ),
      borderRadius: withDelay(randomDelay, withTiming(bubbleSize.value, { duration: 600 })),
      transform: [{ scale: draggedBubbleScale.value }],
      opacity: BubbleOpacity.value,
    }
  })

  useEffect(() => {
    bubbleSize.value = diameter
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={ViewStyle}>
        <Animated.View
          style={[
            BubbleStyle,
            {
              backgroundColor: color,
            },
          ]}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}
