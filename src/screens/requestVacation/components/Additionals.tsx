import React from 'react'
import { Box, Text } from 'utils/theme/index'
import PaperclipIcon from 'assets/icons/paperclip.svg'
import AddCommentIcon from 'assets/icons/addComment.svg'
import { TouchableOpacity } from 'react-native'
import { MessageIcon } from './MessageIcon'

type AdditionalsProps = {
  onPressMessage: F0
  messageContent: string
  showMessageInput: boolean
}

export const Additionals = ({
  onPressMessage,
  messageContent,
  showMessageInput,
}: AdditionalsProps) => (
  <Box>
    <Text variant="boldBlack18" textAlign="left" marginTop="l">
      Additionals
    </Text>
    <Text variant="body1" textAlign="left">
      Add an attachment or write a message
    </Text>
    <Box
      flexDirection={messageContent ? 'column-reverse' : 'row'}
      justifyContent="flex-start"
      alignItems="flex-start">
      <Box backgroundColor="lightGrey" padding="xm" margin="s" marginLeft={0} borderRadius="l">
        <PaperclipIcon width={22} height={22} />
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
