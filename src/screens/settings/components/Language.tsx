import { useBooleanState } from 'hooks/useBooleanState'
import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'

export const Language = () => {
  const [opened, { toggle: changeOpened }] = useBooleanState(false)

  const styles = useStyles()

  return (
    <Box style={styles.container}>
      <Box>
        <Text variant="body1Bold" textAlign="left">
          Language
        </Text>
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
