import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { MessageIcon } from './MessageIcon'
import {
  AdditionalsAttachment,
  AdditionalsAttachmentIcon,
  AdditionalsMessageIcon,
} from './AdditionalsComponents'

type AdditionalsProps = {
  onPressMessage: F0
  messageContent: string
  messageInputVisible: boolean
  showAttachmentModal: F0
  attachments: { id: string; uri: string }[]
  removePhoto: F1<string>
}

export const Additionals = ({
  onPressMessage,
  messageContent,
  messageInputVisible,
  showAttachmentModal,
  attachments,
  removePhoto,
}: AdditionalsProps) => {
  const getFlexDirection = () => {
    if (!messageContent && !attachments.length) return 'row'
    if (messageContent && !attachments.length) return 'column-reverse'
    return 'column'
  }

  return (
    <Box>
      <Text variant="boldBlack18" textAlign="left" marginTop="l">
        Additionals
      </Text>
      <Text variant="body1" textAlign="left">
        Add an attachment or write a message
      </Text>

      <Box flexDirection={getFlexDirection()} justifyContent="flex-start" alignItems="flex-start">
        {attachments.length ? (
          <AdditionalsAttachment
            photos={attachments}
            addMore={showAttachmentModal}
            displayAddMore={attachments.length < 9}
            removePhoto={removePhoto}
          />
        ) : (
          <AdditionalsAttachmentIcon showAttachmentModal={showAttachmentModal} />
        )}
        {!messageInputVisible && !!messageContent && (
          <MessageIcon messageContent={messageContent} onPressMessage={onPressMessage} />
        )}
        {!messageInputVisible && !messageContent && (
          <AdditionalsMessageIcon onPress={onPressMessage} />
        )}
      </Box>
    </Box>
  )
}
