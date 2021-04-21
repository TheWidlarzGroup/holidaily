import React from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'
import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { DrawerNavigator } from './DrawerNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import { AppRoutes } from './types'

const AppStack = createStackNavigator<AppRoutes>()

export const AppNavigation = () => {
  const { user } = useUserContext()

  return (
    <NavigationContainer linking={linking}>
      <AppStack.Navigator headerMode="none">
        {user?.email ? (
          <AppStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        ) : (
          <AppStack.Screen name="AuthStackNavigation" component={AuthStackNavigation} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
