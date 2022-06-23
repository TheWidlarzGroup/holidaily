import React, { useCallback } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BaseOpacity, Box } from 'utils/theme'
import { MessageInput, MessageInputProps } from './MessageInput'
import { SwipeableModal } from './SwipeableModal'

type MessageInputModalProps = MessageInputProps & {
  requestCloseOnBlur?: true
  visible: boolean
  onRequestClose: F0
}

export const MessageInputModal = (props: MessageInputModalProps) => {
  const { requestCloseOnBlur, onBlur, onRequestClose, visible } = props

  const handleBlur = useCallback(
    (value: string) => {
      onBlur?.(value)
      if (requestCloseOnBlur) onRequestClose?.()
    },
    [onBlur, onRequestClose, requestCloseOnBlur]
  )

  return (
    <SwipeableModal isOpen={visible} onHide={onRequestClose} backdropColor="transparent">
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        keyboardShouldPersistTaps="handled">
        <BaseOpacity flexGrow={1} activeOpacity={1} onPress={onRequestClose} />
        <Box bg="disabled" borderTopLeftRadius="l" borderTopRightRadius="l" backgroundColor="white">
          <MessageInput {...props} onBlur={handleBlur} />
        </Box>
      </KeyboardAwareScrollView>
    </SwipeableModal>
  )
}
