import React, { FC } from 'react'
import Svg, { Circle } from 'react-native-svg'
import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'

type LoaderProps = {
  progress: number
}

const { interpolate, multiply } = Animated
const size = 40
const strokeWidth = 6
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const { PI } = Math
const r = (size - strokeWidth) / 2
const cx = size / 2
const cy = size / 2

export const Loader: FC<LoaderProps> = ({ progress }) => {
  const circumference = r * 2 * PI
  const a = interpolate(progress, [0, 1], [0, PI * 2])
  const strokeDashoffset = multiply(a, r)

  return (
    <Svg width={size} height={size} style={styles.container}>
      <Circle stroke="#fff" fill="none" {...{ strokeWidth, cx, cy, r }} />

      <AnimatedCircle
        stroke="#000"
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        {...{ strokeDashoffset, strokeWidth, cx, cy, r }}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
})
