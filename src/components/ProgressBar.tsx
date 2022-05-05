import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import { Box } from 'utils/theme/index'

import { ProgressDot } from './ProgressDot'

type ProgressBarProps = {
  scrollPositionX: Animated.SharedValue<number>
  slidersCount: number
  currentIndex: number
}

export const ProgressBar: FC<ProgressBarProps> = ({
  scrollPositionX,
  slidersCount,
  currentIndex,
}) => {
  const mockArr = Array(slidersCount).fill('')

  const isVisible = (index: number) => {
    const between = (index: number, min: number, max: number) => index >= min && index <= max
    if (currentIndex === 0 && index < 3) return true
    if (currentIndex === slidersCount - 1 && currentIndex - index === 3) return true
    return between(index, currentIndex - 1, currentIndex + 1)
  }

  const isSmall = (index: number) => {
    const leftImagesToSwipeOnRight = slidersCount - (currentIndex + 1)
    const isMostRightDotSmall =
      currentIndex - index === -1 && currentIndex !== 0 && leftImagesToSwipeOnRight >= 2

    const isMostLeftDotSmall =
      currentIndex - index === 1 && currentIndex !== slidersCount - 1 && currentIndex >= 2

    const areOuterDotsSmall = currentIndex - index === 2 || currentIndex - index === -2

    switch (true) {
      case slidersCount <= 3:
        return false
      case isMostRightDotSmall:
        return true
      case isMostLeftDotSmall:
        return true
      case areOuterDotsSmall:
        return true
      default:
        return false
    }
  }

  return (
    <Box flexDirection="row">
      {mockArr.map((_, index) => (
        <ProgressDot
          scrollPositionX={scrollPositionX}
          key={index}
          index={index}
          isVisible={isVisible(index)}
          isSmall={isSmall(index)}
        />
      ))}
    </Box>
  )
}
