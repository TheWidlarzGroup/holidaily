import { useMemo, useState } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { randomFromRange } from 'utils/randomFromRange'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { COLORS } from '../../helpers/mockedData'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

export const useBubbles = () => {
  const { height, width } = useDimensions()
  const dropTop = useSharedValue(height - C.DROP_AREA_OFFSET_BOTTOM)
  const dropHeight = useSharedValue(C.DROP_AREA_INIT_HEIGHT)
  const [animateCheckmark, setAnimateCheckmark] = useState(false)
  const initBubbles = useMemo(
    () =>
      COLORS.map((color) => ({
        ...color,
        position: {
          x: randomFromRange(C.BUBBLE_SIZE, width - C.BUBBLE_SIZE),
          y: randomFromRange(C.BUBBLES_OFFSET_TOP, height - C.BUBBLES_OFFSET_BOTTOM),
        },
      })),
    [height, width]
  )

  const animateDropArea = () => {
    dropTop.value = withTiming(-100, C.ANIMATION_CONFIG_MEDIUM)
    dropHeight.value = withTiming(1.5 * height, C.ANIMATION_CONFIG_MEDIUM)
    setTimeout(() => setAnimateCheckmark(true), C.CHECKMARK_ANIMATION_DELAY)
  }

  const animatedDrop = useAnimatedStyle(() => ({
    top: dropTop.value,
    height: dropHeight.value,
  }))
  return {
    animatedDrop,
    animateDropArea,
    bubbles: initBubbles,
    animateCheckmark,
    dropArea: dropTop,
  }
}
