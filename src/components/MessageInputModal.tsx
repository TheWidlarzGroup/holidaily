import React, { useCallback, useRef } from 'react'
import { Modal, ModalProps, NativeSyntheticEvent, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BaseOpacity, Box } from 'utils/theme'
import { MessageInput, MessageInputProps } from './MessageInput'

type MessageInputModalProps = MessageInputProps &
  ModalProps & {
    requestCloseOnBlur?: true
  }

export const MessageInputModal = (props: MessageInputModalProps) => {
  const inputRef = useRef<TextInput>(null)
  const { onShow, requestCloseOnBlur, onBlur, onRequestClose } = props

  const handleShow = (event: NativeSyntheticEvent<unknown>) => {
    onShow?.(event)
    if (props.autofocus) inputRef.current?.focus()
  }

  const handleBlur = useCallback(
    (value: string) => {
      onBlur?.(value)
      if (requestCloseOnBlur) onRequestClose?.()
    },
    [onBlur, onRequestClose, requestCloseOnBlur]
  )

  return (
    <Modal transparent animationType="slide" {...props} onShow={handleShow}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <BaseOpacity flexGrow={1} activeOpacity={1} onPress={onRequestClose} />
        <Box
          paddingTop="xm"
          paddingBottom="xs"
          bg="disabled"
          borderTopLeftRadius="m"
          borderTopRightRadius="m">
          <MessageInput ref={inputRef} {...props} onBlur={handleBlur} />
        </Box>
      </KeyboardAwareScrollView>
    </Modal>
  )
}
