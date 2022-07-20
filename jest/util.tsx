import React, { JSXElementConstructor, ReactElement } from 'react'
import { ThemeProvider } from '@shopify/restyle'
import * as rntl from '@testing-library/react-native'
import { theme } from 'utils/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// eslint-disable-next-line
function render(ui: ReactElement<any, string | JSXElementConstructor<any>>) {
  return rntl.render(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
  })
}
export * from '@testing-library/react-native'
export { render }
