import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type LoginNavigationType<RouteName extends keyof LoginRoutes> = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<LoginRoutes, RouteName>,
    StackNavigationProp<AppRoutes, 'Login'>
  >
  route: RouteProp<LoginRoutes, RouteName>
}

// for useNavigation hook
export type AppNavigationType<RouteName extends keyof AppRoutes> = StackNavigationProp<
  AppRoutes,
  RouteName
>

export type AppRoutes = {
  Slider: undefined
  Home: undefined
  Signup: undefined
  SignupEmail: undefined
  Login: undefined
  ForgotPassword: undefined
  RecoveryCode: undefined
  NewPassword: undefined
  ConfirmedAccount: undefined
}

export type BottomRoutes = {
  Home: AppRoutes
  Login: undefined
  Add: undefined
  Signup: undefined
  ForgotPassword: undefined
}

export type DrawerRoutes = {
  Home: BottomRoutes
  Login: undefined
  Signup: undefined
}

export type LoginRoutes = {
  Login: undefined
  ForgotPassword: undefined
  RecoveryCode: undefined
  NewPassword: undefined
}
