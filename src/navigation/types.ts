import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { DrawerNavigationProp } from '@react-navigation/drawer'

// for useNavigation hook
export type AuthNavigationType<RouteName extends keyof AuthRoutes> = CompositeNavigationProp<
  StackNavigationProp<AuthRoutes, RouteName>,
  StackNavigationProp<AppRoutes, 'Authentication'>
>

export type AuthNavigationProps<RouteName extends keyof AuthRoutes> = {
  navigation: StackNavigationProp<AppRoutes, 'Authentication'>
  route: RouteProp<AuthRoutes, RouteName>
}

// for useNavigation hook
export type BottomTabNavigationType<
  RouteName extends keyof BottomTabRoutes
> = CompositeNavigationProp<
  StackNavigationProp<BottomTabRoutes, RouteName>,
  StackNavigationProp<BottomTabRoutes>
>

export type BottomTabNavigationProps<RouteName extends keyof BottomTabRoutes> = {
  navigation: BottomTabNavigationProp<BottomTabRoutes, RouteName>
  route: RouteProp<BottomTabRoutes, RouteName>
}

// for useNavigation hook
export type DrawerNavigationType<RouteName extends keyof DrawerRoutes> = CompositeNavigationProp<
  StackNavigationProp<DrawerRoutes, RouteName>,
  StackNavigationProp<AppRoutes, 'Home'>
>

export type DrawerNavigationProps<RouteName extends keyof DrawerRoutes> = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerRoutes, RouteName>,
    BottomTabNavigationProp<BottomTabRoutes>
  >
  route: RouteProp<DrawerRoutes, RouteName>
}

// for useNavigation hook
export type AppNavigationType<RouteName extends keyof AppRoutes> = StackNavigationProp<
  AppRoutes,
  RouteName
>

export type AppRoutes = {
  Authentication: AuthRoutes
  Home: DrawerRoutes
}

export type BottomTabRoutes = {
  Dashboard: undefined
  Calendar: undefined
  Panel: undefined
  Chat: undefined
}

export type DrawerRoutes = {
  Main: BottomTabRoutes
  About: undefined
  Settings: undefined
}

export type AuthRoutes = {
  Slider: undefined
  Login: undefined
  Signup: undefined
  SignupEmail: undefined
  ForgotPassword: undefined
  RecoveryCode: undefined
  NewPassword: undefined
  ConfirmedAccount: undefined
}
