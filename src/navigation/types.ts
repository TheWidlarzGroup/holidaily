import { StackNavigationProp } from '@react-navigation/stack'

export type AppRoutes = {
  Slider: undefined
  Home: undefined
  TestScreen: undefined
}

// for useNavigation hook
export type AppNavigationType<RouteName extends keyof AppRoutes> = StackNavigationProp<
  AppRoutes,
  RouteName
>
