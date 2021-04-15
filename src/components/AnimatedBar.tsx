import React, { FC, useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme/index'

type AnimatedBarProps = {
  margin: number
  marginSide: string
}
export const AnimatedBar: FC<AnimatedBarProps> = ({ margin, marginSide }) => {
  const barWidth = useSharedValue(0)

  const progressStyle = useAnimatedStyle(() => ({
    width: withTiming(`${barWidth.value}%`, {
      duration: 1000,
    }),
  }))

  useEffect(() => {
    barWidth.value = 100
  })
  return (
    <Box flex={1} style={{ [marginSide]: margin }}>
      <Animated.View style={progressStyle}>
        <Box backgroundColor="tertiary" height={4} />
      </Animated.View>
    </Box>
  )
}
