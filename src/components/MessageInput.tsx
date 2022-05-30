import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { Box, mkUseStyles, theme, useColors } from 'utils/theme'
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
import { Comment } from 'mock-api/models/miragePostTypes'
import { generateUUID } from 'utils/generateUUID'
import { notify } from 'react-native-notificated'
import { useUserSettingsContext } from 'hooks/useUserSettingsContext'

export type MessageInputProps = {
  messageContent: string
  setMessageContent: F1<string>
  onSubmitEditing: F1<string>
  handleSubmitComment?: F1<Comment>
  onBlur?: F1<string>
  defaultValue?: string
  maxLength?: number
  autofocus?: boolean
}

export const MessageInput = React.forwardRef<TextInput, MessageInputProps>((props, ref) => {
  const {
    onSubmitEditing,
    onBlur,
    defaultValue = '',
    maxLength = 300,
    autofocus = false,
    messageContent,
    setMessageContent,
  } = props
  const [error, setError] = useState('')
  const { userSettings } = useUserSettingsContext()

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
    const message: Comment = {
      meta: {
        id: generateUUID(),
        author: {
          id: user?.id || '',
          occupation: user?.occupation || '',
          name: `${user?.firstName} ${user?.lastName}` || '',
          pictureUrl: user?.photo || null,
          userColor: user?.userColor,
          lastName: user?.lastName,
        },
        timestamp: {
          createdAt: new Date(),
        },
      },
      text: messageContent,
    }
    props.handleSubmitComment?.(message)
    notify('success', { params: { title: t('commentAdded') } })
  }

  const handleBlur = () => {
    onBlur?.(messageContent)
  }

  useEffect(() => {
    if (messageContent.length > maxLength) setError(t('maxCharacters', { maxLength }))
    else setError('')
  }, [messageContent, maxLength, t])

  useEffect(() => {
    if (autofocus) setTimeout(() => combinedInputRef.current?.focus(), 50)
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
          value={messageContent.length > 0 ? messageContent : ''}
        />
        {!!messageContent && (
          <TouchableOpacity style={styles.sendArrow} onPress={handleSubmit}>
            <SendArrowIcon
              height={9}
              width={9}
              color={
                userSettings?.darkMode
                  ? theme.colors.inputSendArrowBlack
                  : theme.colors.inputSendArrowWhite
              }
            />
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
    backgroundColor: theme.colors.white,
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
    flex: 1,
    padding: 0,
    borderColor: theme.colors.transparent,
    color: theme.colors.black,
  },
  sendArrow: {
    backgroundColor: theme.colors.black,
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
