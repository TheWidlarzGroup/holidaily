import { StackNavigationProp } from '@react-navigation/stack'

export type AppRoutes = {
  Slider: undefined
  Signup: undefined
  Login: undefined
  Home: undefined
  TestScreen: undefined
  ForgotPassword: undefined
}

// for useNavigation hook
export type AppNavigationType<RouteName extends keyof AppRoutes> = StackNavigationProp<
  AppRoutes,
  RouteName
>
