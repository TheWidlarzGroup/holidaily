import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Slider } from 'screens/slider/Slider'
// import { ForgotPassword } from 'screens/forgotPassword/ForgotPassword'
import { Login } from 'screens/login/Login'
// import { RecoveryCode } from 'screens/recoveryCode/recoveryCode'
// import { NewPassword } from 'screens/newPassword/NewPassword'
import { SignupEmail } from 'screens/signupEmail/SignupEmail'
import { ConfirmedAccount } from 'screens/confirmedAccount/ConfirmedAccount'
import { Signup } from 'screens/signup/Signup'
import { AuthRoutes } from './types'
import { ForgotPasswordNavigation } from './ForgotPasswordNavigation'

const AppStack = createStackNavigator<AuthRoutes>()

export const AuthStackNavigation = () => (
  <AppStack.Navigator headerMode="none" initialRouteName="Slider">
    <AppStack.Screen name="Slider" component={Slider} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="Signup" component={Signup} />
    {/* <AppStack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
    <AppStack.Screen name="Recovery" component={ForgotPasswordNavigation} />
    {/* <AppStack.Screen name="RecoveryCode" component={RecoveryCode} /> */}
    {/* <AppStack.Screen name="NewPassword" component={NewPassword} /> */}
    <AppStack.Screen name="SignupEmail" component={SignupEmail} />
    <AppStack.Screen name="ConfirmedAccount" component={ConfirmedAccount} />
  </AppStack.Navigator>
)
