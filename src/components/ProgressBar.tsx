import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { ProgressDot } from './ProgressDot'

type ProgressBarProps = {
  scrollPositionX: Animated.SharedValue<number>
  slidersCount: number
}

export const ProgressBar: FC<ProgressBarProps> = ({ scrollPositionX, slidersCount }) => {
  const mockArr = Array(slidersCount).fill('')

  return (
    <View style={styles.progressBar}>
      {mockArr.map((_, index) => (
        <ProgressDot scrollPositionX={scrollPositionX} key={index} index={index} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
  },
})
