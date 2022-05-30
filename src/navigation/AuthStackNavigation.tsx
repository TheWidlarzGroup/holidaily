import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Slider } from 'screens/slider/Slider'
// import { Login } from 'screens/login/Login'
// import { SignupEmail } from 'screens/signupEmail/SignupEmail'
// import { ConfirmedAccount } from 'screens/confirmedAccount/ConfirmedAccount'
import { Signup } from 'screens/signup/Signup'
// import { SignupWithCode } from 'screens/signupWithCode/SignupWithCode'
import { Welcome } from 'screens/welcome/Welcome'
import { About } from 'screens/about/About'
import { AuthRoutes } from './types'
import { ForgotPasswordNavigation } from './ForgotPasswordNavigation'

const AppStack = createStackNavigator<AuthRoutes>()

type AuthStackNavigationProps = {
  initialRoute?: keyof AuthRoutes
  userLoggedOut?: true
}

export const AuthStackNavigation = ({
  initialRoute = 'SLIDER',
  userLoggedOut,
}: AuthStackNavigationProps) => (
  <AppStack.Navigator headerMode="none" initialRouteName={initialRoute}>
    <AppStack.Screen name="SLIDER" component={Slider} />
    <AppStack.Screen name="WELCOME" component={Welcome} initialParams={{ userLoggedOut }} />
    <AppStack.Screen name="ABOUT" component={About} />
    {/* <AppStack.Screen name="TeamsModal" component={TeamsModal} /> */}
    {/* <AppStack.Screen name="Login" component={Login} /> */}
    <AppStack.Screen name="Signup" component={Signup} />
    <AppStack.Screen name="Recovery" component={ForgotPasswordNavigation} />
    {/* <AppStack.Screen name="SignupEmail" component={SignupEmail} /> */}
    {/* <AppStack.Screen name="SignupWithCode" component={SignupWithCode} /> */}
    {/* <AppStack.Screen name="ConfirmedAccount" component={ConfirmedAccount} /> */}
  </AppStack.Navigator>
)
