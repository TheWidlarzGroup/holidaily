import React from 'react'
import { useTranslation } from 'react-i18next'
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer'
import { About } from 'screens/about/About'
import { Settings } from 'screens/settings/Settings'
import { DrawerRoutes } from 'navigation/types'
import { useNavigationState } from '@react-navigation/native'
import { getActiveRouteName } from 'utils/getActiveRouteName'
import { useSiriListeners } from 'hooks/useSiriListeners'
import { isIos } from 'utils/layout'
import { ProfileNavigation } from './ProfileNavigation'
import { CustomDrawerContent } from './DrawerComponents/CustomDrawerContent'
import { BottomTabNavigator as Home } from './BottomTabNavigator'
import { BudgetNavigation } from './BudgetNavigation'

const Drawer = createDrawerNavigator<DrawerRoutes>()

const defaultScreenOptions: DrawerNavigationOptions = {
  overlayColor: 'transparent',
  drawerType: 'back',
}

const navigatorOptions = {
  headerShown: false,
}

export const DrawerNavigator = () => {
  const navState = useNavigationState((state) => state)
  const activeRouteName = getActiveRouteName(navState)
  const { t } = useTranslation('navigation')

  useSiriListeners<'Home'>()

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={navigatorOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: t('home'),
          ...defaultScreenOptions,
        }}>
        {() => <Home gestureEnabled={!(isIos && activeRouteName === 'DASHBOARD_TEAM')} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
        options={{ title: t('editProfile'), swipeEnabled: false, ...defaultScreenOptions }}
      />
      <Drawer.Screen
        name="HolidayBudget"
        component={BudgetNavigation}
        options={{ title: t('budget'), swipeEnabled: false, ...defaultScreenOptions }}
      />
      <Drawer.Screen
        name="SETTINGS"
        component={Settings}
        options={{ title: t('settings'), swipeEnabled: false, ...defaultScreenOptions }}
      />
      <Drawer.Screen
        name="ABOUT"
        component={About}
        options={{ title: t('about'), swipeEnabled: false, ...defaultScreenOptions }}
      />
    </Drawer.Navigator>
  )
}
