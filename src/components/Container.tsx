import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { mkUseStyles, Theme } from 'utils/theme'

export const Container: FC = ({ children }) => {
  const styles = useStyles()
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.keyboardAvoiding}>{children}</KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
}))
