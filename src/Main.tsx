import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { QueryClientProvider } from 'react-query'
import { TeamsContextProvider } from 'contexts/TeamsProvider'
import { queryClient } from 'dataAccess/queryClient'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { getNotificationsConfig } from 'utils/notifications/notificationsConfig'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()
export const Main = () => {
  const { userSettings } = useUserSettingsContext()
  const currentTheme = userSettings?.darkMode ? darkTheme : theme
  const statusBarBgColor = currentTheme.colors.transparent
  const statusBarStyle = userSettings?.darkMode ? 'light-content' : 'dark-content'
  const { NotificationsProvider } = getNotificationsConfig({ isDarkMode: userSettings?.darkMode })

  return (
    <ThemeProvider theme={currentTheme}>
      <SafeAreaProvider>
        <UserContextProvider>
          <TeamsContextProvider>
            <QueryClientProvider client={queryClient}>
              <ModalProvider>
                <StatusBar
                  translucent
                  barStyle={statusBarStyle}
                  backgroundColor={statusBarBgColor}
                />
                <AppNavigation />
              </ModalProvider>
              <NotificationsProvider />
            </QueryClientProvider>
          </TeamsContextProvider>
        </UserContextProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
