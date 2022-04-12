import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from 'react-query'
import { TeamsContextProvider } from 'contexts/TeamsProvider'
import { queryClient } from 'dataAccess/queryClient'
import { dbService } from 'dataAccess/local-db-driver'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()
export const Main = () => {
  // FIXME: read from user preferences
  const darkMode = false

  useEffect(() => {
    dbService.initialize()
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ModalProvider>
            <TeamsContextProvider>
              <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                  <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
                  <AppNavigation />
                </UserContextProvider>
              </QueryClientProvider>
            </TeamsContextProvider>
          </ModalProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
