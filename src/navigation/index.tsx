import React from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { NavigationContainer } from '@react-navigation/native'

import { linking } from './universalLinking'
import { AuthStackNavigation } from './AuthStackNavigation'
import { DrawerNavigator } from './DrawerNavigator'

export const AppNavigation = () => {
  const { user } = useUserContext()

  return (
    <NavigationContainer linking={linking}>
      {user?.isConfirmed ? <DrawerNavigator /> : <AuthStackNavigation />}
    </NavigationContainer>
  )
}
