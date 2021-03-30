import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { Box } from '../utils/theme/index'

import { ProgressDot } from './ProgressDot'

type ProgressBarProps = {
  scrollPositionX: Animated.SharedValue<number>
  slidersCount: number
}

export const ProgressBar: FC<ProgressBarProps> = ({ scrollPositionX, slidersCount }) => {
  const mockArr = Array(slidersCount).fill('')

  return (
    <Box style={styles.progressBar}>
      {mockArr.map((_, index) => (
        <ProgressDot scrollPositionX={scrollPositionX} key={index} index={index} />
      ))}
    </Box>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
  },
})
