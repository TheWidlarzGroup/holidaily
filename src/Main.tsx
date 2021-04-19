import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { darkTheme, theme } from './utils/theme'
import { UserContextProvider } from 'contexts/UserProvider'
import { NavigationContainer } from '@react-navigation/native'
import { linking } from 'navigation/universalLinking'
import { DrawerNavigator } from 'navigation/DrawerNavigator'

export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <UserContextProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <NavigationContainer linking={linking}>
            <DrawerNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}
