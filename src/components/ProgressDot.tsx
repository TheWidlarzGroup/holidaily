import React, { FC } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated'
import { colors } from 'utils/theme/colors'

const { width } = Dimensions.get('window')

type ProgressDotProps = {
  scrollPositionX: Animated.SharedValue<number>
  index: number
  isVisible: boolean
  isSmall: boolean
}

export const ProgressDot: FC<ProgressDotProps> = ({
  scrollPositionX,
  index,
  isVisible = true,
  isSmall,
}) => {
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollPositionX.value,
      [width * (index - 1), width * index, width * (index + 1)],
      [colors.white, colors.black, colors.white]
    )

    return { backgroundColor }
  })

  if (!isVisible) return null
  return <Animated.View style={[isSmall ? styles.smallDot : styles.dot, style]} />
}

const styles = StyleSheet.create({
  dot: {
    margin: 5,
    width: 8,
    height: 8,
    borderRadius: 10,
  },
  smallDot: {
    margin: 5,
    width: 6,
    height: 6,
    borderRadius: 10,
  },
})
