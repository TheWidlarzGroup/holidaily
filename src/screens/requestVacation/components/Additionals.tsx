import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { AttachmentIcon } from './additionals/AttachmentIcon'
import { Attachments } from './additionals/Attachments'
import { Message } from './additionals/Message'
import { MessageIcon } from './additionals/MessageIcon'

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
    if (messageContent) return 'column-reverse'
    if (!messageContent && !attachments.length) return 'row'
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
          <Attachments
            photos={attachments}
            addMore={showAttachmentModal}
            displayAddMore={attachments.length < 9}
            removePhoto={removePhoto}
          />
        ) : (
          <AttachmentIcon showAttachmentModal={showAttachmentModal} />
        )}

        {!messageInputVisible &&
          (messageContent ? (
            <Message messageContent={messageContent} onPressMessage={onPressMessage} />
          ) : (
            <MessageIcon onPress={onPressMessage} />
          ))}
      </Box>
    </Box>
  )
}
