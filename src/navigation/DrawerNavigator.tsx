import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { BottomTabNavigator } from './BottomTabNavigator'
import { Login } from 'screens/login/Login'
import { Signup } from 'screens/signup/Signup'
import { DrawerRoutes } from './types'

const Drawer = createDrawerNavigator<DrawerRoutes>()

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  )
}
