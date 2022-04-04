import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
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
import { useEditUser } from 'dataAccess/mutations/useEditUser'
import LocalStorage from 'utils/localStorage'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

type Position = {
  x: number
  y: number
}

type BubbleProps = {
  color: string
  diameter: number
  position: Position
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
  const bubbleSize = useSharedValue(C.BUBBLE_SIZE_INIT)
  const draggedBubbleScale = useSharedValue(1)
  const bubbleOpacity = useSharedValue(1)

  const randomDelay = Math.floor(Math.random() * 600)
  const { mutate } = useEditUser()
  const handleSelection = () => {
    setUserColor(color)
    setDropColor(color)
    bubbleOpacity.value = 0
    animateDropArea()
    setTimeout(() => navigation.goBack(), C.ANIMATION_END_DELAY)
    mutate(
      { userColor: color },
      {
        onSuccess: ({ user }) => {
          LocalStorage.setItem('userColor', user.userColor)
        },
      }
    )
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
        draggedBubbleScale.value = withTiming(1.2, C.ANIMATION_CONFIG_FAST)
      } else {
        draggedBubbleScale.value = withTiming(1, C.ANIMATION_CONFIG_FAST)
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [C.BUBBLES_OFFSET_LEFT, width - C.BUBBLE_SIZE],
      })
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [C.BUBBLES_OFFSET_TOP, height - C.BUBBLE_SIZE],
      })
      if (translateY.value > dropArea && draggedBubbleScale.value > 1) {
        runOnJS(handleSelection)()
      }
    },
  })

  const viewStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }))

  const BubbleStyle = useAnimatedStyle(() => ({
    width: withDelay(randomDelay, withTiming(bubbleSize.value, C.ANIMATION_CONFIG_LONG)),
    height: withDelay(randomDelay, withTiming(bubbleSize.value, C.ANIMATION_CONFIG_LONG)),
    borderRadius: withDelay(randomDelay, withTiming(bubbleSize.value, C.ANIMATION_CONFIG_LONG)),
    transform: [{ scale: draggedBubbleScale.value }],
    opacity: bubbleOpacity.value,
  }))

  useEffect(() => {
    bubbleSize.value = diameter
  }, [bubbleSize, diameter])

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={viewStyle}>
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
