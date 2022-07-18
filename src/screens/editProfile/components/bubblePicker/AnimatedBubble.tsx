import React, { useMemo } from 'react'
import { windowHeight, windowWidth } from 'utils/deviceSizes'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { sleep } from 'utils/sleep'
import { useBooleanState } from 'hooks/useBooleanState'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

type Bubble = {
  position: {
    x: number
    y: number
  }
  color: string
  id: number
}

type AnimatedBubbleProps = {
  currentColor: string
  bubbles: Bubble[]
}

const STARTING_SCALE = 100
const STARTING_Y = windowHeight * 0.5
const STARTING_X = windowWidth * 0.5
const AnimatedBubbleComponent = Animated.createAnimatedComponent(Box)

export const AnimatedBubble = (props: AnimatedBubbleProps) => {
  const [isAnimated, { setTrue: animationCompleted }] = useBooleanState(false)
  const currentBubble = useMemo(
    () => props.bubbles.find((bubble) => bubble.color === props.currentColor),
    [props.bubbles, props.currentColor]
  )

  const bubbleY = useSharedValue(STARTING_Y)
  const bubbleX = useSharedValue(STARTING_X)
  const bubbleScale = useSharedValue(STARTING_SCALE)

  const AnimatedBubbleStyle = useAnimatedStyle(
    () => ({
      top: bubbleY.value,
      left: bubbleX.value,
      transform: [{ scale: bubbleScale.value }],
    }),
    []
  )

  useAsyncEffect(async () => {
    if (currentBubble) {
      bubbleScale.value = withTiming(1, { duration: 2000 })
      await sleep(1000)
      bubbleX.value = currentBubble.position.x
      bubbleY.value = currentBubble.position.y
      await sleep(1000)
      animationCompleted()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!isAnimated && (
        <AnimatedBubbleComponent
          zIndex="10"
          position="absolute"
          width={C.BUBBLE_SIZE}
          height={C.BUBBLE_SIZE}
          style={[AnimatedBubbleStyle, { backgroundColor: props.currentColor, borderRadius: 500 }]}
        />
      )}
    </>
  )
}
