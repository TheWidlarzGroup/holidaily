import React, { useMemo, useState } from 'react'
import { windowHeight, windowWidth } from 'utils/deviceSizes'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { sleep } from 'utils/sleep'
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

const AnimatedBubbleComponent = Animated.createAnimatedComponent(Box)

export const AnimatedBubble = (props: AnimatedBubbleProps) => {
  const [isAnimated, setIsAnimated] = useState(false)
  const currentBubble = useMemo(
    () => props.bubbles.find((bubble) => bubble.color === props.currentColor),
    [props.bubbles, props.currentColor]
  )

  const startingScale = 100
  const startingY = windowHeight * 0.5
  const startingX = windowWidth * 0.5

  const bubbleY = useSharedValue(startingY)
  const bubbleX = useSharedValue(startingX)
  const bubbleScale = useSharedValue(startingScale)

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
      setIsAnimated(true)
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
