import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
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
      try {
        // const {
        //   data: { user },
        // } = await axios.post('api/users', { firstName: 'John', lastName: 'Doe' })
        // axios.defaults.headers.common.userId = user.id
        // console.log(user)
        const { data } = await axios.get('api/organization')
        console.log(data.organizations[0].teams[0].users[0])
      } catch (error) {
        console.error(error.response.headers)
      }
    }
    checkIfMockWorks()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <UserContextProvider>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <ModalProvider>
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
              <AppNavigation />
            </ModalProvider>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}
