import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppRoutes } from './types'
import { Home } from '../screens/home/Home'
import { TestScreen } from '../screens/home/TestScreen'

const AppStack = createStackNavigator<AppRoutes>()

const AppStackContainer = () => (
  <NavigationContainer>
    <AppStack.Navigator headerMode="none" initialRouteName="Home">
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="TestScreen" component={TestScreen} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppStackContainer
