import React, { FC, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { theme } from 'utils/theme'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { isSmallScreen } from 'utils/deviceSizes'

type NavigationDotProps = {
  width: number
  activeTabIndex: number
  minIconWidth: number
}

export const NavigationDot: FC<NavigationDotProps> = ({ width, activeTabIndex, minIconWidth }) => {
  const startingPos = (width - 5) / 2
  const dotWidth = useSharedValue(5)
  const dotHeight = useSharedValue(5)
  const translateX = useSharedValue(startingPos)

  const progressStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
    width: interpolate(dotWidth.value, [5, 100, 5], [5, 40, 5]),
    height: dotHeight.value,
  }))

  useEffect(() => {
    if (isSmallScreen && activeTabIndex > 2) {
      translateX.value = withTiming(startingPos + minIconWidth + (activeTabIndex - 1) * width, {
        duration: 600,
      })
    } else {
      translateX.value = withTiming(startingPos + activeTabIndex * width, { duration: 600 })
    }

    dotWidth.value = withSequence(
      withTiming(width, { duration: 300 }),
      withTiming(5, { duration: 300 })
    )

    dotHeight.value = withSequence(
      withTiming(0, { duration: 300 }),
      withTiming(5, { duration: 300 })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex])

  return (
    <Animated.View style={styles.dotContainer}>
      <Animated.View style={[progressStyle, styles.dot]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  dotContainer: {
    height: 10,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  dot: {
    borderRadius: 2.5,
    backgroundColor: theme.colors.black,
  },
})
