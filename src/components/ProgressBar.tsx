import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import { Box } from 'utils/theme/index'

import { ProgressDot } from './ProgressDot'

type ProgressBarProps = {
  scrollPositionX: Animated.SharedValue<number>
  slidersCount: number
  postPagination?: true
  postId?: string
}

export const ProgressBar: FC<ProgressBarProps> = ({
  scrollPositionX,
  slidersCount,
  postPagination,
  postId,
}) => {
  const mockArr = Array(slidersCount).fill('')

  return (
    <Box flexDirection="row">
      {mockArr.map((_, index) => (
        <ProgressDot
          scrollPositionX={scrollPositionX}
          postId={postId}
          key={index}
          index={index}
          postPagination={postPagination}
        />
      ))}
    </Box>
  )
}
