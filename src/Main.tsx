import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import axios from 'axios'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()

export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false

  useEffect(() => {
    const checkIfMockWorks = async () => {
      const { data } = await axios.get('/api/users')
      console.log(data)
    }
    checkIfMockWorks()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider>
        <ModalProvider>
          <UserContextProvider>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <AppNavigation />
          </UserContextProvider>
        </ModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
