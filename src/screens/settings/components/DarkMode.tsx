import { Checkbox } from 'components/Checkbox'
import { useBooleanState } from 'hooks/useBooleanState'
import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'

export const DarkMode = () => {
  const styles = useStyles()

  return (
    <Box style={styles.container}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="body1Bold" textAlign="left">
          Dark mode
        </Text>
        <Checkbox checked={false} onPress={() => {}} size="s" />
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabledText,
    borderRadius: theme.borderRadii.lplus,
    padding: theme.spacing.ml,
    marginVertical: theme.spacing.s,
  },
}))
