import React from 'react'
import { TextInput } from 'react-native'
import { Box, mkUseStyles, useColors } from 'utils/theme'

type MessageInputProps = {
  onSubmitEditing: F1<string>
  defaultValue: string
}

export const MessageInput = ({ onSubmitEditing, defaultValue = '' }: MessageInputProps) => {
  const styles = useStyles()
  const colors = useColors()

  return (
    <Box style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your message..."
        placeholderTextColor={colors.headerGrey}
        onSubmitEditing={(e) => onSubmitEditing(e.nativeEvent.text)}
        blurOnSubmit={true}
        multiline
        defaultValue={defaultValue}
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
