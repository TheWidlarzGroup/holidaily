import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppRoutes } from './types'
import Slider from '../screens/slider/Slider'
import Signup from '../screens/signup/Signup'
import Home from '../screens/home/Home'
import TestScreen from '../screens/home/TestScreen'

const AppStack = createStackNavigator<AppRoutes>()

const AppStackContainer = () => (
  <NavigationContainer>
    <AppStack.Navigator headerMode="none" initialRouteName="Slider">
      <AppStack.Screen name="Slider" component={Slider} />
      <AppStack.Screen name="Signup" component={Signup} />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="TestScreen" component={TestScreen} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppStackContainer
