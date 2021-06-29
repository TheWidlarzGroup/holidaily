import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { Box, mkUseStyles, useColors } from 'utils/theme'
import SendArrowIcon from 'assets/icons/SendArrow.svg'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

type MessageInputProps = {
  onSubmitEditing: F1<string>
  defaultValue: string
  maxLenght?: number
  autofocus?: boolean
}

export const MessageInput = ({
  onSubmitEditing,
  defaultValue = '',
  maxLenght = 300,
  autofocus = false,
}: MessageInputProps) => {
  const [messageContent, setMessageContent] = useState('')
  const [error, setError] = useState('')

  const inputRef = useRef<TextInput>(null)

  const styles = useStyles()
  const colors = useColors()

  const errorProgress = useDerivedValue(() => (error ? withTiming(1) : withTiming(0)), [error])

  const errorBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      errorProgress.value,
      [0, 1],
      [colors.tertiary, colors.errorRed]
    )
    return { borderColor }
  }, [])

  const errorMessageStyle = useAnimatedStyle(
    () => ({
      height: withTiming(errorProgress.value * 20, {
        duration: 50,
      }),
      opacity: withTiming(errorProgress.value, {
        duration: 100,
      }),
    }),
    []
  )

  const handleSubmit = () => {
    if (error) return
    onSubmitEditing(messageContent)
  }

  useEffect(() => {
    if (messageContent.length > maxLenght) setError(`Max. ${maxLenght} characters `)
    else setError('')
  }, [messageContent])

  useEffect(() => {
    if (autofocus) inputRef.current?.focus()
  }, [])

  return (
    <Box style={styles.container}>
      <Animated.View style={[styles.inputBox, errorBorderStyle]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Write your message..."
          placeholderTextColor={colors.headerGrey}
          onSubmitEditing={handleSubmit}
          blurOnSubmit
          multiline
          defaultValue={defaultValue}
          onChange={(e) => setMessageContent(e.nativeEvent.text)}
        />
        {!!messageContent && (
          <TouchableOpacity style={styles.sendArrow} onPress={handleSubmit}>
            <SendArrowIcon height={9} width={9} />
          </TouchableOpacity>
        )}
      </Animated.View>
      <Animated.Text style={[styles.error, errorMessageStyle]}>{error}</Animated.Text>
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
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
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
  error: {
    alignSelf: 'flex-end',
    paddingVertical: 2,
    color: theme.colors.errorRed,
  },
}))
