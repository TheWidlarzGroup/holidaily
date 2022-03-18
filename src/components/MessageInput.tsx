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
import { themeBase } from 'utils/theme/themeBase'
import { useCombinedRefs } from 'hooks/useCombinedRefs'
import { useUserContext } from 'hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { Comment } from 'screens/feed/types'
import { generateUUID } from 'utils/generateUUID'

export type MessageInputProps = {
  onSubmitEditing: F1<string>
  handleSubmitComment: (comment: Comment) => void
  onBlur?: F1<string>
  defaultValue?: string
  maxLength?: number
  autofocus?: boolean
}

export const MessageInput = React.forwardRef<TextInput, MessageInputProps>((props, ref) => {
  const { onSubmitEditing, onBlur, defaultValue = '', maxLength = 300, autofocus = false } = props
  const [messageContent, setMessageContent] = useState(defaultValue)
  const [error, setError] = useState('')

  const { t } = useTranslation('messageInput')

  const inputRef = useRef<TextInput>(null)
  const combinedInputRef = useCombinedRefs([ref, inputRef])

  const { user } = useUserContext()

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
    const message = {
      meta: {
        id: generateUUID(),
        author: {
          id: user?.id || '',
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          pictureUrl:
            user?.photo ||
            'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        },
        timestamp: {
          createdAt: new Date(),
          editedAt: new Date(),
        },
      },
      comments: [],
      reactions: [],
      text: messageContent,
    }
    props.handleSubmitComment(message)
  }

  const handleBlur = () => {
    onBlur?.(messageContent)
  }

  useEffect(() => {
    if (messageContent.length > maxLength) setError(t('maxCharacters', { maxLength }))
    else setError('')
  }, [messageContent, maxLength, t])

  useEffect(() => {
    if (autofocus) combinedInputRef.current?.focus()
  }, [autofocus, combinedInputRef])

  return (
    <Box style={styles.container}>
      <Animated.View style={[styles.inputBox, errorBorderStyle]}>
        <TextInput
          ref={combinedInputRef}
          underlineColorAndroid={themeBase.colors.transparent}
          style={styles.input}
          placeholder={t('placeholder')}
          placeholderTextColor={colors.headerGrey}
          onSubmitEditing={handleSubmit}
          onBlur={handleBlur}
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
})

MessageInput.displayName = 'MessageInput'

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
    borderColor: theme.colors.transparent,
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
