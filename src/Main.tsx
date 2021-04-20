import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'

import { darkTheme, theme } from './utils/theme'
import { UserContextProvider } from 'contexts/UserProvider'
import { AppNavigation } from './navigation'

export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <UserContextProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <AppNavigation />
        </SafeAreaProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}
