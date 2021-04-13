import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppRoutes } from './types'

import { Slider } from '../screens/slider/Slider'
import { Signup } from '../screens/signup/Signup'
import { Home } from '../screens/home/Home'
import { Login } from '../screens/login/Login'
import { linking } from './universalLinking'

const AppStack = createStackNavigator<AppRoutes>()

const AppStackContainer = () => (
  <NavigationContainer linking={linking}>
    <AppStack.Navigator headerMode="none" initialRouteName="Slider">
      <AppStack.Screen name="Slider" component={Slider} />
      <AppStack.Screen name="Signup" component={Signup} />
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppStackContainer
