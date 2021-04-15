import React, { FC } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { colors } from 'utils/theme/colors'
import { isIos } from 'utils/isIos'

export const Container: FC = ({ children }) => (
  <KeyboardAvoidingView behavior={isIos() ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  </KeyboardAvoidingView>
)
const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})
