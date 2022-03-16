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

type NavigationDotProps = {
  width: number
  activeTabIndex: number
  isSmallScreen: boolean
  windowWidth: number
}

export const NavigationDot: FC<NavigationDotProps> = ({
  width,
  activeTabIndex,
  isSmallScreen,
  windowWidth,
}) => {
  let tabWidth = width
  const minPlusIconWidth = 80

  if (isSmallScreen) {
    tabWidth = (windowWidth - minPlusIconWidth) / 4
  }

  const startingPos = (tabWidth - 5) / 2
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
    if (activeTabIndex > 2 && isSmallScreen) {
      translateX.value = withTiming(
        startingPos + minPlusIconWidth + (activeTabIndex - 1) * tabWidth,
        {
          duration: 600,
        }
      )
    } else {
      translateX.value = withTiming(startingPos + activeTabIndex * tabWidth, { duration: 600 })
    }

    dotWidth.value = withSequence(
      withTiming(tabWidth, { duration: 300 }),
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
    height: 5,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  dot: {
    borderRadius: 2.5,
    backgroundColor: theme.colors.black,
  },
})
