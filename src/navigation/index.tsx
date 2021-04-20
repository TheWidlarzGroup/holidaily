import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Slider } from 'screens/slider/Slider'
import { ForgotPassword } from 'screens/forgotPassword/ForgotPassword'
import { Login } from 'screens/login/Login'
import { RecoveryCode } from 'screens/recoveryCode/recoveryCode'
import { NewPassword } from 'screens/newPassword/NewPassword'
import { SignupEmail } from 'screens/signupEmail/SignupEmail'
import { Home } from 'screens/home/Home'
import { ConfirmedAccount } from 'screens/confirmedAccount/ConfirmedAccount'
import { AppRoutes } from './types'

const AppStack = createStackNavigator<AppRoutes>()

export const HomeStackNavigator = () => (
  <AppStack.Navigator headerMode="none" initialRouteName="Slider">
    <AppStack.Screen name="Slider" component={Slider} />
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AppStack.Screen name="RecoveryCode" component={RecoveryCode} />
    <AppStack.Screen name="NewPassword" component={NewPassword} />
    <AppStack.Screen name="SignupEmail" component={SignupEmail} />
    <AppStack.Screen name="ConfirmedAccount" component={ConfirmedAccount} />
  </AppStack.Navigator>
)
