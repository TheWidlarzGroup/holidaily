import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { UserContextProvider } from 'contexts/UserProvider'
import { ModalProvider } from 'contexts/ModalProvider'
import { QueryClientProvider } from 'react-query'
import { TeamsContextProvider } from 'contexts/TeamsProvider'
import { queryClient } from 'dataAccess/queryClient'
import { useUserSettingsContext } from 'hooks/useUserSettingsContext'
import { createNotifications } from 'react-native-notificated'
import { notificationAnimation } from 'utils/generateAnimation'
import { darkTheme, theme } from './utils/theme'
import { AppNavigation } from './navigation'
import { initBackendMocks } from './mock-api/server'

initBackendMocks()
export const Main = () => {
  const { userSettings } = useUserSettingsContext()
  const currentTheme = userSettings?.darkMode ? darkTheme : theme
  const statusBarBgColor = currentTheme.colors.transparent
  const statusBarStyle = userSettings?.darkMode ? 'light-content' : 'dark-content'

  const { NotificationsProvider } = createNotifications({
    duration: 1200,
    animationConfig: notificationAnimation,
    defaultStylesSettings: {
      successConfig: {
        titleSize: 14,
        bgColor: userSettings?.darkMode ? theme.colors.black : theme.colors.successToastBg,
        titleColor: userSettings?.darkMode ? theme.colors.white : theme.colors.black,
        borderRadius: theme.borderRadii.l1min,
        leftIconSource: require('assets/icons/success-icon.png'),
      },
    },
  })

  return (
    <ThemeProvider theme={currentTheme}>
      <SafeAreaProvider>
        <ModalProvider>
          <UserContextProvider>
            <TeamsContextProvider>
              <NotificationsProvider>
                <QueryClientProvider client={queryClient}>
                  <StatusBar
                    translucent
                    barStyle={statusBarStyle}
                    backgroundColor={statusBarBgColor}
                  />
                  <AppNavigation />
                </QueryClientProvider>
              </NotificationsProvider>
            </TeamsContextProvider>
          </UserContextProvider>
        </ModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
