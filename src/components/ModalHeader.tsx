import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { mkUseStyles, Theme } from 'utils/theme'

export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles()
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    paddingBottom: theme.spacing.lplus,
    backgroundColor: theme.colors.disabledText,
    borderBottomRightRadius: theme.borderRadii.lmin,
    borderBottomLeftRadius: theme.borderRadii.lmin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
