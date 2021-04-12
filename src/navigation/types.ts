import { StackNavigationProp } from '@react-navigation/stack'

export type AppRoutes = {
  Slider: undefined
  Signup: undefined
  Login: undefined
  Home: undefined
  ForgotPassword: undefined
  RecoveryCode: undefined
  NewPassword: undefined
}

// for useNavigation hook
export type AppNavigationType<RouteName extends keyof AppRoutes> = StackNavigationProp<
  AppRoutes,
  RouteName
>
