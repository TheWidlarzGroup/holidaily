import React, { useEffect, useRef, useState } from 'react'
import { StyleProp, TextInput, ViewStyle } from 'react-native'
import { BaseOpacity, Box, mkUseStyles, theme, useColors } from 'utils/theme'
import SendArrowIcon from 'assets/icons/icon-paperplane.svg'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { themeBase } from 'utils/theme/themeBase'
import { useCombinedRefs } from 'hooks/useCombinedRefs'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { Comment } from 'mock-api/models/miragePostTypes'
import { generateUUID } from 'utils/generateUUID'
import { isAndroid } from 'utils/layout'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'

export type MessageInputProps = {
  messageContent: string
  setMessageContent: F1<string>
  onSubmitEditing: F1<string>
  handleSubmitComment?: F1<Comment>
  handleEditComment?: F0
  onBlur?: F1<string>
  defaultValue?: string
  maxLength?: number
  autofocus?: boolean
  placeholder?: string
}

const ICON_SIZE = 16
const androidPaddings: StyleProp<ViewStyle> = isAndroid ? { paddingTop: -3, paddingBottom: -3 } : {}

export const MessageInput = React.forwardRef<TextInput, MessageInputProps>((props, ref) => {
  const {
    onSubmitEditing,
    onBlur,
    defaultValue = '',
    maxLength = 300,
    autofocus = false,
    messageContent,
    setMessageContent,
    placeholder,
    handleEditComment,
  } = props
  const [error, setError] = useState('')
  const { t } = useTranslation('messageInput')
  const inputRef = useRef<TextInput>(null)
  const combinedInputRef = useCombinedRefs([ref, inputRef])
  const { notify } = useGetNotificationsConfig()

  const { user } = useUserContext()

  const styles = useStyles()
  const colors = useColors()

  const errorProgress = useDerivedValue(() => (error ? withTiming(1) : withTiming(0)), [error])

  const errorBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      errorProgress.value,
      [0, 1],
      [colors.special, colors.errorRed]
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

  const handleSubmitComment = () => {
    if (error) return
    onSubmitEditing(messageContent)
    const message: Comment = {
      id: generateUUID(),
      author: {
        id: user?.id || '',
        occupation: user?.occupation || '',
        name: `${user?.firstName} ${user?.lastName}` || '',
        pictureUrl: user?.photo || null,
        userColor: user?.userColor,
        lastName: user?.lastName,
      },
      createdAt: new Date().getTime(),
      text: messageContent,
    }
    props.handleSubmitComment?.(message)
    notify('successCustom', { params: { title: t('commentAdded') } })
  }

  const handleBlur = () => {
    onBlur?.(messageContent)
    if (handleEditComment) handleEditComment()
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
          style={[styles.input, androidPaddings]}
          placeholder={placeholder || undefined}
          placeholderTextColor={colors.headerGrey}
          onSubmitEditing={handleEditComment || handleSubmitComment}
          onBlur={handleBlur}
          blurOnSubmit
          multiline
          defaultValue={defaultValue}
          onChange={(e) => setMessageContent(e.nativeEvent.text)}
          value={messageContent.length > 0 ? messageContent : ''}
        />
        {!!messageContent && (
          <BaseOpacity
            width={32}
            height={32}
            onPress={handleEditComment || handleSubmitComment}
            backgroundColor="special"
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            alignSelf="flex-end"
            marginLeft="m">
            <SendArrowIcon
              height={ICON_SIZE}
              width={ICON_SIZE}
              color={theme.colors.inputSendArrow}
            />
          </BaseOpacity>
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
    borderTopLeftRadius: theme.spacing.l,
    borderTopRightRadius: theme.spacing.l,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    borderRadius: theme.spacing.l,
    backgroundColor: theme.colors.white,
    borderWidth: 1.2,
    paddingLeft: theme.spacing.xxm,
    padding: theme.spacing.xs,
    flexDirection: 'row',
  },
  input: {
    minHeight: 32,
    lineHeight: 20,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    flex: 1,
    borderColor: theme.colors.transparent,
    color: theme.colors.black,
  },
  error: {
    alignSelf: 'flex-end',
    paddingVertical: 2,
    color: theme.colors.errorRed,
  },
}))
