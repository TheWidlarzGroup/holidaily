import React, { FC } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated'
import { colors } from 'utils/theme/colors'

const { width } = Dimensions.get('window')

type ProgressDotProps = {
  scrollPositionX: Animated.SharedValue<number>
  index: number
}

export const ProgressDot: FC<ProgressDotProps> = ({ scrollPositionX, index }) => {
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollPositionX.value,
      [width * (index - 1), width * index, width * (index + 1)],
      [colors.white, colors.black, colors.white]
    )

    return { backgroundColor }
  })

  return <Animated.View style={[styles.dot, style]} />
}

const styles = StyleSheet.create({
  dot: {
    margin: 5,
    width: 10,
    height: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
})
