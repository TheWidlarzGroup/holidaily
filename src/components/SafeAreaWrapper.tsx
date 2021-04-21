import React, { FC } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { colors } from 'utils/theme/colors'

export const SafeAreaWrapper: FC = ({ children }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
