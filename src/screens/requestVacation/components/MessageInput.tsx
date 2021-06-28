import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { Box, mkUseStyles, useColors } from 'utils/theme'
import SendArrowIcon from 'assets/icons/SendArrow.svg'

type MessageInputProps = {
  onSubmitEditing: F1<string>
  defaultValue: string
}

export const MessageInput = ({ onSubmitEditing, defaultValue = '' }: MessageInputProps) => {
  const [messageContent, setMessageContent] = useState('')

  const styles = useStyles()
  const colors = useColors()

  return (
    <Box style={styles.container}>
      <Box style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Write your message..."
          placeholderTextColor={colors.headerGrey}
          onSubmitEditing={() => onSubmitEditing(messageContent)}
          blurOnSubmit
          multiline
          defaultValue={defaultValue}
          onChange={(e) => setMessageContent(e.nativeEvent.text)}
        />
        {!!messageContent && (
          <TouchableOpacity
            style={styles.sendArrow}
            onPress={() => onSubmitEditing(messageContent)}>
            <SendArrowIcon height={9} width={9} />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabled,
    padding: theme.spacing.s,
    borderTopLeftRadius: theme.spacing.xm,
    borderTopRightRadius: theme.spacing.xm,
    position: 'relative',
  },
  inputBox: {
    borderRadius: theme.spacing.xm,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.tertiary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    flexDirection: 'row',
  },
  input: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: 'black',
    flex: 1,
    padding: 0,
  },
  sendArrow: {
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: theme.borderRadii.full,
    marginLeft: 20,
  },
}))
