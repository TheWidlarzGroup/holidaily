import React, { useEffect, useRef } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Box } from 'utils/theme/index'

type AnimatedBarProps = {
  isActive: boolean
  reverseAnimation?: boolean
  disableInitialAnimation?: boolean
} & React.ComponentProps<typeof Box>
export const AnimatedBar = ({
  reverseAnimation,
  disableInitialAnimation,
  isActive,
  ...p
}: AnimatedBarProps) => {
  const barWidth = useSharedValue(reverseAnimation ? 100 : 0)
  const isFirstRender = useRef(true)
  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }))

  useEffect(() => {
    if (isFirstRender.current && disableInitialAnimation) {
      barWidth.value = reverseAnimation ? 0 : 100
    } else {
      barWidth.value = withTiming(reverseAnimation ? 0 : 100, {
        duration: 1000,
      })
    }

    isFirstRender.current = false
  }, [barWidth, reverseAnimation, disableInitialAnimation])
  return (
    <Box flex={1} {...p}>
      <Animated.View style={animatedProgressStyle}>
        <Box backgroundColor={isActive ? 'tertiary' : 'lightGrey'} height={4} borderRadius="full" />
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
