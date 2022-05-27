import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { GalleryItemData } from 'types/holidaysDataTypes'
import { DayOffRequest } from 'mock-api/models'
import { Team, User } from 'mock-api/models/mirageTypes'

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]?: { screen: K; params?: ParamList[K] }
}[keyof ParamList]

// for useNavigation hook
export type AuthNavigationType<RouteName extends keyof AuthRoutes> = CompositeNavigationProp<
  StackNavigationProp<AuthRoutes, RouteName>,
  StackNavigationProp<AppRoutes, 'DRAWER_NAVIGATOR'>
>

export type AuthNavigationProps<RouteName extends keyof AuthRoutes> = {
  navigation: StackNavigationProp<AuthRoutes, RouteName>
  route: RouteProp<AuthRoutes, RouteName>
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
  StackNavigationProp<AppRoutes, 'DRAWER_NAVIGATOR'>
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
// export type ModalNavigationType<RouteName extends keyof ModalRoutes> = CompositeNavigationProp<
//   StackNavigationProp<ModalRoutes, RouteName>,
//   StackNavigationProp<AppRoutes, 'ModalRoutes'>
// >

export type ModalNavigationProps<RouteName extends keyof ModalRoutes> = {
  navigation: StackNavigationProp<ModalRoutes, RouteName>
  route: RouteProp<ModalRoutes, RouteName>
}

// for useNavigation hook
export type DashboardNavigationType<RouteName extends keyof DashboardRoutes> =
  CompositeNavigationProp<
    StackNavigationProp<DashboardRoutes, RouteName>,
    StackNavigationProp<DrawerRoutes, 'Home'>
  >

export type DashboardNavigationProps<RouteName extends keyof DashboardRoutes> = {
  navigation: StackNavigationProp<DashboardRoutes, RouteName>
  route: RouteProp<DashboardRoutes, RouteName>
}

// for useNavigation hook
export type UserProfileType<RouteName extends keyof UserProfileRoutes> = CompositeNavigationProp<
  StackNavigationProp<UserProfileRoutes, RouteName>,
  StackNavigationProp<DrawerRoutes, 'ProfileNavigation'>
>

export type UserProfileNavigationProps<RouteName extends keyof UserProfileRoutes> = {
  navigation: StackNavigationProp<UserProfileRoutes, RouteName>
  route: RouteProp<UserProfileRoutes, RouteName>
}
// for useNavigation hook
// export type ForgotPasswordTypes<RouteName extends keyof ForgotPasswordRoutes> =
//   CompositeNavigationProp<
//     StackNavigationProp<ForgotPasswordRoutes, RouteName>,
//     StackNavigationProp<AppRoutes, 'ForgotPasswordNavigation'>
//   >

export type ForgotPasswordProps<RouteName extends keyof ForgotPasswordRoutes> = {
  navigation: StackNavigationProp<ForgotPasswordRoutes, RouteName>
  route: RouteProp<ForgotPasswordRoutes, RouteName>
}

// for useNavigation hook
export type RequestsNavigatorType<RouteName extends keyof RequestsRoutes> = CompositeNavigationProp<
  StackNavigationProp<RequestsRoutes, RouteName>,
  StackNavigationProp<BottomTabRoutes, 'Stats'>
>

export type RequestsNavigationProps<RouteName extends keyof RequestsRoutes> = {
  navigation: StackNavigationProp<RequestsRoutes, RouteName>
  route: RouteProp<RequestsRoutes, RouteName>
}

export type AppRoutes = ModalRoutes
export type ModalRoutes = {
  REQUEST_VACATION?: {
    start: string
    end: string
    action?: string
  }
  NOTIFICATIONS: undefined
  REQUEST_VACATION_CALENDAR: { isSickTime?: boolean }
  DRAWER_NAVIGATOR: NestedNavigatorParams<DrawerRoutes>
  GALLERY: { data: GalleryItemData[]; index: number }
  CREATE_POST: { photo: { id: string; uri: string } }
  SUBSCRIBE_NEW_TEAM: undefined
}

export type BottomTabRoutes = {
  DashboardNavigation: NestedNavigatorParams<DashboardRoutes>
  CALENDAR: undefined
  RequestModal: undefined
  Stats: NestedNavigatorParams<RequestsRoutes>
  FEED: { postId?: string } | undefined
}

export type DrawerRoutes = {
  Home: NestedNavigatorParams<BottomTabRoutes>
  ProfileNavigation: NestedNavigatorParams<UserProfileRoutes>
  HolidayBudget: undefined
  ABOUT: undefined
  SETTINGS: undefined
  AdminPanelEmployeesNavigation: NestedNavigatorParams<AdminPanelEmployeesRoutes>
}

export type AuthRoutes = {
  SLIDER: undefined
  WELCOME: { userLoggedOut?: true } | undefined
  ABOUT: { isFromWelcomeScreen?: true }
  TeamsModal: { firstName: string }
  Login: undefined
  Signup: undefined
  SignupEmail: undefined
  SignupWithCode: { code: string }
  ForgotPassword: undefined
  RecoveryCode: undefined
  NewPassword: { code: string; email: string }
  ConfirmedAccount: undefined
  Recovery: undefined
}

export type DashboardRoutes = {
  DASHBOARD: undefined
  DASHBOARD_TEAM: Team
  DASHBOARD_TEAM_MEMBER: User
}

export type BudgetRoutes = {
  BUDGET: undefined
  PTO_POLICY: undefined
}

export type RequestsRoutes = {
  STATS_AND_REQUESTS: undefined
  SEE_REQUEST: Omit<DayOffRequest, 'id' | 'user' | 'isOnHoliday'>
}

export type UserProfileRoutes = {
  EDIT_PROFILE: undefined
  CHANGE_PASSWORD: undefined
  RECOVERY: undefined
  COLOR_PICKER: { onChange: F1<string>; value: string }
}

export type ForgotPasswordRoutes = {
  ForgotPassword: undefined
  RecoveryCode: undefined
  NewPassword: undefined
}

export type AdminPanelEmployeesRoutes = {
  Employees: undefined
  InviteMembers: undefined
}
