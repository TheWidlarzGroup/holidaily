import { useBooleanState } from 'hooks/useBooleanState'
import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { locales } from 'utils/locale'
import { keys } from 'utils/manipulation'

const HEIGHT = keys(locales).length * 40

export const useLangAnimations = () => {
  const [opened, { toggle: changeOpened }] = useBooleanState(false)
  const heightProgress = useDerivedValue(
    () => (opened ? withTiming(HEIGHT, { duration: 200 }) : withTiming(0, { duration: 200 })),
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
