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
        const {
          data: { user },
        } = await axios.post('api/users', { firstName: 'John', lastName: 'Doe' })
        axios.defaults.headers.common.userId = user.id
        const endDate = new Date()
        endDate.setMonth(6)
        await axios.post('api/request', {
          isSickTime: true,
          description: 'test',
          message: 'tsest',
          endDate,
          startDate: new Date(),
        })
        const { data } = await axios.get('/api/available-pto')
        console.log(data)
      } catch (error) {
        if (error.response) console.error(error.response.headers, error.response.data)
        else console.error(error)
      }
    }
    checkIfMockWorks()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ModalProvider>
            <UserContextProvider>
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
              <AppNavigation />
            </UserContextProvider>
          </ModalProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
