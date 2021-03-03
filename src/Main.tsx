import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppStackContainer from './navigation'

const Main = () => (
  <SafeAreaProvider>
    <AppStackContainer />
  </SafeAreaProvider>
)

export default Main
