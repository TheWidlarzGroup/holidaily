import React from 'react'
import { Box, Text } from 'utils/theme/index'
import AddCommentIcon from 'assets/icons/addComment.svg'
import { TouchableOpacity } from 'react-native'
import { MessageIcon } from './MessageIcon'
import {
  AdditionalsAttachment,
  AdditionalsAttachmentIcon,
  AdditionalsMessageIcon,
} from './AdditionalsComponents'

type AdditionalsProps = {
  onPressMessage: F0
  messageContent: string
  showMessageInput: boolean
  showAttachmentModal: F0
  attachments: string[]
}

export const Additionals = ({
  onPressMessage,
  messageContent,
  showMessageInput,
  showAttachmentModal,
  attachments,
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
          />
        ) : (
          <AdditionalsAttachmentIcon showAttachmentModal={showAttachmentModal} />
        )}
        {messageContent ? (
          <MessageIcon messageContent={messageContent} onPressMessage={onPressMessage} />
        ) : (
          <AdditionalsMessageIcon onPress={onPressMessage} />
        )}
      </Box>
    </Box>
  )
}
