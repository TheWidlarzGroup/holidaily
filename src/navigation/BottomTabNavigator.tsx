import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Signup } from 'screens/signup/Signup'
import { Login } from 'screens/login/Login'
import { ForgotPassword } from 'screens/forgotPassword/ForgotPassword'
import { HomeStackNavigator } from './index'

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Signup" component={Signup} />
    <Tab.Screen name="ForgotPassword" component={ForgotPassword} />
  </Tab.Navigator>
)
