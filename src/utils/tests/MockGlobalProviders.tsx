import React, { memo, ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from '@shopify/restyle'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { UserContextProvider } from 'contexts/UserProvider'
import { TeamsContextProvider } from 'contexts/TeamsProvider'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { queryClient } from 'dataAccess/queryClient'
import { ModalProvider } from 'contexts/ModalProvider'
import { themeBase } from 'utils/theme/themeBase'
import { colors } from 'utils/theme/colors'
import { UserSettingsContextProvider } from 'contexts/UserSettingsProvider'
import '../../../i18n'

const currentTheme = {
  ...themeBase,
  ...colors,
}

export const MockGlobalProviders = memo(({ children }: { children: ReactNode }) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={currentTheme}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <UserContextProvider>
            <UserSettingsContextProvider>
              <TeamsContextProvider>
                <RequestsContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RequestsContextProvider>
              </TeamsContextProvider>
            </UserSettingsContextProvider>
          </UserContextProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
))
