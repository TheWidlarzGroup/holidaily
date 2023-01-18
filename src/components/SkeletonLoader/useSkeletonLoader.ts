import { useEffect } from 'react'

import {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'

export const useSkeletonLoader = (width: number) => {
  const loaderValue = useSharedValue(0)

  useEffect(() => {
    loaderValue.value = withRepeat(withTiming(1, { duration: 1500 }), Infinity)

    return () => {
      loaderValue.value = 0
    }
    // Deps are blocked becasue we want to run this only once on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(loaderValue.value, [0, 1], [width, width]),
      },
    ],
  }))

  return { animatedStyle }
}
