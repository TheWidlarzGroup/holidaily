import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from 'react-query'
import { TeamsContextProvider } from 'contexts/TeamsProvider'
import { queryClient } from 'dataAccess/queryClient'
import { useUserSettingsContext } from 'hooks/useUserSettingsContext'
import { RouteContextProvider } from 'contexts/RouteProvider'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()
export const Main = () => {
  const { userSettings } = useUserSettingsContext()
  const currentTheme = userSettings?.darkMode ? darkTheme : theme
  const statusBarBgColor = currentTheme.colors.dashboardBackground
  const statusBarStyle = userSettings?.darkMode ? 'light-content' : 'dark-content'

  return (
    <ThemeProvider theme={currentTheme}>
      <SafeAreaProvider>
        <RouteContextProvider>
          <BottomSheetModalProvider>
            <ModalProvider>
              <TeamsContextProvider>
                <QueryClientProvider client={queryClient}>
                  <UserContextProvider>
                    <StatusBar
                      translucent
                      barStyle={statusBarStyle}
                      backgroundColor={statusBarBgColor}
                    />
                    <AppNavigation />
                  </UserContextProvider>
                </QueryClientProvider>
              </TeamsContextProvider>
            </ModalProvider>
          </BottomSheetModalProvider>
        </RouteContextProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
