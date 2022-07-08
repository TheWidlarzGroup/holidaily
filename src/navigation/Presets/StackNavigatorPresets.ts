import type { StackNavigationOptions } from '@react-navigation/stack'

export const StackNavigatorPresets: {
  modalNavigator: {
    screenOptions: StackNavigationOptions
    presentation: 'modal' | 'transparentModal'
  }
} = {
  modalNavigator: {
    screenOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: 'transparent' },
      presentation: 'transparentModal',
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
    },
    presentation: 'transparentModal',
  },
}
