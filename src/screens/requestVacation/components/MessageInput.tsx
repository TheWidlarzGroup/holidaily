import React from 'react'
import { TextInput } from 'react-native'
import { Box, mkUseStyles, useColors } from 'utils/theme'

export const MessageInput = () => {
  const styles = useStyles()
  const colors = useColors()

  return (
    <Box style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your message..."
        placeholderTextColor={colors.headerGrey}
      />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabled,
    padding: theme.spacing.s,
    borderTopLeftRadius: theme.spacing.xm,
    borderTopRightRadius: theme.spacing.xm,
  },
  input: {
    borderRadius: theme.spacing.xm,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.tertiary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: 'black',
  },
}))
