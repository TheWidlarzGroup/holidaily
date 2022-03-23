import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import request, { gql } from 'graphql-request'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { makeServer } from './mirage/server'

makeServer()

export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false

  useEffect(() => {
    const query = gql`
      {
        user(firstName: "Luk") {
          email
        }
      }
    `
    const fetchUser = async () => {
      const data = await request('/graphql', query)
      console.log(data)
    }
    fetchUser()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      {/* <UserContextProvider>
        <SafeAreaProvider>
          <ModalProvider>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <AppNavigation />
          </ModalProvider>
        </SafeAreaProvider>
      </UserContextProvider> */}
    </ThemeProvider>
  )
}
