import React from 'react'
import { useTranslation } from 'react-i18next'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { About } from 'screens/about/About'
import { Settings } from 'screens/settings/Settings'
import { DrawerRoutes } from './types'
import { CustomDrawerContent } from './CustomDrawerContent'
import { BottomTabNavigator as Home } from './BottomTabNavigator'

const Drawer = createDrawerNavigator<DrawerRoutes>()

export const DrawerNavigator = () => {
  const { t } = useTranslation('navigation')
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} options={{ title: t('home') }} />
      <Drawer.Screen
        name="About"
        component={About}
        options={{ title: t('about'), swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ title: t('settings'), swipeEnabled: false }}
      />
    </Drawer.Navigator>
  )
}
