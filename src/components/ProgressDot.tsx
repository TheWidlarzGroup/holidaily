import React, { FC } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated'

const styles = StyleSheet.create({
  dot: {
    margin: 5,
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
})

const { width } = Dimensions.get('window')

interface ProgressDotProps {
  scrollPositionX: Animated.SharedValue<number>
  index: number
}

const ProgressDot: FC<ProgressDotProps> = ({ scrollPositionX, index }) => {
  const style = useAnimatedStyle(() => {
    const scale = withTiming(
      interpolate(
        scrollPositionX.value,
        [width * (index - 1), width * index, width * (index + 1)],
        [1, 1.5, 1],
        Extrapolate.CLAMP
      ),
      {
        duration: 200,
      }
    )
    const opacity = withTiming(
      interpolate(
        scrollPositionX.value,
        [width * (index - 1), width * index],
        [0.5, 1],
        Extrapolate.CLAMP
      ),
      {
        duration: 200,
      }
    )

    return { opacity, transform: [{ scale }] }
  })

  return <Animated.View style={[styles.dot, style]}></Animated.View>
}

export default ProgressDot
