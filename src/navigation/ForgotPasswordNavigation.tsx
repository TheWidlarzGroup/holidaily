import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ForgotPasswordRoutes } from './types'

const AppStack = createStackNavigator<ForgotPasswordRoutes>()

export const ForgotPasswordNavigation = () => (
  <AppStack.Navigator headerMode="none" initialRouteName="ForgotPassword">
    {/* <AppStack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
    {/* <AppStack.Screen name="RecoveryCode" component={RecoveryCode} /> */}
    {/* <AppStack.Screen name="NewPassword" component={NewPassword} /> */}
  </AppStack.Navigator>
)
