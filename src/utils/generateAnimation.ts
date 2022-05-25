import { generateAnimationConfig } from 'react-native-notificated'
import { Easing, interpolate, SharedValue } from 'react-native-reanimated'

export const notificationAnimation = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress: SharedValue<number>) => {
    'worklet'

    const translateY = interpolate(progress.value, [0, 1], [-100, 30])

    return {
      opacity: progress.value,
      transform: [{ translateY }],
    }
  },
})
