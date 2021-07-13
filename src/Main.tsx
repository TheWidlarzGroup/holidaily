import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'

import { UserContextProvider } from 'contexts/UserProvider'
import { useAppColorScheme } from 'hooks/useAppColorScheme'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'

export const Main = () => {
  // FIXME: read from user preferences
  const [colorScheme] = useAppColorScheme()

  return (
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : theme}>
      <UserContextProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <AppNavigation />
        </SafeAreaProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}
