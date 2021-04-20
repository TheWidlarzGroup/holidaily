import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerRoutes } from './types'
import { About } from 'screens/about/About'
import { Settings } from 'screens/settings/Settings'
import { BottomTabNavigator } from './BottomTabNavigator'

const Drawer = createDrawerNavigator<DrawerRoutes>()

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  )
}
