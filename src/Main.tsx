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
import { createNotifications, ZoomInDownZoomOutUp } from 'react-native-notificated'
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
    animationConfig: ZoomInDownZoomOutUp,
    defaultStylesSettings: {
      darkMode: userSettings?.darkMode,
      successConfig: {
        titleSize: 14,
        bgColor: theme.colors.successToastBg,
        titleColor: theme.colors.black,
        borderRadius: theme.borderRadii.l1min,
        leftIconSource: require('assets/icons/icon-check.svg'),
      },
      errorConfig: {
        titleSize: 14,
        bgColor: theme.colors.errorBrighter,
        titleColor: theme.colors.black,
        borderRadius: theme.borderRadii.l1min,
        leftIconSource: require('assets/icons/icon-close.svg'),
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
