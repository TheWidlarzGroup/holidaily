import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import axios from 'axios'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './data-access/queryClient'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()
export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false
  useEffect(() => {
    const init = async () => {
      try {
        const { data: tempUserRes } = await axios.post('/api/users', { firstName: 'jan' })
        axios.defaults.headers.common.userId = tempUserRes.user.id
        const { data } = await axios.get('/api/notifications')
        console.log(data)
      } catch (error) {
        if (error.response) console.log(error.response.body, error.response.headers)
        else console.log(error)
      }
    }
    init()
  }, [])
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <UserContextProvider>
                <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
                <AppNavigation />
              </UserContextProvider>
            </QueryClientProvider>
          </ModalProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
