import React, { FC } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { colors } from 'utils/theme/colors'

type WrapperProps = {
  isDefaultBgColor?: boolean
}
export const SafeAreaWrapper: FC<WrapperProps> = ({ children, isDefaultBgColor }) => (
  <SafeAreaView style={[styles.container, !isDefaultBgColor && styles.containerBackground]}>
    {children}
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    backgroundColor: colors.white,
  },
})
