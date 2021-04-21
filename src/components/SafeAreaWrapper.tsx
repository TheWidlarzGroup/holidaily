import React, { FC } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export const SafeAreaWrapper: FC = ({ children }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
