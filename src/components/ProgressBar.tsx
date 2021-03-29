import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'

import ProgressDot from './ProgressDot'

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
  },
})

type ProgressBarProps = {
  scrollPositionX: Animated.SharedValue<number>
  slidersCount: number
}

const ProgressBar: FC<ProgressBarProps> = ({ scrollPositionX, slidersCount }) => {
  const mockArr = Array(slidersCount).fill('')

  return (
    <View style={styles.progressBar}>
      {mockArr.map((_, index) => (
        <ProgressDot scrollPositionX={scrollPositionX} key={index} index={index} />
      ))}
    </View>
  )
}

export default ProgressBar
