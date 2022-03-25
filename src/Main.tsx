import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import axios, { AxiosError } from 'axios'
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
        const {
          data: { user },
        } = await axios.get('api/users/dzony')
        axios.defaults.headers.common.userId = user.id
        const { data } = await axios.post('api/request', {
          description: 'wakajki',
          startDate: new Date(),
          endDate: new Date(Date.now() + 48 * 3600 * 1000),
          message: 'wiadomosc',
          isSickTime: true,
        })
        console.log(data)
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
