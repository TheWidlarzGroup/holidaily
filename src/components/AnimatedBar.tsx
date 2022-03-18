import React, { FC, useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme/index'

type AnimatedBarProps = {
  margin: number
  marginSide: 'margin' | `margin${'Left' | 'Right' | 'Top' | 'Bottom' | 'Horizontal' | 'Vertical'}`
  reverseAnimation?: boolean
}
export const AnimatedBar: FC<AnimatedBarProps> = ({ margin, marginSide, reverseAnimation }) => {
  const barWidth = useSharedValue(reverseAnimation ? 100 : 0)

  const progressStyle = useAnimatedStyle(() => ({
    width: withTiming(`${barWidth.value}%`, {
      duration: 1000,
    }),
  }))

  useEffect(() => {
    barWidth.value = reverseAnimation ? 0 : 100
  })
  return (
    <Box flex={1} style={{ [marginSide]: margin }}>
      <Animated.View style={progressStyle}>
        <Box backgroundColor="tertiary" height={4} borderRadius="full" />
      </Animated.View>
      <Box
        backgroundColor="lightGrey"
        zIndex="-1"
        height={4}
        style={[{ transform: [{ translateY: -4 }] }]}
      />
    </Box>
  )
}
