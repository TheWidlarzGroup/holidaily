import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]?: { screen: K; params?: ParamList[K] }
}[keyof ParamList]

// for useNavigation hook
export type AuthNavigationType<RouteName extends keyof AuthRoutes> = CompositeNavigationProp<
  StackNavigationProp<AuthRoutes, RouteName>,
  StackNavigationProp<AppRoutes, 'DrawerNavigator'>
>

export type AuthNavigationProps<RouteName extends keyof AuthRoutes> = {
  navigation: StackNavigationProp<AuthRoutes, RouteName>
  route: RouteProp<AppRoutes, 'AuthStackNavigation'>
}

// for useNavigation hook
export type BottomTabNavigationType<RouteName extends keyof BottomTabRoutes> = StackNavigationProp<
  BottomTabRoutes,
  RouteName
>

export type BottomTabNavigationProps<RouteName extends keyof BottomTabRoutes> = {
  navigation: BottomTabNavigationProp<BottomTabRoutes, RouteName>
  route: RouteProp<BottomTabRoutes, RouteName>
}

// for useNavigation hook
export type DrawerNavigationType<RouteName extends keyof DrawerRoutes> = CompositeNavigationProp<
  StackNavigationProp<DrawerRoutes, RouteName>,
  StackNavigationProp<AppRoutes, 'DrawerNavigator'>
>

export type DrawerNavigationProps<RouteName extends keyof DrawerRoutes> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DrawerRoutes, RouteName>,
    BottomTabNavigationProp<BottomTabRoutes>
  >
  route: RouteProp<DrawerRoutes, RouteName>
}

// for useNavigation hook
export type AppNavigationType<RouteName extends keyof AppRoutes> = StackNavigationProp<
  AppRoutes,
  RouteName
>

// for useNavigation hook
export type ModalNavigationType<RouteName extends keyof ModalRoutes> = CompositeNavigationProp<
  StackNavigationProp<ModalRoutes, RouteName>,
  StackNavigationProp<AppRoutes, 'DrawerNavigator'>
>

export type ModalNavigationProps<RouteName extends keyof ModalRoutes> = {
  navigation: StackNavigationProp<ModalRoutes, RouteName>
  route: RouteProp<AppRoutes, 'DrawerNavigator'>
}

export type AppRoutes = {
  AuthStackNavigation: NestedNavigatorParams<AuthRoutes>
  DrawerNavigator: NestedNavigatorParams<DrawerRoutes>
  Home: NestedNavigatorParams<BottomTabRoutes>
  ModalRoutes: NestedNavigatorParams<DrawerRoutes>
}

export type BottomTabRoutes = {
  Dashboard: undefined
  Calendar: undefined
  RequestModal: undefined
  Panel: undefined
  Chat: undefined
}

export type DrawerRoutes = {
  Home: NestedNavigatorParams<BottomTabRoutes>
  About: undefined
  Settings: undefined
  EditProfile: undefined
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

export type ModalRoutes = {
  RequestVacation: undefined
  DrawerNavigator: NestedNavigatorParams<DrawerRoutes>
}
