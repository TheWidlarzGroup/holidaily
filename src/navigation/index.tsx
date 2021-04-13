import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppRoutes } from './types'

import { Slider } from '../screens/slider/Slider'
import { Signup } from '../screens/signup/Signup'
import { Home } from '../screens/home/Home'
import { ForgotPassword } from '../screens/forgotPassword/ForgotPassword'
import { Login } from '../screens/login/Login'
import { RecoveryCode } from '../screens/recoveryCode/recoveryCode'
import { NewPassword } from '../screens/newPassword/NewPassword'
import { SignupEmail } from '../screens/signupEmail/SignupEmail'

const AppStack = createStackNavigator<AppRoutes>()

const AppStackContainer = () => (
  <NavigationContainer>
    <AppStack.Navigator headerMode="none" initialRouteName="Slider">
      <AppStack.Screen name="Slider" component={Slider} />
      <AppStack.Screen name="Signup" component={Signup} />
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AppStack.Screen name="RecoveryCode" component={RecoveryCode} />
      <AppStack.Screen name="NewPassword" component={NewPassword} />
      <AppStack.Screen name="SignupEmail" component={SignupEmail} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppStackContainer
