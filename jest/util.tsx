import React from 'react'
import { ThemeProvider } from '@shopify/restyle'
import { render as rntlRender } from '@testing-library/react-native'
import { theme } from '../src/utils/theme'

function render(ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) {
  return rntlRender(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
  })
}
export * from '@testing-library/react-native'
export { render }
