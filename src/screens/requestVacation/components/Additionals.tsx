import React from 'react'
import { Box, Text } from 'utils/theme/index'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import AddCommentIcon from 'assets/icons/addComment.svg'
import { TouchableOpacity } from 'react-native'
import { MessageIcon } from './MessageIcon'
import { Photo } from './Photo'

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
}: AdditionalsProps) => (
  <Box>
    <Text variant="boldBlack18" textAlign="left" marginTop="l">
      Additionals
    </Text>
    <Text variant="body1" textAlign="left">
      Add an attachment or write a message
    </Text>

    <Box flexDirection="row" flexWrap="wrap">
      {attachments.map((el) => (
        <Box marginRight="s" marginTop="s">
          <Photo src={el} size={90} marginBottom="m" />
        </Box>
      ))}
    </Box>

    <Box
      flexDirection={messageContent ? 'column-reverse' : 'row'}
      justifyContent="flex-start"
      alignItems="flex-start">
      <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
        <TouchableOpacity onPress={showAttachmentModal}>
          <PaperclipIcon width={22} height={22} />
        </TouchableOpacity>
      </Box>

      {!showMessageInput && !messageContent && (
        <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
          <TouchableOpacity onPress={onPressMessage}>
            <AddCommentIcon width={22} height={22} />
          </TouchableOpacity>
        </Box>
      )}

      {!showMessageInput && !!messageContent && (
        <MessageIcon messageContent={messageContent} onPressMessage={onPressMessage} />
      )}
    </Box>
  </Box>
)
