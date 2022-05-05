import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useBooleanState } from 'hooks/useBooleanState'

const DURATION = 200

export const useDropdownAnimation = (options: Option<string>[]) => {
  const [opened, { toggle: changeOpened }] = useBooleanState(false)

  const HEIGHT = options.length * 40

  const heightProgress = useDerivedValue(
    () =>
      opened ? withTiming(HEIGHT, { duration: DURATION }) : withTiming(0, { duration: DURATION }),
    [opened]
  )

  const animatedOptions = useAnimatedStyle(() => ({
    height: heightProgress.value,
    opacity: heightProgress.value / HEIGHT,
  }))

  const animatedArrow = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${(heightProgress.value / HEIGHT) * 180}deg`,
      },
    ],
  }))

  return { animatedOptions, animatedArrow, changeOpened }
}
