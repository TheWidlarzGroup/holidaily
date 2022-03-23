import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import axios from 'axios'
//@ts-ignore
import { initBackendMocks } from './mirage/server'

initBackendMocks()

export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false
  useEffect(() => {
    const test = async () => {
      const data = await axios.get('/api/users')
      console.log(data.data)
    }

    test()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <UserContextProvider>
        <SafeAreaProvider>
          <ModalProvider>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <AppNavigation />
          </ModalProvider>
        </SafeAreaProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}
